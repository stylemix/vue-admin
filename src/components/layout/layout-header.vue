<template>
  <div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
      <div class="page-title d-flex">
        <slot name="header">
          <h4>
            <i
              v-if="showBackArrow"
              @click="$emit('on-arrow-back-click')"
              class="icon-arrow-left52 mr-2"
            ></i>
            {{ header }}
            <small v-if="headerSmall">{{ headerSmall }}</small>
          </h4>
        </slot>
        <a href class="header-elements-toggle text-default d-md-none">
          <i class="icon-more"></i>
        </a>
      </div>

      <div class="header-elements d-none">
        <div class="d-flex justify-content-center">
          <button
            v-for="(action, index) in actions"
            :key="action.id || index"
            type="button"
            @click="onActionClick(action)"
            class="btn btn-link btn-float text-default"
          >
            <template v-if="typeof $scopedSlots[action.id] !== 'undefined'">
              <slot :name="action.id" :action="action"></slot>
            </template>
            <template v-else>
              <slot :action="action">
                <i :class="`${action.icon} text-primary`"></i>
                <span>{{ action.text }}</span>
              </slot>
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutHeader',

  props: {
    actions: {
      type: Array,
      default() {
        return []
      },
    },

    header: {
      type: String,
      default: '',
    },

    headerSmall: {
      type: String,
      default: '',
    },

    showBackArrow: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onActionClick(action) {
      if (action.onClick) action.onClick.call(this, action, this)
    },
  },
}
</script>
