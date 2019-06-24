import Config from '../../config'

function prepareSidebarMenu(item) {
  if (item.children) {
    item.isOpen = false
  }
  return item
}

export default {
  setMenu(menu) {
    Config.sidebarMenu = menu.map(prepareSidebarMenu)
  },

  pushItem(item) {
    Config.sidebarMenu.push(prepareSidebarMenu(item))
  },

  pushItems(items) {
    const newMenu = Config.sidebarMenu
    items.forEach(item => newMenu.push(prepareSidebarMenu(item)))
  },
}
