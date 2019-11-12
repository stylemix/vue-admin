<template>
  <form @submit.prevent="onSubmit">
    <fields layout="vertical" />
    <button type="submit" class="btn btn-info btn-block">
      <i class="icon-spinner11 mr-2"></i>
      {{ $t('admin.auth.forgot_submit') }}
    </button>
  </form>
</template>

<script>
import Vue from 'vue'
import { FormMixin } from 'stylemix-base'
import AuthApi from './AuthApi'
import Admin from '../../admin'
import AuthRoutesMixin from './AuthRoutesMixin'

export default {
  name: 'ForgotForm',

  mixins: [FormMixin, AuthRoutesMixin],

  data() {
    return {
      model: {},
    }
  },

  mounted() {
    this.loadForm()
  },

  methods: {
    loadForm() {
      this.model = {
        email: null,
      }

      this.setFields([
        {
          component: 'text-field',
          attribute: 'email',
          type: 'email',
          required: true,
          get label() {
            return Vue.$t('admin.auth.email')
          },
        },
      ])
    },

    onSubmit() {
      this.errors.clear()

      const promise = new AuthApi()
        .forgot(this.model.email)
        .then(result => {
          this.$alert.success(result.message)
          Admin.router.push(this.loginRoute)
        })
        .catch(response => {
          if (response.status === 422) {
            this.setValidationErrors(response.data.errors)
          }
        })

      this.$uiBlocker(promise, this.$el)
    },
  },
}
</script>
