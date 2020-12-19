import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: false,
    // 侧边栏数据
    asideData: [],
    // 是否处于编辑状态
    isEditor: false,
    // 日志数据
    logData: [],
    // 日志参数
    date: new Date(),
    // 随机鸡汤
    txt: '青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪'
  },
  mutations: {
    // 赋值用户信息
    setUserInfo (state, data) {
      state.userInfo = data
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
    },
    // 赋值鸡汤
    setTxt (state, data) {
      state.txt = data
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
    },
    // 获取鸡汤
    getTxt (context) {
      // 接口key值
      const key = '2312349f18155629d19beb68679998f5'
      // 接口地址
      const txtUrl = [
        // 毒鸡汤
        'https://api.tianapi.com/txapi/dujitang/index',
        // 名人名言
        'https://api.tianapi.com/txapi/mingyan/index',
        // 故事大全
        // 'https://api.tianapi.com/txapi/story/index',
        // 彩虹屁
        'https://api.tianapi.com/txapi/caihongpi/index',
        // 土味情话
        'https://api.tianapi.com/txapi/saylove/index',
        // 互删句子
        'https://api.tianapi.com/txapi/hsjz/index',
        // 顺口溜
        'https://api.tianapi.com/txapi/skl/index',
        // 绕口令
        'https://api.tianapi.com/txapi/rkl/index'
      ]
      // 随机接口下标
      const i = Math.floor(Math.random() * txtUrl.length)
      axios.get(txtUrl[i], {
        params: {
          key: key
        }
      }).then(res => {
        if (res.data.msg === 'success') {
          context.commit('setTxt', res.data.newslist[0].content)
        }
      })
    }
  },
  modules: {
  }
})
