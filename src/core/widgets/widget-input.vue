<template>
  <div class="form-group">
    <label for="forgot-email">{{ label }}</label>
    <input v-model="value" type="text" class="form-control" id="forgot-email" />
  </div>
</template>

<script>
export default {
  name: 'WidgetInput',

  props: {
    label: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      value: null,
    }
  },
}
</script>
