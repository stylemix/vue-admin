import store from '../../store'
import AxiosConfig from '../../plugins/axios/config'
import Config from '../../config'
import AuthConfig from '../../modules/auth/config'

export default {
  setLogo(url) {
    return store.dispatch('admin-preferences/setLogoUrl', url)
  },

  logo() {
    return store.getters['admin-preferences/getLogoUrl']
  },

  useAxios(config = {}) {
    Object.assign(AxiosConfig, config)
    require('../../plugins/axios')
  },

  useAuth(config) {
    Object.assign(AuthConfig, config)
    require('../../modules/auth')
    require('../../modules/account')
  },

  setDefaultRoute(route) {
    Config.defaultRoute = route
  },
}
