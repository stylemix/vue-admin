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
