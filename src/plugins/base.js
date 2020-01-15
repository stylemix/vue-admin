import Vue from 'vue'
import { BasePlugin } from 'stylemix-base'
import Admin from '../admin'

Vue.use(BasePlugin, Admin.hooks.applyFilters('base-plugin-options', {}))
