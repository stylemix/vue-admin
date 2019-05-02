export default {
  setMenu(state, menu) {
    state.menu = menu
  },

  pushItem(state, item) {
    state.menu.push(item)
  },

  expandItem(state, forExpand) {
    state.menu = state.menu.map(item =>
      item === forExpand ? { ...item, isOpen: !item.isOpen } : item,
    )
  },
}
