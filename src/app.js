const slug = require('slug')

const crawler = require('./crawler')

module.exports = async argv => {
  const command = argv._[0]
  const { type, url } = argv

  switch (command) {
    case 'get-item': {
      const item = await crawler.getItem(type, url)
      const fileName = slug(item.name, { lower: true })
      crawler.persist(fileName, item)
      break
    }

    case 'get-all': {
      const paginationPages = await crawler.getPaginationPages(type)
      const itemsUrls = crawler.getItemsUrls(paginationPages)
      const items = await crawler.getItems(type, itemsUrls)
      const fileName = slug(type, { lower: true })
      crawler.persist(fileName, items)
      break
    }
  }
}
