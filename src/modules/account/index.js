import AdminRouter from '../../router'
import AdminConfig from '../../core/interface/config'
import AccountConfig from './config'

AdminRouter.addRoutes([
  {
    path: '/account',
    name: 'account',
    component: AccountConfig.accountForm,
    meta: {
      auth: true,
    },
  },
])

AdminConfig.pushAccountMenuItem({
  order: 10,
  route: {
    name: 'account',
  },
  icon: 'icon-cog3',
  text: AccountConfig.textMenuSettings,
})
