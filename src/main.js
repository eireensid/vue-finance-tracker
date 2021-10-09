import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)

const firebaseConfig = {
  apiKey: "AIzaSyCt4BnbfQg_IgZ_OBrPOCHw2UFl-zb4e3o",
  authDomain: "vue-crm-9fb0c.firebaseapp.com",
  projectId: "vue-crm-9fb0c",
  storageBucket: "vue-crm-9fb0c.appspot.com",
  messagingSenderId: "791477869721",
  appId: "1:791477869721:web:d59bc3d06e141bfe796c08",
  measurementId: "G-7LTTP1SKB6"
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
