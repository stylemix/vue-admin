<template>
  <div>
    <navbar></navbar>

    <div class="page-content">
      <sidebar :menu="menu" @on:item:click="onMenuItemClick"></sidebar>

      <div class="content-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LayoutMain',

  components: {
    Sidebar,
    Navbar
  },

  computed: {
    ...mapGetters('sidebar', ['menu'])
  },

  methods: {
    ...mapActions('sidebar', ['expandItem']),
    onMenuItemClick(item) {
      if (item.children && item.children.length) this.expandItem(item)
      else if (item.onClick) item.onClick(item)
    }
  }
}
</script>
