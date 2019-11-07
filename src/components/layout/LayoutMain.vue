<template>
  <div class="root-container-stm">
    <slot name="navbar">
      <navbar />
    </slot>
    <div class="page-content">
      <sidebar />
      <div class="content-wrapper">
        <slot name="header">
          <page-header />
        </slot>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
}
</script>

<style>
.root-container-stm {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
