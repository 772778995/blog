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
      date: new Date(),
      now: new Date(),
      isReverse: false
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
    ...mapState(['logData', 'txt']),
    isNextDay () {
      return this.date.getTime() / 86400000 - this.now.getTime() / 86400000 > 0
    }
  },
  methods: {
    ...mapMutations(['changeDate', 'setLogData']),
    ...mapActions(['getLogData', 'getTxt'])
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
