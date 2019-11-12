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

    <template v-for="(item, index) in accountNavSorted">
      <div v-if="item.divider" :key="index" class="dropdown-divider"></div>
      <b-dropdown-item
        v-else-if="item.route"
        :key="index"
        :to="item.route"
        @click="item.onClick && !item.route ? item.onClick(item) : ''"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.labelTranslated }}
      </b-dropdown-item>
      <b-dropdown-item
        v-else
        :key="index"
        :href="item.path"
        @click="item.onClick && !item.route ? item.onClick(item) : ''"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.labelTranslated }}
      </b-dropdown-item>
    </template>
  </b-nav-item-dropdown>
</template>

<script>
import sortBy from 'lodash-es/sortBy'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AdminNavbarUser',

  data() {
    return {
      show: false,
    }
  },

  computed: {
    ...mapState('admin', ['accountNav']),
    ...mapGetters('adminAuth', ['account']),
    accountNavSorted() {
      return sortBy(this.accountNav, ['order'])
    },
  },
}
</script>
