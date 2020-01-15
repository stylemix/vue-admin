import Admin from '../admin'

export function calculateBodyClasses() {
  if (screen.width < screenSizes()['lg'] || Admin.store.state.admin.sidebarXs) {
    document.body.classList.add('sidebar-xs')
  } else {
    document.body.classList.remove('sidebar-xs')
  }

  if (Admin.store.state.admin.sidebarMobile) {
    document.body.classList.add('sidebar-mobile-main')
  } else {
    document.body.classList.remove('sidebar-mobile-main')
  }
}

export function initLayout() {
  calculateBodyClasses()
  window.addEventListener('resize', calculateBodyClasses)
}

export function screenSizes() {
  return {
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 0,
  }
}
