import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router()

export default router

export function addDefaultRoutes() {
  router.addRoutes([
    {
      path: '/',
      name: 'default',
      component: () => import('./views/Default.vue'),
    },
    // finally the default route, when none of the above matches
    {
      path: '*',
      name: '404',
      component: () => import('./views/errors/404.vue'),
    },
  ])
}
