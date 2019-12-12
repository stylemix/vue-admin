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
    this.$watch('$account', result => {
      if (result) {
        this.$emit('account-loaded', result)
      }
    })
  },
}
