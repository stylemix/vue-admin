<template>
  <div class="form-group">
    <label :for="label">{{ label }}</label>
    <!--suppress HtmlFormInputWithoutLabel -->
    <textarea :id="label" v-model="value" class="form-control"></textarea>
  </div>
</template>

<script>
export default {
  name: 'WidgetTextarea',

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
