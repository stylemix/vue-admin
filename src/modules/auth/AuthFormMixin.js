import AuthConfig from './config'

export default {
  computed: {
    loginRoute() {
      return {
        name: AuthConfig.routes.login,
      }
    },
    registerRoute() {
      return {
        name: AuthConfig.routes.register,
      }
    },
    forgotRoute() {
      return {
        name: AuthConfig.routes.forgot,
      }
    },
    resetRoute() {
      return {
        name: AuthConfig.routes.reset,
      }
    },
  },

  methods: {
    apiBuilder() {
      return AuthConfig.apiBuilder()
    },
  },
}
