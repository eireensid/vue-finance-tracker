import store from '../store'

const locales = {
  'ru-RU': {},
  'en-US': {}
}

export default {
  methods: {
    localizeFilter(key) {
      const locale = store.getters.info.locale || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found`
    }
  }
}