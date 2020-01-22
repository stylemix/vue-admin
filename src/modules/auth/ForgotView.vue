<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <div class="login-form">
          <b-card class="mb-0">
            <div class="text-center mb-3">
              <i
                class="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"
              />
              <h5 class="mb-0">{{ $t('admin.auth.forgot_header') }}</h5>
              <span class="d-block text-muted">
                {{ $t('admin.auth.forgot_desc') }}
              </span>
            </div>
            <slot />
            <hr />
            <div class="text-center">
              <router-link :to="loginRoute">
                {{ $t('admin.auth.forgot_login_text') }}
              </router-link>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRoutesMixin from './AuthFormMixin'

export default {
  name: 'ForgotView',
  mixins: [AuthRoutesMixin],
}
</script>
