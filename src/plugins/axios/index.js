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
