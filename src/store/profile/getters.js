export default {
  user(state) {
    return state.user
  },

  status(state) {
    return state.status
  },

  fullname({ user }) {
    if (user) return `${user.firstname} ${user.lastname}`
    else return 'Not authenticated'
  },

  actions({ actions }) {
    return actions
  }
}
