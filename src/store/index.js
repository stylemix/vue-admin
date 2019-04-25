import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import sidebar from './sidebar'
import profile from './profile'
import models from './models'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV !== 'production') plugins.push(createLogger())

const modules = {
  sidebar,
  models,
  profile
}

export default new Vuex.Store({
  modules,
  plugins
})
