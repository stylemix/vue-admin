<template>
  <div class="form-group">
    <div
      v-show="showPicker"
      class="overlay-widget-datetime"
      @click="showPicker = false"
    ></div>
    <label>{{ label }}</label>
    <div class="input-group">
      <span class="input-group-prepend">
        <span class="input-group-text"><i class="icon-calendar22"></i></span>
      </span>
      <!--suppress HtmlFormInputWithoutLabel -->
      <input
        style="z-index: 9999"
        type="text"
        class="form-control daterange-single"
        v-model="value"
        @focusin="showPicker = true"
      />

      <vue-ctk-datetime-picker
        style="z-index: 9999; position: absolute; top: 40px"
        ref="picker"
        v-show="showPicker"
        v-model="value"
        inline
        no-header
        only-date
        format="YYYY/MM/DD"
        :no-keyboard="true"
        @input="onInput"
      ></vue-ctk-datetime-picker>
    </div>
  </div>
</template>

<script>
import VueCtkDatetimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'WidgetDatetime',

  components: {
    VueCtkDatetimePicker,
  },

  props: {
    label: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      value: null,
      showPicker: false,
    }
  },

  methods: {
    onInput() {
      this.showPicker = false
    },
  },
}
</script>

<style scoped>
.overlay-widget-datetime {
  position: fixed;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
