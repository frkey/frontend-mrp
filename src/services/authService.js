import store from '../vuex/store'

const setClientId = function (clientId) {
  store.commit('SET_CLIENT_ID', clientId)
}
const getClientId = function () {
  return store.state.auth.client_id
}

const setClientSecret = function (clientSecret) {
  store.commit('SET_CLIENT_SECRET', clientSecret)
}
const getClientSecret = function () {
  return store.state.auth.client_secret
}

const setAccessToken = function (token) {
  store.commit('SET_ACCESS_TOKEN', token)
}
const getAccessToken = function () {
  return store.state.auth.access_token
}

const setRefreshToken = function (token) {
  store.commit('SET_REFRESH_TOKEN', token)
}
const getRefreshToken = function () {
  return store.state.auth.refresh_token
}

const setRedirectURI = function (redirectUri) {
  store.commit('SET_REDIRECT_URI', redirectUri)
}
const getRedirectURI = function () {
  return store.state.auth.redirect_uri
}

const setIsAuthorized = function (isAuthorized) {
  store.commit('SET_IS_AUTHORIZED', isAuthorized)
}
const isAuthorized = function () {
  return store.state.auth.is_authorized
}

const setUser = function (user) {
  store.commit('SET_USER', user)
}
const getUser = function () {
  return store.state.auth.user
}

const setLanguage = function (language) {
  store.commit('SET_LANGUAGE', language)
}
const getLanguage = function () {
  return store.state.auth.language
}

const setSessionId = function () {
  store.commit('SET_SESSION_ID', guid())
}

const getSessionId = function () {
  return store.state.auth.sessionId
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default {
  setClientId: setClientId,
  getClientId: getClientId,
  setClientSecret: setClientSecret,
  getClientSecret: getClientSecret,
  setAccessToken: setAccessToken,
  getAccessToken: getAccessToken,
  setRefreshToken: setRefreshToken,
  getRefreshToken: getRefreshToken,
  setRedirectURI: setRedirectURI,
  getRedirectURI: getRedirectURI,
  setIsAuthorized: setIsAuthorized,
  isAuthorized: isAuthorized,
  setUser: setUser,
  getUser: getUser,
  setLanguage: setLanguage,
  getLanguage: getLanguage,
  setSessionId: setSessionId,
  getSessionId: getSessionId
}
