<template>
  <div>
    <el-row>
      <el-switch
        style="display: block"
        v-model="isReverse"
        active-color="#ff4949"
        inactive-color="#13ce66"
        active-text="逆序"
        inactive-text="顺序">
      </el-switch>
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Log',
  data () {
    return {
      isReverse: false
    }
  },
  watch: {
    isReverse (val) {
      this.setLogData(this.logData.reverse())
    }
  },
  computed: {
    ...mapState(['logData'])
  },
  methods: {
    ...mapMutations(['setLogData']),
    ...mapActions(['getLogData'])
  },
  created () {
    this.getLogData()
  }
}
</script>

<style lang="less" scoped>
  .el-switch {
    margin: 20px;
    float: right;
  }
</style>
