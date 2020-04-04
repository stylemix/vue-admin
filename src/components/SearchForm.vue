<template>
  <form class="form-inline" @submit.prevent="">
    <div class="form-inline-inner">
      <fields :fields="fields.all()" :model="model" layout="inline" />
      <b-button
        v-if="clearable"
        variant="light"
        type="button"
        class="mb-2"
        @click.prevent="clear"
      >
        {{ $t('admin.table.search_clear') }}
      </b-button>
    </div>
  </form>
</template>

<style>
.form-inline-inner {
  margin-bottom: -0.65rem;
}
</style>

<script>
import { FormMixin } from 'stylemix-base'
import debounce from 'lodash-es/debounce'

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
    clearable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      model: Object.assign({}, this.searchData),
    }
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
