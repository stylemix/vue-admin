<template>
  <div class="root-container-stm">
    <slot name="navbar">
      <navbar :logo="logo"></navbar>
    </slot>

    <div class="page-content">
      <sidebar :menu="menu" @on:item:click="onMenuItemClick"></sidebar>

      <div class="content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'
import Config from '../../config'

export default {
  name: 'LayoutMain',

  components: {
    Sidebar,
    Navbar,
  },

  computed: {
    ...mapGetters('admin-preferences', ['logo']),
    menu() {
      return Config.sidebarMenu
    },
  },

  methods: {
    ...mapActions('admin-sidebar', ['expandItem']),
    onMenuItemClick(item) {
      if (item.children && item.children.length) this.expandItem(item)
      else if (item.onClick) item.onClick(item)
    },
  },
}
</script>

<style>
.root-container-stm {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
