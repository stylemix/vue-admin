import store from '../../store'

export default {
  setLogo(url) {
    store.dispatch('preferences/setLogoUrl', url)
  },

  logo() {
    return store.getters['preferences/getLogoUrl']
  }
}
