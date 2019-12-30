<template>
  <div
    :class="{ 'sidebar-fullscreen': fullScreenSidebar }"
    class="sidebar sidebar-dark sidebar-main sidebar-expand-md"
  >
    <!-- Sidebar mobile toggler -->
    <div class="sidebar-mobile-toggler text-center">
      <a href @click.prevent="onMobileClick" class="sidebar-mobile-main-toggle">
        <i class="icon-arrow-left8"></i>
      </a>
      Navigation
      <a href @click.prevent="fullScreenSidebar = !fullScreenSidebar"
         class="sidebar-mobile-expand">
        <i class="icon-screen-full"></i>
        <i class="icon-screen-normal"></i>
      </a>
    </div>
    <!-- /sidebar mobile toggler -->

    <!-- sidebar content -->
    <div class="sidebar-content">
      <slot name="header"></slot>

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

export default {
  name: 'Sidebar',
  components: { SidebarMenu },
  data(){
    return {
      fullScreenSidebar: false,
    }
  },
  props: {
    menu: {
      type: Array,
      default() {
        return []
      },
    },
    title: {
      type: String,
      default: null,
    }
  },
  methods: {
    onMobileClick(){
      const classList = document.body.classList
      const found = classList.contains('sidebar-mobile-main')
      if (found) {
        classList.remove('sidebar-mobile-main')
      }else  {
        classList.add('sidebar-mobile-main')
      }
      this.fullScreenSidebar = false
    }
  }
}
</script>
<style lang="scss">
  .header-elements {
    background-color: #fff;
  }
</style>
