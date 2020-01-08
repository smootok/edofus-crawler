const fs = require('fs')

const request = require('./request')
const selectors = require('./selectors')
const parser = require('./parser')
const types = require('./types')
const { getRandomNum } = require('./helpers')

const getPage = async url => request(url)

const getItem = async (type, url) => {
  const page = await getPage(url)
  const item = {}
  for (const prop of types[type].properties) {
    item[prop] = parser[prop](page) || null
  }
  return item
}

const calcSleepTime = (
  index,
  requestSleepTime = 2,
  intervalSleepTime = 60,
  intervalToSleep = 50
) => {
  if ((index + 1) % intervalToSleep !== 0) {
    return requestSleepTime
  }
  return getRandomNum(intervalSleepTime / 3, intervalSleepTime)
}

const sleep = seconds => {
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

    const sleepSeconds = calcSleepTime(i)
    sleepSeconds > 2 && console.log(`Sleep ${Math.floor(sleepSeconds)}...`)
    await sleep(sleepSeconds)
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
  for (const [index, url] of urls.entries()) {
    try {
      const item = await getItem(type, url)
      items.push(item)
      console.log(
        `Item : ${item.name} has been parsed (${index + 1}/${urls.length})`
      )
    } catch (e) {
      if (e.statusCode !== 404) {
        throw new Error(e)
      }
    }

    const sleepSeconds = calcSleepTime(index)
    sleepSeconds > 2 && console.log(`Sleep ${Math.floor(sleepSeconds)}...`)
    await sleep(sleepSeconds)
  }
}

const persist = (filename, data) => {
  fs.writeFile(
    `${__dirname}/../output/${filename + '.json'}`,
    JSON.stringify(data),
    'utf8',
    err => {
      err ? console.log(err) : console.log('The file was saved successfully!')
    }
  )
}

module.exports = {
  getItem,
  getPaginationPages,
  getItemsUrls,
  getItems,
  persist
}
