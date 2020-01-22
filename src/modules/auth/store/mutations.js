/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue'
import { CHECK, LOGIN, ACCOUNT, LOGOUT } from './mutation-types'
import AuthConfig from '../config'

const prefix = AuthConfig.storagePrefix || 'admin-console'

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state) {
    const token = localStorage.getItem(`${prefix}.user-token`)
    state.token = token
    state.authenticated = !!token
    if (state.authenticated) {
      state.expires = localStorage.getItem(`${prefix}.user-token-expires`)
      if (Vue.$http) {
        Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    }
  },

  [LOGIN](state, { token, expires, expires_in }) {
    state.authenticated = true
    state.token = token
    if (expires) {
      state.expires = expires * 1000
    }
    if (expires_in) {
      state.expires = Date.now() + expires_in * 1000
    }
    localStorage.setItem(`${prefix}.user-token`, token)
    localStorage.setItem(`${prefix}.user-token-expires`, state.expires)
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },

  [LOGOUT](state) {
    state.authenticated = false
    state.token = null
    state.expires = 0
    localStorage.removeItem(`${prefix}.user-token`)
    localStorage.removeItem(`${prefix}.user-token-expires`)
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = ''
    }
  },

  [ACCOUNT](state, account) {
    state.account = account
  },

  attemptedRoute(state, attemptedRoute) {
    state.attemptedRoute = attemptedRoute
  },
}
