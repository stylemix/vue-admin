<template>
  <div class="card">
    <div v-if="hasHeaderBar" class="card-header">
      <div v-show="selected.length" class="float-right">
        {{ $t('admin.table.selected', { count: selected.length }) }}
        <b-dropdown variant="light" right :text="$t('admin.table.actions')">
          <b-dropdown-item
            v-for="(action, index) in buildBulkActions()"
            :key="index"
            @click.prevent="action.handler(selected)"
          >
            {{ action.labelTranslated }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <admin-search-form
        v-if="searchFields"
        :search-fields="searchFields"
        :search-data="searchData"
        @submit="onSearchHandler"
      />
    </div>
    <div class="table-responsive">
      <b-table
        ref="table"
        v-model="localItems"
        :fields="fields"
        :items="itemsProvider"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        :filter="filter"
        :per-page="perPage"
        :current-page="page"
        :busy="busy"
        show-empty
        small
      >
        <template slot="table-colgroup">
          <slot name="table-colgroup" />
        </template>
        <template v-slot:head(_checkbox)>
          <input
            :checked="isAllSelected"
            type="checkbox"
            @click.stop
            @change="onSelectAll"
          />
        </template>
        <template v-slot:cell(_checkbox)="{ item }">
          <input v-model="selected" :value="item.id" type="checkbox" />
        </template>
        <template
          v-for="column in columnsResolved"
          v-slot:[`head(${column.key})`]
        >
          {{ column.labelTranslated }}
        </template>
        <template
          v-for="column in columnsResolved"
          v-slot:[`cell(${column.key})`]="{ item }"
        >
          <component
            :is="column.component"
            v-if="column.component"
            :key="column.key"
            :attribute="column.key"
            :config="column.config"
            :item="item"
          />
          <div v-if="!column.component" :key="column.key">
            <slot :name="`cell(${column.key})`" :column="column" :item="item">
              {{ $refs.table.getFormattedValue(item, column) }}
            </slot>
          </div>
        </template>
        <template v-slot:cell(_actions)="{ item }">
          <b-button
            v-for="(action, key) in buildRowActions(item)"
            :key="key"
            :variant="action.variant"
            size="sm"
            class="ml-1"
            @click="action.handler"
          >
            {{ action.labelTranslated }}
          </b-button>
          <slot :item="item" name="actions" />
        </template>
        <template slot="row-details" slot-scope="row">
          <slot v-bind="row" name="row-details" />
        </template>
      </b-table>
    </div>
    <div class="card-footer flex justify-between items-center">
      <b-pagination
        v-if="pagination"
        v-model="page"
        :limit="10"
        :total-rows="total"
        :per-page="perPage"
      />
      <div>
        {{ $t('admin.table.total_records', { count: total }) }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import get from 'lodash-es/get'
import map from 'lodash-es/map'
import intersection from 'lodash-es/intersection'
import AdminSearchForm from './SearchForm.vue'
import AdminApi from '../plugins/api'
import { addTranslators } from '../utils'

function value(prop, ...args) {
  if (typeof prop === 'function') {
    return prop.apply(this, args)
  }

  return prop
}

export default {
  name: 'AdminTable',

  components: {
    AdminSearchForm,
  },

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: null,
    },
    base: {
      type: String,
      required: true,
    },
    apiBuilder: {
      type: Function,
      default: function() {
        return new AdminApi(this.base || '')
      },
    },
    beforeApiRequest: {
      type: Function,
      default: () => {},
    },
    busy: {
      type: Boolean,
      default: false,
    },
    sortBy: {
      type: String,
      default: null,
    },
    sortDesc: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    perPage: {
      type: Number,
      default: 15,
    },
    rowActions: {
      type: [Array, Function],
      default: () => ['edit', 'delete'],
    },
    onEditItem: {
      type: Function,
      default: null,
    },
    onDetailsItem: {
      type: Function,
      default: null,
    },
    onDeleteItem: {
      type: Function,
      default: null,
    },
    bulkActions: {
      type: [Array, Function],
      default: () => ['delete'],
    },
    onBulkDelete: {
      type: Function,
      default: null,
    },
    searchFields: {
      type: Array,
      default: () => {
        return [
          {
            attribute: 'query',
            component: 'text-field',
            type: 'search',
            get placeholder() {
              return Vue.$t('admin.table.search')
            },
          },
        ]
      },
    },
    searchData: {
      type: Object,
      default: () => {
        return {
          query: null,
        }
      },
    },
    onSearch: {
      type: Function,
      default: function(params, $vm) {
        $vm.params = params
        $vm.reset()
      },
    },
  },

  data() {
    return {
      config: {},
      api: null,
      localItems: [],
      selected: [],
      total: 0,
      page: 1,
      filter: null,
      params: {},
      editing: null,
    }
  },

  computed: {
    columnsResolved() {
      const columns = []

      this.columns.forEach(column => {
        columns.push(addTranslators(column, ['label']))
      })

      return columns
    },
    fields() {
      let fields = []

      if (this.hasBulkActions) {
        fields.push({
          key: '_checkbox',
          label: '',
          sortable: false,
        })
      }

      fields = fields.concat(this.columnsResolved)

      fields.push({
        key: '_actions',
        label: '',
        tdAttr: {
          nowrap: 'nowrap',
          width: '1%',
        },
      })

      return fields
    },
    hasBulkActions() {
      return value.call(this, this.bulkActions).length > 0
    },
    hasHeaderBar() {
      return (
        this.hasBulkActions || (this.searchFields && this.searchFields.length)
      )
    },
    isAllSelected() {
      if (!this.localItems.length) {
        return false
      }

      const selected = intersection(this.selected, map(this.localItems, 'id'))

      return selected.length === this.localItems.length
    },
  },

  created() {
    this.initApi()
  },

  methods: {
    initApi() {
      this.api = this.apiBuilder()
    },

    refresh() {
      this.$refs.table.refresh()
    },

    reset() {
      this.initApi()
      if (this.page !== 1) {
        this.page = 1
      } else {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    },

    itemsProvider(ctx) {
      if (this.items) {
        return this.items
      }

      this.initApi()
      this.api.setParameters(this.params)
      this.api.setParameter('per_page', ctx.perPage)
      this.api.setParameter('page', ctx.currentPage)

      if (ctx.sortBy) {
        this.api.setParameter('sort', {
          [ctx.sortBy]: ctx.sortDesc ? 'desc' : 'asc',
        })
      } else {
        this.api.removeParameter('sort')
      }

      this.beforeApiRequest(this.api, ctx)

      return this.api
        .all()
        .then(result => {
          this.total = get(result, 'meta.total', result.data.length)
          this.$emit('api-result', result)
          return result.data
        })
        .catch(() => [])
    },

    buildRowActions(item) {
      const actions = []

      value.call(this, this.rowActions, item).forEach(action => {
        if (action === 'edit') {
          actions.push({
            label: '$t.admin.table.action_edit',
            handler: () => {
              this.onEditItem
                ? this.onEditItem(item)
                : this.defaultOnEditItem(item)
            },
          })
        } else if (action === 'details') {
          actions.push({
            label: '$t.admin.table.action_details',
            variant: 'light',
            handler: () => {
              this.onDetailsItem
                ? this.onDetailsItem(item)
                : this.defaultOnDetailsItem(item)
            },
          })
        } else if (action === 'delete') {
          actions.push({
            label: '$t.admin.table.action_delete',
            variant: 'danger',
            handler: () => {
              this.onDeleteItem
                ? this.onDeleteItem(item)
                : this.defaultOnDeleteItem(item)
            },
          })
        } else {
          actions.push(action)
        }
      })

      return actions.map(action => addTranslators(action, ['label']))
    },

    onSelectItem(item) {
      const { id } = item
      if (this.selected.indexOf(id) === -1) {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },

    buildBulkActions() {
      const actions = []

      value.call(this, this.bulkActions).forEach(action => {
        if (action === 'delete') {
          actions.push({
            label: '$t.admin.table.action_delete_selected',
            variant: 'danger',
            handler: selected => {
              this.onBulkDelete
                ? this.onBulkDelete(selected)
                : this.defaultOnBulkDelete(selected)
            },
          })
        } else {
          actions.push(action)
        }
      })

      return actions.map(action => addTranslators(action, ['label']))
    },

    onSelectAll() {
      if (this.isAllSelected) {
        this.localItems.forEach(item => {
          const { id } = item
          if (this.selected.indexOf(id) !== -1) {
            this.selected.splice(this.selected.indexOf(id), 1)
          }
        })
        return
      }

      this.localItems.forEach(item => {
        const { id } = item
        if (this.selected.indexOf(id) === -1) {
          this.selected.push(id)
        }
      })
    },

    onSearchHandler(params) {
      this.onSearch(params, this)
    },

    defaultOnEditItem(item) {
      this.$router.push({
        name: `${this.base}.edit`,
        params: {
          id: item.id,
        },
      })
    },

    defaultOnDetailsItem(item) {
      this.$set(item, '_showDetails', true)
    },

    defaultOnDeleteItem(item) {
      this.$alert
        .question(
          this.$t('admin.table.delete_confirmation_title'),
          this.$t('admin.table.delete_confirmation'),
          {
            showCancelButton: true,
          },
        )
        .then(result => {
          if (!result.value) {
            return
          }
          this.apiBuilder()
            .destroy(item.id)
            .then(() => {
              this.refresh()
            })
        })
    },

    defaultOnBulkDelete(selected) {
      this.$alert
        .question(
          this.$t('admin.table.delete_confirmation_title'),
          this.$t('admin.table.delete_confirmation'),
          {
            showCancelButton: true,
          },
        )
        .then(result => {
          if (!result.value) {
            return
          }

          this.apiBuilder()
            .bulkDestroy(selected)
            .then(() => {
              this.selected = []
              this.refresh()
            })
        })
    },
  },
}
</script>