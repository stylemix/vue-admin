export default {
  created() {
    this.$watch(
      '$authenticated',
      result => {
        if (result) {
          this.$emit('authenticated')
        }
      },
      { immediate: true },
    )
    this.$watch(
      '$account',
      (result, oldVal) => {
        if (result && !oldVal) {
          this.$emit('account-loaded', result)
        }
      },
      { immediate: true },
    )
  },
}
