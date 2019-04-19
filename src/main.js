import Vue from 'vue'
import Index from './views/index'
import router from './router'
import store from './store'

import './assets/scss/default/compile/bootstrap.scss'
import './assets/scss/default/compile/bootstrap_limitless.scss'
import './assets/fonts/icons/icomoon/styles.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Index)
}).$mount('#app')
