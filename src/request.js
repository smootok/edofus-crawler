const rp = require('request-promise-native')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const request = url => {
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

const download = ({ url, location, filename }) => {
  const filePath = path.join(__dirname, '..', 'output', location, filename)
  return new Promise((resolve, reject) => {
    rp.head(url, (err, res) => {
      rp(url)
        .on('error', () => reject(err))
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => resolve(res))
    })
  })
}

module.exports = {
  request,
  download
}
