import { setCurrentLocale } from '../utils/locales'

export default {
  namespaced: true,
  state: {
    locale: 'en',
    navigation: [],
    accountNav: [],
    pageTitle: '',
    pageActions: [],
  },
  mutations: {
    locale: (state, locale) => (state.locale = locale),
    pushMenuItem(state, { key, item }) {
      state[key].push(item)
    },
    appendMenuItems(state, { key, items }) {
      state[key] = state[key].concat(items)
    },
    setMenuItems(state, { key, items }) {
      state[key] = items
    },
    pageTitle: (state, pageTitle) => (state.pageTitle = pageTitle),
  },
  actions: {
    setLocale({ commit }, locale) {
      commit('locale', locale)
      return setCurrentLocale(locale)
    },
  },
}
