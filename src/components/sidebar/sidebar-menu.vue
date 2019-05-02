<template>
  <div class="card card-sidebar-mobile">
    <ul class="nav nav-sidebar" data-nav-type="accordion">
      <sidebar-menu-item
        v-for="(item, index) in menu"
        :key="index"
        :item="item"
        @on:click="$emit('on:click', $event)"
      ></sidebar-menu-item>
    </ul>
  </div>
</template>

<script>
import SidebarMenuItem from './sidebar-menu-item'
export default {
  name: 'SidebarMenu',
  components: { SidebarMenuItem },
  props: {
    menu: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
