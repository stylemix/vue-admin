import store from '../../store'

export default {
  setActions(actions) {
    store.dispatch('admin-account/setActions', actions)
  },

  setUser(user) {
    store.dispatch('admin-account/setUser', user)
  },
}
