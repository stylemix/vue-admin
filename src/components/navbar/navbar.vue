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
      >
        <i class="icon-tree5"></i>
      </button>
      <button
        @click="onHamburgerClick"
        class="navbar-toggler sidebar-mobile-main-toggle"
        type="button"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
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
      <slot name="extra-nav" />
      <ul class="navbar-nav ml-auto">
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
  props: {
    logo: {
      type: String,
      default: null,
    },
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
  },
}
</script>
