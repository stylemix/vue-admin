<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <sign-in></sign-in>
      </div>
    </div>
  </div>
</template>

<script>
import SignIn from '../components/auth/auth-sign-in'
export default {
  name: 'LoginView',
  components: { SignIn },
}
</script>
