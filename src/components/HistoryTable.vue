<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{localize('Amount')}}</th>
      <th>{{localize('Date')}}</th>
      <th>{{localize('Category')}}</th>
      <th>{{localize('Type')}}</th>
      <th>{{localize('Open')}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{idx + 1}}</td>
      <td>{{getCurrencySign('RUB', record.amount)}}</td>
      <td>{{filterDate(record.date, 'datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span 
          class="white-text badge"
          :class="[record.typeClass]"
        >
          {{record.typeText}}
        </span>
      </td>
      <td>
        <button 
          v-tooltip="localize('OpenRecord')"
          class="btn-small btn" 
          @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {Filters} from '@/mixins/filters.mixin'

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  mixins: [Filters]
}
</script>