import merge from 'lodash-es/merge'
import strings from './strings'
import ConfigFacade from './facades/config'
import Config from './config'
import AuthConfig from './modules/auth/config'
import AccountConfig from './modules/account/config'
import router from './router'
import Menu from './facades/menu'

const Admin = {
  /**
   * @type {ConfigFacade}
   */
  config: ConfigFacade,

  /**
   * VueRouter instance
   */
  router,

  /**
   * Main navigation menu
   *
   * @type {Menu}
   */
  nav: new Menu('navigation'),

  /**
   * Page actions menu
   *
   * @type {Menu}
   */
  pageActions: new Menu('pageActions'),

  /**
   * Register new bootstrapper
   *
   * @param {Function} fx
   */
  registerBootstraper(fx) {
    Config.bootstrappers.push(fx)
  },

  /**
   * Use authentication module (login, register, forgot).
   * @param {Object} config
   */
  useAuth(config) {
    Object.assign(AuthConfig, config)
    require('./modules/auth')
  },

  /**
   * Use account module (account settings).
   * @param {Object} config
   */
  useAccount(config) {
    Object.assign(AccountConfig, config)
    require('./modules/account')
  },

  /**
   * Run admin application. Includes required components and mounts root Vue instance.
   */
  run() {
    require('./plugins/bootstrap')
    require('./plugins/axios')
    require('./plugins/ui-blocker')
    require('./plugins/moment')
    require('./plugins/alerts')
    require('./components/global')

    // Run bootstrapper functions
    Config.bootstrappers.forEach(fx => fx())

    return require('./app')
  },

  install() {},

  setStrings(newStrings) {
    merge(strings, newStrings)
  },
}

export default Admin
