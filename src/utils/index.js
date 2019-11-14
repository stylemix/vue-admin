import Vue from 'vue'

export function translate(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string.startsWith('$t.') ? Vue.$t(string.replace('$t.', '')) : string
}

/**
 * Add translated variants of for given properties
 *
 * @param {Object} object
 * @param {String[]} keys
 *
 * @return {Object}
 */
export function addTranslators(object, keys) {
  keys.forEach(key => {
    if (object.hasOwnProperty(`${key}Translated`)) {
      return
    }
    Object.defineProperty(object, `${key}Translated`, {
      get() {
        return translate(this[key])
      },
    })
  })

  return object
}

/**
 * Translate string properties which starts with special hint
 *
 * @param {Object} object
 * @param {String[]} keys
 *
 * @return {Object}
 */
export function translateProps(object, keys) {
  keys.forEach(key => {
    object[key] = translate(object[key])
  })

  return object
}

/**
 * Defines getters for class
 *
 * @param {Class} classObject
 * @param {String[]} keys Translatable property keys
 */
export function classTranslations(classObject, keys) {
  addTranslators(classObject.prototype, keys)
}
