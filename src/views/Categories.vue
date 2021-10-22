<template>
  <div>
    <div class="page-title">
      <h3>{{localize('Categories')}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @created="addNewCategory" />
        </div>
        <div class="col s12 m6">
          <CategoryEdit 
            v-if="categories.length"
            :categories="categories"
            @updated="updateCategories"
          />
          <p v-else class="center">{{localize('NoCategories')}}</p>
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
    categories: []
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
    async updateCategories() {
      this.categories = await this.$store.dispatch('fetchCategories')
    }
  }
}
</script>