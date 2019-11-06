export default {
  namespaced: true,
  state: {
    navigation: [],
    pageActions: [],
    pageHeader: null,
  },
  mutations: {
    pushMenuItem(state, { key, item }) {
      state[key].push(item)
    },
    appendMenuItems(state, { key, items }) {
      state[key] = state[key].concat(items)
    },
    setMenuItems(state, { key, items }) {
      state[key] = items
    },
    pageHeader(state, pageHeader) {
      state.pageHeader = pageHeader
    },
  },
}
