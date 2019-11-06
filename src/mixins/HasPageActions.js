import Admin from '../admin'

export default {
  mounted() {
    if (!this.$options.pageActions) {
      return
    }

    Admin.pageActions.set(this.$options.pageActions())
  },
  destroyed() {
    Admin.pageActions.reset()
  },
}
