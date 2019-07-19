import Vue from 'vue'
import swal from 'sweetalert2'
import defaults from 'lodash-es/defaults'
import strings from '../../strings'

const types = ['success', 'error', 'warning', 'info', 'question']
const $alert = {}
const $toast = {}
const alertOptions = {
  get confirmButtonText() {
    return strings.alerts.ok
  },
  get cancelButtonText() {
    return strings.alerts.cancel
  },
}
const toastOptions = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
}

types.forEach(type => {
  $alert[type] = (title, text, options) =>
    swal(defaults({ type, title, text }, alertOptions, options))

  $toast[type] = (title, text, options) =>
    swal(defaults({ type, title, text }, toastOptions, options))
})

// Bind Swal to Vue.
Vue.$alert = $alert
Vue.$toast = $toast

Object.defineProperty(Vue.prototype, '$alert', {
  get() {
    return Vue.$alert
  },
})

Object.defineProperty(Vue.prototype, '$toast', {
  get() {
    return Vue.$toast
  },
})
