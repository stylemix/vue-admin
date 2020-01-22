import Admin from '../../admin'
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

Admin.accountNav.push({
  order: 10,
  route: {
    name: 'account',
  },
  icon: 'icon-cog3',
  text: AccountConfig.textMenuSettings,
})
