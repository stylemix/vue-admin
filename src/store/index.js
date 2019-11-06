import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import preferences from './preferences'
import admin from './admin'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV !== 'production') plugins.push(createLogger())

const modules = {
  'admin-preferences': preferences,
  admin,
}

export default new Vuex.Store({
  modules,
  plugins,
})
