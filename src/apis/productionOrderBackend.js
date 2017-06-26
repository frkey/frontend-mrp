var config = require('../config')
var httpTransformation = require('./httpTransformation')
import axios from 'axios'

const productionOrderUrl = config.apiGatewayUri + '/productionOrders'

function loadProductionOrders (options, successCallback, errorCallback) {
  httpTransformation.makeUrl(productionOrderUrl, options, (url) => {
    axios.get(url)
      .then(successCallback)
      .catch(errorCallback)
  })
}

function loadProductionOrder (productionOrderId, successCallback, errorCallback) {
  axios.get(productionOrderUrl + '/' + productionOrderId)
    .then(successCallback)
    .catch(errorCallback)
}

function insertProductionOrder (productionOrder, successCallback, errorCallback) {
  axios.post(productionOrderUrl, productionOrder)
    .then(successCallback)
    .catch(errorCallback)
}

function updateProductionOrder (productionOrderId, productionOrder, successCallback, errorCallback) {
  axios.put(productionOrderUrl + '/' + productionOrderId, productionOrder)
    .then(successCallback)
    .catch(errorCallback)
}

function removeProductionOrder (productionOrder, successCallback, errorCallback) {
  axios.delete(productionOrderUrl + '/' + productionOrder._id)
        .then(successCallback)
        .catch(errorCallback)
}

export default {
  loadProductionOrders,
  loadProductionOrder,
  insertProductionOrder,
  updateProductionOrder,
  removeProductionOrder
}
