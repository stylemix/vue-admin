import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import admin from './admin'
import adminConfig from './config'

Vue.use(Vuex)

const plugins = []
if (process.env.NODE_ENV !== 'production') plugins.push(createLogger())

const modules = {
  admin,
  adminConfig,
}

export default new Vuex.Store({
  modules,
  plugins,
})
