<template>
  <li
    v-if="menuItem.children"
    :class="menuItem.isOpen ? 'nav-item-expanded nav-item-open' : ''"
    class="nav-item nav-item-submenu"
  >
    <a href class="nav-link" @click.prevent="expand">
      <i
        v-if="menuItem.icon"
        :class="[menuItem.icon, menuItem.isOpen ? '' : 'text-muted']"
      />
      <i v-else style="margin-left: 1rem"></i>
      <span>{{ menuItem.labelTranslated }}</span>
    </a>

    <ul
      v-if="menuItem.children.length > 0"
      class="nav nav-group-sub"
      :data-submenu-title="menuItem.labelTranslated"
    >
      <li
        v-for="(child, index) in menuItem.children"
        :key="child.id || index"
        class="nav-item"
        @click.stop="onItemClick(child)"
      >
        <router-link v-if="child.route" :to="child.route" class="nav-link">
          {{ child.labelTranslated }}
        </router-link>
        <a v-else class="nav-link">{{ child.labelTranslated }}</a>
      </li>
    </ul>
  </li>

  <li v-else class="nav-item" @click="onItemClick(menuItem)">
    <router-link v-if="menuItem.route" :to="menuItem.route" class="nav-link">
      <i :class="menuItem.icon" class="text-muted"></i>
      <span>{{ menuItem.labelTranslated }}</span>
    </router-link>
    <a v-else class="nav-link">
      <i :class="menuItem.icon" class="text-muted"></i>
      <span>{{ menuItem.labelTranslated }}</span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'AdminSidebarMenuItem',

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

  methods: {
    expand() {
      this.menuItem.isOpen = !this.menuItem.isOpen
    },
    onItemClick(item) {
      if (item.children && item.children.length) {
        this.$emit('on:click', item)
      } else if (item.onClick) item.onClick(item)
    },
  },
}
</script>
