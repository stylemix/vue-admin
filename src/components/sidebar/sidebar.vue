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
      <slot name="header">
        <sidebar-user></sidebar-user>
      </slot>

      <sidebar-menu
        :menu="menu"
        @on:click="$emit('on:item:click', $event)"
      ></sidebar-menu>
    </div>
    <!-- /sidebar content -->
  </div>
</template>

<script>
import SidebarMenu from './sidebar-menu'
import SidebarUser from './sidebar-user'
export default {
  name: 'Sidebar',
  components: { SidebarUser, SidebarMenu },
  props: {
    menu: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
