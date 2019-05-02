import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const namespaced = true

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
}
