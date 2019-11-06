import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // finally the default route, when none of the above matches
    {
      path: '*',
      name: '404',
      component: () => import('./views/errors/404.vue'),
    },
  ],
})
