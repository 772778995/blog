import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import './assets/css/global.css'
import './plugins/element.js'
import store from './store'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
