<template>
  <form @submit.prevent="onSubmit">
    <fields layout="vertical" />
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">
        {{ $t('admin.auth.sign_in') }}
        <i class="icon-circle-right2 ml-2"></i>
      </button>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import { FormMixin } from 'stylemix-base'
import Admin from '../../admin'
import AuthFormMixin from './AuthFormMixin'
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',

  mixins: [FormMixin, AuthFormMixin],

  data() {
    return {
      model: {},
    }
  },

  mounted() {
    this.loadForm()
  },

  methods: {
    ...mapActions('adminAuth', ['login', 'find']),
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
            return Vue.$t('admin.auth.email')
          },
        },
        {
          component: 'text-field',
          attribute: 'password',
          type: 'password',
          get label() {
            return Vue.$t('admin.auth.password')
          },
        },
      ])
    },

    onSubmit() {
      this.errors.clear()

      const promise = this.apiBuilder()
        .login(this.model)
        .then(result => {
          return this.login(result).then(() => {
            this.redirect()
          })
        })
        .catch(response => {
          if (response.status === 422) {
            this.setValidationErrors(response.data.errors)
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

      Admin.router.push(Admin.store.state.adminConfig.defaultRoute)
    },
  },
}
</script>
