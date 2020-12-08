<template>
  <div id="article" v-loading="isLoading">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="id === 'add'" >编辑内容</el-breadcrumb-item>
      <el-breadcrumb-item v-else v-for="item in breadcrumb" :key="item.title">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <Add v-if="id === 'add'"/>
      <div v-else v-html="content"></div>
    </el-card>
  </div>
</template>

<script>
import Add from './Add/Add.vue'
import 'assets/css/wangeditor.css'
export default {
  components: { Add },
  data () {
    return {
      breadcrumb: [],
      id: this.$route.params.id,
      content: '',
      isLoading: false
    }
  },
  watch: {
    $route (newV) {
      this.id = newV.params.id
      this.getArticle()
    }
  },
  methods: {
    // 获取文章数据
    getArticle () {
      if (this.id === 'add') return
      this.$axios.get('/api/blog/getArticle.php', { params: { id: this.id } })
        .then(res => {
          const data = res.data
          if (data.path) this.breadcrumb = data.path.split(',')
          this.content = data.content
        })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
  #article {
    padding-bottom: 80px;
    .el-breadcrumb {
      margin: 0 0 20px 0;
    }
    .el-card {
      box-shadow: 0 1px 1px rgba(0, 0, 0, .15) !important;
      min-height: 555px;
    }
  }
</style>
