<!--suppress HtmlFormInputWithoutLabel -->
<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group form-group-feedback form-group-feedback-left">
      <input
        v-model="form.email"
        type="email"
        class="form-control"
        placeholder="Your email"
        required
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
        required
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
        agreement: false,
      },
    }
  },

  methods: {
    onSubmit() {
      const authHandler = Config.authHandler
      if (authHandler && authHandler.onRegister)
        authHandler.onRegister(this.form, this)
    },
  },
}
</script>
