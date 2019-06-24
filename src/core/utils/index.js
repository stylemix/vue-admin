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

/**
 * Create getter functions from source object.
 * Getters will check value type for function or string
 *
 * @param {Array} keys
 * @param {Object} source
 */
export function textGetters(keys, source) {
  const getters = {}
  keys.forEach(key => {
    getters[key] = () => {
      return typeof source[key] === 'function' ? source[key](this) : source[key]
    }
  })

  return getters
}
