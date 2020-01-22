/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import * as types from './mutation-types'
import Admin from '../../../admin'
import AuthConfig from '../config'

let timer

function initRefresh(context) {
  if (!context.state.authenticated) {
    return
  }

  const diff = context.state.expires - Date.now()

  if (diff < 0) {
    context.dispatch('logout')
    return
  }

  // Refresh token 5 seconds before expiring
  // But not less than 10 seconds
  let timeout = Math.max(10000, diff - 5 * 1000)
  // Timeout should not exceed supported maximum number
  timeout = Math.min(timeout, 2147483647)

  clearTimeout(timer)
  timer = setTimeout(() => {
    AuthConfig.apiBuilder()
      .refresh()
      .then(payload => {
        validateTokenPayload(payload)
        context.commit(types.LOGIN, payload)
        initRefresh(context)
      })
  }, timeout)
}

export const check = context => {
  context.commit(types.CHECK)

  if (context.state.authenticated) {
    initRefresh(context)
    return find(context)
  }

  return false
}

export const find = context => {
  return AuthConfig.apiBuilder()
    .account()
    .then(account => {
      context.commit(types.ACCOUNT, account)
      Admin.hooks.doAction('authenticated')
      return account.data
    })
    .catch(rejection => {
      //eslint-disable-next-line
      console.warn('User request failed...', rejection)
    })
}

export const login = (context, payload) => {
  validateTokenPayload(payload)
  context.commit(types.LOGIN, payload)
  initRefresh(context)
  return context.dispatch('find')
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)
  commit(types.ACCOUNT, null)
  clearTimeout(timer)
}

function validateTokenPayload(payload) {
  const { token, expires, expires_in } = payload
  if (!token) {
    throw new Error('Failed to get token data from response')
  }
  if (!expires && !expires_in) {
    throw new Error('Failed to get token expiration')
  }
}

export default {
  check,
  find,
  login,
  logout,
}
