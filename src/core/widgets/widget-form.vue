<template>
  <form @submit.prevent="onSubmit">
    <div class="content">
      <div class="row">
        <template v-for="(attribute, index) in attributes">
          <div :key="index" class="col-lg-4 col-md-6 col-sm-6">
            <component
              :is="attribute.widget"
              v-bind="attribute.props"
            ></component>
          </div>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import widgetBindings from '../config/widget-bindings'
import { capitalizeFirst } from '../utils'

export default {
  name: 'WidgetForm',

  props: {
    model: {
      type: Object,
      default() {
        return null
      }
    }
  },

  computed: {
    attributes() {
      const conf = this.model.config
      const result = []

      if (conf && conf.attributes) {
        // for each attribute pick registered
        // Vue component
        Object.keys(conf.attributes).forEach(key => {
          const type = conf.attributes[key].type
          if (type) {
            const widget = widgetBindings[type]

            const props = { ...conf.attributes[key].meta }
            // if label is don't provided, use attribute's capitalized
            // name as component/widget label
            if (!props.label) props.label = capitalizeFirst(key)

            if (widget)
              result.push({
                widget,
                props
              })
            else console.error(`No widget binding found for type "${type}"`)
          } else {
            // attribute is relation
            // do something with relation field
          }
        })
      }

      return result
    }
  },

  methods: {
    onSubmit() {
      const value = 'some data'
      console.log(value)
      this.$emit('submit', value)
    }
  }
}
</script>
