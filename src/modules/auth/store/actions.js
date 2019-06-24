/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import { AdminStore as store } from '../../..'
import * as types from './mutation-types'
import AuthApi from '../AuthApi'
import AccountApi from '../../account/AccountApi'

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
    new AuthApi().refresh().then(({ token, expires_in: expiresIn }) => {
      context.commit(types.LOGIN, { token, expiresIn })
      initRefresh(context)
    })
  }, timeout)
}

export const check = context => {
  context.commit(types.CHECK)

  if (context.state.authenticated) {
    initRefresh(context)
    return true
  }

  return false
}

export const find = context => {
  return new AccountApi()
    .user()
    .then(result => {
      context.commit('account', result.data)
      return result.data
    })
    .catch(rejection => {
      //eslint-disable-next-line
      console.warn('User request failed...', rejection)
    })
}

export const login = (context, payload) => {
  context.commit(types.LOGIN, payload)
  initRefresh(context)
  return context.dispatch('find')
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)
  clearTimeout(timer)
}

export default {
  check,
  find,
  login,
  logout,
}
