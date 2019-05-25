import sidebar from './core/interface/sidebar'
import layout from './components/layout/layout-main'
import index from './views/index'
import store from './store'
import router from './router'

// register built in widgets
import './core'

import './assets/scss/default/compile/bootstrap.scss'
import './assets/scss/default/compile/bootstrap_limitless.scss'
import './assets/scss/default/compile/colors.scss'
import './assets/scss/default/compile/components.scss'
import './assets/scss/default/compile/layout.scss'
import './assets/fonts/icons/icomoon/styles.css'

export const AdminApp = index
export const AdminRouter = router
export const AdminSidebar = sidebar
export const AdminLayout = layout
export const AdminStore = store
