import Vue from 'vue'
import Axios from 'axios'
import { mapState } from 'vuex'
import AdminRouter from '../../router'
import AdminStore from '../../store'
import AuthStore from './store'
import Config from '../../config'
import AuthConfig from './config'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgotForm from './ForgotForm'
import AdminConfig from '../../core/interface/config'

AdminStore.registerModule('admin-auth', AuthStore)

AdminRouter.addRoutes([
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm,
    meta: {
      guest: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotForm,
    meta: {
      guest: true,
    },
  },
])

AuthConfig.onLogout = () => {
  AdminStore.dispatch('admin-auth/logout').then(() => {
    AdminStore.commit('admin-auth/account', null)
    AdminRouter.push({ name: AuthConfig.routes.login })
  })
}

Axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      AdminStore.dispatch('admin-auth/logout')
    }

    return Promise.reject(error)
  },
)

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
  } else {
    AdminRouter.push({ name: 'login' })
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
    text: AuthConfig.textMenuLogout,
  },
])
