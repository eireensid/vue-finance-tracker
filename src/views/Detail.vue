<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{localize('Menu_History')}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.type === 'income' ? localize('Income') : localize('Expense')}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
              'red': record.type === 'expense',
              'green': record.type === 'income'
            }">
            <div class="card-content white-text">
              <p>{{localize('Description')}}: {{record.description}}</p>
              <p>{{localize('Amount')}}: {{getCurrencySign('RUB', record.amount)}}</p>
              <p>{{localize('Category')}}: {{record.categoryName}}</p>

              <small>{{filterDate(record.date, 'datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{localize('NoDetailText1')}} id={{$route.params.id}} {{localize('NoDetailText2')}}</p> 
  </div>
</template>

<script>
import {Filters} from '@/mixins/filters.mixin'

export default {
  name: 'Record',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  mixins: [Filters],
  async created() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>