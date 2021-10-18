<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="updateHandler">
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
          >
            {{c.title}}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$error}"
        >
        <label for="name">Название</label>
        <span 
          v-if="$v.title.$error"
          class="helper-text invalid"
        >
          Введите название категории
        </span>
      </div>

      <div class="input-field">
        <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$error}"
        >
        <label for="limit">Лимит</label>
        <span 
          v-if="$v.limit.$error"
          class="helper-text invalid"
        >
          Минимальное значение {{$v.limit.$params.minValue.min}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
      <button class="btn waves-effect waves-light" style="margin-left: 15px" @click.prevent="deleteHandler">
        Удалить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    },
    categories() {
      this.select.destroy()
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  updated() {
    this.select.destroy()
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async updateHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData) 
        
      } catch (e) {}
    },
    async deleteHandler() {
      try {
        await this.$store.dispatch('deleteCategory', this.current)
        this.$message('Категория успешно удалена')
        this.$emit('updated', this.current) 

        const {id, title, limit} = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
        
      } catch (e) {}
    }
  }
}
</script>