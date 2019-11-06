import Vue from 'vue'
import router from './router'
import store from './store'
import AdminApp from './views/App'
import AuthMixin from './modules/auth/AuthMixin'

const app = new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  mixins: [AuthMixin],

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(AdminApp),
})

export default app
