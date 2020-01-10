const crawler = require('./crawler')

module.exports = async argv => {
  const command = argv._[0]
  const { type, url } = argv

  switch (command) {
    case 'get': {
      const item = await crawler.getItem(type, url)
      crawler.persist(item.name, [item])
      break
    }

    case 'get-all': {
      const paginationPages = await crawler.getPaginationPages(type)
      const itemsUrls = crawler.getItemsUrls(paginationPages)
      const items = await crawler.getItems(type, itemsUrls)
      crawler.persist(type, items)
      break
    }
  }
}
