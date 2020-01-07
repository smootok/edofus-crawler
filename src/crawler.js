const request = require('./request')
const parser = require('./parser')
const types = require('./types')

const getPaginationUrl = (type, pageNum) => {
  return `https://www.dofus.com/en/mmorpg/encyclopedia/${type}?size=96&page=${pageNum}`
}

const getPage = async url => request(url)

const getItem = async (url, type) => {
  const page = await getPage(url)
  const item = {}
  for (const prop of types[type].properties) {
    item[prop] = parser[prop](page) || null
  }
  return item
}

module.exports = {
  getPaginationUrl,
  getPage,
  getItem
}
