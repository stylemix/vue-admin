<!--suppress ALL -->
<template>
  <!-- Login form -->
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="card mb-0">
      <div class="card-body">
        <div class="text-center mb-3">
          <i
            class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"
          ></i>
          <h5 class="mb-0">Login to your account</h5>
          <span class="d-block text-muted">Enter your credentials below</span>
        </div>

        <div class="form-group form-group-feedback form-group-feedback-left">
          <input
            v-model="form.email"
            type="text"
            class="form-control"
            placeholder="Email"
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

        <div class="text-center">
          Have not account yet?
          <router-link to="/register">Sign Up</router-link>
        </div>
        <hr />
        <div class="text-center">
          <router-link to="/reset-password">Forgot password?</router-link>
        </div>
      </div>
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
