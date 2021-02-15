import Vue from 'vue'
import Vuelidate from './vuelidate'
import App from './App.vue'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'

import firebase from 'firebase/app'
import 'fiirebase/database'
import 'fiirebase/auth'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate'
import localizeFilter  from '@/filters/localize.filter'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.Use(Vuelidate)
Vue.Use(messagePlugin)
Vue.Use(VueMeta)
Vue.Use(titlePlugin)

Vue.filter('date',dateFilter)
Vue.filter('localize',localizeFilter)
Vue.filter('currency',currencyFilter)
Vue.directive('tooltip',tooltipDirective)
Vue.component("Loader",Loader)
Vue.component('paginate', Paginate)


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA2Oy2LWDKUgluV0YKFPVSOeW1S3Gp3Ses",
  authDomain: "my-vue--crm.firebaseapp.com",
  databaseURL: "https://my-vue--crm.firebaseio.com",
  projectId: "my-vue--crm",
  storageBucket: "my-vue--crm.appspot.com",
  messagingSenderId: "576771166982",
  appId: "1:576771166982:web:5a934b3617dd77c132c487",
  measurementId: "G-VP9Y04ZQRN"
});

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

