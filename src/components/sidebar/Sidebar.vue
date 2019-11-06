<template>
  <div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">
    <!-- Sidebar mobile toggler -->
    <div class="sidebar-mobile-toggler text-center">
      <a href="#" class="sidebar-mobile-main-toggle">
        <i class="icon-arrow-left8"></i>
      </a>
      Navigation
      <a href="#" class="sidebar-mobile-expand">
        <i class="icon-screen-full"></i>
        <i class="icon-screen-normal"></i>
      </a>
    </div>
    <!-- /sidebar mobile toggler -->

    <!-- sidebar content -->
    <div class="sidebar-content">
      <slot name="header"></slot>
      <sidebar-menu :menu="menuResolved" />
    </div>
    <!-- /sidebar content -->
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu'
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  components: { SidebarMenu },
  props: {
    menu: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapState('admin', {
      navigation: 'navigation',
    }),
    menuResolved() {
      return this.menu || this.navigation
    },
  },
}
</script>
