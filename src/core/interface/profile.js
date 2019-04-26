import store from '../../store'

export default {
  setActions(actions) {
    store.dispatch('profile/setActions', actions)
  },

  setUser(user) {
    store.dispatch('profile/setUser', user)
  }
}
