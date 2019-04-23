<template>
  <div>
    <navbar></navbar>

    <div class="page-content">
      <sidebar :menu="menu" @on:item:click="onMenuItemClick"></sidebar>
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
    ...mapActions('sidebar', ['expandMenuItem']),
    onMenuItemClick(item) {
      if (item.children && item.children.length) this.expandMenuItem(item)
      else if (item.onClick) item.onClick(item)
    }
  }
}
</script>
