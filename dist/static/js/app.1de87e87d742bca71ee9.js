webpackJsonp([2,0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(16);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(294);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vuexRouterSync = __webpack_require__(300);

	var _routes = __webpack_require__(205);

	var _routes2 = _interopRequireDefault(_routes);

	var _store = __webpack_require__(31);

	var _store2 = _interopRequireDefault(_store);

	var _vueEasyToast = __webpack_require__(246);

	var _vueEasyToast2 = _interopRequireDefault(_vueEasyToast);

	var _veeValidate = __webpack_require__(245);

	var _veeValidate2 = _interopRequireDefault(_veeValidate);

	var _vuejsUibPagination = __webpack_require__(298);

	var pagination = _interopRequireWildcard(_vuejsUibPagination);

	var _vueResource = __webpack_require__(293);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _vueJsToggleButton = __webpack_require__(247);

	var _vueJsToggleButton2 = _interopRequireDefault(_vueJsToggleButton);

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	var _vueTranslatePlugin = __webpack_require__(296);

	var _vueTranslatePlugin2 = _interopRequireDefault(_vueTranslatePlugin);

	var _language = __webpack_require__(204);

	var _language2 = _interopRequireDefault(_language);

	var _vue2Filters = __webpack_require__(297);

	var _vue2Filters2 = _interopRequireDefault(_vue2Filters);

	var _pt_BR = __webpack_require__(244);

	var _pt_BR2 = _interopRequireDefault(_pt_BR);

	var _vueTheMask = __webpack_require__(295);

	var _vueTheMask2 = _interopRequireDefault(_vueTheMask);

	var _moment = __webpack_require__(1);

	var _moment2 = _interopRequireDefault(_moment);

	var _vMask = __webpack_require__(243);

	var _vMask2 = _interopRequireDefault(_vMask);

	var _filters = __webpack_require__(203);

	var _App = __webpack_require__(253);

	var _App2 = _interopRequireDefault(_App);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var baseUrl = config.frontendAddress;

	// Import Helpers for filters


	// Import Views - Top level


	var qs = __webpack_require__(148);
	// Import Install and register helper items
	_vue2.default.filter('count', _filters.count);
	_vue2.default.filter('domain', _filters.domain);
	_vue2.default.filter('prettyDate', _filters.prettyDate);
	_vue2.default.filter('pluralize', _filters.pluralize);
	_vue2.default.filter('formatDate', function (value) {
	  if (value) {
	    return (0, _moment2.default)(String(value)).format('MM/DD/YYYY hh:mm');
	  }
	});
	_vue2.default.use(_vMask2.default);
	_vue2.default.use(_store2.default);
	_vue2.default.use(_vueEasyToast2.default);
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);
	_veeValidate2.default.Validator.addLocale(_pt_BR2.default);
	_vue2.default.use(_veeValidate2.default, { locale: 'pt_BR' });
	_vue2.default.use(pagination);
	_vue2.default.use(_vueJsToggleButton2.default);
	_vue2.default.use(_vueTranslatePlugin2.default);
	_vue2.default.use(_vue2Filters2.default);
	_vue2.default.use(_vueTheMask2.default);

	new _language2.default(_vue2.default);

	// Routing logic
	var router = new _vueRouter2.default({
	  routes: _routes2.default,
	  mode: 'history',
	  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
	    return savedPosition || { x: 0, y: 0 };
	  }
	});

	_axios2.default.interceptors.request.use(function (config) {
	  config.headers['accept-language'] = _authService2.default.getLanguage();
	  config.headers.Authorization = 'Bearer ' + (_authService2.default.getAccessToken() ? _authService2.default.getAccessToken() : '1');
	  return config;
	}, function (err) {
	  return Promise.reject(err);
	});

	_axios2.default.interceptors.response.use(function (response) {
	  // intercept the global error
	  return response;
	}, function (error) {
	  if (error.response.status === 401) {
	    if (_authService2.default.getRefreshToken()) {
	      getRefreshToken(_authService2.default.getRefreshToken());
	      return;
	    } else {
	      window.location.href = baseUrl + '/unauthorized';
	      return;
	    }
	  }
	  if (error.response.status === 403) {
	    window.location.href = baseUrl + '/forbbiden';
	    return;
	  }
	  if (error.response.status >= 500) {
	    console.log(error.response.message);
	    window.location.href = baseUrl + '/error';
	    return;
	  }
	  // Do something with response error
	  return Promise.reject(error);
	});

	function getRefreshToken(refreshToken) {
	  var data = {
	    'grant_type': 'refresh_token',
	    'refresh_token': refreshToken
	  };
	  _securityBackend2.default.accessToken(qs.stringify(data), {
	    auth: {
	      username: _authService2.default.getClientId(),
	      password: _authService2.default.getClientSecret()
	    },
	    headers: {
	      'content-type': 'application/x-www-form-urlencoded'
	    }
	  }, function (res) {
	    _authService2.default.setAccessToken(res.data.access_token);
	    _authService2.default.setRefreshToken(res.data.refresh_token);
	    window.location.reload();
	    return;
	  }, function (error) {
	    if (error) {
	      _authService2.default.setAccessToken('');
	      _authService2.default.setRefreshToken('');
	      window.location.href = baseUrl + '/error';
	    }
	  });
	}

	(0, _vuexRouterSync.sync)(_store2.default, router);

	// Start out app!
	// eslint-disable-next-line no-new
	var app = new _vue2.default({
	  el: '#root',
	  router: router,
	  store: _store2.default,
	  created: function created() {
	    window.Vue = this;
	  },
	  render: function render(h) {
	    return h(_App2.default);
	  }
	});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function loadLanguage(_self) {
	  if (_authService2.default.getUser() === undefined) {
	    _self.$translate.setLang(_authService2.default.getLanguage());
	  } else {
	    if (_authService2.default.getUser().language === undefined) {
	      _self.$translate.setLang(_authService2.default.getLanguage());
	    } else {
	      _self.$translate.setLang(_authService2.default.getUser().language);
	    }
	  }
	}

	function getCurrentLanguage() {
	  if (_authService2.default.getUser() === undefined) {
	    return _authService2.default.getLanguage();
	  } else {
	    if (_authService2.default.getUser().language === undefined) {
	      return _authService2.default.getLanguage();
	    } else {
	      return _authService2.default.getUser().language;
	    }
	  }
	}

	module.exports = {
	  loadLanguage: loadLanguage,
	  getCurrentLanguage: getCurrentLanguage
	};

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function successMessage(_self, message) {
	  _self.$toast('<h4 class="label-lg" >' + message + '</h2>', {
	    className: ['et-info', 'alert'],
	    horizontalPosition: 'center',
	    duration: 3000,
	    mode: 'queue',
	    transition: 'slide-left'
	  });
	}

	function errorMessage(_self, message) {
	  _self.$toast('<h4 class="label-lg" >' + message + '</h2>', {
	    className: ['et-alert', 'alert'],
	    horizontalPosition: 'center',
	    duration: 3000,
	    mode: 'queue',
	    transition: 'slide-left'
	  });
	}

	function verifyFields(_self, successCallback, errorCallback) {
	  if (_self.errors.all()) {
	    if (_self.errors.errors.length > 0) {
	      errorCallback(_self.errors.errors[0].msg);
	    }
	    successCallback();
	  } else {
	    successCallback();
	  }
	}

	exports.default = {
	  successMessage: successMessage,
	  errorMessage: errorMessage,
	  verifyFields: verifyFields
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function loadUserRoles(_self) {
	  var currentUser = _authService2.default.getUser();
	  var aux = [];

	  for (var i = 0; i < currentUser.groups.length; i++) {
	    var group = currentUser.groups[i];
	    for (var j = 0; j < group.roles.length; j++) {
	      aux[group.roles[j].name] = group.roles[j].name;
	    }
	  }

	  _self.roles = aux;
	  if (!_self.roles['manager.read']) {
	    _self.$router.replace('/forbbiden');
	  }
	}

	exports.default = {
	  loadUserRoles: loadUserRoles
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.eventHelper = undefined;

	var _vue = __webpack_require__(16);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eventHelper = {
	  bus: null,

	  init: function init() {
	    if (!this.bus) {
	      this.bus = new _vue2.default();
	    }

	    return this;
	  },
	  emit: function emit(name) {
	    var _bus;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    (_bus = this.bus).$emit.apply(_bus, [name].concat(args));
	    return this;
	  },
	  on: function on() {
	    var _this = this,
	        _arguments = arguments;

	    if (arguments.length === 2) {
	      this.bus.$on(arguments[0], arguments[1]);
	    } else {
	      Object.keys(arguments[0]).forEach(function (key) {
	        _this.bus.$on(key, _arguments[0][key]);
	      });
	    }

	    return this;
	  }
	};

	exports.eventHelper = eventHelper;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var env = {};

	if (("production") === '' || ("production") === ' ' || ("production") === undefined) {
	  env = __webpack_require__(201);
	} else {
	  env = __webpack_require__(202);
	}

	module.exports = env;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(31);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setClientId = function setClientId(clientId) {
	  _store2.default.commit('SET_CLIENT_ID', clientId);
	};
	var getClientId = function getClientId() {
	  return _store2.default.state.auth.client_id;
	};

	var setClientSecret = function setClientSecret(clientSecret) {
	  _store2.default.commit('SET_CLIENT_SECRET', clientSecret);
	};
	var getClientSecret = function getClientSecret() {
	  return _store2.default.state.auth.client_secret;
	};

	var setAccessToken = function setAccessToken(token) {
	  _store2.default.commit('SET_ACCESS_TOKEN', token);
	};
	var getAccessToken = function getAccessToken() {
	  return _store2.default.state.auth.access_token;
	};

	var setRefreshToken = function setRefreshToken(token) {
	  _store2.default.commit('SET_REFRESH_TOKEN', token);
	};
	var getRefreshToken = function getRefreshToken() {
	  return _store2.default.state.auth.refresh_token;
	};

	var setRedirectURI = function setRedirectURI(redirectUri) {
	  _store2.default.commit('SET_REDIRECT_URI', redirectUri);
	};
	var getRedirectURI = function getRedirectURI() {
	  return _store2.default.state.auth.redirect_uri;
	};

	var setIsAuthorized = function setIsAuthorized(isAuthorized) {
	  _store2.default.commit('SET_IS_AUTHORIZED', isAuthorized);
	};
	var isAuthorized = function isAuthorized() {
	  return _store2.default.state.auth.is_authorized;
	};

	var setUser = function setUser(user) {
	  _store2.default.commit('SET_USER', user);
	};
	var getUser = function getUser() {
	  return _store2.default.state.auth.user;
	};

	var setLanguage = function setLanguage(language) {
	  _store2.default.commit('SET_LANGUAGE', language);
	};
	var getLanguage = function getLanguage() {
	  return _store2.default.state.auth.language;
	};

	var setSessionId = function setSessionId() {
	  _store2.default.commit('SET_SESSION_ID', guid());
	};

	var getSessionId = function getSessionId() {
	  return _store2.default.state.auth.sessionId;
	};

	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	exports.default = {
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
	};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(174)

	/* template */
	var __vue_template__ = __webpack_require__(272)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var languageService = __webpack_require__(2);


	var credentialsUrl = config.apiGatewayUri + '/manager/credentials';
	var tokenUrl = config.apiGatewayUri + '/manager/tokens';
	var oauthUrl = config.apiGatewayUri + '/oauth/token';
	var meUrl = config.apiGatewayUri + '/manager/me';
	var logoutUrl = config.apiGatewayUri + '/manager/logout?accessToken={accessToken}&refreshToken={refreshToken}?language={language}';

	function changePassword(user, successCallback, errorCallback) {
	  _axios2.default.put(credentialsUrl, user).then(successCallback).catch(errorCallback);
	}

	function revokeToken(token, successCallback, errorCallback) {
	  var url = tokenUrl + '?accessToken=' + token;
	  _axios2.default.delete(url).then(successCallback).catch(errorCallback);
	}

	function loadTokens(options, successCallback, errorCallback) {
	  _axios2.default.get(tokenUrl).then(successCallback).catch(errorCallback);
	}

	function accessToken(body, headers, successCallback, errorCallback) {
	  _axios2.default.post(oauthUrl, body, headers).then(successCallback).catch(errorCallback);
	}

	function getMe(successCallback, errorCallback) {
	  _axios2.default.get(meUrl).then(successCallback).catch(errorCallback);
	}

	function openGatewayLogin(clientId) {
	  var url = '/oauth/authorise?client_id={client_id}&redirect_uri={redirect_uri}&language={language}';
	  if (config.apiGatewayUri === undefined || config.apiGatewayUri === null || config.apiGatewayUri === '' || config.apiGatewayUri === ' ') {
	    url = 'http://localhost:3000' + url;
	  } else {
	    url = config.apiGatewayUri + url;
	  }
	  url = url.replace('{client_id}', clientId).replace('{redirect_uri}', config.frontendAddress + '/token').replace('{language}', languageService.getCurrentLanguage());
	  window.location.href = url;
	}

	function logout(accessToken, refreshToken, successCallback, errorCallback) {
	  _axios2.default.delete(logoutUrl).then(successCallback).catch(errorCallback);
	}

	exports.default = {
	  changePassword: changePassword,
	  revokeToken: revokeToken,
	  loadTokens: loadTokens,
	  accessToken: accessToken,
	  getMe: getMe,
	  openGatewayLogin: openGatewayLogin,
	  logout: logout
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	function makeUrl(url, options, callback) {
	  url += '?';

	  if (options) {
	    if (options.page) {
	      url += '&_page=' + options.page;
	    }
	    if (options.limit) {
	      url += '&_limit=' + options.limit;
	    }
	    if (options.search) {
	      url += '&_search=' + options.search;
	    }
	    if (options.redirectUri) {
	      url += '&_redirectUri=' + options.redirectUri;
	    }
	    if (options.code) {
	      url += '&_code=' + options.code;
	    }
	  }

	  callback(url);
	}

	module.exports = {
	  makeUrl: makeUrl
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var httpTransformation = __webpack_require__(12);


	var necessityUrl = config.apiGatewayUri + '/necessities';

	function loadNecessities(options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(necessityUrl, options, function (url) {
	    _axios2.default.get(url).then(successCallback).catch(errorCallback);
	  });
	}

	function loadProduct(productId, successCallback, errorCallback) {
	  _axios2.default.get(necessityUrl + '/' + productId).then(successCallback).catch(errorCallback);
	}

	function insertNecessity(necessity, successCallback, errorCallback) {
	  _axios2.default.post(necessityUrl, necessity).then(successCallback).catch(errorCallback);
	}

	function updateNecessity(necessityId, necessity, successCallback, errorCallback) {
	  _axios2.default.put(necessityUrl + '/' + necessityId, necessity).then(successCallback).catch(errorCallback);
	}

	function removeNecesity(necessityId, successCallback, errorCallback) {
	  _axios2.default.delete(necessityUrl + '/' + necessityId).then(successCallback).catch(errorCallback);
	}

	function insertNecessityItem(necessityId, body, successCallback, errorCallback) {
	  var url = necessityUrl + '/' + necessityId + '/items';
	  _axios2.default.post(url, body).then(successCallback).catch(errorCallback);
	}

	function removeNecessityItem(necessityId, itemId, successCallback, errorCallback) {
	  var url = necessityUrl + '/' + necessityId + '/items/' + itemId;
	  _axios2.default.delete(url).then(successCallback).catch(errorCallback);
	}

	function loadNecessityItems(necessityId, options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(necessityUrl + '/' + necessityId + '/items', options, function (url) {
	    _axios2.default.get(url).then(successCallback).catch(errorCallback);
	  });
	}

	function materialExplosion(necessityId, successCallback, errorCallback) {
	  _axios2.default.post(necessityUrl + '/' + necessityId + '/materials').then(successCallback).catch(errorCallback);
	}

	exports.default = {
	  insertNecessity: insertNecessity,
	  updateNecessity: updateNecessity,
	  removeNecesity: removeNecesity,
	  loadProduct: loadProduct,
	  loadNecessities: loadNecessities,
	  insertNecessityItem: insertNecessityItem,
	  removeNecessityItem: removeNecessityItem,
	  loadNecessityItems: loadNecessityItems,
	  materialExplosion: materialExplosion
	};

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(217)

	/* script */
	__vue_exports__ = __webpack_require__(190)

	/* template */
	var __vue_template__ = __webpack_require__(275)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

	'use strict';

	function apply(json, map, callback) {
	  var jsonObject = JSON.parse(clearJson(map, JSON.stringify(json)));
	  console.log(jsonObject);
	  callback(jsonObject);
	}

	var clearJson = function clearJson(v, response) {
	  for (var k in v) {
	    response = response.replace(new RegExp('"' + k + '"', 'g'), '"' + v[k] + '"');
	  }
	  return response;
	};

	var frontendNameToBackendName = function frontendNameToBackendName(query, translateFn, columns, callback) {
	  var resObject = "";
	  if (query === undefined || query === null || query === '') {
	    return callback(resObject);
	  }

	  var pipes = query.split(',');
	  for (var i = 0; i < pipes.length; i++) {
	    var param = pipes[0].split(':');
	    for (var j = 0; j < columns.length; j++) {
	      if (translateFn(columns[j].name).toLowerCase() === param[0].toLowerCase()) {
	        resObject += columns[j].key + ':' + param[1];
	      }
	    }
	  }
	  return callback(resObject);
	};

	module.exports = {
	  apply: apply,
	  frontendNameToBackendName: frontendNameToBackendName
	};

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var httpTransformation = __webpack_require__(12);


	var productUrl = config.apiGatewayUri + '/products';

	function loadProducts(options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(productUrl, options, function (url) {
	    _axios2.default.get(url).then(successCallback).catch(errorCallback);
	  });
	}

	function loadProduct(productId, successCallback, errorCallback) {
	  _axios2.default.get(productUrl + '/' + productId).then(successCallback).catch(errorCallback);
	}

	function insertProduct(product, successCallback, errorCallback) {
	  _axios2.default.post(productUrl, product).then(successCallback).catch(errorCallback);
	}

	function updateProduct(productId, product, successCallback, errorCallback) {
	  _axios2.default.put(productUrl + '/' + productId, product).then(successCallback).catch(errorCallback);
	}

	function removeProduct(product, successCallback, errorCallback) {
	  _axios2.default.delete(productUrl + '/' + product._id).then(successCallback).catch(errorCallback);
	}

	function getChildreen(productId, successCallback, errorCallback) {
	  var url = productUrl + '/' + productId + '/children';
	  _axios2.default.get(url).then(successCallback).catch(errorCallback);
	}

	function insertChildreen(parentId, childreenId, body, successCallback, errorCallback) {
	  console.log(body);
	  var url = productUrl + '/' + parentId + '/children/' + childreenId;
	  _axios2.default.put(url, body).then(successCallback).catch(errorCallback);
	}

	function removeChildreen(parentId, childreenId, successCallback, errorCallback) {
	  var url = productUrl + '/' + parentId + '/children/' + childreenId;
	  _axios2.default.delete(url).then(successCallback).catch(errorCallback);
	}

	exports.default = {
	  getChildreen: getChildreen,
	  insertProduct: insertProduct,
	  updateProduct: updateProduct,
	  removeProduct: removeProduct,
	  loadProduct: loadProduct,
	  loadProducts: loadProducts,
	  insertChildreen: insertChildreen,
	  removeChildreen: removeChildreen
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function formatDate(date) {
	  var day = date.getDate();
	  var month = date.getMonth();
	  var year = date.getFullYear();

	  return day + '/' + month + '/' + year;
	}

	exports.default = {
	  formatDate: formatDate
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(218)

	/* script */
	__vue_exports__ = __webpack_require__(188)

	/* template */
	var __vue_template__ = __webpack_require__(276)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(216)

	/* script */
	__vue_exports__ = __webpack_require__(189)

	/* template */
	var __vue_template__ = __webpack_require__(274)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var httpTransformation = __webpack_require__(12);


	var materialsURL = config.apiGatewayUri + '/materials';

	function loadMaterials(location, options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(config.apiGatewayUri + location, options, function (url) {
	    (0, _axios2.default)({
	      url: url,
	      method: 'GET',
	      responseType: 'blob' // important
	    }).then(function (response) {
	      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
	      var link = document.createElement('a');
	      link.href = fileURL;
	      link.setAttribute('download', 'necessidade.xlsx');
	      document.body.appendChild(link);
	      link.click();
	    });
	  });
	}

	exports.default = {
	  loadMaterials: loadMaterials
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(16);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(301);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _vuexPersistedstate = __webpack_require__(299);

	var _vuexPersistedstate2 = _interopRequireDefault(_vuexPersistedstate);

	var _auth = __webpack_require__(206);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// store.js
	_vue2.default.use(_vuex2.default);
	// import * as Cookies from 'js-cookie'

	// importo o state e mutations
	exports.default = new _vuex2.default.Store({
	  modules: {
	    auth: _auth2.default
	  },
	  plugins: [(0, _vuexPersistedstate2.default)({ storage: window.localStorage })]
	});

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(212)

	/* script */
	__vue_exports__ = __webpack_require__(187)

	/* template */
	var __vue_template__ = __webpack_require__(269)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _accountingJs = __webpack_require__(153);

	var _accountingJs2 = _interopRequireDefault(_accountingJs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'vue-numeric',

	  props: {
	    /**
	     * Currency symbol.
	     */
	    currency: {
	      default: '',
	      required: false,
	      type: String
	    },

	    /**
	     * Maximum value allowed.
	     */
	    max: {
	      required: false,
	      type: [Number, String]
	    },

	    /**
	     * Minimum value allowed.
	     */
	    min: {
	      default: 0,
	      required: false,
	      type: [Number, String]
	    },

	    /**
	     * Enable/Disable minus value.
	     */
	    minus: {
	      default: false,
	      required: false,
	      type: Boolean
	    },

	    /**
	     * Input placeholder.
	     */
	    placeholder: {
	      required: false,
	      type: String
	    },

	    /**
	     * Number of decimals.
	     * Decimals symbol are the opposite of separator symbol.
	     */
	    precision: {
	      required: false,
	      type: [Number, String]
	    },

	    /**
	     * Thousand separator type.
	     * Separator props accept either . or , (default).
	     */
	    separator: {
	      default: ',',
	      required: false,
	      type: String
	    },

	    /**
	     * v-model value.
	     */
	    value: {
	      required: true,
	      type: [Number, String]
	    },

	    /**
	     * Hide input and show value in text only.
	     */
	    readOnly: {
	      default: false,
	      required: false,
	      type: Boolean
	    },

	    /**
	     * Class for the span tag when readOnly props is true.
	     */
	    readOnlyClass: {
	      default: '',
	      required: false,
	      type: String
	    },

	    /**
	     * Position of currency symbol
	     * Symbol position props accept either 'suffix' or 'prefix' (default).
	     */
	    currencySymbolPosition: {
	      default: 'prefix',
	      required: false,
	      type: String
	    }
	  },

	  data: function data() {
	    return {
	      amount: ''
	    };
	  },

	  computed: {
	    /**
	     * Number formatted user typed value.
	     * @return {Number}
	     */
	    amountValue: function amountValue() {
	      return this.formatToNumber(this.amount);
	    },


	    /**
	     * Number type from value props.
	     * @return {Number}
	     */
	    numberValue: function numberValue() {
	      return this.formatToNumber(this.value);
	    },


	    /**
	     * Number formatted minimum value.
	     * @return {Number}
	     */
	    minValue: function minValue() {
	      if (this.min) return this.formatToNumber(this.min);
	      return 0;
	    },


	    /**
	     * Number formatted maximum value.
	     * @return {Number|undefined}
	     */
	    maxValue: function maxValue() {
	      if (this.max) return this.formatToNumber(this.max);
	      return undefined;
	    },


	    /**
	     * Define decimal separator based on separator props.
	     * @return {String} '.' or ','
	     */
	    decimalSeparator: function decimalSeparator() {
	      if (this.separator === '.') return ',';
	      return '.';
	    },


	    /**
	     * Define thousand separator based on separator props.
	     * @return {String} '.' or ','
	     */
	    thousandSeparator: function thousandSeparator() {
	      if (this.separator === '.') return '.';
	      return ',';
	    },


	    /**
	     * Define format for currency symbol and value.
	     * @return {String} format
	     */
	    formatString: function formatString() {
	      return this.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v';
	    }
	  },

	  methods: {
	    /**
	     * Check provided value againts maximum allowed.
	     * @param {Number} value
	     * @return {Boolean}
	     */
	    checkMaxValue: function checkMaxValue(value) {
	      if (this.max) {
	        if (value <= this.maxValue) return false;
	        return true;
	      }
	      return false;
	    },


	    /**
	     * Check provided value againts minimum allowed.
	     * @param {Number} value
	     * @return {Boolean}
	     */
	    checkMinValue: function checkMinValue(value) {
	      if (this.min) {
	        if (value >= this.minValue) return false;
	        return true;
	      }
	      return false;
	    },


	    /**
	     * Format provided value to number type.
	     * @param {String} value
	     * @return {Number}
	     */
	    formatToNumber: function formatToNumber(value) {
	      var number = 0;

	      if (this.separator === '.') {
	        var cleanValue = value;
	        if (typeof value !== 'string') {
	          cleanValue = this.numberToString(value);
	        }
	        number = Number(String(cleanValue).replace(/[^0-9-,]+/g, '').replace(',', '.'));
	      } else {
	        number = Number(String(value).replace(/[^0-9-.]+/g, ''));
	      }

	      if (!this.minus) return Math.abs(number);
	      return number;
	    },


	    /**
	     * Validate value before apply to the component.
	     * @param {Number} value
	     */
	    processValue: function processValue(value) {
	      if (isNaN(value)) {
	        this.updateValue(this.minValue);
	      } else if (this.checkMaxValue(value)) {
	        this.updateValue(this.maxValue);
	      } else if (this.checkMinValue(value)) {
	        this.updateValue(this.minValue);
	      } else {
	        this.updateValue(value);
	      }
	    },


	    /**
	     * Format value using symbol and separator.
	     */
	    formatValue: function formatValue() {
	      this.amount = _accountingJs2.default.formatMoney(this.numberValue, {
	        symbol: this.currency,
	        format: this.formatString,
	        precision: Number(this.precision),
	        decimal: this.decimalSeparator,
	        thousand: this.thousandSeparator
	      });
	    },


	    /**
	     * Update parent component model value.
	     * @param {Number} value
	     */
	    updateValue: function updateValue(value) {
	      this.$emit('input', Number(_accountingJs2.default.toFixed(value, this.precision)));
	    },


	    /**
	     * Remove symbol and separator.
	     * @param {Number} value
	     */
	    numberToString: function numberToString(value) {
	      return _accountingJs2.default.formatMoney(value, {
	        symbol: '',
	        precision: Number(this.precision),
	        decimal: this.decimalSeparator,
	        thousand: ''
	      });
	    },


	    /**
	     * Remove symbol and separator.
	     * @param {Number} value
	     */
	    convertToNumber: function convertToNumber(value) {
	      this.amount = this.numberToString(value);
	    }
	  },

	  watch: {
	    /**
	     * Watch for value change from other input.
	     *
	     * @param {Number} val
	     * @param {Number} oldVal
	     */
	    numberValue: function numberValue(val, oldVal) {
	      if (this.amountValue !== val && this.amountValue === oldVal) {
	        this.convertToNumber(val);
	        if (this.$refs.numeric !== document.activeElement) {
	          this.formatValue(val);
	        }
	      }
	    },


	    /**
	     * When readOnly is true, replace the span tag class.
	     *
	     * @param {Boolean} val
	     * @param {Boolean} oldVal
	     */
	    readOnly: function readOnly(val, oldVal) {
	      var _this = this;

	      if (oldVal === false && val === true) {
	        this.$nextTick(function () {
	          _this.$refs.readOnly.className = _this.readOnlyClass;
	        });
	      }
	    }
	  },

	  mounted: function mounted() {
	    var _this2 = this;

	    // Check default value from parent v-model.
	    if (this.value) {
	      this.processValue(this.formatToNumber(this.value));
	      this.formatValue(this.value);
	    }

	    // Set read-only span element's class
	    if (this.readOnly) {
	      this.$refs.readOnly.className = this.readOnlyClass;
	    }

	    // In case of delayed v-model new value.
	    setTimeout(function () {
	      _this2.processValue(_this2.formatToNumber(_this2.value));
	      _this2.formatValue(_this2.value);
	    }, 500);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(208);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'switches',

	    props: {
	        typeBold: {
	            default: false
	        },

	        value: {
	            default: false
	        },

	        disabled: {
	            default: false
	        },

	        label: {
	            default: ''
	        },

	        textEnabled: {
	            default: ''
	        },

	        textDisabled: {
	            default: ''
	        },

	        color: {
	            default: 'default'
	        },

	        theme: {
	            default: 'default'
	        },

	        emitOnMount: {
	            default: true
	        }
	    },

	    mounted: function mounted() {
	        if (this.emitOnMount) {
	            this.$emit('input', this.value);
	        }
	    },


	    methods: {
	        trigger: function trigger(e) {
	            this.$emit('input', e.target.checked);
	        }
	    },

	    computed: {
	        classObject: function classObject() {
	            var _ref;

	            var color = this.color,
	                value = this.value,
	                theme = this.theme,
	                typeBold = this.typeBold,
	                disabled = this.disabled;


	            return _ref = {
	                'vue-switcher': true
	            }, (0, _defineProperty3.default)(_ref, 'vue-switcher--unchecked', !value), (0, _defineProperty3.default)(_ref, 'vue-switcher--disabled', disabled), (0, _defineProperty3.default)(_ref, 'vue-switcher--bold', typeBold), (0, _defineProperty3.default)(_ref, 'vue-switcher--bold--unchecked', typeBold && !value), (0, _defineProperty3.default)(_ref, 'vue-switcher-theme--' + theme, color), (0, _defineProperty3.default)(_ref, 'vue-switcher-color--' + color, color), _ref;
	        },
	        shouldShowLabel: function shouldShowLabel() {
	            return this.label !== '' || this.textEnabled !== '' || this.textDisabled !== '';
	        }
	    }
	};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'unauthorized',
	  methods: {
	    openGatewayLogin: function openGatewayLogin() {
	      _securityBackend2.default.openGatewayLogin(_authService2.default.getClientId());
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'error',
	  methods: {
	    backToHome: function backToHome() {
	      window.location.href = '/';
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'NotFound',
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'error',
	  methods: {
	    backToHome: function backToHome() {
	      window.location.href = '/';
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//

	var qs = __webpack_require__(148);

	exports.default = {
	  name: 'AccessToken',
	  methods: {
	    getToken: function getToken() {
	      var _self = this;
	      var data = {
	        'grant_type': 'authorization_code',
	        'code': this.$route.query.code
	      };
	      _securityBackend2.default.accessToken(qs.stringify(data), {
	        auth: {
	          username: _authService2.default.getClientId(),
	          password: _authService2.default.getClientSecret()
	        },
	        headers: {
	          'content-type': 'application/x-www-form-urlencoded'
	        }
	      }, function (res) {
	        console.log(res.data);
	        _authService2.default.setAccessToken(res.data.access_token);
	        _authService2.default.setRefreshToken(res.data.refresh_token);
	        _authService2.default.setSessionId();
	        _self.$router.replace('/');
	      }, function (error) {
	        if (error) {
	          console.log(JSON.stringify(error));
	          _authService2.default.setAccessToken('');
	          _authService2.default.setRefreshToken('');
	          window.location.href = '/error';
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.getToken();
	  }
	};

/***/ }),
/* 181 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'App',
	  data: function data() {
	    return {
	      section: 'Head'
	    };
	  },

	  methods: {}
	};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  data: function data() {
	    return {
	      response: {}
	    };
	  },

	  methods: {
	    savePassword: function savePassword(user) {
	      var _this = this;

	      var _self = this;
	      user.username = _authService2.default.getUser().username;
	      _securityBackend2.default.changePassword(user, function (response) {
	        _messageService2.default.successMessage(_self, _this.t('pages.messages.credentials.passwordChanged'));
	      }, function (error) {
	        if (error.response.data) {
	          _messageService2.default.errorMessage(_self, error.response.data.message);
	        } else {
	          _messageService2.default.errorMessage(_self, error.message);
	        }
	      });
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	var _Sidebar = __webpack_require__(257);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	__webpack_require__(234);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Dash',
	  components: {
	    Sidebar: _Sidebar2.default
	  },
	  data: function data() {
	    return {
	      // section: 'Dash',
	      year: new Date().getFullYear(),
	      classes: {
	        fixed_layout: _config2.default.fixedLayout,
	        hide_logo: _config2.default.hideLogoOnMobile
	      },
	      error: '',
	      user: {}
	    };
	  },
	  methods: {
	    changeloading: function changeloading() {
	      this.$store.commit('TOGGLE_SEARCHING');
	    },
	    getUser: function getUser() {
	      var _self = this;
	      if (_authService2.default.getUser() === undefined) {
	        _securityBackend2.default.getMe(function (response) {
	          _self.user = response.data;
	          _authService2.default.setUser(response.data);
	        }, function (error) {
	          if (error) {
	            _self.$router.replace('error');
	          }
	        });
	      } else {
	        _self.user = _authService2.default.getUser();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.getUser();
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _authService = __webpack_require__(8);

	var _authService2 = _interopRequireDefault(_authService);

	var _securityBackend = __webpack_require__(11);

	var _securityBackend2 = _interopRequireDefault(_securityBackend);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'logout',
	  methods: {
	    openGatewayLogin: function openGatewayLogin() {
	      _securityBackend2.default.openGatewayLogin(_authService2.default.getClientId(), _authService2.default.getRedirectURI());
	    },
	    logout: function logout() {
	      var _self = this;
	      _securityBackend2.default.logout(_authService2.default.getAccessToken(), _authService2.default.getRefreshToken(), function (response) {
	        _authService2.default.setUser(undefined);
	        _authService2.default.setAccessToken(undefined);
	        _authService2.default.setRefreshToken(undefined);
	      }, function (error) {
	        if (error) {
	          _self.$router.replace('/error');
	        }
	      });
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	    this.logout();
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _SidebarMenu = __webpack_require__(258);

	var _SidebarMenu2 = _interopRequireDefault(_SidebarMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Sidebar',
	  props: ['displayName', 'pictureUrl'],
	  components: { SidebarMenu: _SidebarMenu2.default }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'SidebarName',
	  methods: {
	    toggleMenu: function toggleMenu(event) {
	      // remove active from li
	      var active = document.querySelector('li.pageLink.active');

	      if (active) {
	        active.classList.remove('active');
	      }
	      // window.$('li.pageLink.active').removeClass('active')
	      // Add it to the item that was clicked
	      event.toElement.parentElement.className = 'pageLink active';
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vueDatasource = __webpack_require__(18);

	var _vueDatasource2 = _interopRequireDefault(_vueDatasource);

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _eventHelper = __webpack_require__(6);

	var _bodyTransformation = __webpack_require__(17);

	var _bodyTransformation2 = _interopRequireDefault(_bodyTransformation);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import formatDateUtil from '../../utils/formatDate'

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  components: {
	    Datasource: _vueDatasource2.default
	  },
	  props: ['buttons', 'selectMethodCallback', 'backend', 'columns'],
	  watch: {
	    products: function products(val) {
	      this.products = val;
	      this.loadItems(null, this.pagination);
	    }
	  },
	  data: function data() {
	    return {
	      isProductList: true,
	      treeviewData: {},
	      response: [],
	      pagination: {
	        limits: [15, 20],
	        total: 25,
	        per_page: 15,
	        last_page: 1,
	        current_page: 1,
	        from: 1,
	        to: 1
	      },
	      roles: undefined,
	      actions: []
	    };
	  },

	  methods: {
	    changePage: function changePage(values) {
	      this.pagination.current_page = values.page;
	      this.pagination.perpage = values.perpage;
	      this.loadItems(null, this.pagination);
	    },
	    onSearch: function onSearch(searchQuery) {
	      var _this = this;

	      this.pagination.current_page = 1;
	      _bodyTransformation2.default.frontendNameToBackendName(searchQuery, this.t, this.columns, function (query) {
	        _this.loadItems(query, _this.pagination);
	      });
	    },
	    reload: function reload() {
	      this.loadItems(null, this.pagination);
	    },
	    editItem: function editItem(item) {
	      _eventHelper.eventHelper.emit('itemDetails', item);
	    },
	    removeItem: function removeItem(item) {
	      var _this2 = this;

	      var _self = this;
	      this.backend.remove(item, function (response) {
	        _self.reload();
	        _messageService2.default.successMessage(_self, _this2.t('pages.messages.basicCRUD.removed'));
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error);
	      });
	    },
	    loadItems: function loadItems(search, pagination) {
	      var _self = this;
	      var options = {};

	      if (pagination.perpage) {
	        options.limit = pagination.perpage;
	      }
	      if (pagination.current_page) {
	        options.page = pagination.current_page;
	      }
	      if (search) {
	        options.search = search;
	      }

	      this.backend.load(options, function (response) {
	        _self.pagination.current_page = response.data.page;
	        _self.pagination.last_page = response.data.pages;
	        _self.pagination.perpage = response.data.limit;
	        _self.pagination.total = response.data.total;
	        _self.response = response.data.docs;
	        console.log(response.data);
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error.message);
	      });
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;

	    _languageService2.default.loadLanguage(this);
	    var _self = this;

	    console.log(this.backend);

	    this.buttons.forEach(function (button) {
	      if (button === 'insertTree') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.insertTree'), // Button label
	          icon: 'fa fa-plus', // Button icon
	          class: 'btn-success btn-md', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            _eventHelper.eventHelper.emit('insertProductInTree', row.row);
	          }
	        });
	      }

	      if (button === 'edit') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.select'), // Button label
	          icon: 'fa fa-check', // Button icon
	          class: 'btn-md btn-success', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            if (_self.selectMethodCallback === undefined) {
	              _self.editItem(row.row);
	            } else {
	              _self.selectMethodCallback(row.row);
	            }
	          }
	        });
	      }

	      if (button === 'reload') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.reload'), // Button label
	          icon: 'fa fa-refresh', // Button icon
	          class: 'btn-primary btn-md', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            _self.reload();
	          }
	        });
	      }

	      if (button === 'remove') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.remove'), // Button label
	          icon: 'fa fa-times', // Button icon
	          class: 'btn-md btn-danger', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            var r = window.confirm(_self.t('pages.messages.basicCRUD.remove.confirmation'));
	            if (r === true) {
	              _self.removeItem(row.row);
	            }
	          }
	        });
	      }

	      if (button === 'showTree') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.showTree'), // Button label
	          icon: 'fa fa-share', // Button icon
	          class: 'btn-md btn-info', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            window.location = '/products/' + row.row._id + '/structure';
	          }
	        });
	      }

	      if (button === 'previewTree') {
	        _this3.actions.push({
	          text: _this3.t('pages.messages.basicCRUD.previewTree'), // Button label
	          icon: 'fa fa-eye', // Button icon
	          class: 'btn-md btn-warning', // Button class (background color)
	          event: function event(e, row) {
	            // Event handler callback. Gets event instace and selected row
	            _self.previewProductTree(row.row);
	          }
	        });
	      }

	      if (button instanceof Object) {
	        _this3.actions.push(button);
	      }
	    });

	    this.columnsNames = [];
	    for (var i = 0; i < this.columns.length; i++) {
	      this.columnsNames[i] = {};
	      this.columnsNames[i].name = this.t(this.columns[i].name);
	      this.columnsNames[i].key = this.columns[i].key;
	      this.columnsNames[i].render = this.columns[i].render;
	    }

	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('reloadItemList', function () {
	      _self.reload();
	    });
	    _rolesService2.default.loadUserRoles(this);
	    this.loadItems(null, this.pagination);
	  }
	};

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vueDatasource = __webpack_require__(18);

	var _vueDatasource2 = _interopRequireDefault(_vueDatasource);

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _necessityBackend = __webpack_require__(13);

	var _necessityBackend2 = _interopRequireDefault(_necessityBackend);

	var _bodyTransformation = __webpack_require__(17);

	var _bodyTransformation2 = _interopRequireDefault(_bodyTransformation);

	var _formatDate = __webpack_require__(22);

	var _formatDate2 = _interopRequireDefault(_formatDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  props: ['necessityId'],
	  components: {
	    Datasource: _vueDatasource2.default,
	    VueNumeric: _vueNumeric2.default
	  },
	  watch: {
	    necessityId: function necessityId(val) {
	      console.log('a');
	      if (val !== undefined) {
	        console.log('a');
	        this.necessityId = val;
	        this.loadnecessityItems(undefined, this.pagination, val);
	      }
	    }
	  },
	  data: function data() {
	    return {
	      isProductList: true,
	      treeviewData: {},
	      response: [],
	      pagination: {
	        limits: [15, 20],
	        total: 25,
	        per_page: 15,
	        last_page: 1,
	        current_page: 1,
	        from: 1,
	        to: 1
	      },
	      roles: undefined,
	      actions: [],
	      columns: [{
	        name: 'pages.messages.showNecessity.fields.name',
	        key: 'product.name'
	      }, {
	        name: 'pages.messages.necessityItem.fields.quantity',
	        key: 'quantity'
	      }, {
	        name: 'pages.messages.necessityItem.fields.deadline',
	        key: 'deadline',
	        render: function render(value) {
	          var date = new Date(value);
	          return _formatDate2.default.formatDate(date);
	        }
	      }]
	    };
	  },

	  methods: {
	    changePage: function changePage(values) {
	      this.pagination.current_page = values.page;
	      this.pagination.perpage = values.perpage;
	      this.loadnecessityItems(undefined, this.pagination, this.necessityId);
	    },
	    onSearch: function onSearch(searchQuery) {
	      var _this = this;

	      _bodyTransformation2.default.frontendNameToBackendName(searchQuery, this.t, this.columns, function (query) {
	        console.log(query);
	        _this.pagination.current_page = 1;
	        _this.loadnecessityItems(query, _this.pagination, _this.necessityId);
	      });
	    },
	    reload: function reload() {
	      this.loadnecessityItems(undefined, this.pagination, this.necessityId);
	    },
	    loadnecessityItems: function loadnecessityItems(search, pagination, id) {
	      var options = {};
	      var _self = this;

	      if (id === undefined) {
	        return;
	      }

	      if (pagination.perpage) {
	        options.limit = pagination.perpage;
	      }
	      if (pagination.current_page) {
	        options.page = pagination.current_page;
	      }
	      if (search) {
	        options.search = search;
	      }

	      _necessityBackend2.default.loadNecessityItems(id, options, function (response) {
	        _self.pagination.current_page = response.data.page;
	        _self.pagination.last_page = response.data.pages;
	        _self.pagination.perpage = response.data.limit;
	        _self.pagination.total = response.data.total;
	        _self.response = response.data.docs;
	        console.log(_self.response);
	      }, function (error) {
	        console.log(error);
	        _messageService2.default.errorMessage(_self, error.message);
	      });
	    },
	    removeItem: function removeItem(item) {
	      var _this2 = this;

	      _necessityBackend2.default.removeNecessityItem(this.necessityId, item._id, function (response) {
	        _this2.loadnecessityItems(undefined, _this2.pagination, _this2.necessityId);
	        _messageService2.default.successMessage(_this2, _this2.t('pages.messages.necessityItem.removed'));
	      }, function (error) {
	        _messageService2.default.errorMessage(_this2, error);
	      });
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _self.loadnecessityItems(undefined, _self.pagination, _self.necessityId);
	    _rolesService2.default.loadUserRoles(this);
	    _languageService2.default.loadLanguage(this);
	    for (var i = 0; i < this.columns.length; i++) {
	      this.columns[i].name = this.t(this.columns[i].name);
	    }
	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('add_necessity_item', function (necessityData) {
	      _necessityBackend2.default.insertNecessityItem(_self.necessityId, necessityData, function (response) {
	        _self.loadnecessityItems(undefined, _self.pagination, _self.necessityId);
	        _messageService2.default.successMessage(_self, _self.t('pages.messages.necessityItem.inserted'));
	      }, function (error) {
	        console.log(error);
	        _messageService2.default.errorMessage(_self, error);
	      });
	    });

	    this.actions.push({
	      text: this.t('pages.messages.necessityItem.removeButton'), // Button label
	      icon: 'fa fa-remove', // Button icon
	      class: 'btn-md btn-danger', // Button class (background color)
	      event: function event(e, row) {
	        // Event handler callback. Gets event instace and selected row
	        _self.removeItem(row.row);
	      }
	    });
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vueDatasource = __webpack_require__(18);

	var _vueDatasource2 = _interopRequireDefault(_vueDatasource);

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _eventHelper = __webpack_require__(6);

	var _necessityBackend = __webpack_require__(13);

	var _necessityBackend2 = _interopRequireDefault(_necessityBackend);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _bodyTransformation = __webpack_require__(17);

	var _bodyTransformation2 = _interopRequireDefault(_bodyTransformation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  props: ['selectButton', 'removeButton', 'explosionButton', 'selectMethodCallback', 'explosionMethodCallback'],
	  components: {
	    Datasource: _vueDatasource2.default,
	    VueNumeric: _vueNumeric2.default
	  },
	  data: function data() {
	    return {
	      isProductList: true,
	      treeviewData: {},
	      response: [],
	      pagination: {
	        limits: [15, 20],
	        total: 25,
	        per_page: 15,
	        last_page: 1,
	        current_page: 1,
	        from: 1,
	        to: 1
	      },
	      roles: undefined,
	      actions: [],
	      columns: [{
	        name: 'pages.messages.showNecessity.fields.name',
	        key: 'name'
	      }, {
	        name: 'pages.messages.showNecessity.fields.description',
	        key: 'description'
	      }]
	    };
	  },

	  methods: {
	    changePage: function changePage(values) {
	      this.pagination.current_page = values.page;
	      this.pagination.perpage = values.perpage;
	      this.loadNecessities(null, this.pagination);
	    },
	    onSearch: function onSearch(searchQuery) {
	      var _this = this;

	      _bodyTransformation2.default.frontendNameToBackendName(searchQuery, this.t, this.columns, function (query) {
	        _this.pagination.current_page = 1;
	        _this.loadNecessities(query, _this.pagination);
	      });
	    },
	    reload: function reload() {
	      this.loadNecessities(null, this.pagination);
	    },
	    removeNecesity: function removeNecesity(necessity) {
	      var _this2 = this;

	      var confirmation = window.confirm(this.t('pages.messages.necessity.action.remove'));
	      if (confirmation) {
	        _necessityBackend2.default.removeNecesity(necessity._id, function () {
	          _messageService2.default.successMessage(_this2, 'pages.messages.necessity.removed');
	        }, function (error) {
	          _messageService2.default.errorMessage(_this2, error.message);
	        });
	      }
	    },
	    loadNecessities: function loadNecessities(search, pagination) {
	      var _self = this;
	      var options = {};

	      if (pagination.perpage) {
	        options.limit = pagination.perpage;
	      }
	      if (pagination.current_page) {
	        options.page = pagination.current_page;
	      }
	      if (search) {
	        options.search = search;
	      }

	      _necessityBackend2.default.loadNecessities(options, function (response) {
	        _self.pagination.current_page = response.data.page;
	        _self.pagination.last_page = response.data.pages;
	        _self.pagination.perpage = response.data.limit;
	        _self.pagination.total = response.data.total;
	        _self.response = response.data.docs;
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error.message);
	      });
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _languageService2.default.loadLanguage(_self);
	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('reloadNecessityList', function () {
	      _self.reload();
	    });

	    for (var i = 0; i < this.columns.length; i++) {
	      this.columns[i].name = this.t(this.columns[i].name);
	    }

	    if (this.selectButton === undefined || this.selectButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showNecessity.selectNecessity'), // Button label
	        icon: 'fa fa-check', // Button icon
	        class: 'btn-md btn-success', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _self.selectMethodCallback(row.row);
	        }
	      });
	    }

	    if (this.removeButton === undefined || this.removeButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.necessity.removeButton'), // Button label
	        icon: 'fa fa-remove', // Button icon
	        class: 'btn-md btn-danger', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _self.removeNecesity(row.row);
	        }
	      });
	    }

	    if (this.explosionButton === undefined || this.explosionButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.necessity.explosionButton'), // Button label
	        icon: 'fa fa-sitemap', // Button icon
	        class: 'btn-md btn-success', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _self.explosionMethodCallback(row.row);
	        }
	      });
	    }

	    _rolesService2.default.loadUserRoles(this);
	    this.loadNecessities(null, this.pagination);
	  }
	};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vueDatasource = __webpack_require__(18);

	var _vueDatasource2 = _interopRequireDefault(_vueDatasource);

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _eventHelper = __webpack_require__(6);

	var _productBackend = __webpack_require__(21);

	var _productBackend2 = _interopRequireDefault(_productBackend);

	var _necessityBackend = __webpack_require__(13);

	var _necessityBackend2 = _interopRequireDefault(_necessityBackend);

	var _materialsBackend = __webpack_require__(30);

	var _materialsBackend2 = _interopRequireDefault(_materialsBackend);

	var _bodyTransformation = __webpack_require__(17);

	var _bodyTransformation2 = _interopRequireDefault(_bodyTransformation);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  components: {
	    Datasource: _vueDatasource2.default
	  },
	  props: ['products', 'necessityId', 'removeButton', 'reloadButton', 'selectButton', 'showTreeButton', 'insertTreeButton', 'previewTreeButton', 'selectMethodCallback'],
	  watch: {
	    products: function products(val) {
	      this.products = val;
	      this.loadProducts(null, this.pagination);
	    }
	  },
	  data: function data() {
	    return {
	      isProductList: true,
	      treeviewData: {},
	      response: [],
	      pagination: {
	        limits: [10, 15, 20],
	        total: 25,
	        per_page: 10,
	        last_page: 1,
	        current_page: 1,
	        from: 1,
	        to: 1
	      },
	      roles: undefined,
	      actions: [],
	      columns: [{
	        name: 'pages.messages.showProducts.fields.code',
	        key: 'code'
	      }, {
	        name: 'pages.messages.showProducts.fields.name',
	        key: 'name'
	      }, {
	        name: 'pages.messages.showProducts.fields.family',
	        key: 'family'
	      }, {
	        name: 'pages.messages.showProducts.fields.productType',
	        key: 'productType'
	      }, {
	        name: 'pages.messages.showProducts.fields.quantityNecessity',
	        key: 'quantity'
	      }]
	    };
	  },

	  methods: {
	    changePage: function changePage(values) {
	      this.pagination.current_page = values.page;
	      this.pagination.perpage = values.perpage;
	      this.loadProducts(null, this.pagination);
	    },
	    onSearch: function onSearch(searchQuery) {
	      var _this = this;

	      this.pagination.current_page = 1;
	      _bodyTransformation2.default.frontendNameToBackendName(searchQuery, this.t, this.columns, function (query) {
	        console.log(query);
	        _this.loadProducts(query, _this.pagination);
	      });
	    },
	    reload: function reload() {
	      this.loadProducts(null, this.pagination);
	    },
	    selectProduct: function selectProduct(product) {
	      _eventHelper.eventHelper.emit('productData', product);
	    },
	    removeProduct: function removeProduct(product) {
	      var _this2 = this;

	      var _self = this;
	      _productBackend2.default.removeProduct(product, function (response) {
	        _self.reload();
	        _messageService2.default.successMessage(_self, _this2.t('pages.messages.product.productRemoved'));
	      }, function (error) {
	        if (error.response && error.response.data) {
	          _messageService2.default.errorMessage(_self, error.response.data.message);
	        } else {
	          _messageService2.default.errorMessage(_self, error.message);
	        }
	      });
	    },
	    previewProductTree: function previewProductTree(data) {
	      var _this3 = this;

	      _productBackend2.default.getChildreen(data._id, function (response) {
	        _this3.treeData = response.data;
	        _this3.treeviewData = response.data[0];
	        _this3.isProductList = false;
	      }, function (error) {
	        console.log(error);
	        _messageService2.default.errorMessage(_this3, _this3.t('pages.messages.product.childrenErrorOcurred'));
	      });
	    },
	    loadProducts: function loadProducts(search, pagination) {
	      var _self = this;
	      var options = {};

	      if (pagination.perpage) {
	        options.limit = pagination.perpage;
	      }
	      if (pagination.current_page) {
	        options.page = pagination.current_page;
	      }
	      if (search) {
	        options.search = search;
	      }

	      if (this.necessityId !== undefined) {
	        _necessityBackend2.default.materialExplosion(this.necessityId, function (response) {
	          console.log(response.headers);
	          _materialsBackend2.default.loadMaterials(response.headers.location, options, function (response) {
	            _self.pagination.current_page = response.data.page;
	            _self.pagination.last_page = response.data.pages;
	            _self.pagination.perpage = response.data.limit;
	            _self.pagination.total = response.data.total;
	            _self.response = response.data.docs;
	          }, function (error) {
	            console.log(error.status);
	          });
	        }, function (error) {
	          console.log(error);
	        });
	      } else if (this.products === undefined) {
	        _productBackend2.default.loadProducts(options, function (response) {
	          console.log(response.data);
	          _self.pagination.current_page = response.data.page;
	          _self.pagination.last_page = response.data.pages;
	          _self.pagination.perpage = response.data.limit;
	          _self.pagination.total = response.data.total;
	          _self.response = response.data.docs;
	        }, function (error) {
	          if (error.response && error.response.data) {
	            _messageService2.default.errorMessage(_self, error.response.data.message);
	          } else {
	            _messageService2.default.errorMessage(_self, error.message);
	          }
	        });
	      } else {
	        _self.response = this.products;
	      }
	    }
	  },
	  mounted: function mounted() {
	    _languageService2.default.loadLanguage(this);
	    var _self = this;
	    if (this.insertTreeButton === undefined || this.insertTreeButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.insertProduct'), // Button label
	        icon: 'fa fa-plus', // Button icon
	        class: 'btn-success btn-md', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _eventHelper.eventHelper.emit('insertProductInTree', row.row);
	        }
	      });
	    }

	    if (this.selectButton === undefined || this.selectButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.selectProduct'), // Button label
	        icon: 'fa fa-check', // Button icon
	        class: 'btn-md btn-success', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          if (_self.selectMethodCallback === undefined) {
	            _self.selectProduct(row.row);
	          } else {
	            _self.selectMethodCallback(row.row);
	          }
	        }
	      });
	    }

	    if (this.reloadButton === undefined || this.reloadButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.reloadProducts'), // Button label
	        icon: 'fa fa-refresh', // Button icon
	        class: 'btn-primary btn-md', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _self.reload();
	        }
	      });
	    }

	    if (this.removeButton === undefined || this.removeButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.removeProduct'), // Button label
	        icon: 'fa fa-times', // Button icon
	        class: 'btn-md btn-danger', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          var r = window.confirm(_self.t('pages.messages.showProducts.removeProduct.confirmation'));
	          if (r === true) {
	            _self.removeProduct(row.row);
	          }
	        }
	      });
	    }

	    if (this.showTreeButton === undefined || this.showTreeButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.productTree'), // Button label
	        icon: 'fa fa-share', // Button icon
	        class: 'btn-md btn-info', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          window.location = '/products/' + row.row._id + '/structure';
	        }
	      });
	    }

	    if (this.previewTreeButton === undefined || this.previewTreeButton === true) {
	      this.actions.push({
	        text: this.t('pages.messages.showProducts.previewTree'), // Button label
	        icon: 'fa fa-eye', // Button icon
	        class: 'btn-md btn-warning', // Button class (background color)
	        event: function event(e, row) {
	          // Event handler callback. Gets event instace and selected row
	          _self.previewProductTree(row.row);
	        }
	      });
	    }

	    if (this.products === undefined && this.necessityId === undefined) {
	      this.columns = this.columns.filter(function (el) {
	        return el.key !== 'quantity';
	      });
	    }

	    for (var i = 0; i < this.columns.length; i++) {
	      this.columns[i].name = this.t(this.columns[i].name);
	    }

	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('reloadProductList', function () {
	      _self.reload();
	    });
	    _rolesService2.default.loadUserRoles(this);
	    this.loadProducts(null, this.pagination);
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jstree = __webpack_require__(200);

	var _jstree2 = _interopRequireDefault(_jstree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  props: ['tree', 'nodeChanged', 'onSelect', 'onEdit', 'onDelete'],
	  watch: {
	    tree: function tree(val) {
	      this.treeData = val;
	      this.loadTree(this.treeData);
	    }
	  },
	  data: function data() {
	    return {
	      treeData: []
	    };
	  },

	  methods: {
	    loadTree: function loadTree(treeData) {
	      var options = {};
	      options.data = treeData;
	      options.onEdit = this.onEdit;
	      options.onDelete = this.onDelete;
	      options.onSelect = this.onSelect;
	      options.nodeChanged = this.nodeChanged;

	      _jstree2.default.loadTree(options);
	    },
	    rollback: function rollback(data) {
	      _jstree2.default.rollback(data);
	    }
	  },
	  mounted: function mounted() {}
	}; //
	//
	//
	//

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _ShowNecessity = __webpack_require__(24);

	var _ShowNecessity2 = _interopRequireDefault(_ShowNecessity);

	var _NecessityItem = __webpack_require__(23);

	var _NecessityItem2 = _interopRequireDefault(_NecessityItem);

	var _ShowProducts = __webpack_require__(15);

	var _ShowProducts2 = _interopRequireDefault(_ShowProducts);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vuejsDatepicker = __webpack_require__(19);

	var _vuejsDatepicker2 = _interopRequireDefault(_vuejsDatepicker);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _modalVue = __webpack_require__(14);

	var _modalVue2 = _interopRequireDefault(_modalVue);

	var _necessityBackend = __webpack_require__(13);

	var _necessityBackend2 = _interopRequireDefault(_necessityBackend);

	var _materialsBackend = __webpack_require__(30);

	var _materialsBackend2 = _interopRequireDefault(_materialsBackend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  components: {
	    Modal: _modalVue2.default,
	    showNecessity: _ShowNecessity2.default,
	    productData: _ShowProducts2.default,
	    necessityItem: _NecessityItem2.default,
	    VueNumeric: _vueNumeric2.default,
	    Datepicker: _vuejsDatepicker2.default
	  },
	  data: function data() {
	    return {
	      necessityId: undefined,
	      operation: 'material',
	      response: undefined,
	      error: {},
	      roles: undefined,
	      showProductTable: false
	    };
	  },

	  methods: {
	    materialExplosion: function materialExplosion(necessity) {
	      _necessityBackend2.default.materialExplosion(necessity._id, function (response) {
	        _materialsBackend2.default.loadMaterials(response.headers.location, undefined, function (response) {
	          console.log('teste');
	        });
	      }, function (err) {
	        console.log(err);
	      });
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _rolesService2.default.loadUserRoles(_self);
	    _languageService2.default.loadLanguage(_self);
	  }
	};
	// import authService from '../../services/authService'
	// import messageService from '../../services/messageService'

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _ShowNecessity = __webpack_require__(24);

	var _ShowNecessity2 = _interopRequireDefault(_ShowNecessity);

	var _NecessityItem = __webpack_require__(23);

	var _NecessityItem2 = _interopRequireDefault(_NecessityItem);

	var _ShowProducts = __webpack_require__(15);

	var _ShowProducts2 = _interopRequireDefault(_ShowProducts);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _necessityBackend = __webpack_require__(13);

	var _necessityBackend2 = _interopRequireDefault(_necessityBackend);

	var _vuejsDatepicker = __webpack_require__(19);

	var _vuejsDatepicker2 = _interopRequireDefault(_vuejsDatepicker);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _modalVue = __webpack_require__(14);

	var _modalVue2 = _interopRequireDefault(_modalVue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  components: {
	    Modal: _modalVue2.default,
	    showNecessity: _ShowNecessity2.default,
	    showProducts: _ShowProducts2.default,
	    necessityItem: _NecessityItem2.default,
	    VueNumeric: _vueNumeric2.default,
	    Datepicker: _vuejsDatepicker2.default
	  },
	  data: function data() {
	    return {
	      newNecessityItem: undefined,
	      response: undefined,
	      error: {},
	      totalItems: 0,
	      itemsPage: 10,
	      maxSize: 5,
	      showModal: false,
	      pagination: { currentPage: 1 },
	      roles: undefined,
	      necessityEdit: false,
	      showAddItem: false,
	      items: []
	    };
	  },

	  methods: {
	    saveData: function saveData() {
	      var _this = this;

	      var _self = this;
	      _messageService2.default.verifyFields(_self, function () {
	        var id = _self.response._id;
	        delete _self.response._id;
	        delete _self.response.__v;

	        if (_this.response._id) {
	          _necessityBackend2.default.updateNecessity(id, _self.response, function (response) {
	            _this.response = response.data;
	            _this.showAddItem = true;
	            _messageService2.default.successMessage(_self, 'Necessidade criada com sucesso');
	          }, function (error) {
	            _this.showAddItem = false;
	            _messageService2.default.errorMessage(_self, error);
	          });
	        } else {
	          _necessityBackend2.default.insertNecessity(_this.response, function (response) {
	            _this.response = response.data;
	            _this.showAddItem = true;
	            _messageService2.default.successMessage(_self, 'Necessidade criada com sucesso');
	          }, function (error) {
	            _this.showAddItem = false;
	            _messageService2.default.errorMessage(_self, error);
	          });
	        }
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error.error);
	      });
	    },
	    selectNecessity: function selectNecessity(necessity) {
	      this.showAddItem = true;
	      this.necessityEdit = true;
	      this.response = necessity;
	    },
	    close: function close() {
	      this.showModal = false;
	      this.newNecessityItem = undefined;
	    },
	    selectProduct: function selectProduct(product) {
	      this.showModal = true;
	      this.newNecessityItem = {
	        product: product,
	        quantity: 0,
	        deadline: ''
	      };
	    },
	    saveItemData: function saveItemData() {
	      this.newNecessityItem.productId = this.newNecessityItem.product._id;
	      var date = '';
	      if (this.newNecessityItem.deadline !== undefined) {
	        date = new Date(this.newNecessityItem.deadline);
	        date = date.toISOString();
	      }
	      _eventHelper.eventHelper.emit('add_necessity_item', {
	        productId: this.newNecessityItem.product._id,
	        quantity: this.newNecessityItem.quantity,
	        deadline: date
	      });
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _rolesService2.default.loadUserRoles(_self);
	    _languageService2.default.loadLanguage(_self);
	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('productData', function (productData) {
	      _self.productEdit = true;
	      productData.purchasePrice = productData.purchasePrice ? productData.purchasePrice : 0;
	      _self.response = productData;
	    });
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _productBackend = __webpack_require__(21);

	var _productBackend2 = _interopRequireDefault(_productBackend);

	var _ShowProducts = __webpack_require__(15);

	var _ShowProducts2 = _interopRequireDefault(_ShowProducts);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  components: {
	    productData: _ShowProducts2.default,
	    VueNumeric: _vueNumeric2.default
	  },
	  data: function data() {
	    return {
	      response: undefined,
	      error: {},
	      totalItems: 0,
	      itemsPage: 10,
	      maxSize: 5,
	      pagination: { currentPage: 1 },
	      roles: undefined,
	      productEdit: false
	    };
	  },

	  methods: {
	    createProduct: function createProduct() {
	      var _self = this;
	      _messageService2.default.verifyFields(_self, function () {
	        delete _self.response.costValue;
	        delete _self.response.__v;

	        if (_self.response._id) {
	          var _id = _self.response._id;
	          delete _self.response._id;
	          _productBackend2.default.updateProduct(_id, _self.response, function (response) {
	            _self.productEdit = false;
	            _eventHelper.eventHelper.emit('reloadProductList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.product.productUpdated'));
	          }, function (error) {
	            if (error.response.data) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        } else {
	          _productBackend2.default.insertProduct(_self.response, function (response) {
	            _self.productEdit = false;
	            _eventHelper.eventHelper.emit('reloadProductList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.product.productInserted'));
	          }, function (error) {
	            if (error.response) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        }
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error);
	      });
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _rolesService2.default.loadUserRoles(_self);
	    _languageService2.default.loadLanguage(this);
	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('productData', function (productData) {
	      _self.productEdit = true;
	      productData.purchasePrice = productData.purchasePrice ? productData.purchasePrice : 0;
	      _self.response = productData;
	    });
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _BasicOperationsCRUD = __webpack_require__(151);

	var _BasicOperationsCRUD2 = _interopRequireDefault(_BasicOperationsCRUD);

	var _ShowProducts = __webpack_require__(15);

	var _ShowProducts2 = _interopRequireDefault(_ShowProducts);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _vuejsDatepicker = __webpack_require__(19);

	var _vuejsDatepicker2 = _interopRequireDefault(_vuejsDatepicker);

	var _formatDate = __webpack_require__(22);

	var _formatDate2 = _interopRequireDefault(_formatDate);

	var _modalVue = __webpack_require__(14);

	var _modalVue2 = _interopRequireDefault(_modalVue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  components: {
	    productionOrderData: _BasicOperationsCRUD2.default,
	    VueNumeric: _vueNumeric2.default,
	    Datepicker: _vuejsDatepicker2.default,
	    modal: _modalVue2.default,
	    productData: _ShowProducts2.default
	  },
	  data: function data() {
	    return {
	      response: {},
	      error: {},
	      totalItems: 0,
	      itemsPage: 10,
	      maxSize: 5,
	      pagination: { currentPage: 1 },
	      roles: undefined,
	      modalProduct: {},
	      pageControl: {
	        edit: false,
	        findProduct: false
	      },
	      editing: false,
	      buttons: ['edit', 'remove', 'reload'],
	      columns: [{
	        name: 'pages.messages.showProductionOrders.fields.code',
	        key: 'code'
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.productCode',
	        key: 'productCode'
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.quantity',
	        key: 'quantity'
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.originalDeadline',
	        key: 'originalDeadline',
	        render: function render(value) {
	          if (value) {
	            var date = new Date(value);
	            return _formatDate2.default.formatDate(date);
	          } else {
	            return '';
	          }
	        }
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.revisedDeadline',
	        key: 'revisedDeadline',
	        render: function render(value) {
	          if (value) {
	            var date = new Date(value);
	            return _formatDate2.default.formatDate(date);
	          } else {
	            return '';
	          }
	        }
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.orderType',
	        key: 'type',
	        render: function render(value) {
	          return global.Vue.t('enums.productionOrder.type.' + value);
	        }
	      }, {
	        name: 'pages.messages.showProductionOrders.fields.orderStatus',
	        key: 'status',
	        render: function render(value) {
	          return global.Vue.t('enums.productionOrder.status.' + value);
	        }
	      }]
	    };
	  },

	  computed: {
	    formattedOriginalDeadline: function formattedOriginalDeadline() {
	      return _formatDate2.default.formatDate(this.response.originalDeadline);
	    },
	    formattedRevisedDeadline: function formattedRevisedDeadline() {
	      return _formatDate2.default.formatDate(this.response.revisedDeadline);
	    }
	  },
	  methods: {
	    createProductionOrder: function createProductionOrder() {
	      var _this = this;

	      var _self = this;
	      _messageService2.default.verifyFields(_self, function () {
	        delete _self.response.__v;

	        if (_self.response._id) {
	          var _id = _self.response._id;
	          _this.backend.update(_id, _self.response, function (response) {
	            _self.pageControl.edit = false;
	            _eventHelper.eventHelper.emit('reloadItemList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.productionOrder.updated'));
	          }, function (error) {
	            if (error.response.data) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        } else {
	          console.log(JSON.stringify(_this.response));
	          _this.backend.insert(_self.response, function (response) {
	            _self.pageControl.edit = false;
	            _eventHelper.eventHelper.emit('reloadItemList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.productionOrder.inserted'));
	          }, function (error) {
	            if (error.response) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        }
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error);
	      });
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    },
	    closeModal: function closeModal() {
	      this.pageControl.findProduct = false;
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;

	    var _self = this;
	    _rolesService2.default.loadUserRoles(_self);
	    _languageService2.default.loadLanguage(this);
	    _eventHelper.eventHelper.init();
	    _eventHelper.eventHelper.on('itemDetails', function (productionOrderData) {
	      _self.pageControl.edit = true;
	      _self.response = productionOrderData;
	    });
	    _eventHelper.eventHelper.on('productData', function (productData) {
	      _this2.closeModal();
	      _this2.modalProduct = productData;
	      _this2.response.productId = productData._id;
	    });
	  },
	  created: function created() {
	    this.backend = __webpack_require__(198);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _productBackend = __webpack_require__(21);

	var _productBackend2 = _interopRequireDefault(_productBackend);

	var _tree = __webpack_require__(259);

	var _tree2 = _interopRequireDefault(_tree);

	var _ShowProducts = __webpack_require__(15);

	var _ShowProducts2 = _interopRequireDefault(_ShowProducts);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _modalVue = __webpack_require__(14);

	var _modalVue2 = _interopRequireDefault(_modalVue);

	var _awesomeMask = __webpack_require__(155);

	var _awesomeMask2 = _interopRequireDefault(_awesomeMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'Repository',
	  components: {
	    tree: _tree2.default,
	    productData: _ShowProducts2.default,
	    eventHelper: _eventHelper.eventHelper,
	    Modal: _modalVue2.default
	  },
	  directives: {
	    AwesomeMask: _awesomeMask2.default
	  },
	  data: function data() {
	    return {
	      showModal: false,
	      relationshipData: {},
	      productStructIsVisible: true,
	      managementCallback: null,
	      response: [],
	      treeData: [],
	      treeviewData: {},
	      nodeSelected: {},
	      newNode: {}
	    };
	  },

	  methods: {
	    close: function close() {
	      this.showModal = false;
	    },
	    openQuantityChange: function openQuantityChange() {
	      var relationshipData = {};
	      this.showModal = true;
	      if (this.nodeSelected.parent !== '#') {
	        relationshipData.node = this.nodeSelected;
	        relationshipData.parent = this.nodeSelected.parent;
	        relationshipData.relationshipId = this.nodeSelected.data.relationshipId;
	        relationshipData.quantity = this.nodeSelected.data.quantity;
	        this.relationshipData = relationshipData;

	        this.relationshipMessage = this.t('pages.structure.relation.message').replace('{{this.relationshipData.parent.text}}', this.relationshipData.parent.text).replace('{{this.relationshipData.quantity}}', this.relationshipData.quantity).replace('{{this.relationshipData.node.text}}', this.relationshipData.node.text);

	        this.managementCallback = function (_self, body) {
	          var _this = this;

	          _productBackend2.default.insertChildreen(this.relationshipData.parent.data._id, this.relationshipData.node.data._id, body, function (response) {
	            _self.loadChildren();
	            _messageService2.default.successMessage(_self, _this.t('pages.structure.relation.created'));
	          }, _self.errorMessage);
	        };
	      }
	    },
	    loadChildren: function loadChildren() {
	      var _this2 = this;

	      _productBackend2.default.getChildreen(this.$route.params.productId, function (response) {
	        _this2.treeData = response.data;
	        _this2.treeviewData = response.data[0];
	      }, function (error) {
	        console.log(error);
	        _messageService2.default.errorMessage(_this2, _this2.t('pages.structure.relation.children.error'));
	      });
	    },
	    nodeChanged: function nodeChanged(node) {
	      if (node) {
	        this.onSelect(node);
	        this.managementCallback = function (_self, body) {
	          var _this3 = this;

	          var __self = _self;
	          var confirmation = true;
	          if (node.old_parent.parent !== '#') {
	            confirmation = window.confirm(this.t('pages.structure.alert.anotherTree'));
	          }

	          if (confirmation) {
	            _productBackend2.default.removeChildreen(node.old_parent.data._id, node.node.data._id, function (response) {
	              _productBackend2.default.insertChildreen(node.parent.data._id, node.node.data._id, body, function (response) {
	                _messageService2.default.successMessage(__self, _this3.t('pages.structure.relation.created'));
	              }, __self.errorMessage);
	            }, __self.errorMessage);
	          } else {
	            this.loadChildren();
	          }
	        };
	        this.showRelationShipData();
	      } else {
	        this.errorMessage();
	      }
	    },
	    onSelect: function onSelect(node) {
	      this.nodeSelected = node;
	    },
	    insertNodeInTree: function insertNodeInTree() {
	      this.showRelationShipData();
	      this.managementCallback = function (_self, body) {
	        var _this4 = this;

	        _productBackend2.default.insertChildreen(this.nodeSelected.id, this.newNode._id, body, function (response) {
	          _self.loadChildren();
	          _messageService2.default.successMessage(_self, _this4.t('pages.structure.relation.created'));
	        }, _self.errorMessage);
	      };
	    },
	    closeRelationshipData: function closeRelationshipData() {
	      this.relationshipData = { parent: undefined, node: undefined };
	      this.productStructIsVisible = true;
	      this.loadChildren();
	    },
	    saveRelationshipData: function saveRelationshipData() {
	      this.managementCallback(this, { relationshipId: this.relationshipData.relationshipId, quantity: this.relationshipData.quantity });
	      this.modal = false;
	      this.productStructIsVisible = true;
	      this.relationshipData = {};
	    },
	    removeRelationShipData: function removeRelationShipData() {
	      var _this5 = this;

	      var _self = this;
	      var r = window.confirm(this.t('pages.structure.remove'));
	      if (r === true) {
	        _productBackend2.default.removeChildreen(this.nodeSelected.parent.data._id, this.nodeSelected.data._id, function (response) {
	          _self.loadChildren();
	          _this5.productStructIsVisible = true;
	          _messageService2.default.successMessage(_self, _this5.t('pages.structure.relation.remove'));
	        }, _self.errorMessage);
	      }
	    },
	    showRelationShipData: function showRelationShipData(isRelationInfo) {
	      var relationshipData = {};
	      if (!this.isEmpty(this.nodeSelected)) {
	        if (isRelationInfo) {
	          if (this.nodeSelected.parent !== '#') {
	            this.productStructIsVisible = false;
	            relationshipData.node = this.nodeSelected;
	            relationshipData.parent = this.nodeSelected.parent;
	            relationshipData.relationshipId = this.nodeSelected.data.relationshipId;
	            relationshipData.quantity = this.nodeSelected.data.quantity;
	            this.relationshipData = relationshipData;

	            this.managementCallback = function (_self, body) {
	              var _this6 = this;

	              _productBackend2.default.insertChildreen(this.relationshipData.parent.data._id, this.relationshipData.node.data._id, body, function (response) {
	                _self.loadChildren();
	                _messageService2.default.successMessage(_self, _this6.t('pages.structure.relation.created'));
	              }, _self.errorMessage);
	            };
	          }
	        } else {
	          if (this.nodeSelected.data !== undefined) {
	            this.productStructIsVisible = false;
	            relationshipData.parent = this.nodeSelected;
	            relationshipData.parent.id = this.nodeSelected.data._id;
	            relationshipData.node = { id: this.newNode._id, text: this.newNode.code + '-' + this.newNode.name };
	          } else {
	            if (this.nodeSelected.parent !== '#') {
	              this.productStructIsVisible = false;
	              relationshipData.parent = this.nodeSelected.parent;
	              relationshipData.node = this.nodeSelected.node;
	            }
	          }
	          this.relationshipData = relationshipData;
	        }
	      }
	    },
	    errorMessage: function errorMessage(err) {
	      this.loadChildren();
	      if (err.response) {
	        _messageService2.default.errorMessage(this, err.response.data.message);
	      } else {
	        _messageService2.default.errorMessage(this, this.t('error.general'));
	      }
	    },
	    isEmpty: function isEmpty(obj) {
	      if (obj == null) return true;
	      if (obj.length > 0) return false;
	      if (obj.length === 0) return true;
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return true;
	      for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	      }
	      return true;
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    this.$nextTick(function () {
	      _rolesService2.default.loadUserRoles(_self);
	      _eventHelper.eventHelper.init();
	      _eventHelper.eventHelper.on('insertProductInTree', function (node) {
	        _self.newNode = node;
	        _self.insertNodeInTree();
	      });
	      _self.loadChildren();
	      _languageService2.default.loadLanguage(this);
	    });
	  }
	};

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _messageService = __webpack_require__(4);

	var _messageService2 = _interopRequireDefault(_messageService);

	var _rolesService = __webpack_require__(5);

	var _rolesService2 = _interopRequireDefault(_rolesService);

	var _ShowNecessity = __webpack_require__(24);

	var _ShowNecessity2 = _interopRequireDefault(_ShowNecessity);

	var _NecessityItem = __webpack_require__(23);

	var _NecessityItem2 = _interopRequireDefault(_NecessityItem);

	var _BasicOperationsCRUD = __webpack_require__(151);

	var _BasicOperationsCRUD2 = _interopRequireDefault(_BasicOperationsCRUD);

	var _eventHelper = __webpack_require__(6);

	var _languageService = __webpack_require__(2);

	var _languageService2 = _interopRequireDefault(_languageService);

	var _vuejsDatepicker = __webpack_require__(19);

	var _vuejsDatepicker2 = _interopRequireDefault(_vuejsDatepicker);

	var _vueNumeric = __webpack_require__(10);

	var _vueNumeric2 = _interopRequireDefault(_vueNumeric);

	var _modalVue = __webpack_require__(14);

	var _modalVue2 = _interopRequireDefault(_modalVue);

	var _formatDate = __webpack_require__(22);

	var _formatDate2 = _interopRequireDefault(_formatDate);

	var _vueSwitches = __webpack_require__(267);

	var _vueSwitches2 = _interopRequireDefault(_vueSwitches);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: 'Repository',
	  components: {
	    Switches: _vueSwitches2.default,
	    Modal: _modalVue2.default,
	    showNecessity: _ShowNecessity2.default,
	    necessityItem: _NecessityItem2.default,
	    VueNumeric: _vueNumeric2.default,
	    Datepicker: _vuejsDatepicker2.default,
	    'basic-operation': _BasicOperationsCRUD2.default
	  },
	  data: function data() {
	    return {
	      warehouseBackend: {},
	      response: {},
	      pageControll: {
	        showWarehouse: false,
	        isOK: false
	      },
	      columns: [{
	        name: 'pages.messages.warehouse.fields.code',
	        key: 'code'
	      }, {
	        name: 'pages.messages.warehouse.fields.validSince',
	        key: 'validSince',
	        render: function render(value) {
	          var date = new Date(value);
	          return _formatDate2.default.formatDate(date);
	        }
	      }, {
	        name: 'pages.messages.warehouse.fields.unitId',
	        key: 'unitId'
	      }, {
	        name: 'pages.messages.warehouse.fields.description',
	        key: 'description'
	      }, {
	        name: 'pages.messages.warehouse.fields.blocked',
	        key: 'BLOCKED'
	      }],
	      buttons: ['edit', 'reload', 'remove']
	    };
	  },

	  methods: {
	    saveData: function saveData() {
	      var _this = this;

	      var _self = this;
	      _messageService2.default.verifyFields(_self, function () {
	        delete _self.response.__v;
	        _self.response.unitId = '58825a290eb4d4271a54f188';
	        if (_self.response._id) {
	          var _id = _self.response._id;
	          _this.warehouseBackend.update(_id, _self.response, function (response) {
	            _eventHelper.eventHelper.emit('reloadItemList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.warehouse.updated'));
	          }, function (error) {
	            if (error.response.data) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        } else {
	          _this.warehouseBackend.insert(_self.response, function (response) {
	            _eventHelper.eventHelper.emit('reloadItemList');
	            _messageService2.default.successMessage(_self, _self.t('pages.messages.warehouse.inserted'));
	          }, function (error) {
	            if (error.response) {
	              _messageService2.default.errorMessage(_self, error.response.data.message);
	            } else {
	              _messageService2.default.errorMessage(_self, error.message);
	            }
	          });
	        }
	      }, function (error) {
	        _messageService2.default.errorMessage(_self, error);
	      });
	    },
	    editWarehouse: function editWarehouse() {
	      this.pageControll.showWarehouse = true;
	    },
	    closeWarehouse: function closeWarehouse() {
	      this.pageControll.showWarehouse = false;
	    },
	    selectWarehouse: function selectWarehouse(warehouse) {
	      if (!warehouse) {
	        this.editWarehouse({});
	      } else {
	        warehouse.validSince = new Date(warehouse.validSince);
	        this.response = warehouse;
	        this.pageControll.showWarehouse = true;
	      }
	    },
	    isErrors: function isErrors(field) {
	      var msg = this.errors.first(field);
	      if (msg) {
	        msg = msg.replace(' ' + field, '');
	      }
	      return msg;
	    }
	  },
	  mounted: function mounted() {
	    var _self = this;
	    _rolesService2.default.loadUserRoles(_self);
	    _languageService2.default.loadLanguage(_self);
	    this.warehouseBackend = __webpack_require__(199);
	    this.pageControll.isOK = true;
	  }
	};

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var httpTransformation = __webpack_require__(12);


	var productionOrderUrl = config.apiGatewayUri + '/productionOrders';

	function load(options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(productionOrderUrl, options, function (url) {
	    _axios2.default.get(url).then(successCallback).catch(errorCallback);
	  });
	}

	function loadProductionOrder(productionOrderId, successCallback, errorCallback) {
	  _axios2.default.get(productionOrderUrl + '/' + productionOrderId).then(successCallback).catch(errorCallback);
	}

	function insert(productionOrder, successCallback, errorCallback) {
	  _axios2.default.post(productionOrderUrl, productionOrder).then(successCallback).catch(errorCallback);
	}

	function update(productionOrderId, productionOrder, successCallback, errorCallback) {
	  _axios2.default.put(productionOrderUrl + '/' + productionOrderId, productionOrder).then(successCallback).catch(errorCallback);
	}

	function remove(productionOrder, successCallback, errorCallback) {
	  _axios2.default.delete(productionOrderUrl + '/' + productionOrder._id).then(successCallback).catch(errorCallback);
	}

	module.exports = {
	  load: load,
	  loadProductionOrder: loadProductionOrder,
	  insert: insert,
	  update: update,
	  remove: remove
	};

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _axios = __webpack_require__(9);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = __webpack_require__(7);
	var httpTransformation = __webpack_require__(12);


	var url = config.apiGatewayUri + '/warehouses';

	function load(options, successCallback, errorCallback) {
	  httpTransformation.makeUrl(url, options, function (url) {
	    _axios2.default.get(url).then(successCallback).catch(errorCallback);
	  });
	}

	function loadOne(id, successCallback, errorCallback) {
	  _axios2.default.get(url + '/' + id).then(successCallback).catch(errorCallback);
	}

	function insert(object, successCallback, errorCallback) {
	  _axios2.default.post(url, object).then(successCallback).catch(errorCallback);
	}

	function update(id, object, successCallback, errorCallback) {
	  _axios2.default.put(url + '/' + id, object).then(successCallback).catch(errorCallback);
	}

	function remove(object, successCallback, errorCallback) {
	  _axios2.default.delete(url + '/' + object._id).then(successCallback).catch(errorCallback);
	}

	module.exports = {
	  load: load,
	  loadOne: loadOne,
	  insert: insert,
	  update: update,
	  remove: remove
	};

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(32);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(235);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = null;
	var map = [];

	function loadTree(opts) {
	  options = opts;

	  try {
	    (0, _jquery2.default)('#js-tree').on('move_node.jstree', function (node, data) {

	      var newData = {};
	      newData = Object.create(data);
	      if (data.parent !== '#') newData.parent = (0, _jquery2.default)('#js-tree').jstree(true).get_node(data.parent);

	      if (data.old_parent !== '#') newData.old_parent = (0, _jquery2.default)('#js-tree').jstree(true).get_node(data.old_parent);

	      options.nodeChanged(newData);
	    }).on('select_node.jstree', function (node, data) {
	      if (data.selected[0] !== undefined) {
	        var newData = {};
	        newData = (0, _jquery2.default)('#js-tree').jstree(true).get_node(data.selected[0]);
	        if (newData.parent && newData.parent !== '#') {
	          newData.parent = (0, _jquery2.default)('#js-tree').jstree(true).get_node(newData.parent);
	        }
	        options.onSelect(newData);
	      }
	    }).on('loaded.jstree', function (e, data) {
	      saveState();
	    }).jstree({
	      "core": {
	        "animation": 1,
	        "check_callback": function check_callback(operation, node, parent, position, more) {
	          if (operation === "move_node") {
	            if (parent.id === "#") {
	              return false; // prevent moving a child above or below the root
	            }
	          }
	          return true; // allow everything else
	        },
	        "data": opts.data,
	        'themes': {
	          'responsive': true
	        }
	      },
	      "state": { "key": "state_demo" },
	      "contextmenu": {
	        "items": function items($node) {
	          var tree = (0, _jquery2.default)("#js-tree").jstree(true);

	          if ($node.parent === '#') {
	            return {};
	          } else {
	            return {
	              "Edit": {
	                "separator_before": false,
	                "separator_after": false,
	                "label": "Edit",
	                "action": function action(obj) {
	                  options.onEdit(true);
	                }
	              },
	              "Remove": {
	                "separator_before": false,
	                "separator_after": false,
	                "label": "Remove",
	                "action": function action(obj) {
	                  options.onDelete();
	                }
	              }
	            };
	          }
	        }
	      },
	      "plugins": ["dnd", "search", "state", "types", 'html_data', "wholerow", 'themes', 'ui', 'contextmenu'],
	      "search": {
	        "show_only_matches": true
	      }
	    });

	    reloadOldState(options.data);

	    (0, _jquery2.default)('#js-tree').jstree(true).settings.core.data = options.data;
	    (0, _jquery2.default)('#js-tree').jstree(true).refresh();
	  } catch (e) {
	    var data = reloadOldState(options.data);
	    (0, _jquery2.default)('#js-tree').jstree(true).settings.core.data = data;
	    (0, _jquery2.default)('#js-tree').jstree(true).refresh();
	  }
	}

	function rollback(data) {
	  options.data = data;
	  loadTree(options);
	}

	function reloadOldState(data) {
	  for (var i = 0; i < map.length; i++) {
	    searchTree(data[0], map[i]);
	  }
	}

	function searchTree(element, search) {
	  if (element.id == search.id) {
	    element.state = search.state;
	    return element;
	  } else if (element.children != null) {
	    var i;
	    var result = null;
	    for (i = 0; result == null && i < element.children.length; i++) {
	      result = searchTree(element.children[i], search);
	    }
	    return result;
	  }
	  return null;
	}

	function saveState() {
	  var v = (0, _jquery2.default)('#js-tree').jstree(true).get_json('#', { flat: true });
	  if (v.length > 0) {
	    v.reduce(function (previousValue, currentValue, index, array) {
	      var aux = { id: currentValue.id, state: currentValue.state };
	      map.push(aux);
	      return;
	    });
	  }
	}

	module.exports = {
	  loadTree: loadTree,
	  rollback: rollback
	};

/***/ }),
/* 201 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  frontendAddress: 'http://localhost:8082',
	  apiGatewayUri: 'http://localhost:3000',
	  fixedLayout: false,
	  hideLogoOnMobile: false,
	  clientId: '20a1274c-cacc-48cb-826d-c11c19d4ad81',
	  clientSecret: 'a5439288-b323-4e29-8268-61843f2666d1'
	};

/***/ }),
/* 202 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  frontendAddress: 'http://192.168.1.120:8082',
	  apiGatewayUri: 'http://192.168.1.120:3000',
	  fixedLayout: false,
	  hideLogoOnMobile: false,
	  clientId: '34ca6de7-ca45-4779-bc22-25b0f4cfdc15',
	  clientSecret: '51daba99-70c6-4a3c-b64e-8fa8c27ecc3d'
	};

/***/ }),
/* 203 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.domain = domain;
	exports.count = count;
	exports.prettyDate = prettyDate;
	exports.pluralize = pluralize;
	var urlParser = document.createElement('a');

	function domain(url) {
	  urlParser.href = url;
	  return urlParser.hostname;
	}

	function count(arr) {
	  return arr.length;
	}

	function prettyDate(date) {
	  var a = new Date(date);
	  return a.toDateString();
	}

	function pluralize(time, label) {
	  if (time === 1) {
	    return time + label;
	  }

	  return time + label + 's';
	}

/***/ }),
/* 204 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _class = function _class(vuejs) {
	  var _languages$pt_BR;

	  _classCallCheck(this, _class);

	  this.vuejs = vuejs;
	  this.languages = {};
	  this.languages.pt_BR = (_languages$pt_BR = {
	    'error.general': 'Error has ocurred',
	    'pages.messages.basicCRUD.removed': 'Registro removido com sucesso',
	    'pages.messages.basicCRUD.insertTree': 'Adicionar filho',
	    'pages.messages.basicCRUD.select': 'Selecionar',
	    'pages.messages.basicCRUD.reload': 'Recarregar',
	    'pages.messages.basicCRUD.remove': 'Remover',
	    'pages.messages.basicCRUD.showTree': 'Exibir arvore',
	    'pages.messages.basicCRUD.previewTree': 'Pré visualizar arvore',
	    'pages.messages.basicCRUD.remove.confirmation': 'Deseja realmente remover esse registro?'
	  }, _defineProperty(_languages$pt_BR, 'pages.messages.basicCRUD.removed', 'Registro removido'), _defineProperty(_languages$pt_BR, 'pages.messages.product.productInserted', 'Produto inserido'), _defineProperty(_languages$pt_BR, 'pages.messages.product.productUpdated', 'Produto atualizado'), _defineProperty(_languages$pt_BR, 'pages.messages.credentials.passwordChanged', 'A senha foi alterada com sucesso'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.insertProduct', 'Inserir produto na arvore'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.selectProduct', 'Selecionar produto'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.reloadProducts', 'Recarregar produtos'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.removeProduct', 'Remover produto'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.code', 'Código'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.name', 'Nome'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.family', 'Familia'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.productType', 'Tipo produto'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.amountInStock', 'Quantidade estoque'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.fields.quantityNecessity', 'Quantidade necessaria'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.removeProduct.confirmation', 'Voce deseja realmente excluir o produto'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.productTree', 'Exibir a arvore do produto'), _defineProperty(_languages$pt_BR, 'pages.messages.product.productRemoved', 'O produto foi removido'), _defineProperty(_languages$pt_BR, 'pages.messages.product.childrenErrorOcurred', 'Erro ao obter produtos filhos'), _defineProperty(_languages$pt_BR, 'pages.messages.showProducts.previewTree', 'Pré visualizar arvore'), _defineProperty(_languages$pt_BR, 'pages.401.unauthorized', 'Você não possui autorização'), _defineProperty(_languages$pt_BR, 'pages.401.pleaseDoLogin', 'Por favor realizar o login'), _defineProperty(_languages$pt_BR, 'pages.401.clickHereToLogin', 'Entrar no sistema'), _defineProperty(_languages$pt_BR, 'pages.403.forbbiden', 'Você não possui permissão'), _defineProperty(_languages$pt_BR, 'pages.403.contactAdmin', 'Entre em contato com o administrador'), _defineProperty(_languages$pt_BR, 'pages.403.backToHome', 'Voltar para pagina inicial'), _defineProperty(_languages$pt_BR, 'pages.404.youAreLost', 'Página não encontrada'), _defineProperty(_languages$pt_BR, 'pages.404.pageDoesntExist', 'Essa página não existe'), _defineProperty(_languages$pt_BR, 'pages.404.backToHome', 'Voltar para pagina inicial'), _defineProperty(_languages$pt_BR, 'pages.500.errorHasOcurred', 'Ocorreu um erro inesperado'), _defineProperty(_languages$pt_BR, 'pages.500.contactAdmin', 'Entre em contato com o administrador'), _defineProperty(_languages$pt_BR, 'pages.500.backToHome', 'Voltar para pagina inicial'), _defineProperty(_languages$pt_BR, 'pages.credentials.header', 'Dados do usuário'), _defineProperty(_languages$pt_BR, 'pages.credentials.currentPassword', 'Senha antiga'), _defineProperty(_languages$pt_BR, 'pages.credentials.newPassword', 'Senha nova'), _defineProperty(_languages$pt_BR, 'pages.credentials.confirmPassword', 'Confirmar nova senha'), _defineProperty(_languages$pt_BR, 'pages.credentials.saveButton', 'Salvar'), _defineProperty(_languages$pt_BR, 'pages.logout.header', 'Você saiu do sistema'), _defineProperty(_languages$pt_BR, 'pages.logout.greeting', 'Até mais'), _defineProperty(_languages$pt_BR, 'pages.logout.toLogin', 'Clique aqui para realizar login'), _defineProperty(_languages$pt_BR, 'pages.sidebar.category.principal', 'PRINCIPAL'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.dashboard', 'Dashboard'), _defineProperty(_languages$pt_BR, 'pages.sidebar.category.stock', 'ESTOQUE'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.productManagement', 'Gerenciar Produtos'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.materialsExplosion', 'Explosão de materiais'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.products', 'Produtos'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.warehouses', 'Armazéns'), _defineProperty(_languages$pt_BR, 'pages.sidebar.category.configuration', 'CONFIGURAÇÃO'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.credentials', 'Credenciais'), _defineProperty(_languages$pt_BR, 'pages.sidebar.category.pcp', 'PROGRAMAÇÃO DE PRODUÇÃO'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.necessity', 'Necessidades'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.order', 'Ordens de produção'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.supply', 'Suprimentos'), _defineProperty(_languages$pt_BR, 'pages.sidebar.item.logout', 'Sair'), _defineProperty(_languages$pt_BR, 'pages.products.header', 'Produtos'), _defineProperty(_languages$pt_BR, 'pages.products.productData', 'Dados do produto'), _defineProperty(_languages$pt_BR, 'pages.products.button.newProduct', ' Novo produto'), _defineProperty(_languages$pt_BR, 'pages.products.button.close', ' Fechar'), _defineProperty(_languages$pt_BR, 'pages.products.label.code', 'Código'), _defineProperty(_languages$pt_BR, 'pages.products.label.name', 'Nome'), _defineProperty(_languages$pt_BR, 'pages.products.label.family', 'Familia'), _defineProperty(_languages$pt_BR, 'pages.products.label.productType', 'Tipo Produto'), _defineProperty(_languages$pt_BR, 'pages.products.label.productType.bought', 'Comprado'), _defineProperty(_languages$pt_BR, 'pages.products.label.productType.produced', 'Produzido'), _defineProperty(_languages$pt_BR, 'pages.products.label.unitType', 'Unidade'), _defineProperty(_languages$pt_BR, 'pages.products.label.leadTime', 'Tempo de espera'), _defineProperty(_languages$pt_BR, 'pages.products.label.purchasePrice', 'Preço de compra'), _defineProperty(_languages$pt_BR, 'pages.products.label.description', 'Descrição'), _defineProperty(_languages$pt_BR, 'pages.products.button.save', 'Salvar'), _defineProperty(_languages$pt_BR, 'pages.products.button.close', 'Fechar'), _defineProperty(_languages$pt_BR, 'pages.structure.header', 'Estrutura do produto'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.edit.quantity', 'Editar quantidade'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.message', 'O produto {{this.relationshipData.parent.text}} possui {{this.relationshipData.quantity}} do produto {{this.relationshipData.node.text}}'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.children.quantity', 'Quantidade de itens filho'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.header', 'Dados da relação'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.fathersName', 'Nome do pai'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.sonName', 'Nome do filho'), _defineProperty(_languages$pt_BR, 'pages.structure.treeview.general', 'Visualização geral da arvore'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.', 'Edit quantity'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.created', 'Produto associado com sucesso'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.remove', 'Produto dissociado com sucesso'), _defineProperty(_languages$pt_BR, 'pages.structure.remove', 'Você deseja mesmo remover essa relação?'), _defineProperty(_languages$pt_BR, 'pages.structure.alert.anotherTree', 'Essa alteração pode afetar outros produtos, tem certeza?'), _defineProperty(_languages$pt_BR, 'pages.structure.relation.children.error', 'Erro ao obter produtos filhos'), _defineProperty(_languages$pt_BR, 'pages.necessities.header', 'Necessidades'), _defineProperty(_languages$pt_BR, 'pages.materialExplosion.header', 'Explosão de materiais'), _defineProperty(_languages$pt_BR, 'pages.necessity.header', 'Necessidade'), _defineProperty(_languages$pt_BR, 'pages.necessity.button.newNecessity', 'Nova necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.fields.name', 'Nome'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.fields.description', 'Descrição'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.fields.items.quantity', 'Quantidade'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.fields.items.deadLine', 'Prazo'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.products.all', 'Produtos'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.fields.sel ected', 'Itens da necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.products.choose', 'Selecione os produtos'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.fields.productName', 'Nome do produto'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.fields.quantity', 'Quantidade'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.fields.deadline', 'Prazo'), _defineProperty(_languages$pt_BR, 'pages.messages.showNecessity.selectNecessity', 'Selecionar necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.header', 'Armazens'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.code', 'Código'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.description', 'Descrição'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.validSince', 'Válido desde'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.unitId', 'Unidade'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.blocked', 'Bloqueado'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.updated', 'Armazem atualizado'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.inserted', 'Armazem inserido'), _defineProperty(_languages$pt_BR, 'pages.messages.warehouse.fields.unit', 'Unidade'), _defineProperty(_languages$pt_BR, 'pages.warehouse.button.newWarehouse', 'Adicionar armazem'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.header', 'Dados do item'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.inserted', 'Item da necessidade inserido'), _defineProperty(_languages$pt_BR, 'pages.messages.necessity.removeButton', 'Remover necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.necessity.explosionButton', 'Explodir necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.necessity.removed', 'Necessidade removida com sucesso'), _defineProperty(_languages$pt_BR, 'pages.messages.necessity.action.remove', 'Você deseja mesmo remover essa necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.removeButton', 'Remover item da necessidade'), _defineProperty(_languages$pt_BR, 'pages.messages.necessityItem.removed', 'Item da necessidade removido'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.header', 'Ordens de Produção'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.button.newProductionOrder', 'Nova Ordem de Produção'), _defineProperty(_languages$pt_BR, 'pages.products.productionOrderData', 'Dados da Ordem'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.code', 'Código'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.productCode', 'Produto'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.quantity', 'Quantidade'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.originalDeadline', 'Prazo Original'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.revisedDeadline', 'Prazo Reprogramado'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.orderType', 'Tipo'), _defineProperty(_languages$pt_BR, 'pages.productionOrders.label.orderStatus', 'Status'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.code', 'Código'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.productCode', 'Produto'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.quantity', 'Quantidade'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.originalDeadline', 'Prazo Original'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.revisedDeadline', 'Prazo Reprogramado'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.orderType', 'Tipo'), _defineProperty(_languages$pt_BR, 'pages.messages.showProductionOrders.fields.orderStatus', 'Status'), _defineProperty(_languages$pt_BR, 'pages.messages.productionOrder.updated', 'Ordem de Produção Atualizada'), _defineProperty(_languages$pt_BR, 'pages.messages.productionOrder.inserted', 'Ordem de Produção Inserida'), _defineProperty(_languages$pt_BR, 'enums.productionOrder.type.1', 'Prevista'), _defineProperty(_languages$pt_BR, 'enums.productionOrder.type.2', 'Firme'), _defineProperty(_languages$pt_BR, 'enums.productionOrder.status.1', 'Aberta'), _defineProperty(_languages$pt_BR, 'enums.productionOrder.status.2', 'Encerrada'), _defineProperty(_languages$pt_BR, 'enums.productionOrder.status.3', 'Cancelada'), _languages$pt_BR);
	  this.languages.en = {
	    'pages.messages.credentials.productInserted': 'Product has been inserted',
	    'pages.messages.credentials.productUpdated': 'Product has been updated',
	    'pages.messages.credentials.passwordChanged': 'Password has updated',
	    'pages.messages.showProducts.insertProduct': 'Insert product in tree',
	    'pages.messages.showProducts.selectProduct': 'Select product',
	    'pages.messages.showProducts.reloadProducts': 'Reload products',
	    'pages.messages.showProducts.removeProduct': 'Remove product',
	    'pages.messages.showProducts.removeProduct.confirmation': 'Are you sure to delete Product?',
	    'pages.messages.showProducts.productTree': 'Show product tree',
	    'pages.messages.showProducts.fields.code': 'Code',
	    'pages.messages.showProducts.fields.name': 'Name',
	    'pages.messages.showProducts.fields.family': 'Family',
	    'pages.messages.showProducts.fields.productType': 'Product type',
	    'pages.messages.showProducts.fields.amountInStock': 'Amount in stock',
	    'pages.messages.product.productRemoved': 'Product has removed',
	    'pages.messages.product.childrenErrorOcurred': 'Erro occured while get childreen',
	    'pages.messages.showProducts.previewTree': 'Preview tree',
	    'pages.401.unauthorized': 'You don\'t have authorization',
	    'pages.401.pleaseDoLogin': 'Please do login',
	    'pages.401.clickHereToLogin': 'Click here to login',
	    'pages.403.forbbiden': 'You don\'t have permission to access',
	    'pages.403.contactAdmin': 'Contact your system administrator',
	    'pages.403.backToHome': 'Back to home',
	    'pages.404.youAreLost': 'You are lost.',
	    'pages.404.pageDoesntExist': 'This page doesn\'t exist.',
	    'pages.404.backToHome': 'Back to home',
	    'pages.500.errorHasOcurred': 'An error has ocurred',
	    'pages.500.contactAdmin': 'Contact your system administrator',
	    'pages.500.backToHome': 'Back to home',
	    'pages.credentials.header': 'User data',
	    'pages.credentials.currentPassword': 'Old password',
	    'pages.credentials.newPassword': 'New password',
	    'pages.credentials.confirmPassword': 'Confirm new password',
	    'pages.credentials.saveButton': 'Save',
	    'pages.logout.header': 'Logout successful',
	    'pages.logout.greeting': 'See you',
	    'pages.logout.toLogin': 'Click here to login',
	    'pages.sidebar.category.principal': 'PRINCIPAL',
	    'pages.sidebar.item.dashboard': 'Dashboard',
	    'pages.sidebar.category.stock': 'STOCK',
	    'pages.sidebar.category.pcp': 'Production Planning',
	    'pages.sidebar.item.necessity': 'Necessities',
	    'pages.sidebar.item.order': 'Order',
	    'pages.sidebar.item.supply': 'Supply',
	    'pages.sidebar.item.productManagement': 'Product Management',
	    'pages.sidebar.item.products': 'Products',
	    'pages.sidebar.category.configuration': 'CONFIGURATION',
	    'pages.sidebar.item.credentials': 'Credentials',
	    'pages.sidebar.item.logout': 'Logout',
	    'pages.products.header': 'Products',
	    'pages.products.button.newProduct': ' New product',
	    'pages.products.label.code': 'Code',
	    'pages.products.label.name': 'Name',
	    'pages.products.label.family': 'Family',
	    'pages.products.label.productType': 'Product Type',
	    'pages.products.label.productType.bought': 'Bought',
	    'pages.products.label.productType.produced': 'Produced',
	    'pages.products.label.unitType': 'Unit',
	    'pages.products.label.leadTime': 'Lead time',
	    'pages.products.label.purchasePrice': 'Purchase price',
	    'pages.products.label.description': 'Description',
	    'pages.products.button.save': 'Save',
	    'pages.products.button.close': 'Close',
	    'pages.structure.header': 'Products structure',
	    'pages.structure.relation.edit.quantity': 'Edit quantity',
	    'pages.structure.relation.message': 'O produto {{this.relationshipData.parent.text}} possui {{this.relationshipData.quantity}} do produto {{this.relationshipData.node.text}}',
	    'pages.structure.relation.children.quantity': 'Children quantity',
	    'pages.structure.relation.header': 'Relationship data',
	    'pages.structure.relation.fathersName': 'Father\'s name',
	    'pages.structure.treeview.general': 'alterar',
	    'pages.structure.relation.created': 'Product has been associated',
	    'pages.structure.relation.remove': 'Product has been diassociated',
	    'pages.structure.relation.children.error': 'Erro occured while get childreen',
	    'pages.necessity.header': 'Necessity',
	    'pages.messages.necessityItem.fields.productName': '',
	    'pages.messages.necessityItem.fields.quantity': '',
	    'pages.messages.necessityItem.fields.deadline': ''
	  };

	  vuejs.locales(this.languages);
	};

	exports.default = _class;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Dash = __webpack_require__(255);

	var _Dash2 = _interopRequireDefault(_Dash);

	var _ = __webpack_require__(248);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(249);

	var _4 = _interopRequireDefault(_3);

	var _5 = __webpack_require__(250);

	var _6 = _interopRequireDefault(_5);

	var _7 = __webpack_require__(251);

	var _8 = _interopRequireDefault(_7);

	var _AccessToken = __webpack_require__(252);

	var _AccessToken2 = _interopRequireDefault(_AccessToken);

	var _Logout = __webpack_require__(256);

	var _Logout2 = _interopRequireDefault(_Logout);

	var _Credentials = __webpack_require__(254);

	var _Credentials2 = _interopRequireDefault(_Credentials);

	var _Dashboard = __webpack_require__(260);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _ProductView = __webpack_require__(263);

	var _ProductView2 = _interopRequireDefault(_ProductView);

	var _StructureView = __webpack_require__(265);

	var _StructureView2 = _interopRequireDefault(_StructureView);

	var _NecessityView = __webpack_require__(262);

	var _NecessityView2 = _interopRequireDefault(_NecessityView);

	var _MaterialExplosionView = __webpack_require__(261);

	var _MaterialExplosionView2 = _interopRequireDefault(_MaterialExplosionView);

	var _ProductionOrderView = __webpack_require__(264);

	var _ProductionOrderView2 = _interopRequireDefault(_ProductionOrderView);

	var _WarehouseView = __webpack_require__(266);

	var _WarehouseView2 = _interopRequireDefault(_WarehouseView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Routes
	var routes = [{
	  path: '/',
	  component: _Dash2.default,
	  children: [{
	    path: 'dashboard',
	    alias: '',
	    component: _Dashboard2.default,
	    name: ''
	  }, {
	    path: '/credentials',
	    component: _Credentials2.default,
	    name: '',
	    meta: { description: '' }
	  }, {
	    path: '/products',
	    component: _ProductView2.default,
	    name: ''
	  }, {
	    path: '/products/:productId/structure',
	    component: _StructureView2.default,
	    name: ''
	  }, {
	    path: '/necessities',
	    component: _NecessityView2.default,
	    name: ''
	  }, {
	    path: '/materials-explosion',
	    component: _MaterialExplosionView2.default,
	    name: ''
	  }, {
	    path: '/production-orders',
	    component: _ProductionOrderView2.default,
	    name: ''
	  }, {
	    path: '/warehouses',
	    component: _WarehouseView2.default,
	    name: ''
	  }]
	}, {
	  path: '/unauthorized',
	  component: _2.default
	}, {
	  path: '/forbbiden',
	  component: _4.default
	}, {
	  path: '/error',
	  component: _8.default
	}, {
	  path: '/token',
	  component: _AccessToken2.default
	}, {
	  path: '/logout',
	  component: _Logout2.default
	}, {
	  // not found handler
	  path: '*',
	  component: _6.default
	}];
	// Import Views - Dash
	exports.default = routes;

/***/ }),
/* 206 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mutations;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var SET_CLIENT_ID = 'SET_CLIENT_ID';
	var SET_CLIENT_SECRET = 'SET_CLIENT_SECRET';
	var SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
	var SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
	var SET_REDIRECT_URI = 'SET_REDIRECT_URI';
	var SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
	var SET_USER = 'SET_USER';
	var SET_LANGUAGE = 'SET_LANGUAGE';
	var SET_SESSION_ID = 'SET_SESSION_ID';

	var state = {
	  client_id: '34ca6de7-ca45-4779-bc22-25b0f4cfdc15',
	  client_secret: '51daba99-70c6-4a3c-b64e-8fa8c27ecc3d',
	  access_token: '',
	  refresh_token: '',
	  redirect_uri: 'undefined',
	  is_authorized: '',
	  user: undefined,
	  sessionId: '',
	  language: 'pt_BR'
	};

	var mutations = (_mutations = {}, _defineProperty(_mutations, SET_CLIENT_ID, function (state, clientId) {
	  state.client_id = clientId;
	}), _defineProperty(_mutations, SET_CLIENT_SECRET, function (state, clientSecret) {
	  state.client_secret = clientSecret;
	}), _defineProperty(_mutations, SET_ACCESS_TOKEN, function (state, token) {
	  state.access_token = token;
	}), _defineProperty(_mutations, SET_REFRESH_TOKEN, function (state, token) {
	  state.refresh_token = token;
	}), _defineProperty(_mutations, SET_REDIRECT_URI, function (state, redirectUri) {
	  state.redirect_uri = redirectUri;
	}), _defineProperty(_mutations, SET_IS_AUTHORIZED, function (state, isAuthorized) {
	  state.is_authorized = isAuthorized;
	}), _defineProperty(_mutations, SET_USER, function (state, user) {
	  state.user = user;
	}), _defineProperty(_mutations, SET_LANGUAGE, function (state, language) {
	  state.language = language;
	}), _defineProperty(_mutations, SET_SESSION_ID, function (state, sessionId) {
	  state.sessionId = sessionId;
	}), _mutations);

	exports.default = {
	  state: state,
	  mutations: mutations
	};

/***/ }),
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 212 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 213 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 214 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 215 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 216 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 217 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 218 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 219 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 220 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 221 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 222 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 223 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 224 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 225 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 226 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 227 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 228 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 229 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 230 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 231 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 232 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 233 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./af": 33,
		"./af.js": 33,
		"./ar": 40,
		"./ar-dz": 34,
		"./ar-dz.js": 34,
		"./ar-kw": 35,
		"./ar-kw.js": 35,
		"./ar-ly": 36,
		"./ar-ly.js": 36,
		"./ar-ma": 37,
		"./ar-ma.js": 37,
		"./ar-sa": 38,
		"./ar-sa.js": 38,
		"./ar-tn": 39,
		"./ar-tn.js": 39,
		"./ar.js": 40,
		"./az": 41,
		"./az.js": 41,
		"./be": 42,
		"./be.js": 42,
		"./bg": 43,
		"./bg.js": 43,
		"./bn": 44,
		"./bn.js": 44,
		"./bo": 45,
		"./bo.js": 45,
		"./br": 46,
		"./br.js": 46,
		"./bs": 47,
		"./bs.js": 47,
		"./ca": 48,
		"./ca.js": 48,
		"./cs": 49,
		"./cs.js": 49,
		"./cv": 50,
		"./cv.js": 50,
		"./cy": 51,
		"./cy.js": 51,
		"./da": 52,
		"./da.js": 52,
		"./de": 55,
		"./de-at": 53,
		"./de-at.js": 53,
		"./de-ch": 54,
		"./de-ch.js": 54,
		"./de.js": 55,
		"./dv": 56,
		"./dv.js": 56,
		"./el": 57,
		"./el.js": 57,
		"./en-au": 58,
		"./en-au.js": 58,
		"./en-ca": 59,
		"./en-ca.js": 59,
		"./en-gb": 60,
		"./en-gb.js": 60,
		"./en-ie": 61,
		"./en-ie.js": 61,
		"./en-nz": 62,
		"./en-nz.js": 62,
		"./eo": 63,
		"./eo.js": 63,
		"./es": 65,
		"./es-do": 64,
		"./es-do.js": 64,
		"./es.js": 65,
		"./et": 66,
		"./et.js": 66,
		"./eu": 67,
		"./eu.js": 67,
		"./fa": 68,
		"./fa.js": 68,
		"./fi": 69,
		"./fi.js": 69,
		"./fo": 70,
		"./fo.js": 70,
		"./fr": 73,
		"./fr-ca": 71,
		"./fr-ca.js": 71,
		"./fr-ch": 72,
		"./fr-ch.js": 72,
		"./fr.js": 73,
		"./fy": 74,
		"./fy.js": 74,
		"./gd": 75,
		"./gd.js": 75,
		"./gl": 76,
		"./gl.js": 76,
		"./gom-latn": 77,
		"./gom-latn.js": 77,
		"./he": 78,
		"./he.js": 78,
		"./hi": 79,
		"./hi.js": 79,
		"./hr": 80,
		"./hr.js": 80,
		"./hu": 81,
		"./hu.js": 81,
		"./hy-am": 82,
		"./hy-am.js": 82,
		"./id": 83,
		"./id.js": 83,
		"./is": 84,
		"./is.js": 84,
		"./it": 85,
		"./it.js": 85,
		"./ja": 86,
		"./ja.js": 86,
		"./jv": 87,
		"./jv.js": 87,
		"./ka": 88,
		"./ka.js": 88,
		"./kk": 89,
		"./kk.js": 89,
		"./km": 90,
		"./km.js": 90,
		"./kn": 91,
		"./kn.js": 91,
		"./ko": 92,
		"./ko.js": 92,
		"./ky": 93,
		"./ky.js": 93,
		"./lb": 94,
		"./lb.js": 94,
		"./lo": 95,
		"./lo.js": 95,
		"./lt": 96,
		"./lt.js": 96,
		"./lv": 97,
		"./lv.js": 97,
		"./me": 98,
		"./me.js": 98,
		"./mi": 99,
		"./mi.js": 99,
		"./mk": 100,
		"./mk.js": 100,
		"./ml": 101,
		"./ml.js": 101,
		"./mr": 102,
		"./mr.js": 102,
		"./ms": 104,
		"./ms-my": 103,
		"./ms-my.js": 103,
		"./ms.js": 104,
		"./my": 105,
		"./my.js": 105,
		"./nb": 106,
		"./nb.js": 106,
		"./ne": 107,
		"./ne.js": 107,
		"./nl": 109,
		"./nl-be": 108,
		"./nl-be.js": 108,
		"./nl.js": 109,
		"./nn": 110,
		"./nn.js": 110,
		"./pa-in": 111,
		"./pa-in.js": 111,
		"./pl": 112,
		"./pl.js": 112,
		"./pt": 114,
		"./pt-br": 113,
		"./pt-br.js": 113,
		"./pt.js": 114,
		"./ro": 115,
		"./ro.js": 115,
		"./ru": 116,
		"./ru.js": 116,
		"./sd": 117,
		"./sd.js": 117,
		"./se": 118,
		"./se.js": 118,
		"./si": 119,
		"./si.js": 119,
		"./sk": 120,
		"./sk.js": 120,
		"./sl": 121,
		"./sl.js": 121,
		"./sq": 122,
		"./sq.js": 122,
		"./sr": 124,
		"./sr-cyrl": 123,
		"./sr-cyrl.js": 123,
		"./sr.js": 124,
		"./ss": 125,
		"./ss.js": 125,
		"./sv": 126,
		"./sv.js": 126,
		"./sw": 127,
		"./sw.js": 127,
		"./ta": 128,
		"./ta.js": 128,
		"./te": 129,
		"./te.js": 129,
		"./tet": 130,
		"./tet.js": 130,
		"./th": 131,
		"./th.js": 131,
		"./tl-ph": 132,
		"./tl-ph.js": 132,
		"./tlh": 133,
		"./tlh.js": 133,
		"./tr": 134,
		"./tr.js": 134,
		"./tzl": 135,
		"./tzl.js": 135,
		"./tzm": 137,
		"./tzm-latn": 136,
		"./tzm-latn.js": 136,
		"./tzm.js": 137,
		"./uk": 138,
		"./uk.js": 138,
		"./ur": 139,
		"./ur.js": 139,
		"./uz": 141,
		"./uz-latn": 140,
		"./uz-latn.js": 140,
		"./uz.js": 141,
		"./vi": 142,
		"./vi.js": 142,
		"./x-pseudo": 143,
		"./x-pseudo.js": 143,
		"./yo": 144,
		"./yo.js": 144,
		"./zh-cn": 145,
		"./zh-cn.js": 145,
		"./zh-hk": 146,
		"./zh-hk.js": 146,
		"./zh-tw": 147,
		"./zh-tw.js": 147
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 237;


/***/ }),
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(229)

	/* script */
	__vue_exports__ = __webpack_require__(176)

	/* template */
	var __vue_template__ = __webpack_require__(288)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(228)

	/* script */
	__vue_exports__ = __webpack_require__(177)

	/* template */
	var __vue_template__ = __webpack_require__(287)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(227)

	/* script */
	__vue_exports__ = __webpack_require__(178)

	/* template */
	var __vue_template__ = __webpack_require__(286)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(224)

	/* script */
	__vue_exports__ = __webpack_require__(179)

	/* template */
	var __vue_template__ = __webpack_require__(282)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(232)

	/* script */
	__vue_exports__ = __webpack_require__(180)

	/* template */
	var __vue_template__ = __webpack_require__(291)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(181)

	/* template */
	var __vue_template__ = __webpack_require__(284)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(225)

	/* script */
	__vue_exports__ = __webpack_require__(182)

	/* template */
	var __vue_template__ = __webpack_require__(283)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(231)

	/* script */
	__vue_exports__ = __webpack_require__(183)

	/* template */
	var __vue_template__ = __webpack_require__(290)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(226)

	/* script */
	__vue_exports__ = __webpack_require__(184)

	/* template */
	var __vue_template__ = __webpack_require__(285)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(219)

	/* script */
	__vue_exports__ = __webpack_require__(185)

	/* template */
	var __vue_template__ = __webpack_require__(277)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(221)

	/* script */
	__vue_exports__ = __webpack_require__(186)

	/* template */
	var __vue_template__ = __webpack_require__(279)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(223)

	/* script */
	__vue_exports__ = __webpack_require__(191)

	/* template */
	var __vue_template__ = __webpack_require__(281)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6f0eb1d8"

	module.exports = __vue_exports__


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(220)

	/* template */
	var __vue_template__ = __webpack_require__(278)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(214)

	/* script */
	__vue_exports__ = __webpack_require__(192)

	/* template */
	var __vue_template__ = __webpack_require__(271)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(230)

	/* script */
	__vue_exports__ = __webpack_require__(193)

	/* template */
	var __vue_template__ = __webpack_require__(289)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(233)

	/* script */
	__vue_exports__ = __webpack_require__(194)

	/* template */
	var __vue_template__ = __webpack_require__(292)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(211)

	/* script */
	__vue_exports__ = __webpack_require__(195)

	/* template */
	var __vue_template__ = __webpack_require__(268)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(215)

	/* script */
	__vue_exports__ = __webpack_require__(196)

	/* template */
	var __vue_template__ = __webpack_require__(273)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(213)

	/* script */
	__vue_exports__ = __webpack_require__(197)

	/* template */
	var __vue_template__ = __webpack_require__(270)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(222)

	/* script */
	__vue_exports__ = __webpack_require__(175)

	/* template */
	var __vue_template__ = __webpack_require__(280)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ }),
/* 268 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('modal', {
	    attrs: {
	      "showModal": _vm.pageControl.findProduct,
	      "closeAction": _vm.closeModal
	    }
	  }, [_c('h1', {
	    slot: "header"
	  }, [_vm._v(_vm._s(_vm.t('pages.messages.necessityItem.header')))]), _vm._v(" "), _c('div', {
	    slot: "body"
	  }, [_c('productData', {
	    attrs: {
	      "insertTreeButton": false,
	      "previewTreeButton": false,
	      "removeButton": false,
	      "showTreeButton": false
	    }
	  })], 1)]), _vm._v(" "), _c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.productionOrders.header")]), _vm._v(" "), _c('section', [(!_vm.pageControl.edit) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('productionOrderData', {
	    attrs: {
	      "buttons": _vm.buttons,
	      "backend": _vm.backend,
	      "columns": _vm.columns
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [(!_vm.pageControl.edit) ? _c('button', {
	    staticClass: " col-sm-4 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.pageControl.edit = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-plus",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(_vm._s(' ' + _vm.t('pages.productionOrders.button.newProductionOrder')))]) : _vm._e(), _vm._v(" "), (_vm.pageControl.edit) ? _c('section', {
	    staticClass: "box box-info"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.products.productionOrderData")]), _vm._v(" "), _c('div', {
	    staticClass: "box-body"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.code")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.code),
	      expression: "response.code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Code",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.code = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Code')),
	      expression: "errors.has('Code')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Code')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.productCode")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.modalProduct.code),
	      expression: "modalProduct.code"
	    }, {
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }],
	    staticClass: "search form-control",
	    attrs: {
	      "type": "text",
	      "name": "productCode"
	    },
	    domProps: {
	      "value": (_vm.modalProduct.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.modalProduct.code = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-btn"
	  }, [_c('button', {
	    staticClass: "btn btn-flat",
	    on: {
	      "click": function($event) {
	        _vm.pageControl.findProduct = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-search"
	  })])])]), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('prodcuctCode')),
	      expression: "errors.has('prodcuctCode')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('productCode')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.quantity")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.quantity),
	      expression: "response.quantity"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Quantity",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.quantity)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.quantity = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Quantity')),
	      expression: "errors.has('Quantity')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Quantity')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.originalDeadline")]), _vm._v(" "), _c('datepicker', {
	    staticClass: "description-header align-left",
	    attrs: {
	      "language": "pt-br",
	      "disabled-picker": _vm.editing
	    },
	    model: {
	      value: (_vm.response.originalDeadline),
	      callback: function($$v) {
	        _vm.response.originalDeadline = $$v
	      },
	      expression: "response.originalDeadline"
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Name')),
	      expression: "errors.has('Name')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Name')))])], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.revisedDeadline")]), _vm._v(" "), _c('datepicker', {
	    staticClass: "description-header",
	    attrs: {
	      "language": "pt-br"
	    },
	    model: {
	      value: (_vm.response.revisedDeadline),
	      callback: function($$v) {
	        _vm.response.revisedDeadline = $$v
	      },
	      expression: "response.revisedDeadline"
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Name')),
	      expression: "errors.has('Name')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Name')))])], 1)])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.orderType")]), _vm._v(" "), _c('select', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.type),
	      expression: "response.type"
	    }],
	    staticClass: "pull-left form-control",
	    attrs: {
	      "name": "orderType"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.response.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, [_c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("enums.productionOrder.type.1")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("enums.productionOrder.type.2")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.productionOrders.label.orderStatus")]), _vm._v(" "), _c('select', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.status),
	      expression: "response.status"
	    }],
	    staticClass: "pull-left form-control",
	    attrs: {
	      "name": "orderStatus"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.response.status = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, [_c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("enums.productionOrder.status.1")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("enums.productionOrder.status.2")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("enums.productionOrder.status.3")])])])])]), _vm._v(" "), (_vm.roles && _vm.roles['manager.write']) ? _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md last-element pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.createProductionOrder
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-check",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" " + _vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), (_vm.pageControl.edit) ? _c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md last-element pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.pageControl.edit = false;
	        _vm.response = undefined
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-times",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" " + _vm._s(_vm.t('pages.products.button.close')))]) : _vm._e()])]) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('br')])], 1)
	},staticRenderFns: []}

/***/ }),
/* 269 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [(_vm.isProductList) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [(_vm.roles && _vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columnsNames,
	      "actions": _vm.actions
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e(), _vm._v(" "), (_vm.roles && !_vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columnsNames
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e()])]) : _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    on: {
	      "click": function($event) {
	        _vm.isProductList = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-arrow-circle-left",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("Back\n      ")])])])])
	},staticRenderFns: []}

/***/ }),
/* 270 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.messages.warehouse.header")]), _vm._v(" "), (_vm.pageControll.isOK) ? _c('section', [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('basic-operation', {
	    attrs: {
	      "columns": _vm.columns,
	      "backend": _vm.warehouseBackend,
	      "selectMethodCallback": _vm.selectWarehouse,
	      "buttons": _vm.buttons
	    }
	  }), _vm._v(" "), _c('button', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.pageControll.showWarehouse),
	      expression: "!pageControll.showWarehouse"
	    }],
	    staticClass: " col-sm-4 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.editWarehouse
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-plus",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" " + _vm._s(_vm.t('pages.warehouse.button.newWarehouse')))])], 1), _vm._v(" "), (_vm.pageControll.showWarehouse) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('section', {
	    staticClass: "box box-info"
	  }, [_c('div', {
	    staticClass: "box-body"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.necessity.header")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.warehouse.fields.code")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.code),
	      expression: "response.code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "code",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.code = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('code')),
	      expression: "errors.has('code')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('code')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.warehouse.fields.validSince")]), _vm._v(" "), _c('datepicker', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }],
	    staticClass: "description-header align-left",
	    attrs: {
	      "name": "validSince",
	      "language": "pt-br"
	    },
	    model: {
	      value: (_vm.response.validSince),
	      callback: function($$v) {
	        _vm.response.validSince = $$v
	      },
	      expression: "response.validSince"
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('validSince')),
	      expression: "errors.has('validSince')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('validSince')))])], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.warehouse.fields.blocked")]), _vm._v(" "), _c('switches', {
	    staticClass: "pull-left",
	    attrs: {
	      "type-bold": "true",
	      "color": "blue",
	      "selected": _vm.response.BLOCKED
	    },
	    model: {
	      value: (_vm.response.BLOCKED),
	      callback: function($$v) {
	        _vm.response.BLOCKED = $$v
	      },
	      expression: "response.BLOCKED"
	    }
	  })], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header with-border"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.warehouse.fields.description")]), _vm._v(" "), _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.description),
	      expression: "response.description"
	    }],
	    staticClass: "col-sm-12",
	    domProps: {
	      "value": (_vm.response.description)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.description = $event.target.value
	      }
	    }
	  })])])]), _vm._v(" "), (_vm.roles && _vm.roles['manager.write']) ? _c('div', [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.saveData
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), _c('button', {
	    staticClass: "col-sm-2 btn btn-danger btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.closeWarehouse
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.close')))])]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('br')]) : _vm._e()])
	},staticRenderFns: []}

/***/ }),
/* 271 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.materialExplosion.header")]), _vm._v(" "), _c('section', [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('showNecessity', {
	    attrs: {
	      "explosionMethodCallback": _vm.materialExplosion,
	      "selectButton": false,
	      "removeButton": false
	    }
	  })], 1), _vm._v(" "), (_vm.showProductTable) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('productData', {
	    attrs: {
	      "necessityId": _vm.necessityId,
	      "insertTreeButton": false,
	      "previewTreeButton": false,
	      "removeButton": false,
	      "reloadButton": false,
	      "selectButton": false,
	      "showTreeButton": false
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('br')])])
	},staticRenderFns: []}

/***/ }),
/* 272 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.readOnly) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.amount),
	      expression: "amount"
	    }],
	    ref: "numeric",
	    attrs: {
	      "placeholder": _vm.placeholder,
	      "type": "tel"
	    },
	    domProps: {
	      "value": _vm.value,
	      "value": (_vm.amount)
	    },
	    on: {
	      "blur": _vm.formatValue,
	      "input": [function($event) {
	        if ($event.target.composing) { return; }
	        _vm.amount = $event.target.value
	      }, function($event) {
	        _vm.processValue(_vm.amountValue)
	      }],
	      "focus": function($event) {
	        _vm.convertToNumber(_vm.numberValue)
	      }
	    }
	  }) : _c('span', {
	    ref: "readOnly"
	  }, [_vm._v(" " + _vm._s(_vm.amount) + " ")])
	},staticRenderFns: []}

/***/ }),
/* 273 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.structure.header")]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [(this.relationshipData.parent) ? _c('modal', {
	    attrs: {
	      "showModal": _vm.showModal,
	      "closeAction": _vm.close
	    }
	  }, [_c('h1', {
	    slot: "header"
	  }, [_vm._v(_vm._s(_vm.t('pages.structure.relation.edit.quantity')))]), _vm._v(" "), _c('div', {
	    slot: "body"
	  }, [_c('button', {
	    staticClass: "btn btn-primary btn-md pull-right",
	    on: {
	      "click": _vm.saveRelationshipData
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.relationshipMessage))]), _vm._v(" "), _c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.structure.relation.children.quantity")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true,
	          decimal: true
	        }
	      }),
	      expression: "{ rules: { required: true , decimal:true} }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.relationshipData.quantity),
	      expression: "relationshipData.quantity"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "quantidade",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.relationshipData.quantity)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.relationshipData.quantity = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('quantidade')),
	      expression: "errors.has('quantidade')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('quantidade')))])])]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [(_vm.relationshipData.parent !== undefined && !_vm.productStructIsVisible && _vm.relationshipData.node !== undefined) ? _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [_c('div', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "panel-heading"
	  }, [_vm._v("pages.structure.relation.header")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('div', {
	    staticClass: "box-body"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.structure.relation.fathersName")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.relationshipData.parent.text,
	      "disabled": ""
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Pai')),
	      expression: "errors.has('Pai')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Pai')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.structure.relation.sonName")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.relationshipData.node.text,
	      "disabled": ""
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Filho')),
	      expression: "errors.has('Filho')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Filho')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.structure.relation.children.quantity")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true,
	          decimal: true,
	          not_in: [0]
	        }
	      }),
	      expression: "{ rules: { required: true , decimal:true, not_in: [0]} }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.relationshipData.quantity),
	      expression: "relationshipData.quantity"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Quantidade",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.relationshipData.quantity)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.relationshipData.quantity = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Quantidade')),
	      expression: "errors.has('Quantidade')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Quantidade')))])])]), _vm._v(" "), (_vm.roles && _vm.roles['manager.write']) ? _c('div', {
	    staticClass: "row"
	  }, [_c('button', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    on: {
	      "click": _vm.saveRelationshipData
	    }
	  }, [_vm._v("pages.products.button.save")]), _vm._v(" "), _c('button', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "col-sm-2 btn btn-warning btn-md pull-right",
	    on: {
	      "click": _vm.closeRelationshipData
	    }
	  }, [_vm._v("pages.products.button.close")])]) : _vm._e()])])])])]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.productStructIsVisible),
	      expression: "productStructIsVisible"
	    }],
	    staticClass: "panel panel-info"
	  }, [_c('div', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "panel-heading"
	  }, [_vm._v("pages.structure.header")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('tree', {
	    attrs: {
	      "tree": _vm.treeData,
	      "onDelete": _vm.removeRelationShipData,
	      "onEdit": _vm.openQuantityChange,
	      "nodeChanged": _vm.nodeChanged,
	      "onSelect": _vm.onSelect
	    }
	  })], 1)])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [_c('div', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "panel-heading"
	  }, [_vm._v("pages.sidebar.item.products")]), _vm._v(" "), _c('div', {
	    staticClass: "panel-body"
	  }, [_c('productData', {
	    ref: "productData",
	    attrs: {
	      "selectButton": false,
	      "eventName": _vm.productStructData,
	      "removeButton": false
	    }
	  })], 1)])])], 1)])
	},staticRenderFns: []}

/***/ }),
/* 274 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [(_vm.isProductList) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [(_vm.roles && _vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns,
	      "actions": _vm.actions
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e(), _vm._v(" "), (_vm.roles && !_vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e()])]) : _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    on: {
	      "click": function($event) {
	        _vm.isProductList = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-arrow-circle-left",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("Back\n      ")])])])])
	},staticRenderFns: []}

/***/ }),
/* 275 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [(_vm.isProductList) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [(_vm.roles && _vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns,
	      "actions": _vm.actions
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e(), _vm._v(" "), (_vm.roles && !_vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e()])]) : _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    on: {
	      "click": function($event) {
	        _vm.isProductList = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-arrow-circle-left",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("Back\n      ")])])])])
	},staticRenderFns: []}

/***/ }),
/* 276 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [(_vm.isProductList) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [(_vm.roles && _vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns,
	      "actions": _vm.actions
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e(), _vm._v(" "), (_vm.roles && !_vm.roles['manager.delete']) ? _c('div', {
	    staticClass: "panel-body"
	  }, [_c('datasource', {
	    attrs: {
	      "language": "en",
	      "pagination": _vm.pagination,
	      "table-data": _vm.response,
	      "columns": _vm.columns
	    },
	    on: {
	      "change": _vm.changePage,
	      "searching": _vm.onSearch
	    }
	  })], 1) : _vm._e()])]) : _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    on: {
	      "click": function($event) {
	        _vm.isProductList = true
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-arrow-circle-left",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v("Back\n      ")])])])])
	},staticRenderFns: []}

/***/ }),
/* 277 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('aside', {
	    staticClass: "main-sidebar"
	  }, [_c('section', {
	    staticClass: "sidebar"
	  }, [_c('div', {
	    staticClass: "user-panel"
	  }, [_c('div', {
	    staticClass: "pull-left image"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.pictureUrl
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "pull-left info"
	  }, [_c('div', [_c('p', {
	    staticClass: "white"
	  }, [_vm._v(_vm._s(_vm.displayName))])]), _vm._v(" "), _vm._m(0)])]), _vm._v(" "), _c('form', {
	    staticClass: "sidebar-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	      }
	    }
	  }, [_vm._m(1)]), _vm._v(" "), _c('sidebar-menu')], 1)])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('a', {
	    attrs: {
	      "href": "javascript:;"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle text-success"
	  }), _vm._v(" Online\n        ")])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "input-group"
	  }, [_c('input', {
	    staticClass: "search form-control",
	    attrs: {
	      "type": "text",
	      "name": "search",
	      "id": "search",
	      "data-toggle": "hideseek",
	      "p": "",
	      "laceholder": "Search Menus",
	      "data-list": ".sidebar-menu"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "input-group-btn"
	  }, [_c('button', {
	    staticClass: "btn btn-flat",
	    attrs: {
	      "type": "submit",
	      "name": "search",
	      "id": "search-btn"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-search"
	  })])])])
	}]}

/***/ }),
/* 278 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "content"
	  })
	},staticRenderFns: []}

/***/ }),
/* 279 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('ul', {
	    staticClass: "sidebar-menu"
	  }, [_c('li', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "header"
	  }, [_vm._v("pages.sidebar.category.principal")]), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-desktop"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.dashboard")])])], 1), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/products"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.products")])])], 1), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/warehouses"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.warehouses")])])], 1), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/necessities"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.necessity")])])], 1), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/materials-explosion"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-circle-o"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.materialsExplosion")])])], 1), _vm._v(" "), _c('li', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "header"
	  }, [_vm._v("pages.sidebar.category.configuration")]), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/credentials"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-cog"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.credentials")])])], 1), _vm._v(" "), _c('li', {
	    staticClass: "pageLink",
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/logout"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-sign-out"
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "page"
	  }, [_vm._v("pages.sidebar.item.logout")])])], 1)])
	},staticRenderFns: []}

/***/ }),
/* 280 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    class: _vm.classObject
	  }, [(_vm.shouldShowLabel) ? _c('span', {
	    staticClass: "vue-switcher__label"
	  }, [(_vm.label) ? _c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.label)
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.label && _vm.value) ? _c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.textEnabled)
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.label && !_vm.value) ? _c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.textDisabled)
	    }
	  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('input', {
	    attrs: {
	      "type": "checkbox",
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "checked": _vm.value
	    },
	    on: {
	      "change": _vm.trigger
	    }
	  }), _vm._v(" "), _c('div')])
	},staticRenderFns: []}

/***/ }),
/* 281 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "js-tree"
	    }
	  })
	},staticRenderFns: []}

/***/ }),
/* 282 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  }, [_c('div', {
	    staticClass: "row vertical-10p"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('img', {
	    staticClass: "center-block logo",
	    attrs: {
	      "src": "/static/img/logo.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "text-center col-sm-6 col-sm-offset-3"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.500.errorHasOcurred")]), _vm._v(" "), _c('h4', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.500.contactAdmin")]), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.backToHome
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.500.backToHome')))])])])])])
	},staticRenderFns: []}

/***/ }),
/* 283 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.credentials.header")]), _vm._v(" "), _c('section', {
	    staticClass: "container"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "panel panel-info"
	  }, [_c('div', {
	    staticClass: "panel-body"
	  }, [_c('form', {
	    staticClass: "form-horizontal"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "panel-info-header"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "description-blockblock"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header"
	  }, [_vm._v("pages.credentials.currentPassword")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.oldPassword),
	      expression: "response.oldPassword"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Current",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.response.oldPassword)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.oldPassword = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Current')),
	      expression: "errors.has('Current')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Current')))])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "panel-info-header"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "description-blockblock"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header"
	  }, [_vm._v("pages.credentials.newPassword")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.newPassword),
	      expression: "response.newPassword"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "NewPassword",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.response.newPassword)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.newPassword = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('NewPassword')),
	      expression: "errors.has('NewPassword')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('NewPassword')))])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "panel-info-header"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "description-blockblock"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header"
	  }, [_vm._v("pages.credentials.confirmPassword")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.confNewPassword),
	      expression: "response.confNewPassword"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "ConfirmPassword",
	      "type": "password"
	    },
	    domProps: {
	      "value": (_vm.response.confNewPassword)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.confNewPassword = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('ConfirmPassword')),
	      expression: "errors.has('ConfirmPassword')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('ConfirmPassword')))])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('br'), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('button', {
	    staticClass: " col-sm-2 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        _vm.savePassword(_vm.response)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.credentials.saveButton')))])])])])])])])]), _vm._v(" "), _c('br')])])
	},staticRenderFns: []}

/***/ }),
/* 284 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, [_c('router-view')], 1)
	},staticRenderFns: []}

/***/ }),
/* 285 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  }, [_c('div', {
	    staticClass: "row vertical-10p"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('img', {
	    staticClass: "center-block logo",
	    attrs: {
	      "src": "/static/img/logo.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "text-center col-sm-6 col-sm-offset-3"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.logout.header")]), _vm._v(" "), _c('h4', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.logout.greeting")]), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.openGatewayLogin
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.logout.toLogin')))])])])])])
	},staticRenderFns: []}

/***/ }),
/* 286 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  }, [_c('div', {
	    staticClass: "row vertical-10p"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('img', {
	    staticClass: "center-block logo",
	    attrs: {
	      "src": "/static/img/logo.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "text-center col-sm-6 col-sm-offset-3"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.404.youAreLost")]), _vm._v(" "), _c('h4', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.404.pageDoesntExist")]), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.404.backToHome')))])], 1)])])])
	},staticRenderFns: []}

/***/ }),
/* 287 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  }, [_c('div', {
	    staticClass: "row vertical-10p"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('img', {
	    staticClass: "center-block logo",
	    attrs: {
	      "src": "/static/img/logo.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "text-center col-sm-6 col-sm-offset-3"
	  }, [_c('h2', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.403.forbbiden")]), _vm._v(" "), _c('h4', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.403.contactAdmin")]), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.backToHome
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.403.backToHome')))])])])])])
	},staticRenderFns: []}

/***/ }),
/* 288 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  }, [_c('div', {
	    staticClass: "row vertical-10p"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('img', {
	    staticClass: "center-block logo",
	    attrs: {
	      "src": "/static/img/logo.png"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "text-center col-sm-6 col-sm-offset-3"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.401.unauthorized")]), _vm._v(" "), _c('h4', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }]
	  }, [_vm._v("pages.401.pleaseDoLogin")]), _vm._v(" "), _c('button', {
	    on: {
	      "click": _vm.openGatewayLogin
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.401.clickHereToLogin')))])])])])])
	},staticRenderFns: []}

/***/ }),
/* 289 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.newNecessityItem) ? _c('modal', {
	    attrs: {
	      "showModal": _vm.showModal,
	      "closeAction": _vm.close
	    }
	  }, [_c('h1', {
	    slot: "header"
	  }, [_vm._v(_vm._s(_vm.t('pages.messages.necessityItem.header')))]), _vm._v(" "), _c('div', {
	    slot: "body"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.necessityItem.fields.productName")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true} }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.newNecessityItem.product.name),
	      expression: "newNecessityItem.product.name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Nome",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.newNecessityItem.product.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.newNecessityItem.product.name = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Nome')),
	      expression: "errors.has('Nome')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Nome')))]), _vm._v(" "), _c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.necessityItem.fields.quantity")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true,
	          numeric: true
	        }
	      }),
	      expression: "{ rules: { required: true , numeric:true} }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.newNecessityItem.quantity),
	      expression: "newNecessityItem.quantity"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Quantidade",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.newNecessityItem.quantity)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.newNecessityItem.quantity = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Quantidade')),
	      expression: "errors.has('Quantidade')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Quantidade')))]), _vm._v(" "), _c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.necessityItem.fields.deadline")]), _vm._v(" "), _c('datepicker', {
	    staticClass: "description-header align-left",
	    attrs: {
	      "language": "pt-br"
	    },
	    model: {
	      value: (_vm.newNecessityItem.deadline),
	      callback: function($$v) {
	        _vm.newNecessityItem.deadline = $$v
	      },
	      expression: "newNecessityItem.deadline"
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary btn-md pull-right",
	    on: {
	      "click": _vm.saveItemData
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), _c('br')], 1)]) : _vm._e(), _vm._v(" "), _c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.necessities.header")]), _vm._v(" "), _c('section', [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('showNecessity', {
	    attrs: {
	      "selectMethodCallback": _vm.selectNecessity,
	      "explosionButton": false
	    }
	  }), _vm._v(" "), (!_vm.necessityEdit) ? _c('button', {
	    staticClass: " col-sm-4 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.necessityEdit = true;
	        _vm.response = {};
	        _vm.showAddItem = false
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-plus",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" " + _vm._s(_vm.t('pages.necessity.button.newNecessity')))]) : _vm._e()], 1), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [(_vm.necessityEdit) ? _c('section', {
	    staticClass: "box box-info"
	  }, [_c('div', {
	    staticClass: "box-body"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.necessity.header")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.showNecessity.fields.name")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.name),
	      expression: "response.name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.name = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('name')),
	      expression: "errors.has('name')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('name')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header with-border"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.showNecessity.fields.description")]), _vm._v(" "), _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.description),
	      expression: "response.description"
	    }],
	    staticClass: "col-sm-12",
	    domProps: {
	      "value": (_vm.response.description)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.description = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), (_vm.showAddItem) ? _c('section', [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "information-label"
	  }, [_vm._v("pages.messages.showNecessity.products.choose")]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.showNecessity.products.all")]), _vm._v(" "), _c('showProducts', {
	    attrs: {
	      "removeButton": false,
	      "reloadButton": false,
	      "selectMethodCallback": _vm.selectProduct,
	      "selectButton": true,
	      "showTreeButton": false,
	      "insertTreeButton": false,
	      "previewTreeButton": false
	    }
	  })], 1), _vm._v(" "), (_vm.response) ? _c('div', {
	    staticClass: "col-sm-6"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.messages.showNecessity.fields.selected")]), _vm._v(" "), _c('necessityItem', {
	    attrs: {
	      "necessityId": _vm.response ? _vm.response._id : undefined
	    }
	  })], 1) : _vm._e()]) : _vm._e()]), _vm._v(" "), (_vm.roles && _vm.roles['manager.write']) ? _c('div', [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.saveData
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), _c('button', {
	    staticClass: "col-sm-2 btn btn-danger btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.necessityEdit = false;
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.close')))])]) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('br')])], 1)
	},staticRenderFns: []}

/***/ }),
/* 290 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    class: ['wrapper', _vm.classes]
	  }, [_c('header', {
	    staticClass: "main-header"
	  }, [_vm._m(0), _vm._v(" "), _c('nav', {
	    staticClass: "navbar navbar-static-top",
	    attrs: {
	      "role": "navigation"
	    }
	  }, [_vm._m(1), _vm._v(" "), _c('div', {
	    staticClass: "navbar-custom-menu"
	  }, [_c('ul', {
	    staticClass: "nav navbar-nav"
	  }, [_c('li', {
	    staticClass: "dropdown user user-menu"
	  }, [_c('a', {
	    staticClass: "dropdown-toggle",
	    attrs: {
	      "href": "javascript:;",
	      "data-toggle": "dropdown"
	    }
	  }, [_c('img', {
	    staticClass: "user-image",
	    attrs: {
	      "src": _vm.user.image,
	      "alt": "User Image"
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "hidden-xs"
	  }, [_vm._v(_vm._s(_vm.user.username))])])])])])])]), _vm._v(" "), _c('sidebar', {
	    attrs: {
	      "display-name": _vm.user.name,
	      "picture-url": _vm.user.image
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "content-wrapper"
	  }, [_c('section', {
	    staticClass: "content-header"
	  }, [_c('h1', [_vm._v("\n        " + _vm._s(_vm.$route.name.toUpperCase()) + "\n        "), _c('small', [_vm._v(_vm._s(_vm.$route.meta.description))])]), _vm._v(" "), _c('ol', {
	    staticClass: "breadcrumb"
	  }, [_vm._m(2), _vm._v(" "), _c('li', {
	    staticClass: "active"
	  }, [_vm._v(_vm._s(_vm.$route.name.toUpperCase()))])])]), _vm._v(" "), _c('router-view')], 1), _vm._v(" "), _c('footer', {
	    staticClass: "main-footer"
	  }, [_c('strong', [_vm._v("Copyright © " + _vm._s(_vm.year) + " "), _c('a', {
	    attrs: {
	      "href": "javascript:;"
	    }
	  }, [_vm._v("API MERP")]), _vm._v(".")]), _vm._v(" All rights reserved.\n  ")])], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('a', {
	    staticClass: "logo",
	    attrs: {
	      "href": "/"
	    }
	  }, [_c('span', {
	    staticClass: "logo-mini"
	  }, [_c('img', {
	    staticClass: "img-responsive center-block",
	    attrs: {
	      "src": "/static/img/copilot-logo-white.svg",
	      "alt": "Logo"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "logo-lg"
	  }, [_c('span', [_vm._v("Umaflex System")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('a', {
	    staticClass: "sidebar-toggle",
	    attrs: {
	      "href": "javascript:;",
	      "data-toggle": "offcanvas",
	      "role": "button"
	    }
	  }, [_c('span', {
	    staticClass: "sr-only"
	  }, [_vm._v("Toggle navigation")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('li', [_c('a', {
	    attrs: {
	      "href": "javascript:;"
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-home"
	  }), _vm._v("Home")])])
	}]}

/***/ }),
/* 291 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container container-table"
	  })
	},staticRenderFns: []}

/***/ }),
/* 292 */
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.products.header")]), _vm._v(" "), _c('section', [(!_vm.productEdit) ? _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('productData', {
	    ref: "productDataComponent",
	    attrs: {
	      "insertTreeButton": false,
	      "previewTreeButton": false,
	      "eventName": _vm.productData
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [(!_vm.productEdit) ? _c('button', {
	    staticClass: " col-sm-4 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.productEdit = true;
	        _vm.response = {
	          purchasePrice: 0
	        }
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-plus",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(_vm._s(_vm.t('pages.products.button.newProduct')))]) : _vm._e(), _vm._v(" "), (_vm.productEdit) ? _c('section', {
	    staticClass: "box box-info"
	  }, [_c('h1', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "text-center"
	  }, [_vm._v("pages.products.productData")]), _vm._v(" "), _c('div', {
	    staticClass: "box-body"
	  }, [_c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.code")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.code),
	      expression: "response.code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Code",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.code = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Code')),
	      expression: "errors.has('Code')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Code')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.name")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.name),
	      expression: "response.name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.name = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Name')),
	      expression: "errors.has('Name')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Name')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.family")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.family),
	      expression: "response.family"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "Family",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.family)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.family = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('Family')),
	      expression: "errors.has('Family')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('Family')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.productType")]), _vm._v(" "), _c('select', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.productType),
	      expression: "response.productType"
	    }],
	    staticClass: "pull-left form-control",
	    attrs: {
	      "name": "product_type"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.response.productType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("comprado")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("produzido")])]), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('product_type')),
	      expression: "errors.has('product_type')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('product_type')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.unitType")]), _vm._v(" "), _c('select', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true
	        }
	      }),
	      expression: "{ rules: { required: true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.unit),
	      expression: "response.unit"
	    }],
	    staticClass: "pull-left form-control",
	    attrs: {
	      "name": "unit"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.response.unit = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, [_c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "units"
	    }
	  }, [_vm._v("un")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "kg"
	    }
	  }, [_vm._v("kg")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "m"
	    }
	  }, [_vm._v("m")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "cm"
	    }
	  }, [_vm._v("cm")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "m²"
	    }
	  }, [_vm._v("m²")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "m³"
	    }
	  }, [_vm._v("m³")]), _vm._v(" "), _c('option', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    attrs: {
	      "value": "liters"
	    }
	  }, [_vm._v("l")])]), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('unit')),
	      expression: "errors.has('unit')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('unit')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.leadTime")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "validate",
	      rawName: "v-validate",
	      value: ({
	        rules: {
	          required: true,
	          numeric: true
	        }
	      }),
	      expression: "{ rules: { required: true, numeric:true } }"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.leadTime),
	      expression: "response.leadTime"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "name": "lead_time",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.response.leadTime)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.leadTime = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.errors.has('lead_time')),
	      expression: "errors.has('lead_time')"
	    }],
	    staticClass: "label label-danger"
	  }, [_vm._v(_vm._s(_vm.isErrors('lead_time')))])])]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.purchasePrice")]), _vm._v(" "), _c('vue-numeric', {
	    staticClass: "form-control",
	    attrs: {
	      "name": "purchase_price",
	      "type": "text",
	      "currency": "R$",
	      "separator": ".",
	      "precision": "2"
	    },
	    model: {
	      value: (_vm.response.purchasePrice),
	      callback: function($$v) {
	        _vm.response.purchasePrice = $$v
	      },
	      expression: "response.purchasePrice"
	    }
	  })], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-12"
	  }, [_c('div', {
	    staticClass: "box-header with-border"
	  }, [_c('h5', {
	    directives: [{
	      name: "translate",
	      rawName: "v-translate"
	    }],
	    staticClass: "description-header align-left"
	  }, [_vm._v("pages.products.label.description")]), _vm._v(" "), _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.response.description),
	      expression: "response.description"
	    }],
	    staticClass: "col-sm-12",
	    domProps: {
	      "value": (_vm.response.description)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.response.description = $event.target.value
	      }
	    }
	  })])])]), _vm._v(" "), (_vm.roles && _vm.roles['manager.write']) ? _c('div', {
	    staticClass: "row"
	  }, [_c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": _vm.createProduct
	    }
	  }, [_vm._v(_vm._s(_vm.t('pages.products.button.save')))]), _vm._v(" "), (_vm.productEdit) ? _c('button', {
	    staticClass: "col-sm-2 btn btn-primary btn-md pull-right",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": function($event) {
	        _vm.productEdit = false;
	        _vm.response = undefined
	      }
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-times",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }), _vm._v(" " + _vm._s(_vm.t('pages.products.button.close')))]) : _vm._e()]) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c('br')])])
	},staticRenderFns: []}

/***/ }),
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ })
]);
//# sourceMappingURL=app.1de87e87d742bca71ee9.js.map