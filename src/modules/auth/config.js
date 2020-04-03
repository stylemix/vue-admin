import Vue from 'vue'
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
  // eslint-disable-next-line no-unused-vars
  setupToken: function({ token, expires }) {
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },
  unsetToken: function() {
    if (Vue.$http) {
      Vue.$http.defaults.headers.common.Authorization = ''
    }
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
