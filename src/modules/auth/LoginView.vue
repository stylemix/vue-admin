<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <div class="login-form">
          <b-card class="card mb-0">
            <div class="text-center mb-3">
              <i
                class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"
              />
              <h5 class="mb-0">{{ $t('admin.auth.login_header') }}</h5>
              <span class="d-block text-muted">
                {{ $t('admin.auth.login_desc') }}
              </span>
            </div>
            <slot />
            <div v-if="withRegistration" class="text-center">
              {{ $t('admin.auth.login_register_text') }}
              <router-link :to="registerRoute">
                {{ $t('admin.auth.sign_up') }}
              </router-link>
            </div>
            <template v-if="withForgot">
              <hr />
              <div class="text-center">
                <router-link :to="forgotRoute">
                  {{ $t('admin.auth.login_forgot_text') }}
                </router-link>
              </div>
            </template>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRoutesMixin from './AuthFormMixin'
import AuthConfig from './config'

export default {
  name: 'LoginView',
  mixins: [AuthRoutesMixin],
  computed: {
    withRegistration() {
      return AuthConfig.withRegistration
    },
    withForgot() {
      return AuthConfig.withForgot
    },
  },
}
</script>
