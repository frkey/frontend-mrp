<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1 v-translate>pages.401.unauthorized</h1>
            <h4 v-translate>pages.401.pleaseDoLogin</h4>
            <button v-on:click='openGatewayLogin'>{{ t('pages.401.clickHereToLogin') }}</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import authService from '../services/authService'
  import languageService from '../services/languageService'
  import securityBackend from '../apis/securityBackend'

  export default {
    name: 'unauthorized',
    methods: {
      openGatewayLogin () {
        securityBackend.openGatewayLogin(authService.getClientId())
      }
    },
    mounted () {
      languageService.loadLanguage(this)
    }
  }
</script>

<style>
</style>
