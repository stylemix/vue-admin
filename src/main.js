import Vue from 'vue'
import Index from './views/index'
import router from './router'
import store from './store'

import sidebar from './core/interface/sidebar'

import './assets/scss/default/compile/bootstrap.scss'
import './assets/scss/default/compile/bootstrap_limitless.scss'
import './assets/fonts/icons/icomoon/styles.css'

// uncomment this line in production mode
import './mock/data'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production')
  new Vue({
    router,
    store,
    render: h => h(Index)
  }).$mount('#app')

export default {
  app: Index,
  store,
  sidebar
}
