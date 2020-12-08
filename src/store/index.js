import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { setCookies } from '../assets/js/cookies.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: false,
    asideData: []
  },
  mutations: {
    // 赋值用户信息
    setUserInfo (state, data) {
      state.userInfo = data
      console.log(data)
    },
    // 退出登陆
    loginOut (state) {
      state.userInfo = false
      setCookies('BAEID', false, -1)
    },
    // 赋值侧边栏数据
    setAsideData (state, data) {
      state.asideData = data
    }
  },
  actions: {
    // 获取用户数据
    getUserInfo (context) {
      axios.get('/api/public/userInfo.php').then(res => {
        context.commit('setUserInfo', res.data)
        console.log(res)
      })
    },
    // 获取侧边栏数据
    getAsideData (context, callback) {
      axios.get('/api/blog/asideData.php')
        .then(res => {
          context.commit('setAsideData', res.data)
          if (callback) callback()
        })
    }
  },
  modules: {
  }
})
