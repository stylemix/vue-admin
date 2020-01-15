<template>
  <b-navbar type="dark" toggleable="md">
    <button class="navbar-toggler" type="button" @click="toggleSidebarMobile">
      <i class="icon-paragraph-justify3"></i>
    </button>
    <b-navbar-brand :to="defaultRoute">
      <img v-if="logoResolved" :src="logoResolved" :alt="brandName" />
      <span v-else>{{ brandName }}</span>
    </b-navbar-brand>
    <b-navbar-nav class="d-none d-md-block">
      <b-nav-item href="#" @click.prevent="toggleSidebar">
        <i class="icon-arrow-left32 sidebar-collapse-handler"></i>
        <i class="icon-arrow-right32 sidebar-expand-handler"></i>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-toggle target="navbar-collapse">
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
