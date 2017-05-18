const SET_CLIENT_ID = 'SET_CLIENT_ID'
const SET_CLIENT_SECRET = 'SET_CLIENT_SECRET'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'
const SET_REDIRECT_URI = 'SET_REDIRECT_URI'
const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED'
const SET_USER = 'SET_USER'

const state = {
  client_id: '{clientIdWebpack}',
  client_secret: '{clientSecretWebpack}',
  access_token: '',
  refresh_token: '',
  redirect_uri: '{redirectUriWebpack}',
  is_authorized: '',
  user: undefined
}

const mutations = {
  [SET_CLIENT_ID] (state, clientId) {
    state.client_id = clientId
  },
  [SET_CLIENT_SECRET] (state, clientSecret) {
    state.client_secret = clientSecret
  },
  [SET_ACCESS_TOKEN] (state, token) {
    state.access_token = token
  },
  [SET_REFRESH_TOKEN] (state, token) {
    state.refresh_token = token
  },
  [SET_REDIRECT_URI] (state, redirectUri) {
    state.redirect_uri = redirectUri
  },
  [SET_IS_AUTHORIZED] (state, isAuthorized) {
    state.is_authorized = isAuthorized
  },
  [SET_USER] (state, user) {
    state.user = user
  }
}

export default {
  state,
  mutations
}
