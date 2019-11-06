<template>
  <component :is="layout">
    <router-view />
    <template slot="header">
      <router-view name="header" />
    </template>
  </component>
</template>

<script>
import LayoutMain from '../components/layout/LayoutMain'

export default {
  name: 'AdminApp',

  computed: {
    layout() {
      return (this.$route.meta && this.$route.meta.layout) || LayoutMain
    },
  },
}
</script>
