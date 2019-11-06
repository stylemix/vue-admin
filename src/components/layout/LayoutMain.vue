<template>
  <div class="root-container-stm">
    <slot name="navbar">
      <navbar :logo="logo" />
    </slot>
    <div class="page-content">
      <sidebar ref="sidebar" />
      <div class="content-wrapper">
        <slot name="header">
          <page-header ref="pageHeader" />
        </slot>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import PageHeader from './PageHeader'

export default {
  name: 'AdminLayout',

  components: {
    Sidebar,
    Navbar,
    PageHeader,
  },

  computed: {
    ...mapGetters('admin-preferences', ['logo']),
  },

  methods: {
    ...mapMutations('admin', ['pageHeader']),
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
