import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import './assets/css/global.css'
// import './plugins/element.js'
import store from './store'
import xss from 'xss'
import NProgress from 'nprogress'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  NProgress.done()
  return response
}, function (error) {
  // 对响应错误做点什么
  NProgress.done()
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$xss = xss
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
