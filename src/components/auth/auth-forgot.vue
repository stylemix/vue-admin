<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group form-group-feedback form-group-feedback-right">
      <input
        v-model="form.email"
        type="email"
        class="form-control"
        placeholder="Your email"
        required
      />
      <div class="form-control-feedback">
        <i class="icon-mail5 text-muted"></i>
      </div>
    </div>
  </form>
</template>

<script>
import Config from '../../config'

export default {
  name: 'AuthForgot',

  data() {
    return {
      form: { email: null },
    }
  },

  methods: {
    onSubmit() {
      const authHandler = Config.authHandler
      if (authHandler && authHandler.onResetPassword)
        authHandler.onResetPassword(this.form, this)
    },
  },
}
</script>
