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

var frontendNameToBackendName  = (query, translateFn, columns, callback) => {
  var resObject = ""
  if (query === undefined || query === null || query === '') {
    return callback(resObject)
  }

  var pipes = query.split(',')
  for (var i = 0; i < pipes.length; i++) {
    var param = pipes[0].split(':')
    for (var j = 0; j < columns.length; j++) {
      if (translateFn(columns[j].name).toLowerCase() === param[0].toLowerCase()) {
        resObject += columns[j].key + ':' + param[1]
      }
    }
  }
  return callback(resObject)
}

module.exports = {
  apply,
  frontendNameToBackendName
}
