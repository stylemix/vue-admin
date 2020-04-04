<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id"
      :checked="checked"
      type="checkbox"
      class="custom-control-input"
      @click.stop
      @change="$emit('change', $event)"
    />
    <label class="custom-control-label" :for="id"></label>
  </div>
</template>

<style scoped>
.custom-control {
  padding: 0;
  width: 1rem;
  height: 1.4rem;
}
.custom-control-label {
  box-sizing: content-box;
  margin: -0.7rem;
  padding: 0.7rem;
  width: 1rem;
  height: 1.4rem;
}
.custom-control-label:before,
.custom-control-label:after {
  top: 0.9rem;
  left: 0.7rem;
}
</style>

<script>
export default {
  name: 'TableCheckbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
