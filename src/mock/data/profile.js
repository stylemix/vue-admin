export default {
  user: {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@doe.com'
  },
  actions: [
    {
      text: 'My profile',
      icon: 'icon-user-plus'
    },
    {
      text: 'My balance',
      icon: 'icon-coins',
      onClick(item) {
        console.log(item)
      }
    },
    {
      text: 'Messages',
      icon: 'icon-comment-discussion'
    },
    {
      divider: true
    },
    {
      text: 'Account settings',
      icon: 'icon-cog5'
    },
    {
      text: 'Logout',
      icon: 'icon-switch2'
    }
  ],
  authHandler: {
    onLogin(form) {
      console.table(form)
    },

    onRegister(form) {
      console.log(form)
    },

    onResetPassword(form) {
      console.log(form)
    }
  }
}
