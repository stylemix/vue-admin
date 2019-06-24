<template>
  <li v-if="account" class="nav-item dropdown dropdown-user">
    <a
      @click="() => (show = !show)"
      @focusout="onFocusOut"
      href="#"
      class="navbar-nav-link dropdown-toggle"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="account && account.avatar ? account.avatar : ''"
        class="rounded-circle"
        alt=""
      />
      <span>{{ account.name }}</span>
    </a>

    <div class="dropdown-menu dropdown-menu-right" :class="{ show: show }">
      <template v-for="(action, index) in sortedMenu">
        <div v-if="action.divider" :key="index" class="dropdown-divider"></div>
        <router-link
          v-else-if="action.route"
          :to="action.route"
          :key="index"
          class="dropdown-item"
          @click="action.onClick && !action.route ? action.onClick(action) : ''"
        >
          <i v-if="action.icon" :class="action.icon"></i>
          {{ getItemText(action) }}
        </router-link>
        <a
          v-else
          :href="action.path"
          class="dropdown-item"
          :key="index"
          @click="action.onClick && !action.route ? action.onClick(action) : ''"
        >
          <i v-if="action.icon" :class="action.icon"></i>
          {{ getItemText(action) }}
        </a>
      </template>
    </div>
  </li>
</template>

<script>
import sortBy from 'lodash-es/sortBy'
import { mapGetters } from 'vuex'
import Config from '../../config'

export default {
  name: 'NavbarUser',

  data() {
    return {
      show: false,
    }
  },

  methods: {
    onFocusOut() {
      // handle action click before focus out!!!
      setTimeout(() => (this.show = !this.show), 500)
    },
    getItemText(item) {
      return typeof item.text === 'function' ? item.text(this) : item.text
    },
  },

  computed: {
    ...mapGetters('admin-auth', ['account']),
    sortedMenu() {
      return sortBy(Config.accountMenu, ['order'])
    },
  },
}
</script>
