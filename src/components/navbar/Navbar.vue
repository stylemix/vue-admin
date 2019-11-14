<template>
  <b-navbar type="dark" toggleable="md">
    <b-navbar-brand>
      <router-link :to="defaultRoute" class="d-inline-block">
        <img :src="logoResolved" alt="logo" />
      </router-link>
    </b-navbar-brand>
    <div class="d-none d-md-block">
      <button
        class="navbar-toggler sidebar-mobile-main-toggle"
        type="button"
        @click="onHamburgerClick"
      >
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>
    <b-navbar-toggle target="navbar-collapse" />
    <b-collapse id="navbar-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          href
          class="sidebar-control sidebar-main-toggle d-none d-md-block"
          @click.prevent="onHamburgerClick"
        >
          <i class="icon-paragraph-justify3"></i>
        </b-nav-item>
      </b-navbar-nav>
      <slot name="extra-nav" />
      <b-navbar-nav class="ml-auto">
        <language-switcher v-if="$store.state.languageSwitcher" />
        <navbar-user />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import NavbarUser from './NavbarUser'
import { mapState } from 'vuex'
import LanguageSwitcher from '../../modules/language-switcher/LanguageSwitcher'

export default {
  name: 'AdminNavbar',
  components: { LanguageSwitcher, NavbarUser },
  props: {
    logo: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState('adminConfig', {
      logoUrl: 'logoUrl',
      defaultRoute: 'defaultRoute',
    }),
    logoResolved() {
      return this.logo || this.logoUrl
    },
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
