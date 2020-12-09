<template>
  <div id="article">
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
      <div v-else>
        <el-card>
          <h1>{{articleData.title}}</h1>
          作者:<el-tag>{{articleData.author}}</el-tag>
          <span class="right">
            发布于: {{articleData.createTime}}
          </span>
        </el-card>
        <div v-html="articleData.content"></div>
        <span class="right">最终编辑于 {{articleData.editTime}}</span>
      </div>
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
      articleData: {}
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
          this.articleData = data
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
      padding: 0 0 40px 0;
      .el-card {
        min-height: 0;
        transform: translateY(-50px);
        h1 {
          font-size: 45px;
          line-height: 20px;
          text-align: center;
        }
        .el-tag {
          margin-left: 10px;
        }
      }
      span.right {
        float: right;
      }
    }
  }
</style>
