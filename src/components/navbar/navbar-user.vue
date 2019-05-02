<template>
  <li
    v-if="user"
    class="nav-item dropdown dropdown-user">
    <a
      @click="() => (show = !show)"
      @focusout="onFocusOut"
      href="#"
      class="navbar-nav-link dropdown-toggle"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <img
        :src="user && user.avatar ? user.avatar : placeholder"
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
      <router-link
        v-if="!actions || actions.length === 0"
        to="/logout"
        class="dropdown-item"
      >
        <i class="icon-switch2"></i>Logout
      </router-link>
    </div>
  </li>
</template>

<script>
import placeholderImg from '../../assets/images/placeholders/placeholder.jpg'
import { mapGetters } from 'vuex'

export default {
  name: 'NavbarUser',

  data() {
    return {
      show: false,
      placeholder: placeholderImg,
    }
  },

  methods: {
    onFocusOut() {
      // handle action click before focus out!!!
      setTimeout(() => (this.show = !this.show), 500)
    },
  },

  computed: mapGetters('admin-account', ['user', 'actions']),
}
</script>
