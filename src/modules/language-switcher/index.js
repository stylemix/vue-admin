import Admin from '../../admin'

Admin.store.registerModule('languageSwitcher', {
  namespaced: true,
  state: {
    locales: [],
  },
  mutations: {
    setLocales(state, locales) {
      state.locales = locales
    },
  },
})
