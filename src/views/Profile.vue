<template>
  <div>
    <div class="page-title">
      <h3>{{localize('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$error}"
        >
        <label for="description">{{localize('Name')}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$error"
        >
          {{localize('Message_EnterName')}}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{localize('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: {required}
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted() {
    this.isRuLocale = this.info.locale === 'ru-RU'
    
    setTimeout(() => {
      this.name = this.info.name
      M.updateTextFields()
    }, 800)
  },
  updated() {
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
 .switch {
   margin-bottom: 2rem;
 }
</style>