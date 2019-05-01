const AuthConfig = {
  storagePrefix: process.env.VUE_APP_STORAGE_PREFIX,
  routes: {
    login: 'login',
    register: 'register',
    forgot: 'forgot-password',
  },
  registerForm: null,
  loginForm: null,
  forgotForm: null,
}

export default AuthConfig
