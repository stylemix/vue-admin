<template>
  <div class="page-content">
    <div class="content-wrapper">
      <div class="content d-flex justify-content-center align-items-center">
        <sign-up></sign-up>
      </div>
    </div>
  </div>
</template>

<script>
import SignUp from '../components/auth/auth-sign-up'

export default {
  name: 'RegisterView',
  components: { SignUp }
}
</script>
