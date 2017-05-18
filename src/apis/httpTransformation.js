function makeUrl (url, options, callback) {
  url += '?'

  if (options) {
    if (options.page) {
      url += '&_page=' + options.page
    }
    if (options.limit) {
      url += '&_limit=' + options.limit
    }
    if (options.search) {
      url += '&_search=' + options.search
    }
  }

  callback(url)
}

module.exports = {
  makeUrl: makeUrl
}
