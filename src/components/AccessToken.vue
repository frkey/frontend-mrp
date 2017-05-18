<template>
  <div class="container container-table">

  </div>
</template>
<script>
  import authService from '../services/authService'
  import securityBackend from '../apis/securityBackend'
  var qs = require('qs')

  export default {
    name: 'AccessToken',
    methods: {

      getToken () {
        var _self = this
        var data = {
          'grant_type': 'authorization_code',
          'code': this.$route.query.code
        }
        securityBackend.accessToken(qs.stringify(data), {
          auth: {
            username: authService.getClientId(),
            password: authService.getClientSecret()
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }, (res) => {
          console.log(res.data)
          authService.setAccessToken(res.data.access_token)
          authService.setRefreshToken(res.data.refresh_token)
          _self.$router.replace('/')
        }, (error) => {
          if (error) {
            console.log(JSON.stringify(error))
            authService.setAccessToken('')
            authService.setRefreshToken('')
            window.location.href = '/error'
          }
        })
      }
    },
    mounted () {
      this.getToken()
    }
  }
</script>

<style>
</style>
