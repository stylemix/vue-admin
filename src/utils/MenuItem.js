import { classTranslations } from './index'

/**
 * @property {String} label Item label
 * @property {String} id Item id
 * @property {String} icon Item icon class
 * @property {*} route Item route reference
 * @property {Function} onClick Item click function
 * @property {Number} order Item sorting order number
 */
class MenuItem {
  constructor(props) {
    const defaults = {
      label: '',
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

// Add translatable props
classTranslations(MenuItem, ['label'])

export default MenuItem
