<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h2 v-translate>pages.403.forbbiden</h2>
            <h4 v-translate>pages.403.contactAdmin</h4>
            <button v-on:click='backToHome'>{{ t('pages.403.backToHome') }}</button>
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
