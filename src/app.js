const crawler = require('./crawler')

module.exports = async argv => {
  const command = argv._[0]

  switch (command) {
    case 'get': {
      const { type, url } = argv
      const item = await crawler.getItem(type, url)
      item && crawler.persist(item.name, [item])
      break
    }

    case 'get-all': {
      const { type } = argv
      const paginationPages = await crawler.getPaginationPages(type)
      const itemsUrls = crawler.getItemsUrls(paginationPages)
      const items = await crawler.getItems(type, itemsUrls)
      items && crawler.persist(type, items)
      break
    }

    case 'get-effects': {
      const { filename } = argv
      const effects = crawler.getEffectsNames(filename)
      effects && crawler.persist(`${filename}-effects`, effects)
      break
    }
  }
}
