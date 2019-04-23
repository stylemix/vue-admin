<template>
  <div>
    <li v-if="item.children" :class="itemCss" @click="onItemClick(item)">
      <router-link v-if="item.router" :to="item.router">
        <i v-if="item.icon" :class="item.icon"></i>
        <i v-else style="margin-left: 1rem"></i>
        <span>{{ item.text }}</span>
      </router-link>
      <a v-else class="nav-link">
        <i v-if="item.icon" :class="item.icon"></i>
        <i v-else style="margin-left: 1rem"></i>
        <span>{{ item.text }}</span>
      </a>

      <ul class="nav nav-group-sub" data-submenu-title="Starter kit">
        <li
          v-for="(child, index) in item.children"
          :key="child.id || index"
          @click.stop="onItemClick(child)"
          class="nav-item"
        >
          <router-link v-if="child.router" :to="child.router" class="nav-link">
            {{ child.text }}
          </router-link>
          <a v-else class="nav-link">{{ child.text }}</a>
        </li>
      </ul>
    </li>

    <li v-else-if="item.header" class="nav-item-header">
      <div class="text-uppercase font-size-xs line-height-xs">
        {{ item.text }}
      </div>
    </li>

    <li v-else class="nav-item" @click="onItemClick(item)">
      <router-link v-if="item.router" :to="item.router" class="nav-link">
        <i :class="item.icon"></i>
        <span>{{ item.text }}</span>
      </router-link>
      <a v-else class="nav-link">
        <i :class="item.icon"></i>
        <span>{{ item.text }}</span>
      </a>
    </li>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenuItem',

  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    itemCss() {
      if (this.item.isOpen)
        return 'nav-item nav-item-submenu nav-item-expanded nav-item-open'
      else return 'nav-item nav-item-submenu'
    }
  },

  methods: {
    onItemClick(item) {
      if (item.children && item.children.length) {
        this.$emit('on:click', item)
      } else if (item.onClick) item.onClick(item)
    }
  }
}
</script>
