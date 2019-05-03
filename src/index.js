import sidebar from './core/interface/sidebar'
import layout from './components/layout/layout-main'
import layoutHeader from './components/layout/layout-header'
import index from './views/index'
import config from './core/interface/config'
import profile from './core/interface/profile'
import account from './core/interface/account'
import store from './store'
import router from './router'
import './plugins/ui-blocker'
import './plugins/bootstrap'

// setup sweet alert 2
import './plugins/sweet-alert2'

export const AdminApp = index
export const AdminRouter = router
export const AdminSidebar = sidebar
export const AdminLayout = layout
export const AdminPageHeader = layoutHeader
export const AdminConfig = config
export const AdminProfile = profile
export const AdminStore = store
export const AdminAccount = account
export { default as AdminApi } from './plugins/api'
export { default as AdminSearchForm } from './components/AdminSearchForm'
export { default as AdminTable } from './components/AdminTable'
