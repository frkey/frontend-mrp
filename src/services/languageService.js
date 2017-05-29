import authService from './authService'


function loadLanguage (_self) {
  _self.$translate.setLang(authService.getLanguage())
}

export default {
  loadLanguage
}
