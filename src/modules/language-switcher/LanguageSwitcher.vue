<template>
  <b-nav-item-dropdown right>
    <template slot="button-content">
      <i class="icon-earth mr-2" />
      {{ currentLocale ? currentLocale.native : $t('admin.loading') }}
    </template>
    <b-dropdown-item
      v-for="locale in locales"
      :key="locale.locale"
      @click="setLocale(locale.locale)"
    >
      {{ locale.native }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { find } from 'lodash-es'
import { mapMutations, mapState } from 'vuex'
import { setCurrentLocale } from '../../utils/locales'

export default {
  name: 'AdminLanguageSwitcher',
  data() {
    return {}
  },

  computed: {
    ...mapState('languageSwitcher', ['locales']),
    currentLocale() {
      return find(this.locales, { locale: this.$i18n.locale })
    },
  },

  mounted() {
    if (this.locales.length) {
      return
    }

    this.$http.get('translations/locales').then(response => {
      this.setLocales(response.data)
    })
  },

  methods: {
    setLocale(locale) {
      setCurrentLocale(locale)
    },
    ...mapMutations('languageSwitcher', ['setLocales']),
  },
}
</script>
