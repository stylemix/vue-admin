/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue'
import Axios from 'axios'
import Config from './config'

Axios.defaults.baseURL = Config.baseUrl
Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.paramsSerializer = Config.paramsSerializer

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios
  },
})

Axios.interceptors.response.use(
  response => response,
  error => {
    let response = error.response
    if (response && response.status) {
      let message =
        response.data && response.data.message
          ? response.data.message
          : `Server responded with status ${response.status} ${
              response.statusText
            }`

      if (response.status >= 400 && response.status < 500) {
        Vue.$toast.warning('Sorry', message)
      }

      if (response.status >= 500) {
        Vue.$toast.error('Oops!', message)
      }
    }

    return Promise.reject(error)
  },
)
