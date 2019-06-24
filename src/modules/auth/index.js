import Vue from 'vue'
import Axios from 'axios'
import { mapState } from 'vuex'
import AdminRouter from '../../router'
import AdminStore from '../../store'
import AuthStore from './store'
import Config from '../../config'
import AuthConfig from './config'
import AdminConfig from '../../core/interface/config'
import LoginForm from './LoginForm'
import strings from '../../strings'

AdminStore.registerModule('admin-auth', AuthStore)

AdminRouter.addRoutes([
  {
    path: '/login',
    name: AuthConfig.routes.login,
    component: AuthConfig.loginForm || LoginForm,
    meta: {
      guest: true,
    },
  },
])

if (AuthConfig.withRegistration) {
  AdminRouter.addRoutes([
    {
      path: '/register',
      name: AuthConfig.routes.register,
      component: AuthConfig.registerForm || (() => import('./RegisterForm')),
      meta: {
        guest: true,
      },
    },
  ])
}

if (AuthConfig.withForgot) {
  AdminRouter.addRoutes([
    {
      path: '/forgot-password',
      name: AuthConfig.routes.forgot,
      component: AuthConfig.forgotForm || (() => import('./ForgotForm')),
      meta: {
        guest: true,
      },
    },
  ])
}

AuthConfig.onLogout = () => {
  AdminStore.dispatch('admin-auth/logout').then(() => {
    AdminStore.commit('admin-auth/account', null)
    AdminRouter.push({ name: AuthConfig.routes.login })
  })
}

if (AuthConfig.withHttpInterceptor) {
  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        AdminStore.dispatch('admin-auth/logout')
      }

      return Promise.reject(error)
    },
  )
}

AdminRouter.beforeEach((to, from, next) => {
  if (
    to.matched.some(m => m.meta.auth) &&
    !AdminStore.state['admin-auth'].authenticated
  ) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({ name: AuthConfig.routes.login })
  } else if (
    to.matched.some(m => m.meta.guest) &&
    AdminStore.state['admin-auth'].authenticated
  ) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next(Config.defaultRoute)
  } else {
    next()
  }
})

AdminStore.dispatch('admin-auth/check').then(result => {
  if (result) {
    AdminStore.dispatch('admin-auth/find')
  }
})

// Allow access some useful state data for all components
Vue.mixin({
  computed: {
    ...mapState('admin-auth', {
      $authenticated: 'authenticated',
    }),
    ...mapState('admin-auth', {
      $account: 'account',
    }),
  },
})

AdminConfig.pushAccountMenuItems([
  {
    order: 100,
    onClick() {
      if (AuthConfig.onLogout) {
        AuthConfig.onLogout()
      }
    },
    icon: 'icon-switch2',
    get text() {
      return strings.auth.sign_out
    },
  },
])
