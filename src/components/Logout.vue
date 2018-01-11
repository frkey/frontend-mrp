<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1 v-translate>pages.logout.header</h1>
            <h4 v-translate>pages.logout.greeting</h4>
            <button v-on:click='openGatewayLogin'>{{ t('pages.logout.toLogin') }}</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import authService from '../services/authService'
  import securityBackend from '../apis/securityBackend'
  import languageService from '../services/languageService'
  export default {
    name: 'logout',
    methods: {
      openGatewayLogin () {
        securityBackend.openGatewayLogin(authService.getClientId(), authService.getRedirectURI())
      },
      logout () {
        var _self = this
        securityBackend.logout(authService.getAccessToken(), authService.getRefreshToken(), (response) => {
          authService.setUser(undefined)
          authService.setAccessToken(undefined)
          authService.setRefreshToken(undefined)
        }, (error) => {
          if (error) {
            _self.$router.replace('/error')
          }
        })
      }
    },
    mounted () {
      languageService.loadLanguage(this)
      this.logout()
    }
  }
</script>

<style>
</style>
