const rp = require('request-promise-native')
const cheerio = require('cheerio')

module.exports = async url => {
  const options = {
    uri: url,
    transform (body) {
      return cheerio.load(body)
    }
  }
  try {
    const response = rp(options)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}
