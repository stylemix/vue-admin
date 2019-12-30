<template>
  <div class="navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
      <router-link :to="logoRoute" class="d-inline-block">
        <img :src="logo" alt="logo" />
      </router-link>
    </div>
    <div class="d-md-none">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-mobile"
        @click="showSubmenu = !showSubmenu"
      >
        <i class="icon-tree5"></i>
      </button>
      <button
        @click="onHamburgerClick"
        class="navbar-toggler sidebar-mobile-main-toggle d-none d-md-block"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
      <button
        @click="onMobileClick"
        class="navbar-toggler sidebar-mobile-main-toggle"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>
    <div
      :class="{ 'show': showSubmenu }"
      class="collapse navbar-collapse"
      id="navbar-mobile">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            href
            @click.prevent="onHamburgerClick"
            class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block"
          >
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>
      <div class="d-none d-md-flex">
         <slot name="extra-nav" />
      </div>
      <ul class="navbar-nav ml-auto user-info">
        <navbar-user></navbar-user>
      </ul>
    </div>
  </div>
</template>

<script>
import NavbarUser from './navbar-user'
import Config from '../../config'

export default {
  name: 'Navbar',
  components: { NavbarUser },
  data(){
    return {
      showSubmenu: false
    }
  },
  props: {
    logo: {
      type: String,
      default: null,
    }
  },
  computed: {
    logoRoute: () => Config.defaultRoute,
  },
  methods: {
    onHamburgerClick() {
      const classList = document.body.classList
      const found = classList.contains('sidebar-xs')
      if (found) classList.remove('sidebar-xs')
      else classList.add('sidebar-xs')
    },
    onMobileClick(){
      const classList = document.body.classList
      const found = classList.contains('sidebar-mobile-main')
      if (found) classList.remove('sidebar-mobile-main')
      else classList.add('sidebar-mobile-main')
    }
  },
}
</script>
<style lang="scss">
  @media (max-width: 768px){
    .user-info {
      .navbar-nav-link.dropdown-toggle {
        display: none;
      }
      .dropdown-menu.dropdown-menu-right {
        display: block !important;
      }
    }
  }
</style>
