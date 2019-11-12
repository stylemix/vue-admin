<template>
  <span v-if="value" class="whitespace-no-wrap">
    <i class="icon-checkbox-checked2" /> {{ trueText }}
  </span>
  <span v-else class="whitespace-no-wrap">
    <i class="icon-checkbox-unchecked2" /> {{ falseText }}
  </span>
</template>

<script>
import ValueMixin from './ValueMixin'

export default {
  name: 'ValueBoolean',

  mixins: [ValueMixin],

  data() {
    let config = this.config || {}
    return {
      trueText: config.trueText || this.$t('general.yes'),
      falseText: config.falseText || this.$t('general.no'),
    }
  },
}
</script>
