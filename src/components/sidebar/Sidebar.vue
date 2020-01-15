<template>
  <div class="sidebar sidebar-dark sidebar-main sidebar-expand-md">
    <!-- Sidebar mobile toggler -->
    <div class="sidebar-mobile-toggler text-center">
      <a href @click.prevent="toggleSidebarMobile">
        <i class="icon-arrow-left8"></i>
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
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AdminSidebar',
  components: { SidebarMenu },
  props: {
    menu: {
      type: Array,
      default: null,
    },
  },
  computed: {
    ...mapState('admin', ['navigation']),
    menuResolved() {
      return this.menu || this.navigation
    },
  },
  methods: {
    ...mapMutations('admin', ['toggleSidebarMobile']),
  },
}
</script>
