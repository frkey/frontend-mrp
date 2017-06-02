var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const necessityUrl = config.apiGatewayUri + '/necessities'

function loadNecessities (options, successCallback, errorCallback) {
  httpTransformation.makeUrl(necessityUrl, options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

function loadProduct (productId, successCallback, errorCallback) {
  axios.get(necessityUrl + '/' + productId)
    .then(successCallback)
    .catch(errorCallback)
}

function insertNecessity(necessity, successCallback, errorCallback) {
  axios.post(necessityUrl, necessity)
    .then(successCallback)
    .catch(errorCallback)
}

function updateNecessity (necessityId, necessity, successCallback, errorCallback) {
  axios.put(necessityUrl + '/' + necessityId, necessity)
    .then(successCallback)
    .catch(errorCallback)
}

function removeProduct (product, successCallback, errorCallback) {
  axios.delete(necessityUrl + '/' + product._id)
        .then(successCallback)
        .catch(errorCallback)
}

function insertNecessityItem (necessityId, body, successCallback, errorCallback) {
  var url = necessityUrl + '/' + necessityId + '/items'
  axios.post(url, body)
    .then(successCallback)
    .catch(errorCallback)
}

function removeNecessityItem (necessityId, itemId, successCallback, errorCallback) {
  var url = necessityUrl + '/' + necessityId + '/items/' + itemId
  axios.delete(url)
    .then(successCallback)
    .catch(errorCallback)
}

function loadNecessityItems (necessityId, options, successCallback, errorCallback) {
  httpTransformation.makeUrl(necessityUrl + '/' + necessityId + '/items', options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

export default {
  insertNecessity,
  updateNecessity,
  removeProduct,
  loadProduct,
  loadNecessities,
  insertNecessityItem,
  removeNecessityItem,
  loadNecessityItems
}
