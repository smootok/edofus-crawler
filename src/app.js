const crawler = require('./crawler')

module.exports = async argv => {
  const command = argv._[0]
  const { type, url } = argv

  switch (command) {
    case 'get-item': {
      const item = await crawler.getItem(type, url)
      console.log(item)
      break
    }

    case 'get-all': {
      const type = 'equipment'
      const paginationPages = await crawler.getPaginationPages(type)
      const itemsUrls = crawler.getItemsUrls(paginationPages)
      const items = await crawler.getItems(type, itemsUrls)
      console.log(items)
    }
  }
}
