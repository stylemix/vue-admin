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
        :search-clearable="searchClearable"
        @submit="onSearchHandler"
      />
    </div>
    <div class="table-responsive">
      <b-table
        ref="table"
        v-model="localItems"
        v-bind="proxyPropsBindings"
        :fields="fields"
        :items="itemsProvider"
        :current-page="page"
        :no-select-on-click="rowClickAction !== 'select'"
        :tbody-tr-class="tbodyTrClassComputed"
        @row-selected="onRowSelected"
        @row-clicked="onRowClicked"
      >
        <template slot="table-colgroup">
          <slot name="table-colgroup" />
        </template>
        <template v-slot:head(_checkbox)>
          <table-checkbox
            :id="`${base}-checkbox-all`"
            :checked="isAllSelected"
            @change="toggleSelectAll"
          />
        </template>
        <template v-slot:cell(_checkbox)="{ item, index }">
          <table-checkbox
            :id="`${base}-checkbox-${index}`"
            :checked="isRowSelected(index)"
            @change="toggleSelectRow(index)"
          />
        </template>
        <template
          v-for="column in columnsResolved"
          v-slot:[`head(${column.key})`]="scope"
        >
          <slot :name="`head(${column.key})`" v-bind="scope">
            {{ column.labelTranslated }}
          </slot>
        </template>
        <template
          v-for="column in columnsResolved"
          v-slot:[`cell(${column.key})`]="scope"
        >
          <component
            :is="column.component"
            v-if="column.component"
            :key="column.key"
            v-bind="column.componentProps(scope)"
          />
          <div v-if="!column.component" :key="column.key">
            <slot :name="`cell(${column.key})`" v-bind="scope">
              {{ $refs.table.getFormattedValue(scope.item, column) }}
            </slot>
          </div>
        </template>
        <template v-slot:cell(_actions)="scope">
          <b-button
            v-for="(action, key) in buildRowActions(scope.item)"
            :key="key"
            :variant="action.variant"
            size="sm"
            class="ml-1"
            @click="action.handler"
          >
            {{ action.labelTranslated }}
          </b-button>
          <slot v-bind="scope" name="actions" />
        </template>
        <template v-slot:row-details="row">
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

<style scoped>
.table-responsive {
  margin-bottom: 0;
}
</style>

<script>
import Vue from 'vue'
import AdminSearchForm from './SearchForm.vue'
import { addTranslators } from '../utils'
import TableCheckbox from './TableCheckbox'

function value(prop, ...args) {
  if (typeof prop === 'function') {
    return prop.apply(this, args)
  }

  return prop
}

const proxyProps = [
  'id',
  'primaryKey',
  'striped',
  'bordered',
  'borderless',
  'outlined',
  'dark',
  'hover',
  'small',
  'fixed',
  'responsive',
  'stickyHeader',
  'noBorderCollapse',
  'captionTop',
  'tableVariant',
  'tableClass',
  'stacked',
  'headVariant',
  'headRowVariant',
  'theadClass',
  'theadTrClass',
  'footClone',
  'footVariant',
  'footRowVariant',
  'tfootClass',
  'tfootTrClass',
  'tbodyTrClass',
  'tbodyTrAttr',
  'detailsTdClass',
  'tbodyTransitionProps',
  'tbodyTransitionHandlers',
  'tbodyClass',
  'filter',
  'filterFunction',
  'filterIgnoredFields',
  'filterIncludedFields',
  'sortBy',
  'sortDesc',
  'sortDirection',
  'sortCompare',
  'caption',
  'captionHtml',
  'perPage',
  'selectable',
  'selectMode',
  'selectedVariant',
  // 'noSelectOnClick',
  'showEmpty',
  'emptyText',
  'emptyHtml',
  'emptyFilteredText',
  'emptyFilteredHtml',
  'busy',
]

function proxyPropsConfig() {
  const config = {}
  proxyProps.forEach(prop => {
    config[prop] = {}
  })

  return config
}

export default {
  name: 'AdminTable',

  components: {
    TableCheckbox,
    AdminSearchForm,
  },

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    items: {
      type: [Array, Function],
      default: null,
    },
    base: {
      type: String,
      required: true,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    rowActions: {
      type: [Array, Function],
      default: () => [],
    },
    rowClickAction: {
      type: String,
      default: null,
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
      default: () => [],
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
    searchClearable: {
      type: Boolean,
      default: false,
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
    ...proxyPropsConfig(),
  },

  data() {
    return {
      localItems: [],
      selected: [],
      total: 0,
      page: 1,
      params: {},
      editing: null,
    }
  },

  computed: {
    columnsResolved() {
      const columns = []

      this.columns.forEach(column => {
        // add defaults to column definition
        column = {
          componentProps(scope) {
            return scope
          },
          ...column,
        }
        columns.push(addTranslators(column, ['label']))
      })

      return columns
    },
    fields() {
      let fields = []

      if (this.selectable) {
        fields.push({
          key: '_checkbox',
          label: '',
          sortable: false,
          tdAttr: {
            nowrap: 'nowrap',
            width: '1%',
          },
        })
      }

      fields = fields.concat(this.columnsResolved)

      fields.push({
        key: '_actions',
        label: '',
        sortable: false,
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

      return this.selected.length === this.localItems.length
    },
    tbodyTrClassComputed() {
      if (this.rowClickAction) {
        const classes = value(this.tbodyTrClass) || {}
        if (classes instanceof Array) {
          classes.push('cursor-pointer')
        } else {
          classes['cursor-pointer'] = true
        }

        return classes
      }

      return this.tbodyTrClass
    },
    proxyPropsBindings() {
      const values = {}
      proxyProps.forEach(prop => {
        values[prop] = this[prop]
      })

      return values
    },
  },

  methods: {
    refresh() {
      this.$refs.table.refresh()
    },

    reset() {
      if (this.page !== 1) {
        this.page = 1
      } else {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    },

    itemsProvider(ctx) {
      if (this.items instanceof Array) {
        this.total = this.items.length
        return this.items
      }

      if (this.items instanceof Function) {
        ctx.params = { ...this.params }
        ctx.setTotal = total => (this.total = total)
        return this.items(ctx)
      }

      return []
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

    toggleSelectRow(index) {
      const table = this.$refs.table
      if (table.isRowSelected(index)) {
        table.unselectRow(index)
      } else {
        table.selectRow(index)
      }
    },

    selectRow(index) {
      return this.$refs.table.selectRow(index)
    },

    unselectRow(index) {
      return this.$refs.table.unselectRow(index)
    },

    selectAllRows() {
      return this.$refs.table.selectAllRows()
    },

    clearSelected() {
      return this.$refs.table.clearSelected()
    },

    isRowSelected(index) {
      return this.$refs.table.isRowSelected(index)
    },

    onRowSelected(items) {
      this.selected = items
      this.$emit('row-selected', items)
    },

    toggleSelectAll() {
      if (this.isAllSelected) {
        return this.clearSelected()
      }

      return this.selectAllRows()
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

    onRowClicked(item, index, event) {
      switch (this.rowClickAction) {
        case 'edit':
          ;(this.onEditItem ? this.onEditItem : this.defaultOnEditItem)(item)
          break
        case 'details':
          this.$set(item, '_showDetails', !item._showDetails)
          break
      }
      this.$emit('row-clicked', item, index, event)
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
      this.$set(item, '_showDetails', !item._showDetails)
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
