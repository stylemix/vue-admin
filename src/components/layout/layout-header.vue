<template>
  <div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
      <div class="page-title d-flex flex-wrap flex-wrap flex-md-nowrap">
        <slot name="header">
          <h4 class="order-0">
            <i
              v-if="showBackArrow"
              @click="$emit('on-arrow-back-click')"
              class="icon-arrow-left52 mr-2"
            ></i>
            {{ header }}
            <small v-if="headerSmall">{{ headerSmall }}</small>
          </h4>
        </slot>
        <a href
           @click.prevent="showSubmenu = !showSubmenu"
           class="header-elements-toggle text-default d-md-none order-2 order-md-3 ">
          <i class="icon-more"></i>
        </a>
      </div>

      <div
        v-show="actions.length"
        :class="{ 'd-block': showSubmenu }"
        class="header-elements d-none"
      >
        <div class="d-flex justify-content-center">
          <button
            v-for="(action, index) in actions"
            :key="action.id || index"
            type="button"
            @click="onActionClick(action)"
            class="btn btn-link btn-float text-default action-item"
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

  data(){
    return {
      showSubmenu: false,
    }
  },
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
<style lang="scss" scoped>
  @media (max-width: 768px){
    .nav-pills {
      order: 3;
      display: flex;
      justify-content: center;
      margin-top: 15px;
      width: 100%;
    }
    .nav-link {
      padding: .5rem;
    }
    .action-item {
      display: flex;
      align-items: center;
      span {
        margin:  0 0 0 5px;
        padding-top: 0;
      }
    }
    .header-elements {
      padding: 0 !important;
    }
  }
</style>
