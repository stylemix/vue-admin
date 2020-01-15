import store from '../store'
import AxiosConfig from '../plugins/axios/config'
import Config from '../config'
import AuthConfig from '../modules/auth/config'
import AccountConfig from '../modules/account/config'
import Admin from '../admin'

export default {
  setBrandName(name) {
    return store.commit('adminConfig/brandName', name)
  },

  brandName() {
    return store.state.adminConfig.brandName
  },

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

  /**
   * @param {MenuItem[]} menu
   * @deprecated
   */
  setAccountMenu(menu) {
    Config.accountMenu = menu
    Admin.accountNav.set(menu)
  },

  /**
   * @param {MenuItem} item
   * @deprecated
   */
  pushAccountMenuItem(item) {
    Admin.accountNav.push(item)
  },

  /**
   * @param {MenuItem[]} items
   * @deprecated
   */
  pushAccountMenuItems(items) {
    Admin.accountNav.append(items)
  },
}
