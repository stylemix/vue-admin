<template>
  <login-view>
    <form @submit.prevent="onSubmit">
      <fields
        :fields="fields.all()"
        :model="model"
        :errors="errors"
        layout="vertical"
      />
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">
          Sign in
          <i class="icon-circle-right2 ml-2"></i>
        </button>
      </div>
    </form>
  </login-view>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import AdminStore from '../../store'
import AuthConfig from './config'
import Config from '../../config'
import AuthApi from './AuthApi'
import LoginView from '../../views/login-view'
import AdminRouter from '../../router'

export default {
  name: 'LoginForm',

  components: {
    LoginView,
  },

  mixins: [FormMixin],

  data() {
    return {
      model: {},
    }
  },

  created() {
    if (AuthConfig.loginForm) {
      this.setFields(AuthConfig.loginForm.fields)
      this.model = AuthConfig.loginForm.model
    }
  },

  methods: {
    onSubmit() {
      this.errors.clear()

      const promise = new AuthApi()
        .login(this.model)
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
            AdminStore.dispatch('admin-auth/find')
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
