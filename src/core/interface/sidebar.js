import store from '../../store'

export default {
  setMenu(menu) {
    store.dispatch('sidebar/setMenu', menu)
  },

  expandItem(item) {
    store.dispatch('expandItem', item)
  }
}
