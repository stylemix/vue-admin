<template>
  <div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
      <div class="page-title d-flex">
        <slot name="header">
          <h4>
            <i
              v-if="showBack"
              class="icon-arrow-left52 mr-2"
              @click="$emit('clickBack')"
            />
            {{ headerResolved }}
            <small v-if="headerSmall">{{ headerSmall }}</small>
          </h4>
        </slot>
        <a href class="header-elements-toggle text-default d-md-none">
          <i class="icon-more"></i>
        </a>
      </div>

      <div class="header-elements d-none">
        <div class="d-flex justify-content-center">
          <b-button
            v-for="(action, index) in actionsResolved"
            :key="action.id || index"
            :variant="action.variant || 'primary'"
            :to="action.route"
            @click="onActionClick(action)"
          >
            <slot :name="action.id || index" :action="action">
              <i :class="`${action.icon} mr-2`"></i>
              <span>{{ action.text }}</span>
            </slot>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminPageHeader',

  props: {
    actions: {
      type: Array,
      default: null,
    },

    header: {
      type: String,
      default: '',
    },

    headerSmall: {
      type: String,
      default: '',
    },

    showBack: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState('admin', {
      pageActions: 'pageActions',
    }),
    headerResolved() {
      return this.header || (this.$route.meta && this.$route.meta.title)
    },
    actionsResolved() {
      return this.actions || this.pageActions
    },
  },

  methods: {
    onActionClick(action) {
      if (action.onClick) {
        action.onClick()
      }
    },
  },
}
</script>
