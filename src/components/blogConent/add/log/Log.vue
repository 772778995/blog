<template>
  <div id="log">

    <el-row :gutter="40">

      <el-col class="txt" :span="13">
        <span v-html="txt"></span>
        <el-divider></el-divider>
      </el-col>

      <el-col :span="8" :offset="1">
        <el-calendar v-model="date"></el-calendar>

        <el-switch
          style="display: block"
          v-model="isReverse"
          active-color="#ff4949"
          inactive-color="#13ce66"
          active-text="逆序"
          inactive-text="顺序">
        </el-switch>
      </el-col>

    </el-row>

    <el-timeline>
      <el-timeline-item
        v-for="item in logData"
        :key=item.id
        :timestamp="item.time"
        placement="top">
        <el-card>
          <h4>{{item.log}}</h4>
          <p>{{item.author}} 提交于 {{item.time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-card class="ai" v-if="!logData">
      <span v-if="isNextDay">什么？？！！居然有人觉得我会预知未来？ ┑(￣。。￣)┍ </span>
      <span v-else>这一天，又是没人鸟我的一天，哎………………咦？有人来了（( ͡° ͜ʖ ͡°)✧期待ing</span>
    </el-card>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Log',
  data () {
    return {
      txt: '青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪',
      date: new Date(),
      now: new Date(),
      isReverse: false,
      key: '2312349f18155629d19beb68679998f5',
      txtUrl: [
        // 毒鸡汤
        'https://api.tianapi.com/txapi/dujitang/index',
        // 名人名言
        'https://api.tianapi.com/txapi/mingyan/index',
        // 故事大全
        // 'https://api.tianapi.com/txapi/story/index',   它数据太长了
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
    }
  },
  watch: {
    isReverse (val) {
      this.setLogData(this.logData.reverse())
    },
    date (val) {
      this.changeDate(val)
      this.getLogData()
      this.getTxt()
    }
  },
  computed: {
    ...mapState(['logData']),
    i () {
      return Math.floor(Math.random() * this.txtUrl.length)
    },
    isNextDay () {
      return this.date.getTime() / 86400000 - this.now.getTime() / 86400000 > 0
    }
  },
  methods: {
    ...mapMutations(['changeDate', 'setLogData']),
    ...mapActions(['getLogData']),
    getTxt () {
      this.$axios.get(this.txtUrl[this.i], {
        params: {
          key: this.key
        }
      }).then(res => {
        if (res.data.msg === 'success') {
          this.txt = null
          this.txt = res.data.newslist[0].content
        }
      })
    }
  },
  created () {
    this.getTxt()
  }
}
</script>

<style lang="less" scoped>
  #log {
    .txt {
      display: flex;
      height: 462px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .el-switch {
      float: right;
    }
    .ai {
      font-size: 20px;
      text-align: center;
    }
  }
</style>
