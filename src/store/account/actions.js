export default {
  setUser({ commit }, user) {
    commit('setUser', user)
  },

  setActions({ commit }, actions) {
    commit('setActions', actions)
  },
}
