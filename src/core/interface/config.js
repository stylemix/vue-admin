import store from '../../store'
import AxiosConfig from '../../plugins/axios/config';
import Config from '../../config';

export default {
  setLogo(url) {
    return store.dispatch('admin-preferences/setLogoUrl', url)
  },

  logo() {
    return store.getters['admin-preferences/getLogoUrl']
  },

  setDefaultRoute(route) {
    Config.defaultRoute = route;
  },
}
