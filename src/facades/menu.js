import MenuItem from '../classes/MenuItem'
import store from '../store'

export default class Menu {
  constructor(storeKey) {
    this.storeKey = storeKey
  }

  /**
   * Push new item
   *
   * @param {MenuItem} item
   */
  push(item) {
    store.commit('admin/pushMenuItem', {
      key: this.storeKey,
      item: new MenuItem(item),
    })
  }

  /**
   * Append multiple items at once
   *
   * @param {MenuItem[]} items
   */
  append(items) {
    store.commit('admin/appendMenuItems', {
      key: this.storeKey,
      items: items.map(item => new MenuItem(item)),
    })
  }

  /**
   * Set/replace menu items
   *
   * @param {MenuItem[]} items
   */
  set(items) {
    store.commit('admin/setMenuItems', {
      key: this.storeKey,
      items: items.map(item => new MenuItem(item)),
    })
  }

  reset() {
    store.commit('admin/setMenuItems', {
      key: this.storeKey,
      items: [],
    })
  }
}
