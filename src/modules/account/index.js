import Admin from '../../admin'
import AdminConfig from '../../facades/config'
import AccountConfig from './config'

Admin.router.addRoutes([
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
