<template>
  <ul class="sidebar-menu">
    <li class="header">Principal</li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>

    <li class="header">CONFIGURATION</li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/credentials"><i class="fa fa-cog"></i>
        <span class="page">Credentials</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/logout"><i class="fa fa-sign-out"></i>
        <span class="page">Logout</span>
      </router-link>
    </li>

  </ul>
</template>
<script>
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
  }
}
</script>
<style>
.sidebar-menu{
  min-height: 660px;
}
</style>
