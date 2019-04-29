<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="card mb-0">
      <div class="card-body">
        <div class="text-center mb-3">
          <i
            class="icon-plus3 icon-2x text-success border-success border-3 rounded-round p-3 mb-3 mt-1"
          ></i>
          <h5 class="mb-0">Create account</h5>
          <span class="d-block text-muted">All fields are required</span>
        </div>

        <div class="form-group text-center text-muted content-divider">
          <span class="px-2">Your credentials</span>
        </div>

        <div class="form-group form-group-feedback form-group-feedback-left">
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Your email"
          />
          <div class="form-control-feedback">
            <i class="icon-mention text-muted"></i>
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
            <i class="icon-user-lock text-muted"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="form-check">
            <label class="form-check-label">
              <div class="uniform-checker">
                <span :class="{ checked: form.agreement }"
                  ><input
                    v-model="form.agreement"
                    type="checkbox"
                    name="remember"
                    class="form-input-styled"
                    data-fouc=""
                /></span>
              </div>
              Accept <a href="#">terms of service</a>
            </label>
          </div>
        </div>

        <button
          :disabled="!form.agreement"
          type="submit"
          class="btn bg-teal-400 btn-block"
        >
          Register <i class="icon-circle-right2 ml-2"></i>
        </button>

        <hr />
        <div class="text-center">
          Already Have Account? <router-link to="/login">Sign In</router-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Config from '../../config'

export default {
  name: 'SignUp',

  data() {
    return {
      form: {
        email: null,
        password: null,
        agreement: false
      }
    }
  },

  methods: {
    onSubmit() {
      const authHandler = Config.authHandler
      if (authHandler && authHandler.onRegister)
        authHandler.onRegister(this.form, this)
    }
  },
}
</script>
