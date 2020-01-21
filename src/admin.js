import { createHooks } from '@wordpress/hooks'
import ConfigFacade from './facades/config'
import AuthConfig from './modules/auth/config'
import AccountConfig from './modules/account/config'
import router, { addDefaultRoutes } from './router'
import store from './store'
import Menu from './facades/menu'
import { addTranslationGroup, setCurrentLocale } from './utils/locales'
import { initLayout } from './utils/layout'

const readyResolvers = []

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
   * Main navigation menu
   *
   * @type {Menu}
   */
  accountNav: new Menu('accountNav'),

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
  useAuth(config = {}) {
    Object.assign(AuthConfig, config)
    require('./modules/auth/module')
  },

  /**
   * Use account module (account settings).
   * @param {Object} config
   */
  useAccount(config = {}) {
    Object.assign(AccountConfig, config)
    require('./modules/account')
  },

  /**
   * Use language switcher.
   */
  useLanguageSwitcher() {
    require('./modules/language-switcher')
  },

  /**
   * Add translations group to load from API
   */
  addTranslationGroup,

  /**
   * Add promise resolver function for application ready state
   *
   * @param {Function} promiseResolver
   */
  readyUntil(promiseResolver) {
    readyResolvers.push(promiseResolver)
  },

  /**
   * Run admin application. Includes required components and mounts root Vue instance.
   */
  run() {
    require('./plugins/base')
    require('./plugins/bootstrap')
    require('./plugins/i18n')
    require('./plugins/ui-blocker')
    require('./plugins/moment')
    require('./plugins/alerts')
    require('./components/global')

    addDefaultRoutes()
    initLayout()

    // Locale could be changed in boot function
    // We will setup locale as ready resolver (load messages, configure packages)
    Admin.readyUntil(() => setCurrentLocale(store.state.admin.locale))

    // Run bootstrapper functions
    Admin.hooks.doAction('boot')

    Admin.app = require('./app').default
    Promise.all(readyResolvers.map(resolver => resolver())).then(() => {
      Admin.app.$mount('#app')
    })

    return Admin.app
  },

  /**
   * @deprecated
   */
  setStrings() {},
}

export default Admin
