export default {
  setMenu({ commit }, menu) {
    commit('setMenu', menu)
  },

  pushItem({ commit }, item) {
    commit('pushItem', item)
  },

  expandItem({ commit }, itemForExpand) {
    commit('expandItem', itemForExpand)
  },
}
