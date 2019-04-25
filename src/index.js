import sidebar from './core/interface/sidebar'
import layout from './components/layout/layout-main'
import index from './views/index'
import config from './core/interface/config'
import profile from './core/interface/profile'
import store from './store'
import router from './router'

// register built in widgets
import './core'

export const AdminApp = index
export const AdminRouter = router
export const AdminSidebar = sidebar
export const AdminLayout = layout
export const AdminConfig = config
export const AdminProfile = profile
export const AdminStore = store
