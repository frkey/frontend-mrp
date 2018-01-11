<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-sm-6 col-sm-offset-3">
            <h1 v-translate>pages.404.youAreLost</h1>
            <h4 v-translate>pages.404.pageDoesntExist</h4>
            <router-link to="/">{{ t('pages.404.backToHome') }}</router-link>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import languageService from '../services/languageService'
export default {
  name: 'NotFound',
  mounted () {
    languageService.loadLanguage(this)
  }
}
</script>

<style>
</style>
