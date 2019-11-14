import Vue from 'vue'
import * as moment from 'moment'
import merge from 'lodash-es/merge'
import { BasePlugin } from 'stylemix-base'
import Axios from 'axios'
import messages from '../lang'
import Admin from '../admin'

const loadedLocales = []
const translationGroups = []

function configureLocale(locale) {
  Vue.$i18n.locale = locale
  moment.locale(locale)

  // Base package
  BasePlugin.setStrings(Vue.$i18n.t('vendor.base'))
  BasePlugin.setConfig({ locale })

  // Add current locale header to all requests
  Axios.defaults.headers.common['X-Locale'] = locale
  Axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html').setAttribute('lang', locale)
  return locale
}

/**
 * Change current locale. Internally performs required configurations and loads translations.
 *
 * @param locale
 * @return {Promise<AxiosResponse<any>>|Promise<any>}
 */
export function setCurrentLocale(locale) {
  if (loadedLocales.includes(locale)) {
    configureLocale(locale)
    return Promise.resolve(locale)
  }

  const groups = translationGroups.join(',')
  const loaders = Admin.hooks.applyFilters('locale-loaders', [], groups, locale)

  return Promise.all(loaders).then(data => {
    let existing = messages[locale] || {}
    data.forEach(datum => {
      existing = merge(existing, datum)
    })
    Vue.$i18n.setLocaleMessage(locale, existing)
    loadedLocales.push(locale)
    configureLocale(locale)
    return locale
  })
}

export function addTranslationGroup(group) {
  translationGroups.push(group)
}
