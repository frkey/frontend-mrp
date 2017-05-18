// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './vuex/store'
import Toast from 'vue-easy-toast'
import VeeValidate from 'vee-validate'
import * as pagination from 'vuejs-uib-pagination'
import VueResource from 'vue-resource'
import ToggleButton from 'vue-js-toggle-button'
import { VudalPlugin } from 'vudal'
import axios from 'axios'

var config = require('./config')
var baseUrl = config.frontendAddress

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'
import securityBackend from './apis/securityBackend'
import authService from './services/authService'

var qs = require('qs')
// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(store)
Vue.use(Toast)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(pagination)
Vue.use(ToggleButton)
Vue.use(VudalPlugin)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + (authService.getAccessToken() ? authService.getAccessToken() : '1')
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  if (error.response.status === 401) {
    if (authService.getRefreshToken()) {
      getRefreshToken(authService.getRefreshToken())
      return
    } else {
      window.location.href = baseUrl + '/unauthorized'
      return
    }
  }
  if (error.response.status === 403) {
    window.location.href = baseUrl + '/forbbiden'
    return
  }
  if (error.response.status >= 500) {
    window.location.href = baseUrl + '/error'
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

function getRefreshToken (refreshToken) {
  var data = {
    'grant_type': 'refresh_token',
    'refresh_token': refreshToken
  }
  securityBackend.accessToken(qs.stringify(data), {
    auth: {
      username: authService.getClientId(),
      password: authService.getClientSecret()
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }, function (res) {
    authService.setAccessToken(res.data.access_token)
    authService.setRefreshToken(res.data.refresh_token)
    window.location.reload()
    return
  })
  .catch(error => {
    if (error) {
      authService.setAccessToken('')
      authService.setRefreshToken('')
      window.location.href = baseUrl + '/error'
    }
  })
}

sync(store, router)

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  created: function () {
    window.Vue = this
  },
  render: h => h(AppView)
})
