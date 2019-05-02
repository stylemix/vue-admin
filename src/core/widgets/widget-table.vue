<template>
  <div>
    <div class="page-header page-header-light">
      <slot name="page-header"></slot>
    </div>

    <div class="content">
      <div class="card">
        <div class="table-responsive">
          <table class="table datatable-save-state dataTable no-footer">
            <thead>
              <tr>
                <th v-for="(header, key) in headers" :key="key">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                role="row"
                v-for="(row, index) in rows"
                :key="index"
                class="odd"
              >
                <td v-for="(value, key) in row" :key="key">
                  <template v-if="typeof $scopedSlots[key] !== 'undefined'">
                    <slot :name="key" :row="row"></slot>
                  </template>
                  <template v-else>
                    {{ value }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalizeFirst } from '../utils'

export default {
  name: 'WidgetTable',

  props: {
    model: {
      type: Object,
      default() {
        return null
      },
    },
  },

  data() {
    return {
      tableData: [],
    }
  },

  created() {
    this.model.actions
      .index({
        page: 1,
        limit: 100,
      })
      .then(users => (this.tableData = users))
      .catch(err => console.error(err))
  },

  computed: {
    headers() {
      const config = this.model.config
      if (config && config.attributes)
        return Object.keys(config.attributes)
          .filter(key => !config.attributes[key].via)
          .map(key => config.attributes[key].label || capitalizeFirst(key))
      return []
    },

    rows() {
      const attrs = this.model.config.attributes
      const data = this.tableData

      return data.map(d => {
        const mappedRow = {}
        Object.keys(attrs).forEach(key => {
          if (!attrs[key].via) mappedRow[key] = d[key]
        })

        return mappedRow
      })
    },
  },
}
</script>
