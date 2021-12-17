const rp = require('request-promise-native')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const request = async url => {
  const browser = await puppeteer.launch({ headless: false, timeout: 100000 })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  const html = await page.content()
  await page.close()
  await browser.close()
  return cheerio.load(html)
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
