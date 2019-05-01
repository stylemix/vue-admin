<template>
  <li v-if="user" class="nav-item dropdown dropdown-user">
    <a
      @click="() => (show = !show)"
      @focusout="onFocusOut"
      href="#"
      class="navbar-nav-link dropdown-toggle"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="user && user.avatar ? user.avatar : ''"
        class="rounded-circle"
        alt=""
      />
      <span>{{ user.name }}</span>
    </a>

    <div class="dropdown-menu dropdown-menu-right" :class="{ show: show }">
      <template v-for="(action, index) in actions">
        <div v-if="action.divider" :key="index" class="dropdown-divider"></div>
        <router-link
          v-else-if="action.route"
          :to="action.route"
          :key="index"
          class="dropdown-item"
          @click="action.onClick && !action.route ? action.onClick(action) : ''"
        >
          <i v-if="action.icon" :class="action.icon"></i>{{ action.text }}
          {{ action.text }}
        </router-link>
        <a
          v-else
          :href="action.path"
          class="dropdown-item"
          :key="index"
          @click="action.onClick && !action.route ? action.onClick(action) : ''"
          ><i v-if="action.icon" :class="action.icon"></i>{{ action.text }}</a
        >
      </template>
      <a @click="logout" class="dropdown-item">
        <i class="icon-switch2"></i>Logout
      </a>
    </div>
  </li>
</template>

<script>
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
    logout() {
      if (Config.authHandler && Config.authHandler.onLogout) {
        Config.authHandler.onLogout()
      }
    },
    onFocusOut() {
      // handle action click before focus out!!!
      setTimeout(() => (this.show = !this.show), 500)
    },
  },

  computed: mapGetters('admin-account', ['user', 'actions']),
}
</script>
