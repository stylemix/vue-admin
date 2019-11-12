import Vue from 'vue'
import { mapState } from 'vuex'
import LayoutMain from './layout/LayoutMain'
import * as values from './values'

Vue.component('layout-main', LayoutMain)

// Register value components
Object.keys(values).forEach(component => {
  Vue.component(component, values[component])
})

// Mixin that allows access specific components
Vue.mixin({
  computed: {
    ...mapState('admin', {
      $pageHeader: state => state.pageHeader,
    }),
  },
})
