<template>
  <span :class="stacked ? 'flex flex-col' : ''">
    <span v-if="date" class="whitespace-no-wrap">
      <i class="icon-calendar2 text-muted text-sm mr-1"></i>
      <span v-if="value">{{ dateValue | moment(dateFormat) }}</span>
      <span v-else class="text-muted">--/--/--</span>
    </span>
    <span v-if="time" class="whitespace-no-wrap">
      <i class="icon-alarm text-muted text-sm mr-1"></i>
      <span v-if="value">{{ dateValue | moment(timeFormat) }}</span>
      <span v-else class="text-muted">--:--</span>
    </span>
    <span v-if="zone" class="whitespace-no-wrap">
      <i class="icon-earth text-muted text-sm"></i>
      <span v-if="value">
        {{ zoneAbbr }} {{ dateValue | moment(zoneFormat) }}
      </span>
      <span v-else class="text-muted">--</span>
    </span>
  </span>
</template>

<script>
import momentTimezone from 'moment-timezone'
import ValueMixin from './ValueMixin'
import get from 'lodash-es/get'

export default {
  name: 'ValueDate',

  mixins: [ValueMixin],

  data() {
    let config = {
      date: true,
      dateFormat: 'll',
      time: true,
      timeFormat: 'hh:mm A',
      zone: false,
      zoneFormat: 'Z',
      zoneAttribute: null,
      stacked: false,
    }

    Object.assign(config, this.config || {})

    return config
  },

  computed: {
    dateValue() {
      if (this.zoneAttribute) {
        return momentTimezone.tz(this.value, get(this.item, this.zoneAttribute))
      }
      return momentTimezone.parseZone(this.value)
    },
    zoneAbbr() {
      return this.dateValue.zoneAbbr()
    },
  },
}
</script>
