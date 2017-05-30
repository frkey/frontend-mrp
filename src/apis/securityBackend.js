var config = require('../config')
var languageService = require('../services/languageService')
import axios from 'axios'

const credentialsUrl = config.apiGatewayUri + '/manager/credentials'
const tokenUrl = config.apiGatewayUri + '/manager/tokens'
const oauthUrl = config.apiGatewayUri + '/oauth/token'
const meUrl = config.apiGatewayUri + '/manager/me'
const logoutUrl = config.apiGatewayUri + '/manager/logout?accessToken={accessToken}&refreshToken={refreshToken}?language={language}'

function changePassword (user, successCallback, errorCallback) {
  axios.put(credentialsUrl, user)
    .then(successCallback)
    .catch(errorCallback)
}

function revokeToken (token, successCallback, errorCallback) {
  var url = tokenUrl + '?accessToken=' + token
  axios.delete(url)
  .then(successCallback)
  .catch(errorCallback)
}

function loadTokens (options, successCallback, errorCallback) {
  axios.get(tokenUrl)
  .then(successCallback)
  .catch(errorCallback)
}

function accessToken (body, headers, successCallback, errorCallback) {
  axios.post(oauthUrl, body, headers)
    .then(successCallback)
    .catch(errorCallback)
}

function getMe (successCallback, errorCallback) {
  axios.get(meUrl)
    .then(successCallback)
    .catch(errorCallback)
}

function openGatewayLogin (clientId, redirectUri) {
  var url = '/oauth/authorise?client_id={client_id}&redirect_uri={redirect_uri}&language={language}'
  if (config.apiGatewayUri === undefined || config.apiGatewayUri === null || config.apiGatewayUri === '' || config.apiGatewayUri === ' ') {
    url = 'http://localhost:3000' + url
  } else {
    url = config.apiGatewayUri + url
  }
  url = url.replace('{client_id}', clientId).replace('{redirect_uri}', redirectUri).replace('{language}', languageService.getCurrentLanguage())
  console.log(url)
  window.location.href = url
}

function logout (accessToken, refreshToken, successCallback, errorCallback) {
  axios.delete(logoutUrl)
    .then(successCallback)
    .catch(errorCallback)
}

export default {
  changePassword,
  revokeToken,
  loadTokens,
  accessToken,
  getMe,
  openGatewayLogin,
  logout
}
