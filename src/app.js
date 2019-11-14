import Vue from 'vue'
import router from './router'
import store from './store'
import AdminApp from './views/App'
import Admin from './admin'

const app = new Vue({
  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  mixins: Admin.hooks.applyFilters('mixins', []),

  beforeCreate() {
    Admin.hooks.doAction('beforeCreate', this)
  },

  created() {
    Admin.hooks.doAction('created', this)
  },

  beforeMount() {
    Admin.hooks.doAction('beforeMount', this)
  },

  mounted() {
    Admin.hooks.doAction('mounted', this)
  },

  beforeUpdate() {
    Admin.hooks.doAction('beforeUpdate', this)
  },

  updated() {
    Admin.hooks.doAction('updated', this)
  },

  beforeDestroy() {
    Admin.hooks.doAction('beforeDestroy', this)
  },

  destroyed() {
    Admin.hooks.doAction('destroyed', this)
  },

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(AdminApp),
})

export default app
