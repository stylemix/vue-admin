<template>
  <reset-password-view>
    <form @submit.prevent="onSubmit">
      <fields
        :fields="fields.all()"
        :model="model"
        :errors="errors"
        layout="vertical"
      />
      <button type="submit" class="btn btn-info btn-block">
        <i class="icon-spinner11 mr-2"></i> Send instructions
      </button>
    </form>
  </reset-password-view>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import AuthConfig from './config'
import AuthApi from './AuthApi'
import AdminRouter from '../../router'
import ResetPasswordView from '../../views/forgot-password-view'
import AuthRoutesMixin from '../../views/AuthRoutesMixin'

export default {
  name: 'ResetForm',

  components: {
    ResetPasswordView,
  },

  mixins: [FormMixin, AuthRoutesMixin],

  data() {
    return {
      model: {},
    }
  },

  created() {
    if (AuthConfig.forgotForm) {
      this.setFields(AuthConfig.forgotForm.fields)
      this.model = AuthConfig.forgotForm.model
    }
  },

  methods: {
    onSubmit() {
      this.errors.clear()

      const promise = new AuthApi()
        .forgot(this.model.email)
        .then(result => {
          this.$alert.success(result.message)
          AdminRouter.push(this.resetRoute)
        })
        .catch(response => {
          if (response.status === 422) {
            this.setValidationErrors(response.data.errors)
            return
          }
          //eslint-disable-next-line
          console.error(response)
        })

      this.$uiBlocker(promise, this.$el)
    },
  },
}
</script>
