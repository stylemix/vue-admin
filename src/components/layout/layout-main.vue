<template>
  <div>
    <navbar></navbar>

    <div class="page-content">
      <sidebar :menu="menu"></sidebar>
    </div>
  </div>
</template>

<script>
import Navbar from '../navbar/navbar'
import Sidebar from '../sidebar/sidebar'

import { mapGetters } from 'vuex'

export default {
  name: 'LayoutMain',

  components: {
    Sidebar,
    Navbar
  },

  computed: {
    ...mapGetters('sidebar', ['menu'])
  }
}
</script>
