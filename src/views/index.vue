<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',

  computed: mapGetters('profile', ['status', 'user']),

  mounted() {
    // if (this.status === 'LOGGED_OUT') {
    //   this.$router.push('/login')
    // } else {
    //   this.$router.push('/')
    // }
  }
}
</script>
