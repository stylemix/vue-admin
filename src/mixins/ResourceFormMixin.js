import { FormMixin } from 'stylemix-base'
import isPlainObject from 'lodash-es/isPlainObject'
import AdminApi from '../classes/AdminApi'

export default {
  mixins: [FormMixin],

  props: {
    id: {},
  },

  data() {
    return {
      base: '',
      model: {},
    }
  },

  computed: {
    updating() {
      return !!this.id
    },
  },

  methods: {
    api() {
      return new AdminApi(this.base)
    },

    loadForm() {
      let promise

      if (this.updating) {
        promise = this.api().edit(this.id)
      } else {
        promise = this.api().create()
      }

      promise.then(result => {
        this.model = isPlainObject(result.data) ? result.data : {}
        this.setFields(result.fields)
        return result
      })

      return this.$uiBlocker(promise, this.$el)
    },

    save() {
      this.errors.clear()

      const formData = this.formData(this.model)
      let promise

      if (this.updating) {
        promise = this.api().update(this.id, formData)
      } else {
        promise = this.api().store(formData)
      }

      promise
        .then(result => {
          this.onSaved(result)
          return result
        })
        .catch(response => {
          this.onSaveError(response)
          return Promise.reject(response)
        })

      return this.$uiBlocker(promise, this.$el)
    },

    onSaved(result) {
      this.$emit('saved', result)
    },

    onSaveError(response) {
      if (response.status === 422) {
        this.setValidationErrors(response.data.errors)
        this.$emit('invalid', response.data)
      }
    },

    cancel() {
      this.$emit('cancelled')
    },
  },
}
