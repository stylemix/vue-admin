import store from '../../store'

export default {
  setMenu(menu) {
    return store.dispatch('sidebar/setMenu', menu)
  },

  pushItem(item) {
    return store.dispatch('sidebar/pushItem', item)
  },

  expandItem(item) {
    return store.dispatch('expandItem', item)
  }
}
