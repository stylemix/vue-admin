import Admin from '../admin'

export default {
  mounted() {
    if (typeof this.$options.pageTitle === 'function') {
      Admin.store.commit('admin/pageTitle', this.$options.pageTitle.apply(this))
    }
    if (typeof this.$options.pageActions === 'function') {
      Admin.pageActions.set(this.$options.pageActions.apply(this))
    }
  },
  destroyed() {
    Admin.store.commit('admin/pageTitle', '')
    Admin.pageActions.reset()
  },
}
