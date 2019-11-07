<template>
  <form @submit.prevent="onSubmit">
    <fields layout="vertical" />
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">
        {{ strings.auth.sign_in }}
        <i class="icon-circle-right2 ml-2"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import Admin from '../../admin'
import Config from '../../config'
import AuthApi from './AuthApi'
import strings from '../../strings'

export default {
  name: 'LoginForm',

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
          required: true,
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

          return Admin.store
            .dispatch('adminAuth/login', { token, expiresIn }, expiresIn)
            .then(() => {
              this.redirect()
              return Admin.store.dispatch('.adminAuth/find')
            })
        })
        .catch(response => {
          if (response.status === 422) {
            this.setValidationErrors(response.data.errors)
            return
          }

          if (this.$toast && response.data && response.data.message) {
            this.$toast && this.$toast.error(response.data.message)
          }
        })

      this.$uiBlocker(promise, this.$el)
    },
    redirect() {
      // First check for last attempted and redirect to that route
      // otherwise redirect to default route from config
      if (Admin.store.state['adminAuth'].attemptedRoute) {
        Admin.router.push(Admin.store.state['adminAuth'].attemptedRoute)
        Admin.store.commit('adminAuth/attemptedRoute', null)
        return
      }

      if (Config.defaultRoute) {
        Admin.router.push(Config.defaultRoute)
      }
    },
  },
}
</script>
