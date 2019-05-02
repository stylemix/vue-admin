<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <auth-forgot></auth-forgot>
      </div>
    </div>
  </div>
</template>

<script>
import AuthForgot from '../components/auth/auth-forgot'
export default {
  name: 'ResetPasswordView',
  components: { AuthForgot },
}
</script>
