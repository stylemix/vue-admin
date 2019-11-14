import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../lang'

// Bind i18n to Vue.
let i18n
Object.defineProperty(Vue.prototype, '$i18n', {
  get() {
    return i18n
  },
})

Vue.use(VueI18n)

const locale = document.documentElement.lang || 'en'

// Create VueI18n instance with options
i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  messages,
})

// Allow global access
Vue.$i18n = i18n
Vue.$t = (...args) => {
  return i18n.t(...args)
}
Vue.$tc = (...args) => {
  return i18n.tc(...args)
}
