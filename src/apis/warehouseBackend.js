var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const url = config.apiGatewayUri + '/warehouses'

function load (options, successCallback, errorCallback) {
  httpTransformation.makeUrl(url, options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

function loadOne (id, successCallback, errorCallback) {
  axios.get(url + '/' + id)
    .then(successCallback)
    .catch(errorCallback)
}

function insert (object, successCallback, errorCallback) {
  axios.post(url, object)
    .then(successCallback)
    .catch(errorCallback)
}

function update (id, object, successCallback, errorCallback) {
  axios.put(url + '/' + id, object)
    .then(successCallback)
    .catch(errorCallback)
}

function remove (object, successCallback, errorCallback) {
  axios.delete(url + '/' + object._id)
        .then(successCallback)
        .catch(errorCallback)
}

module.exports = {
  load,
  loadOne,
  insert,
  update,
  remove
}
