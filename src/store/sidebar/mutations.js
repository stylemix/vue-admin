export default {
  setMenuItems(state, menu) {
    state.menu = menu
  },

  expandMenuItem(state, forExpand) {
    state.menu = state.menu.map(item =>
      item === forExpand ? { ...item, isOpen: !item.isOpen } : item
    )
  }
}
