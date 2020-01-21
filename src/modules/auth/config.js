import AuthApi from './AuthApi'

const AuthConfig = {
  storagePrefix: process.env.VUE_APP_STORAGE_PREFIX,
  routes: {
    login: 'login',
    register: 'register',
    forgot: 'forgot-password',
  },
  apiBuilder() {
    return new AuthApi()
  },
  loginForm: null,
  registerForm: null,
  forgotForm: null,
  onLogout: null,
  withRegistration: false,
  withForgot: true,
  withHttpInterceptor: true,
}

export default AuthConfig
