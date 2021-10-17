<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @created="addNewCategory" />
        </div>
        <div class="col s12 m6">
          <!-- key for component rerender, when length or count change -->
          <CategoryEdit 
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'Categories',
  data: () => ({
    loading: true,
    categories: [],
    updateCount: 0
  }),
  async created() {
    this.categories = await this.$store.dispatch('fetchCategories') 
    this.loading = false
    
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>