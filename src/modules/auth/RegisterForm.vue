<template>
  <register-view>
    <form @submit.prevent="onSubmit">
      <fields layout="vertical" />
      <button
        :disabled="!model.agree"
        type="submit"
        class="btn bg-teal-400 btn-block"
      >
        {{ strings.auth.sign_in }}
        <i class="icon-circle-right2 ml-2"></i>
      </button>
    </form>
  </register-view>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import AdminStore from '../../store'
import AdminRouter from '../../router'
import Config from '../../config'
import AuthApi from './AuthApi'
import RegisterView from './RegisterView'
import strings from '../../strings'

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
        first_name: null,
        last_name: null,
        email: null,
        password: null,
      }

      this.setFields([
        {
          component: 'text-field',
          attribute: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
        {
          component: 'text-field',
          attribute: 'password',
          type: 'password',
          label: 'Password',
          required: true,
        },
        {
          component: 'text-field',
          attribute: 'first_name',
          label: 'First name',
          required: true,
        },
        {
          component: 'text-field',
          attribute: 'last_name',
          label: 'Last name',
        },
        {
          component: 'checkbox-field',
          attribute: 'agree',
          label: 'I agree with terms of service',
        },
      ])
    },

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
