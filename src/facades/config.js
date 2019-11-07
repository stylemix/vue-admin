import store from '../store'
import AxiosConfig from '../plugins/axios/config'
import Config from '../config'
import AuthConfig from '../modules/auth/config'
import AccountConfig from '../modules/account/config'

export default {
  setLogo(url) {
    return store.commit('adminConfig/logoUrl', url)
  },

  logo() {
    return store.state.adminConfig.logoUrl
  },

  setDefaultRoute(route) {
    return store.commit('adminConfig/defaultRoute', route)
  },

  defaultRoute() {
    return store.state.adminConfig.defaultRoute
  },

  /**
   * @deprecated
   */
  useAxios(config = {}) {
    Object.assign(AxiosConfig, config)
  },

  /**
   * @deprecated
   */
  useAlerts() {},

  /**
   * @param {Object} config
   * @deprecated
   */
  useAuth(config) {
    Object.assign(AuthConfig, config)
  },

  /**
   * @param {Object} config
   * @deprecated
   */
  useAccount(config) {
    Object.assign(AccountConfig, config)
  },

  setAccountMenu(menu) {
    Config.accountMenu = menu
  },

  pushAccountMenuItem(item) {
    Config.accountMenu.push(item)
  },

  pushAccountMenuItems(items) {
    const newMenu = Config.accountMenu
    items.forEach(item => newMenu.push(item))
  },
}
