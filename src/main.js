import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import ru from './locales/ru.json'
import en from './locales/en.json'

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)

const locales = {
  'ru-RU': ru,
  'en-US': en
}

Vue.mixin({
  methods: {
    localize(key) {
      const locale = localStorage.getItem('locale') || 'ru-RU'
      return locales[locale][key] || `[Localize error]: key ${key} not found`
    }
  }
})

const firebaseConfig = {
  apiKey: "AIzaSyCt4BnbfQg_IgZ_OBrPOCHw2UFl-zb4e3o",
  authDomain: "vue-crm-9fb0c.firebaseapp.com",
  projectId: "vue-crm-9fb0c",
  storageBucket: "vue-crm-9fb0c.appspot.com",
  messagingSenderId: "791477869721",
  appId: "1:791477869721:web:d59bc3d06e141bfe796c08",
  measurementId: "G-7LTTP1SKB6",
  databaseURL: "https://vue-crm-9fb0c-default-rtdb.europe-west1.firebasedatabase.app/"
};

initializeApp(firebaseConfig);

let app
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  }
});
