<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <div class="login-form">
          <div class="card mb-0">
            <div class="card-body">
              <div class="text-center mb-3">
                <i
                  class="icon-plus3 icon-2x text-success border-success border-3 rounded-round p-3 mb-3 mt-1"
                />
                <h5 class="mb-0">{{ strings.auth.register_header }}</h5>
                <span class="d-block text-muted">
                  {{ strings.auth.register_desc }}
                </span>
              </div>

              <slot>
                <sign-up />
              </slot>

              <hr />
              <div class="text-center">
                {{ strings.auth.register_login_text }}
                <router-link :to="loginRoute">
                  {{ strings.auth.sign_in }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from '../components/auth/auth-sign-up'
import AuthRoutesMixin from './AuthRoutesMixin'
import strings from '../strings'

export default {
  name: 'RegisterView',
  components: { SignUp },
  mixins: [AuthRoutesMixin],
  computed: {
    strings() {
      return strings
    },
  },
}
</script>
