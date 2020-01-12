const fs = require('fs')
const path = require('path')
const slug = require('slug')

const request = require('./request')
const selectors = require('./selectors')
const parser = require('./parser')
const types = require('./types')

const getPage = async url => request(url)

const getItem = async (type, url) => {
  const page = await getPage(url)
  const item = {}
  for (const prop of types[type].properties) {
    item[prop] = parser[prop](page) || null
  }
  return item
}

const calcSleepTime = ({
  reqNumber = 0,
  hasError = false,
  errorCount = 0,
  errorSleepSeconds = 60,
  shortSleepSeconds = 2,
  shortSleepInterval = 10,
  longSleepSeconds = 20,
  longSleepInterval = 100
}) => {
  if (hasError === true) {
    return errorSleepSeconds * errorCount
  } else if (reqNumber % longSleepInterval === 0) {
    return longSleepSeconds
  } else if (reqNumber % shortSleepInterval === 0) {
    return shortSleepSeconds
  }
  return 0
}

const sleep = seconds => {
  seconds > 2 && console.log(`Sleep ${seconds} seconds...`)
  return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000))
}

const getPaginationUrl = (type, pageNum) => {
  return `https://www.dofus.com/en/mmorpg/encyclopedia/${type}?size=96&page=${pageNum}`
}

const getPaginationPages = async (type, startPageNum = 1, endPageNum) => {
  const startPaginationUrl = getPaginationUrl(type, startPageNum)
  const startPage = await getPage(startPaginationUrl)
  endPageNum = endPageNum || startPage(selectors.shared.lastPageNum).text()

  if (isNaN(endPageNum)) {
    return [startPage]
  }

  const pages = []
  for (let i = startPageNum; i <= endPageNum; i++) {
    const page = await getPage(getPaginationUrl(type, i))
    pages.push(page)
    console.log(`Page ${i}/${endPageNum} has been added for crawling`)
    await sleep(calcSleepTime({ reqNumber: i }))
  }
  return pages
}

const getItemsUrls = pages => {
  const urls = new Set()
  for (const page of pages) {
    page(selectors.firstCategory.itemsUrls).each((i, el) => {
      urls.add(`https://dofus.com${page(el).attr('href')}`)
    })
  }
  return [...urls]
}

const getItems = async (type, urls) => {
  const items = []
  const totalItems = urls.length
  let itemIndex = 0
  let errorCount = 0

  while (urls.length) {
    try {
      const item = await getItem(type, urls[0])
      items.push(item)
      urls.shift()
      itemIndex++
      console.log(`Item crawled: ${item.name} (${itemIndex}/${totalItems})`)
      await sleep(calcSleepTime({ reqNumber: itemIndex }))
    } catch (e) {
      if (e.statusCode !== 404) {
        errorCount++
        console.log(`Error Number: ${errorCount}, ${e.message}`)
        await sleep(calcSleepTime({ hasError: true, errorCount }))
      } else {
        console.log('Error 404 Item Not Found:', urls[0])
        urls.shift()
      }
    }
  }
  return items
}

const getEffectsNames = filename => {
  try {
    const items = _getFileFromOutput(filename)
    const effectsNames = new Set()
    for (const item of items) {
      for (const effect of item.effects) {
        effectsNames.add(effect.name)
      }
    }
    return [...effectsNames]
  } catch (e) {
    console.log(`File not found: /output/${filename}.json`)
  }
}

const _getFileFromOutput = filename => {
  const filePath = path.join(__dirname, '..', 'output', filename + '.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

const persist = (filename, data) => {
  const formatedFilename = slug(filename, { lower: true }) + '.json'
  const filePath = path.join(__dirname, '..', 'output', formatedFilename)
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
    err
      ? console.log(err)
      : console.log('The file was saved successfully!', filePath)
  })
}

module.exports = {
  getItem,
  getPaginationPages,
  getItemsUrls,
  getItems,
  getEffectsNames,
  persist
}
