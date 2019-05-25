<template>
  <layout-main>
    <widget-form
      v-if="$route.params.action === 'create'"
      :model="model"
    ></widget-form>
    <widget-table
      v-else-if="!$route.params.action || $route.params.action === 'index'"
      :model="model"
    >
      <template slot="page-header">
        <div class="page-header-content header-elements-md-inline">
          <div class="page-title d-flex">
            <h4>
              <i class="icon-arrow-left52 mr-2"></i>
              <span class="font-weight-semibold">Datatables</span> - Basic
            </h4>
            <a href="#" class="header-elements-toggle text-default d-md-none"
              ><i class="icon-more"></i
            ></a>
          </div>
          <div class="header-elements d-none">
            <div class="d-flex justify-content-center">
              <a href="#" class="btn btn-link btn-float text-default"
                ><i class="icon-bars-alt text-primary"></i
                ><span>Statistics</span></a
              >
              <a href="#" class="btn btn-link btn-float text-default"
                ><i class="icon-calculator text-primary"></i>
                <span>Invoices</span></a
              >
              <a href="#" class="btn btn-link btn-float text-default"
                ><i class="icon-calendar5 text-primary"></i>
                <span>Schedule</span></a
              >
            </div>
          </div>
        </div>
      </template>
    </widget-table>
  </layout-main>
</template>
<script>
import pluralize from 'pluralize'
import { mapGetters } from 'vuex'

import LayoutMain from '../components/layout/layout-main'
import { capitalizeFirst } from '../core/utils'

export default {
  name: 'BaseView',
  components: { LayoutMain },

  data() {
    return {
      model: null
    }
  },

  created() {
    const route = this.$route.params.model
    const model = this.findModel(route)
    if (!model) {
      throw new Error(
        `Can't find binding model for route /models/${route}
        Did you register model with name ${capitalizeFirst(
          pluralize.singular(route)
        )}?`
      )
    }
    this.model = model
  },

  computed: mapGetters('admin-models', ['findModel'])
}
</script>
