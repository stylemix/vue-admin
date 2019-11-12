export default {
  namespaced: true,
  state: {
    navigation: [],
    accountNav: [],
    pageActions: [],
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
  },
}
