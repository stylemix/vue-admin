/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue'
import { CHECK, LOGIN, LOGOUT } from './mutation-types'
import AuthConfig from '../config'

const prefix = AuthConfig.storagePrefix || 'admin-console'

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem(`${prefix}.user-token`)
    if (state.authenticated) {
      state.expires = localStorage.getItem(`${prefix}.user-token-expires`)
      if (Vue.$http) {
        Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          `${prefix}.user-token`,
        )}`
      }
    }
  },

  [LOGIN](state, { token, expiresIn }) {
    state.authenticated = true
    state.expires = Date.now() + expiresIn * 1000
    localStorage.setItem(`${prefix}.user-token`, token)
    localStorage.setItem(`${prefix}.user-token-expires`, state.expires)
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },

  [LOGOUT](state) {
    state.authenticated = false
    localStorage.removeItem(`${prefix}.user-token`)
    localStorage.removeItem(`${prefix}.user-token-expires`)
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = ''
    }
  },

  account(state, account) {
    state.account = account
  },

  attemptedRoute(state, attemptedRoute) {
    state.attemptedRoute = attemptedRoute
  },
}
