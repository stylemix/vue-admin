<template>
  <register-view>
    <form @submit.prevent="onSubmit">
      <fields
        :fields="fields.all()"
        :model="model"
        :errors="errors"
        layout="vertical"
      >
      </fields>
      <button
        :disabled="!model.agree"
        type="submit"
        class="btn bg-teal-400 btn-block"
      >
        Register
        <i class="icon-circle-right2 ml-2"></i>
      </button>
    </form>
  </register-view>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import AdminStore from '../../store'
import AuthConfig from './config'
import AdminRouter from '../../router'
import Config from '../../config'
import AuthApi from './AuthApi'
import RegisterView from '../../views/register-view'

export default {
  name: 'RegisterForm',

  components: {
    RegisterView,
  },

  mixins: [FormMixin],

  data() {
    return {
      model: {},
    }
  },

  created() {
    if (AuthConfig.registerForm) {
      this.setFields(AuthConfig.registerForm.fields)
      this.model = AuthConfig.registerForm.model
    }
  },

  methods: {
    onSubmit() {
      this.errors.clear()

      const promise = new AuthApi()
        .register(this.model)
        .then(({ token, expires_in: expiresIn }) => {
          if (!token || !expiresIn) {
            //eslint-disable-next-line
            console.error('Failed to get token data from response')
            return
          }

          AdminStore.dispatch(
            'admin-auth/login',
            { token, expiresIn },
            expiresIn,
          ).then(() => {
            if (Config.defaultRoute) {
              AdminRouter.push(Config.defaultRoute)
            }
          })
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
