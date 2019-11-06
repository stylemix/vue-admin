/**
 * @property {String} label Item label
 * @property {String} id Item id
 * @property {String} icon Item icon class
 * @property {*} route Item route reference
 * @property {Function} onClick Item click function
 * @property {Number} order Item sorting order number
 */
export default class MenuItem {
  constructor(props) {
    const defaults = {
      children: null,
      isOpen: false,
      order: 0,
    }
    Object.assign(this, defaults, props)
    if (!this.id) {
      this.id = this.label.replace(/[^\w]+/g, '_')
    }
  }
}
