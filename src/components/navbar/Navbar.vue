<template>
  <b-navbar type="dark" toggleable="md">
    <button
      class="navbar-toggler sidebar-toggler"
      type="button"
      @click="toggleSidebarMobile"
    >
      <i class="icon-paragraph-justify3"></i>
    </button>
    <button
      class="navbar-toggler sidebar-toggler d-none d-md-block"
      type="button"
      @click.prevent="toggleSidebar"
    >
      <i class="icon-paragraph-justify3"></i>
    </button>
    <b-navbar-brand :to="defaultRoute">
      <img v-if="logoResolved" :src="logoResolved" :alt="brandName" />
      <span v-else>{{ brandName }}</span>
    </b-navbar-brand>
    <b-navbar-toggle target="navbar-collapse" class="navbar-toggler-right">
      <i class="icon-more"></i>
    </b-navbar-toggle>
    <b-collapse id="navbar-collapse" is-nav>
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
import { mapMutations, mapState } from 'vuex'
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
      brandName: 'brandName',
      logoUrl: 'logoUrl',
      defaultRoute: 'defaultRoute',
    }),
    logoResolved() {
      return this.logo || this.logoUrl
    },
  },
  methods: {
    ...mapMutations('admin', ['toggleSidebar', 'toggleSidebarMobile']),
  },
}
</script>
