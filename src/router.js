import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/models/:model/:action?',
      name: 'model',
      component: () => import('./views/main-view'),
    },
    // finally the default route, when none of the above matches
    {
      path: '*',
      name: '404',
      component: () => import('./views/errors/404-view.vue'),
    },
  ],
})
