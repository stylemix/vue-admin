export default {
  user({ user }) {
    return user
  },

  status({ status }) {
    return status
  },

  fullname({ user }) {
    if (user) return `${user.firstname} ${user.lastname}`
    else return 'Not authenticated'
  },

  actions({ actions }) {
    return actions
  },
}
