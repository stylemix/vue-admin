import Vue from 'vue'
import LayoutMain from './layout/LayoutMain'
import { mapState } from 'vuex'

Vue.component('layout-main', LayoutMain)

// Mixin that allows access specific components
Vue.mixin({
  computed: {
    ...mapState('admin', {
      $pageHeader: state => state.pageHeader,
    }),
  },
})
