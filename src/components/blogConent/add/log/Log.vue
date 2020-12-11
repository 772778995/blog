<template>
  <div id="log">

    <el-row :gutter="40">

      <el-col class="txt" :span="13">
        <span v-if="txt">{{txt}}</span>
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
      今天又是没人关顾的一天
    </el-card>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Log',
  data () {
    return {
      txt: null,
      date: new Date(),
      isReverse: false,
      key: '2312349f18155629d19beb68679998f5',
      txtUrl: [
        // 毒鸡汤
        'http://api.tianapi.com/txapi/dujitang/index',
        // 名人名言
        'http://api.tianapi.com/txapi/mingyan/index',
        // 彩虹屁
        'http://api.tianapi.com/txapi/caihongpi/index',
        // 土味情话
        'http://api.tianapi.com/txapi/saylove/index',
        // 互删句子
        'http://api.tianapi.com/txapi/hsjz/index',
        // 顺口溜
        'http://api.tianapi.com/txapi/skl/index',
        // 绕口令
        'http://api.tianapi.com/txapi/rkl/index'
      ],
      spareTxt: '青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪'
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
        } else this.txt = this.spareTxt
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
      margin: 20px;
      float: right;
    }
    .ai {
      font-size: 30px;
      text-align: center;
    }
  }
</style>
