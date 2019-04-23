export default {
  setUser({ commit }, user) {
    commit('setUser', user)
  },

  setStatus({ commit }, status) {
    commit('setStatus', status)
  }
}
