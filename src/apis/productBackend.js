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

export default {
  insertProduct,
  updateProduct,
  removeProduct,
  loadProduct,
  loadProducts
}