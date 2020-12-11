<template>
  <div id="blog-content">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="id === 'add'" >编辑分类</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="id === 'edit'" >修改文章</el-breadcrumb-item>
      <el-breadcrumb-item v-else v-for="item in breadcrumb" :key="item.title">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <Add v-if="id === 'add'"/>
      <Article v-else :articleData="articleData" @upArticleData="getArticle"/>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Add from './add/Add.vue'
import Article from './article/Article.vue'
import 'assets/css/wangeditor.css'
export default {
  components: { Add, Article },
  data () {
    return {
      breadcrumb: [],
      id: this.$route.params.id,
      articleData: {}
    }
  },
  watch: {
    $route (newV) {
      this.id = newV.params.id
      this.getArticle()
      this.changeIsEditor(false)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['showLoginDialog', 'changeIsEditor']),
    ...mapActions(['getLogData']),
    // 获取文章数据
    getArticle () {
      if (this.id === 'add') return
      this.$axios.get('/api/blog/getArticle.php', { params: { id: this.id } })
        .then(res => {
          const data = res.data
          if (data.path) this.breadcrumb = data.path.split(',')
          this.articleData = data
        })
    }
  },
  created () {
    this.getArticle()
    this.getLogData()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id === 'user' && !this.userInfo) {
      this.showLoginDialog()
    } else next()
  }
}
</script>

<style lang="less" scoped>
  #blog-content {
    padding-bottom: 80px;
    .el-card {
      padding-bottom: 40px;
    }
  }
</style>
