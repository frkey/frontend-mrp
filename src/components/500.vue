<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1 v-translate>pages.500.errorHasOcurred</h1>
            <h4 v-translate>pages.500.contactAdmin</h4>
            <button v-on:click='backToHome'>{{ t('pages.500.backToHome') }}</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import languageService from '../services/languageService'
  export default {
    name: 'error',
    methods: {
      backToHome () {
        window.location.href = '/'
      }
    },
    mounted () {
      languageService.loadLanguage(this)
    }
  }
</script>

<style>
</style>
