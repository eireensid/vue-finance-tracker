export const Filters = {
  methods: {
    filterDate(value, format = 'date') {
      const options = {}

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }

      if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }

      this.filteredDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
      return this.filteredDate
    },
    getCurrencyValue(currency, value) {
      return Math.floor(value)
    },
    getCurrencySign(currency = 'RUB', value) {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(this.getCurrencyValue(currency, value))
    }
  }
}