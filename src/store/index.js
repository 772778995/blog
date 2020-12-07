import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 侧边栏列表
    asideData: []
  },
  mutations: {
    // 赋值侧边栏数据
    setAsideData (state, data) {
      state.asideData = data
    }
  },
  actions: {
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
