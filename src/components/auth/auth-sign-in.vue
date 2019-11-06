<!--suppress ALL -->
<template>
  <!-- Login form -->
  <form class="login-form" @submit.prevent="onSubmit">
    <div class="form-group form-group-feedback form-group-feedback-left">
      <input
        v-model="form.email"
        type="text"
        class="form-control"
        placeholder="Email"
        required
      />
      <div class="form-control-feedback">
        <i class="icon-user text-muted"></i>
      </div>
    </div>

    <div class="form-group form-group-feedback form-group-feedback-left">
      <input
        v-model="form.password"
        type="password"
        class="form-control"
        placeholder="Password"
      />
      <div class="form-control-feedback">
        <i class="icon-lock2 text-muted"></i>
      </div>
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">
        Sign in <i class="icon-circle-right2 ml-2"></i>
      </button>
    </div>
  </form>
  <!-- /login form -->
</template>

<script>
import Config from '../../config'

export default {
  name: 'SignIn',

  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    }
  },

  methods: {
    onSubmit() {
      const authHandler = Config.authHandler
      if (authHandler && authHandler.onLogin) {
        authHandler.onLogin(this.form, this)
      }
    },
  },
}
</script>
