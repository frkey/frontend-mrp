var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const productUrl = config.apiGatewayUri + '/products'

function loadProducts (options, successCallback, errorCallback) {
  httpTransformation.makeUrl(productUrl, options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

function loadProduct (productId, successCallback, errorCallback) {
  axios.get(productUrl + '/' + productId)
    .then(successCallback)
    .catch(errorCallback)
}

function insertProduct (product, successCallback, errorCallback) {
  axios.post(productUrl, product)
    .then(successCallback)
    .catch(errorCallback)
}

function updateProduct (productId, product, successCallback, errorCallback) {
  axios.put(productUrl + '/' + productId, product)
    .then(successCallback)
    .catch(errorCallback)
}

function removeProduct (product, successCallback, errorCallback) {
  axios.delete(productUrl + '/' + product._id)
        .then(successCallback)
        .catch(errorCallback)
}

function getChildreen (productId, successCallback, errorCallback) {
  var url = productUrl + '/' + productId + '/children'
  axios.get(url)
    .then(successCallback)
    .catch(errorCallback)
}

function insertChildreen (parentId, childreenId, body, successCallback, errorCallback) {
  var url = productUrl + '/' + parentId + '/children/' + childreenId
  axios.put(url, body)
    .then(successCallback)
    .catch(errorCallback)
}

function removeChildreen (parentId, childreenId, successCallback, errorCallback) {
  var url = productUrl + '/' + parentId + '/children/' + childreenId
  axios.delete(url)
    .then(successCallback)
    .catch(errorCallback)
}

export default {
  getChildreen,
  insertProduct,
  updateProduct,
  removeProduct,
  loadProduct,
  loadProducts,
  insertChildreen,
  removeChildreen
}
