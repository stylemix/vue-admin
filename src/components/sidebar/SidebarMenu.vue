<template>
  <div class="card card-sidebar-mobile">
    <ul class="nav nav-sidebar" data-nav-type="accordion">
      <template v-for="(items, header) in sortedMenu">
        <li v-if="header" :key="header" class="nav-item-header">
          <div class="text-uppercase font-size-xs line-height-xs">
            {{ header }}
          </div>
          <i class="icon-menu font-size-xs" :title="header"></i>
        </li>
        <sidebar-menu-item
          v-for="(item, index) in items"
          :key="`${header}${index}`"
          :item="item"
          @on:click="$emit('on:click', $event)"
        />
      </template>
    </ul>
  </div>
</template>

<script>
import groupBy from 'lodash-es/groupBy'
import sortBy from 'lodash-es/sortBy'
import SidebarMenuItem from './SidebarMenuItem'

export default {
  name: 'AdminSidebarMenu',
  components: { SidebarMenuItem },
  props: {
    menu: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    sortedMenu() {
      return groupBy(sortBy(this.menu, ['order']), item => {
        if (!item.header) {
          return ''
        }

        return item.header.startsWith('$t.')
          ? this.$t(item.header.replace('$t.', ''))
          : item.header
      })
    },
  },
}
</script>
