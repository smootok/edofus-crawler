const selectors = require('./selectors')

const getUrl = $ => {
  return $(selectors.shared.itemUrl).attr('content')
}

const getId = $ => {
  return _getIdFromUrl(getUrl($))
}

const getName = $ => {
  return $(selectors.firstCategory.itemTitle)
    .text()
    .trim()
}

const getLevel = $ => {
  const level = $(selectors.firstCategory.itemLevel).text()
  if (!level) return ''
  return parseInt(level.split(':')[1])
}

const getImageUrl = $ => {
  return _absoluteUrl($(selectors.firstCategory.itemImageUrl).attr('src'))
}

const getType = $ => {
  return $(selectors.firstCategory.itemType)
    .text()
    .trim()
}

const getDescription = $ => {
  return _getPanelContent($, 'Description')
    .text()
    .trim()
    .replace(/\s+/g, ' ')
}

const getEffects = $ => {
  return _getPanelContent($, 'Effects')
    .find(selectors.firstCategory.itemPanelContentElement)
    .map((i, el) =>
      _parseTextEffect(
        $(el)
          .text()
          .trim()
      )
    )
    .get()
}

const getEvolutionEffects = $ => {
  return $(selectors.firstCategory.itemEvolutionEffects)
    .map((i, el) =>
      _parseTextEffect(
        $(el)
          .text()
          .trim()
      )
    )
    .get()
}

const getCharacteristics = $ => {
  return _getPanelContent($, 'Characteristics')
    .find(selectors.firstCategory.itemPanelContentElement)
    .map((i, el) =>
      $(el)
        .text()
        .trim()
    )
    .get()
}

const getConditions = $ => {
  return _getPanelContent($, 'Conditions')
    .text()
    .trim()
    .replace(/\s+/g, ' ')
}

const getSet = $ => {
  const setUrl = $(selectors.firstCategory.itemPanelTitle)
    .filter((i, el) =>
      $(el)
        .text()
        .trim()
        .startsWith(getName($))
    )
    .find('a')
    .attr('href')
  return setUrl ? _getIdFromUrl(setUrl) : null
}

const _getIdFromUrl = url => {
  const urlSplited = url.split('/')
  return parseInt(urlSplited[urlSplited.length - 1])
}

const _getPanelContent = ($, name) => {
  return $(selectors.firstCategory.itemPanelTitle)
    .filter(
      (i, el) =>
        $(el)
          .text()
          .trim() === name
    )
    .parent()
    .find(selectors.firstCategory.itemPanelContent)
}

const _parseTextEffect = text => {
  let effect = {}
  const splitedText = text.split(' ')
  if (splitedText[1] === 'to') {
    effect = {
      text,
      start: parseInt(splitedText[0]),
      end: parseInt(splitedText[2]),
      name: splitedText
        .slice(3)
        .join('-')
        .toLowerCase()
    }
  } else if (!isNaN(parseInt(splitedText[0]))) {
    effect = {
      text,
      start: parseInt(splitedText[0]),
      name: splitedText
        .slice(1)
        .join('-')
        .toLowerCase()
    }
  } else {
    effect = { text }
  }
  return effect
}

function _absoluteUrl (url = '') {
  // 'https://s.ankama.com/www/static.ankama.com/dofus/ng/img/../../../dofus/www/game/items/200/3083.png' =>
  // 'https://s.ankama.com/www/static.ankama.com/dofus/www/game/items/200/3083.png'
  const count = (url.match(/\/\.\./g) || []).length

  for (let i = 0; i < count; i++) {
    url = url.replace(/\/[^/]+\/\.\./, '')
  }

  return url
}

module.exports = {
  url: getUrl,
  itemId: getId,
  name: getName,
  level: getLevel,
  imageUrl: getImageUrl,
  type: getType,
  description: getDescription,
  effects: getEffects,
  evolutionEffects: getEvolutionEffects,
  characteristics: getCharacteristics,
  conditions: getConditions,
  set: getSet
}
