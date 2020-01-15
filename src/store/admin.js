import { setCurrentLocale } from '../utils/locales'
import { calculateBodyClasses } from '../utils/layout'

export default {
  namespaced: true,
  state: {
    locale: 'en',
    navigation: [],
    accountNav: [],
    pageTitle: '',
    pageActions: [],
    sidebarXs: false,
    sidebarMobile: false,
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
    sidebarXs(state, sidebarXs) {
      state.sidebarXs = sidebarXs
      calculateBodyClasses()
    },
    toggleSidebar(state) {
      state.sidebarXs = !state.sidebarXs
      calculateBodyClasses()
    },
    toggleSidebarMobile(state) {
      state.sidebarMobile = !state.sidebarMobile
      calculateBodyClasses()
    },
  },
  actions: {
    setLocale({ commit }, locale) {
      commit('locale', locale)
      return setCurrentLocale(locale)
    },
  },
}
