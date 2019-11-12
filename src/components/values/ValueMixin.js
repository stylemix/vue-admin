import get from 'lodash-es/get'

export default {
  props: {
    attribute: { type: String, required: true },
    config: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    item: { type: Object, required: true },
  },

  computed: {
    value() {
      return get(this.item, this.attribute)
    },
  },
}
