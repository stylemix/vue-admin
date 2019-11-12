import Vue from 'vue'

/**
 * Capitalize first letter of word
 * @param {string} input
 * @return {string}
 */
export const capitalizeFirst = input => {
  if (typeof input === 'string' && input.length)
    return input[0].toUpperCase() + input.substr(1)
  return input.toString()
}

function addTranslators(object, keys) {
  keys.forEach(key => {
    Object.defineProperty(object, `${key}Translated`, {
      get() {
        if (typeof this[key] !== 'string') {
          return this[key]
        }

        return this[key].startsWith('$t.')
          ? Vue.$t(this[key].replace('$t.', ''))
          : this[key]
      },
    })
  })
}

/**
 * Create getters from source object.
 * Getters will check value type for translation string
 *
 * @param {String[]} keys Translatable property keys
 */
export function mapTranslations(keys) {
  const getters = {}
  addTranslators(getters, keys)

  return getters
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
