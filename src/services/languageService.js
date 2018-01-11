import authService from './authService'

function loadLanguage (_self) {
  if (authService.getUser() === undefined) {
    _self.$translate.setLang(authService.getLanguage())
  } else {
    if(authService.getUser().language === undefined) {
      _self.$translate.setLang(authService.getLanguage())
    } else {
      _self.$translate.setLang(authService.getUser().language)
    }
  }
}

function getCurrentLanguage () {
  if (authService.getUser() === undefined) {
    return authService.getLanguage()
  } else {
    if(authService.getUser().language === undefined) {
      return authService.getLanguage()
    } else {
      return authService.getUser().language
    }
  }
}

module.exports = {
  loadLanguage,
  getCurrentLanguage
}
