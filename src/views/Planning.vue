<template>
  <div>
    <div class="page-title">
      <h3>{{localize('Menu_Planning')}}</h3>
      <h4 v-if="!loading">{{getCurrencySign('RUB', info.bill)}}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{localize('NoCategories')}} <router-link to="/categories">{{localize('AddFirst')}}</router-link></p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}</strong>
          {{getCurrencySign('RUB', cat.spend)}} из {{getCurrencySign('RUB', cat.limit)}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {Filters} from '@/mixins/filters.mixin'

export default {
  name: 'Planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  mixins: [Filters],
  computed: {
    ...mapGetters(['info'])
  },
  async created() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'expense')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'  

      const tooltipValue = cat.limit - spend    
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${this.getCurrencySign('RUB', Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }    
    })

    this.loading = false
  }
}
</script>