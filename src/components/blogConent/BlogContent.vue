<template>
  <div id="blog-content">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="id === 'add'" >编辑分类</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="id === 'tree'" > 目 录 </el-breadcrumb-item>
      <el-breadcrumb-item v-else v-for="item in breadcrumb" :key="item.title">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <Add v-if="id === 'add'"/>
      <Tree v-else-if="id === 'tree'"/>
      <Article v-else :articleData="articleData" @upArticleData="getArticle"/>
    </el-card>

    <div class="comment-warpper" v-show="id !== 'add' && id !== 'tree'">
      <el-card>
        评论：
        <div id="comment"></div>
        <el-button type="primary" @click = "addComment">留言</el-button>
      </el-card>
    </div>

    <el-card class="comment-list" v-show="id !== 'add' && id !== 'tree'">
      <div
        v-for="(item, index) in commentListData"
        :key="item.id">
          <el-tag>{{item.author}}</el-tag>
          <div class="comment-item" v-html="item.content"></div>
          <p>{{item.time}}</p>
          <span class="right">{{index + 1}}楼</span>
          <el-divider></el-divider>
      </div>
      <div class="no-comment" v-if="commentListData == []">暂无评论</div>
    </el-card>

  </div>
</template>

<script>
import E from 'wangeditor'
import { mapState, mapMutations, mapActions } from 'vuex'
import Add from './add/Add.vue'
import Tree from './tree/Tree.vue'
import Article from './article/Article.vue'
import 'assets/css/wangeditor.css'
export default {
  components: { Add, Article, Tree },
  data () {
    return {
      breadcrumb: [],
      id: this.$route.params.id,
      articleData: {},
      commentListData: []
    }
  },
  watch: {
    $route (newV) {
      this.id = newV.params.id
      this.getArticle()
      this.getCommentList()
      this.changeIsEditor(false)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['changeIsEditor']),
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
    },
    // 获取文章的所有评论
    getCommentList () {
      this.$axios.get('/api/blog/commentList.php', {
        params: { id: this.id }
      }).then(res => {
        this.commentListData = res.data
      })
    },
    // 留言
    addComment () {
      // 已登录
      if (this.userInfo) {
        const comData = this.comment.txt.html()
        // 如果留言内容过大或小于20个字符，则弹出警告
        if (comData.length > 1000 || comData.length < 20) this.$message.warning('请输入大于20个字符或小于1000个字符的评论')
        // 通过则向后台发送请求
        else {
          this.$axios.post('/api/blog/addComment.php', this.$qs.stringify({
            // xss过滤留言内容
            content: this.$xss(this.comment.txt.html()),
            author: this.userInfo.name,
            articleID: this.id
          }))
            .then(res => {
              const data = res.data
              // 如果后台响应成功
              if (data.success) {
                // 弹出成功信息
                this.$message.success(data.active)
                // 更新评论
                this.getCommentList()
                // 清空留言富文本
                this.comment.txt.clear()
                // 如果后台响应失败,弹出响应的警告信息
              } else this.$message.warning(data.active)
            })
        }
        // 未登录,弹出警告信息
      } else this.$message.warning('您未登陆！')
    }
  },
  created () {
    this.getArticle()
    this.getLogData()
    this.getCommentList()
  },
  mounted () {
    // 评论内容
    this.comment = new E('#comment')
    this.comment.config.height = 200
    this.comment.config.zIndex = 100
    this.comment.config.menus = [
      'bold',
      'head',
      'emoticon'
    ]
    this.comment.config.showFullScreen = false
    this.comment.create()
  },
  beforeRouteUpdate (to, from, next) {
    const lv = this.userInfo.power
    if (to.params.id === 'add') {
      if (!lv || lv <= 1) next('/article/tree')
    }
    next()
  }
}
</script>

<style lang="less" scoped>
  #blog-content {
    padding-bottom: 80px;
    .el-card {
      padding-bottom: 40px;
    }
    .comment-list {
      margin-top: 20px;
      padding: 0;
      .comment-item {
        margin: 20px;
        padding: 0 20px;
      }
      .no-comment {
        text-align: center;
      }
      .right {
        float: right;
        font-size: 12px;
        transform: translateY(-10px);
      }
    }
    .comment-warpper {
      margin-top: 20px;
      #comment {
        margin: 20px 0;
      }
      .el-button {
        float: right;
      }
    }
  }
</style>
