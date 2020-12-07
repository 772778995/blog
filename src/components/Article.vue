<template>
  <div id="article">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.title">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <Add v-if="params === 'add'"/>
      <div v-else>{{params}}</div>
    </el-card>
  </div>
</template>

<script>
import Add from './Add/Add.vue'
export default {
  data () {
    return {
      breadcrumb: [],
      params: this.$route.params.id
    }
  },
  watch: {
    $route (newV) {
      this.params = newV.params.id
    }
  },
  components: { Add }
}
</script>

<style lang="less" scoped>
  #article {
    .el-breadcrumb {
      margin: 0 0 20px 0;
    }
    .el-card {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .15) !important;
      maring: 20px 0;
      min-height: 555px;
    }
  }
</style>
