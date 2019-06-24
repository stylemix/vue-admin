import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import models from './models'
import preferences from './preferences'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV !== 'production') plugins.push(createLogger())

const modules = {
  'admin-models': models,
  'admin-preferences': preferences,
}

export default new Vuex.Store({
  modules,
  plugins,
})
