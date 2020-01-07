const crawler = require('./crawler')

module.exports = async argv => {
  const command = argv._[0]
  switch (command) {
    case 'get-item': {
      const type = 'equipment'
      const url = 'https://www.dofus.com/en/mmorpg/encyclopedia/equipment/14079-age-old-helmet'
      const item = await crawler.getItem(url, type)
      console.log(item)
    }
  }
}
