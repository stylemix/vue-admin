import menu from './menu'
import profile from './profile'
import store from '../../store'

store.commit('admin-sidebar/setMenu', menu)
store.commit('admin-account/setUser', profile.user)
store.commit('admin-account/setActions', profile.actions)
// store.commit('admin-account/setAuthHandler', profile.authHandler)
