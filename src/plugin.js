import merge from 'lodash-es/merge'
import strings from './strings'

export default {
  install() {},

  setStrings(newStrings) {
    merge(strings, newStrings)
  },
}
