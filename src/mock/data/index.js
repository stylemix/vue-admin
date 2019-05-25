import menu from './menu'
import profile from './profile'
import store from '../../store'

store.commit('sidebar/setMenu', menu)
store.commit('profile/setUser', profile.user)
