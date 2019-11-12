<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <div class="login-form">
          <div class="card mb-0">
            <div class="card-body">
              <div class="text-center mb-3">
                <i
                  class="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"
                />
                <h5 class="mb-0">{{ $t('admin.auth.forgot_header') }}</h5>
                <span class="d-block text-muted">
                  {{ $t('admin.auth.forgot_desc') }}
                </span>
              </div>

              <slot>
                <auth-forgot />
              </slot>

              <hr />
              <div class="text-center">
                <router-link :to="loginRoute">
                  {{ $t('admin.auth.forgot_login_text') }}
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
import AuthForgot from '../../components/auth/auth-forgot'
import AuthRoutesMixin from './AuthRoutesMixin'

export default {
  name: 'ForgotView',
  components: { AuthForgot },
  mixins: [AuthRoutesMixin],
}
</script>
