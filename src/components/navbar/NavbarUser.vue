<template>
  <b-nav-item-dropdown v-if="account" right class="dropdown-user">
    <template slot="button-content">
      <img
        v-if="account && account.avatar"
        :src="account.avatar"
        class="rounded-circle"
        :alt="account.name"
      />
      <span>{{ account.name }}</span>
    </template>

    <template v-for="(action, index) in sortedMenu">
      <div v-if="action.divider" :key="index" class="dropdown-divider"></div>
      <b-dropdown-item
        v-else-if="action.route"
        :key="index"
        :to="action.route"
        @click="action.onClick && !action.route ? action.onClick(action) : ''"
      >
        <i v-if="action.icon" :class="action.icon"></i>
        {{ getItemText(action) }}
      </b-dropdown-item>
      <b-dropdown-item
        v-else
        :key="index"
        :href="action.path"
        @click="action.onClick && !action.route ? action.onClick(action) : ''"
      >
        <i v-if="action.icon" :class="action.icon"></i>
        {{ getItemText(action) }}
      </b-dropdown-item>
    </template>
  </b-nav-item-dropdown>
</template>

<script>
import sortBy from 'lodash-es/sortBy'
import { mapGetters } from 'vuex'
import Config from '../../config'

export default {
  name: 'AdminNavbarUser',

  data() {
    return {
      show: false,
    }
  },

  computed: {
    ...mapGetters('adminAuth', ['account']),
    sortedMenu() {
      return sortBy(Config.accountMenu, ['order'])
    },
  },

  methods: {
    getItemText(item) {
      return typeof item.text === 'function' ? item.text(this) : item.text
    },
  },
}
</script>
