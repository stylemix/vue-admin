<template>
  <b-card>
    This is default built-in page. You should register your own ones.
  </b-card>
</template>

<script>
import HasPageHeader from '../mixins/HasPageHeader'

export default {
  name: 'Default',

  mixins: [HasPageHeader],

  pageTitle() {
    return 'Default page'
  },
}
</script>
