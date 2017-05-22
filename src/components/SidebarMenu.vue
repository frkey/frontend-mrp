<template>
  <ul class="sidebar-menu">
    <li class="header">PRINCIPAL</li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>

    <li class="header">STOCK</li>
    <li class="treeview">
      <a href="#">
        <i class="icon-code-fork"></i>
        <span>Product Management</span>
        <span class="pull-right-container">
          <i class="fa fa-chevron-down fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/products"><i class="fa fa-circle-o text-red"></i>
            <span class="page">Products</span>
          </router-link>
        </li>
        <li>
          <router-link to="/products/structure"><i class="fa fa-circle-o text-blue"></i>
            <span class="page">Structure</span>
          </router-link>
        </li>
      </ul>
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
