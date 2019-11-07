import Vue from 'vue'
import Axios from 'axios'
import { mapState } from 'vuex'
import Admin from '../../admin'
import AuthStore from './store'
import AuthConfig from './config'
import AdminConfig from '../../facades/config'
import LoginForm from './LoginForm'
import strings from '../../strings'
import LoginView from './LoginView'
import ForgotView from './ForgotView'
import RegisterView from './RegisterView'

Admin.store.registerModule('adminAuth', AuthStore)

Admin.router.addRoutes([
  {
    path: '/login',
    name: AuthConfig.routes.login,
    component: AuthConfig.loginForm || LoginForm,
    meta: {
      layout: LoginView,
      guest: true,
    },
  },
])

if (AuthConfig.withRegistration) {
  Admin.router.addRoutes([
    {
      path: '/register',
      name: AuthConfig.routes.register,
      component: AuthConfig.registerForm || (() => import('./RegisterForm')),
      meta: {
        layout: RegisterView,
        guest: true,
      },
    },
  ])
}

if (AuthConfig.withForgot) {
  Admin.router.addRoutes([
    {
      path: '/forgot-password',
      name: AuthConfig.routes.forgot,
      component: AuthConfig.forgotForm || (() => import('./ForgotForm')),
      meta: {
        layout: ForgotView,
        guest: true,
      },
    },
  ])
}

AuthConfig.onLogout = () => {
  Admin.store.dispatch('adminAuth/logout').then(() => {
    Admin.store.commit('adminAuth/account', null)
    Admin.router.push({ name: AuthConfig.routes.login })
  })
}

if (AuthConfig.withHttpInterceptor) {
  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        Admin.store.dispatch('adminAuth/logout')
      }

      return Promise.reject(error)
    },
  )
}

Admin.router.beforeEach((to, from, next) => {
  if (
    to.matched.some(m => m.meta.auth) &&
    !Admin.store.state.adminAuth.authenticated
  ) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     * and remember that page to return back
     */
    Admin.store.commit('adminAuth/attemptedRoute', {
      name: to.name,
      params: to.params,
    })
    next({ name: AuthConfig.routes.login })
  } else if (
    to.matched.some(m => m.meta.guest) &&
    Admin.store.state.adminAuth.authenticated
  ) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next(Admin.store.adminConfig.defaultRoute)
  } else {
    next()
  }
})

// Allow access some useful state data for all components
Vue.mixin({
  computed: {
    ...mapState('adminAuth', {
      $authenticated: 'authenticated',
    }),
    ...mapState('adminAuth', {
      $account: 'account',
    }),
  },
})

Admin.hooks.addAction('bootstrap', 'adminAuth', function() {
  Admin.store.dispatch('adminAuth/check')
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
