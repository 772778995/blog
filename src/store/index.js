import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登陆框是否显示
    loginDialog: false,
    // 用户信息
    userInfo: false,
    // 侧边栏数据
    asideData: [],
    // 是否处于编辑状态
    isEditor: false,
    // 日志数据
    logData: [],
    // 日志参数
    date: new Date()
  },
  mutations: {
    // 赋值用户信息
    setUserInfo (state, data) {
      state.userInfo = data
    },
    // 显示登陆框
    showLoginDialog (state) {
      state.loginDialog = true
    },
    // 隐藏登陆框
    hiddenLoginDialog (state) {
      state.loginDialog = false
    },
    // 改变编辑状态
    changeIsEditor (state, data) {
      state.isEditor = data
    },
    // 退出登陆
    loginOut (state) {
      state.userInfo = false
      axios.get('/api/public/loginOut.php')
    },
    // 赋值侧边栏数据
    setAsideData (state, data) {
      state.asideData = data
    },
    // 设置日志数据
    setLogData (state, data) {
      state.logData = data
    },
    changeDate (state, data) {
      state.date = data
    }
  },
  getters: {
    getDate (state) {
      const year = state.date.getFullYear()
      const month = state.date.getMonth() + 1
      const day = state.date.getDate()
      return `${year}-${month}-${day}`
    }
  },
  actions: {
    // 获取用户数据
    getUserInfo (context) {
      axios.get('/api/public/userInfo.php').then(res => {
        const data = res.data
        context.commit('setUserInfo', data.msg)
      })
    },
    // 获取侧边栏数据
    getAsideData (context, callback) {
      axios.get('/api/blog/asideData.php')
        .then(res => {
          context.commit('setAsideData', res.data)
          if (callback) callback()
        })
    },
    // 获取日志数据
    getLogData (context) {
      axios.get('/api/blog/getLog.php', { params: { date: context.getters.getDate } })
        .then(res => {
          context.commit('setLogData', res.data)
        })
    }
  },
  modules: {
  }
})
