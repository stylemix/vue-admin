import Vue from 'vue'
import { AdminApp } from './index'
import router from './router'
import store from './store'

// register built in widgets
import './core'

// uncomment this line in production mode
import './mock/data'

// register models
import './models'

import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(AdminApp),
}).$mount('#app')
