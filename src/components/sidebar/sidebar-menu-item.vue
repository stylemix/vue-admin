<template>
  <li
    v-if="menuItem.children"
    :class="menuItem.isOpen ? 'nav-item-expanded nav-item-open' : ''"
    class="nav-item nav-item-submenu"
  >
    <a href @click.prevent="expand" class="nav-link">
      <i
        v-if="menuItem.icon"
        :class="[menuItem.icon, menuItem.isOpen ? '' : 'text-muted']"
      />
      <i v-else style="margin-left: 1rem"></i>
      <span>{{ itemText }}</span>
    </a>

    <ul
      v-if="menuItem.children && menuItem.children.length > 0"
      class="nav nav-group-sub"
      :data-submenu-title="itemText"
    >
      <li
        v-for="(child, index) in menuItem.children"
        :key="child.id || index"
        @click.stop="onItemClick(child)"
        class="nav-item"
      >
        <router-link v-if="child.route" :to="child.route" class="nav-link">
          {{ getItemText(child) }}
        </router-link>
        <a v-else class="nav-link">{{ getItemText(child) }}</a>
      </li>
    </ul>
  </li>

  <li v-else class="nav-item" @click="onItemClick(menuItem)">
    <router-link v-if="menuItem.route" :to="menuItem.route" class="nav-link">
      <i :class="menuItem.icon" class="text-muted"></i>
      <span>{{ itemText }}</span>
    </router-link>
    <a v-else class="nav-link">
      <i :class="menuItem.icon" class="text-muted"></i>
      <span>{{ itemText }}</span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'SidebarMenuItem',

  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      menuItem: this.item,
    }
  },

  computed: {
    itemText() {
      return this.getItemText(this.menuItem)
    },
  },

  methods: {
    expand() {
      this.menuItem.isOpen = !this.menuItem.isOpen
    },
    onItemClick(item) {
      if (item.children && item.children.length) {
        this.$emit('on:click', item)
      } else if (item.onClick) item.onClick(item)
    },
    getItemText(item) {
      return typeof item.text === 'function' ? item.text(this) : item.text
    },
  },
}
</script>
