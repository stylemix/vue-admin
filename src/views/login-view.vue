<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <div class="login-form">
          <div class="card mb-0">
            <div class="card-body">
              <div class="text-center mb-3">
                <i
                  class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"
                ></i>
                <h5 class="mb-0">Login to your account</h5>
                <span class="d-block text-muted"
                  >Enter your credentials below</span
                >
              </div>

              <slot>
                <sign-in />
              </slot>

              <div class="text-center">
                Have not account yet?
                <router-link :to="registerRoute">Sign Up</router-link>
              </div>
              <hr />
              <div class="text-center">
                <router-link :to="forgotRoute">Forgot password?</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../components/auth/auth-sign-in'
import AuthRoutesMixin from './AuthRoutesMixin'

export default {
  name: 'LoginView',
  components: { SignIn },
  mixins: [AuthRoutesMixin],
}
</script>
