<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1>You dont have authorization</h1>
            <h4>Please do login</h4>
            <button v-on:click='openGatewayLogin'>Click here to login</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import authService from '../services/authService'
  import securityBackend from '../apis/securityBackend'
  export default {
    name: 'unauthorized',
    methods: {
      openGatewayLogin () {
        securityBackend.openGatewayLogin(authService.getClientId(), authService.getRedirectURI())
      }
    }
  }
</script>

<style>
</style>
