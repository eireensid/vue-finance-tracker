import locale from '@/mixins/locale.mixin'

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE
      return `${this.localize(titleKey)} | ${appName}`
    }
  }
}