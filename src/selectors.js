module.exports = {
  shared: {
    lastPageNum: '.ak-pagination li:nth-last-child(3) a',
    itemUrl: 'meta[property="og:url"]'
  },
  /* First Category : EQUIPMENT */
  firstCategory: {
    itemsUrls: '.ak-linker a',
    itemTitle: '.ak-title-container h1',
    itemType: '.ak-encyclo-detail-type > span',
    itemImageUrl: '.ak-encyclo-detail-illu img',
    itemPanelTitle: 'div.ak-panel-title',
    itemPanelContent: '.ak-panel-content',
    itemPanelContentElement: '.ak-content-list .ak-list-element',
    itemLevel: '.ak-encyclo-detail-level',
    itemEvolutionEffects: '.ak-form + .ak-displaymode-col .ak-main-content'
  }
}
