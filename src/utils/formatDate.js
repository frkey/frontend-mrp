function formatDate (date) {
  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear()

  return day + '/' + month + '/' + year
}

export default {
  formatDate
}
