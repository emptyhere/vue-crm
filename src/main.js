import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import msgPlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(msgPlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: 'AIzaSyBrg9WqviG5bfZ2geoy8DY-QLkkwYjxQQE',
  authDomain: 'vuejs-crm-33647.firebaseapp.com',
  databaseURL: 'https://vuejs-crm-33647.firebaseio.com',
  projectId: 'vuejs-crm-33647',
  storageBucket: '',
  messagingSenderId: '572710111243',
  appId: '1:572710111243:web:5f8fa970b8988745'
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
