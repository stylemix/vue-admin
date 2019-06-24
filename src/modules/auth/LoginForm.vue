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
          {{ strings.auth.sign_in }}
          <i class="icon-circle-right2 ml-2"></i>
        </button>
      </div>
    </form>
  </login-view>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import AdminStore from '../../store'
import Config from '../../config'
import AuthApi from './AuthApi'
import LoginView from '../../views/login-view'
import AdminRouter from '../../router'
import strings from '../../strings'

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

  computed: {
    strings() {
      return strings
    },
  },

  mounted() {
    this.loadForm()
  },

  methods: {
    loadForm() {
      this.model = {
        email: null,
        password: null,
      }

      this.setFields([
        {
          component: 'text-field',
          attribute: 'email',
          type: 'email',
          get label() {
            return strings.auth.email
          },
        },
        {
          component: 'text-field',
          attribute: 'password',
          type: 'password',
          get label() {
            return strings.auth.password
          },
        },
      ])
    },

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
