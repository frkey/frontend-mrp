<template>
  <ul class="sidebar-menu">
    <li class="header">{{ t('pages.sidebar.category.principal') }}</li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page" v-translate>pages.sidebar.item.dashboard</span>
      </router-link>
    </li>

    <li class="header">{{ t('pages.sidebar.category.pcp') }}</li>
    <li class="treeview">
      <a>
        <i class="icon-code-fork"></i>
        <router-link to="/necessities"><i class="fa fa-circle-o text-blue"></i>
          <span class="page" v-translate>pages.sidebar.item.necessity</span>
        </router-link>
      </a>
      <a href="#">
        <i class="icon-code-fork"></i>
        <router-link to="/products"><i class="fa fa-circle-o text-blue"></i>
          <span class="page" v-translate>pages.sidebar.item.order</span>
        </router-link>
      </a>
      <a href="#">
        <i class="icon-code-fork"></i>
        <router-link to="/products"><i class="fa fa-circle-o text-blue"></i>
          <span class="page" v-translate>pages.sidebar.item.supply</span>
        </router-link>
      </a>
    </li>

    <li class="header">{{ t('pages.sidebar.category.stock') }}</li>
    <li class="treeview">
      <a href="#">
        <i class="icon-code-fork"></i>
        <span v-translate>pages.sidebar.item.productManagement</span>
        <span class="pull-right-container">
          <i class="fa fa-chevron-down fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/products"><i class="fa fa-circle-o text-red"></i>
            <span class="page" v-translate>pages.sidebar.item.products</span>
          </router-link>
        </li>
      </ul>
    </li>

    <li class="header">{{ t('pages.sidebar.category.configuration') }}</li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/credentials"><i class="fa fa-cog"></i>
        <span class="page" v-translate>pages.sidebar.item.credentials</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/logout"><i class="fa fa-sign-out"></i>
        <span class="page" v-translate>pages.sidebar.item.logout</span>
      </router-link>
    </li>

  </ul>
</template>
<script>
import languageService from '../services/languageService'
export default {
  name: 'SidebarName',
  methods: {
    toggleMenu (event) {
      // remove active from li
      var active = document.querySelector('li.pageLink.active')

      if (active) {
        active.classList.remove('active')
      }
      // window.$('li.pageLink.active').removeClass('active')
      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    }
  },
  mounted () {
    languageService.loadLanguage(this)
  }
}
</script>
<style>
.sidebar-menu{
  min-height: 660px;
}
.sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }
.sidebar-menu li.active>a>.fa-chevron-down, .sidebar-menu li.active>a>.pull-right-container>.fa-chevron-down {
  animation-name: rotate;
  animation-duration: .2s;
  animation-fill-mode: forwards;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-180deg);
  }
}
</style>
