<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(5)}}</td>
              <td>{{filteredDate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {Filters} from '@/mixins/filters.mixin'

export default {
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR'],
    filteredDate: null
  }),
  props: ['rates', 'date'],
  mixins: [Filters],
  mounted() {
    this.filterDate(this.date, 'date')
  }
}
</script>