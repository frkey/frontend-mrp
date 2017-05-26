function apply(json, map, callback) {
  var jsonObject = JSON.parse(clearJson(map, JSON.stringify(json)))
  console.log(jsonObject)
  callback(jsonObject)
}

var clearJson = function (v, response) {
  for (var k in v) {
    response = response.replace(new RegExp('"' + k + '"', 'g'), '"' + v[k] + '"')
  }
  return response;
}

module.exports = {
  apply
}
