export default {
  created() {
    this.$watch('$authenticated', result => {
      if (result) {
        this.$emit('authenticated')
      }
    })
    this.$watch('$account', result => {
      if (result) {
        this.$emit('account-loaded', result)
      }
    })
  },
}
