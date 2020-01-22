import Admin from './admin'
import * as auth from './modules/auth'
import * as utils from './utils'

export default Admin
export { Admin as AdminPlugin }
export { default as AdminRouter } from './router'
export { default as AdminStore } from './store'
export { default as AdminConfig } from './facades/config'
export { default as AdminApp } from './views/App'
export { default as AdminApi } from './classes/AdminApi'
export { default as AdminLayout } from './components/layout/LayoutMain'
export { default as AdminPageHeader } from './components/layout/PageHeader'
export { default as AdminSearchForm } from './components/SearchForm'
export { default as AdminTable } from './components/Table'
export { default as ResourceFormMixin } from './mixins/ResourceFormMixin'
export { default as HasPageHeader } from './mixins/HasPageHeader'
export { utils, auth }
