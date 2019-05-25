<template>
  <div>
    <div class="form-group">
      <label :for="label">{{ label }}</label>
      <input type="text" class="form-control" :id="label" />
    </div>
    <vue-google-autocomplete
      types="geocode"
      v-show="false"
      v-if="googleLoaded"
      :id="label"
      v-model="value"
      @placechanged="onPlaceChanged"
    ></vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'WidgetGeolocation',

  components: {
    VueGoogleAutocomplete
  },

  props: {
    label: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      googleLoaded: false,
      value: null
    }
  },

  created() {
    // register google map script
    this.addGoogleMapScriptElementIfNotExists()
    window.onGoogleLoaded = this.onGoogleLoaded
  },

  methods: {
    addGoogleMapScriptElementIfNotExists() {
      const mapKey = process.env.VUE_APP_GOOGLE_MAP_KEY
      if (!mapKey) {
        console.warn(
          'Invalid Google map key. Are you added VUE_APP_GOOGLE_MAP_KEY key in .env file?'
        )
        return
      }

      if (window.google) {
        this.googleLoaded = true
      } else {
        const mapScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places&callback=onGoogleLoaded`
        this.script = document.createElement('script')
        this.script.setAttribute('src', mapScriptUrl)
        this.script.setAttribute('async', 'true')
        this.script.setAttribute('defer', 'true')
        document.body.appendChild(this.script)
      }
    },

    onGoogleLoaded() {
      this.googleLoaded = true
    },

    onPlaceChanged({ latitude: lat, longitude: long }) {
      this.value = { lat, long }
    }
  }
}
</script>
