/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

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
      AuthConfig.setupToken({ token, expires: state.expires })
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

    AuthConfig.setupToken({ token, expires: state.expires })
  },

  [LOGOUT](state) {
    state.authenticated = false
    state.token = null
    state.expires = 0
    localStorage.removeItem(`${prefix}.user-token`)
    localStorage.removeItem(`${prefix}.user-token-expires`)

    AuthConfig.unsetToken()
  },

  [ACCOUNT](state, account) {
    state.account = account
  },

  attemptedRoute(state, attemptedRoute) {
    state.attemptedRoute = attemptedRoute
  },
}
