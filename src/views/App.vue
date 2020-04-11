<template>
  <component :is="layout">
    <router-view ref="content" />
    <template slot="header">
      <router-view ref="header" name="header" />
    </template>
  </component>
</template>

<script>
import LayoutMain from '../components/layout/LayoutMain'
import Vue from 'vue'

export default {
  name: 'AdminApp',

  computed: {
    layout() {
      return (this.$route.meta && this.$route.meta.layout) || LayoutMain
    },
  },

  beforeCreate() {
    this.$refs = Vue.observable({
      header: undefined,
      content: undefined,
    })
  },
}
</script>
