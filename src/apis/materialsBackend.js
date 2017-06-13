var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const materialsURL = config.apiGatewayUri + '/materials'

function loadMaterials (location, options, successCallback, errorCallback) {
  httpTransformation.makeUrl(config.apiGatewayUri + location, options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

export default {
  loadMaterials
}
