<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="card mb-0">
      <div class="card-body">
        <div class="text-center mb-3">
          <i
            class="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"
          ></i>
          <h5 class="mb-0">Password recovery</h5>
          <span class="d-block text-muted"
            >We'll send you instructions in email</span
          >
        </div>

        <div class="form-group form-group-feedback form-group-feedback-right">
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Your email"
          />
          <div class="form-control-feedback">
            <i class="icon-mail5 text-muted"></i>
          </div>
        </div>

        <button type="submit" class="btn btn-info btn-block">
          <i class="icon-spinner11 mr-2"></i> Reset password
        </button>
        <hr />
        <div class="text-center">
          <router-link to="/login">Back to login</router-link>
        </div>
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
      form: { email: null }
    }
  },

  methods: {
    onSubmit() {
      const authHandler = Config.authHandler
      if (authHandler && authHandler.onResetPassword)
        authHandler.onResetPassword(this.form, this)
    }
  }
}
</script>
