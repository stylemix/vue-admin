import Vue from 'vue'
import Router from 'vue-router'
import MainView from './views/main-view'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/:module/:action?',
      name: 'module',
      component: () => import('./views/main-view')
    },
    // finally the default route, when none of the above matches
    {
      path: '*',
      name: '404',
      component: () => import('./views/errors/404-view.vue')
    },
  ]
})
