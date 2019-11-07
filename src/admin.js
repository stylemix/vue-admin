import merge from 'lodash-es/merge'
import { createHooks } from '@wordpress/hooks'
import strings from './strings'
import ConfigFacade from './facades/config'
import AuthConfig from './modules/auth/config'
import AccountConfig from './modules/account/config'
import router from './router'
import store from './store'
import Menu from './facades/menu'

const Admin = {
  /**
   * Event callbacks for module/plugins
   */
  hooks: createHooks(),

  /**
   * Root Vue application instance
   */
  app: null,

  /**
   * @type {ConfigFacade}
   */
  config: ConfigFacade,

  /**
   * VueRouter instance
   */
  router,

  /**
   * Vuex store instance
   */
  store,

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
    Admin.hooks.doAction('bootstrap')

    Admin.app = require('./app').default

    return Admin.app
  },

  install() {},

  setStrings(newStrings) {
    merge(strings, newStrings)
  },
}

export default Admin
