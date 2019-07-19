<template>
  <form class="form-inline" @submit.prevent="">
    <fields :fields="fields.all()" :model="model" layout="inline" />
    <b-button variant="light" type="button" class="mb-2" @click.prevent="clear">
      {{ strings.table.search_clear }}
    </b-button>
  </form>
</template>

<script>
import { FormMixin } from 'stylemix-base'
import debounce from 'lodash-es/debounce'
import strings from '../strings'

export default {
  name: 'AdminSearchForm',

  mixins: [FormMixin],

  props: {
    searchFields: { type: Array, default: () => [] },
    searchData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  data() {
    return {
      model: Object.assign({}, this.searchData),
    }
  },

  computed: {
    strings() {
      return strings
    },
  },

  created() {
    this.setFields(this.searchFields)
    this.resetModel(this.model)
    this.$watch(
      'model',
      debounce(() => {
        this.$emit('submit', this.model)
      }, 500),
      { deep: true },
    )
  },

  methods: {
    clear() {
      this.resetModel(this.model)
    },
  },
}
</script>
