import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import './assets/css/global.css'
import './plugins/element.js'
import store from './store'

let needRequestCount = 0
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  needRequestCount++
  if (needRequestCount > 0) vue.$loading({ fullscreen: true })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  needRequestCount--
  if (!needRequestCount) vue.$loading().close()
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
