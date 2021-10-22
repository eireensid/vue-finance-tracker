<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p 
          v-for="cur of currencies"
          :key="cur"
          class="currency-line"
        >
          <span>
            {{getCurrencySign(cur, base * rates[cur])}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {Filters} from '@/mixins/filters.mixin'

export default {
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  props: ['rates'],
  mixins: [Filters],
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  }
}
</script>