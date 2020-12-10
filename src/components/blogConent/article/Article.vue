<template>
  <div>
    <div class="is-editor" v-show="isEditor">
      <div id="editor"></div>
      <el-button @click="changeIsEditor(false)">退出编辑状态</el-button>
      <el-button type="primary" @click="sendEditArticle">提交修改文章</el-button>
    </div>
    <div v-show="!isEditor">
      <el-card>
        <h1>{{articleData.title}}</h1>
          作者:<el-tag>{{articleData.author}}</el-tag>
          <span class="right">
            发布于: {{articleData.createTime}}
          </span>
      </el-card>
      <div v-html="articleData.content"></div>
      <div class="right">
        <p>
          最终编辑于 {{articleData.editTime}}
        </p>
        <el-button @click="changeIsEditor(true)">
          编辑文章
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import E from 'wangeditor'
export default {
  name: 'Article',
  props: ['articleData'],
  data () {
    return {
      editor: null
    }
  },
  computed: {
    ...mapState(['userInfo', 'isEditor'])
  },
  watch: {
    // 监听文章数据
    articleData: {
      handler (value) {
        // 改变编辑文章数据
        this.editor.txt.html(value.content)
      },
      deep: true
    }
  },
  methods: {
    // 改变编辑状态,显示登陆框
    ...mapMutations(['changeIsEditor', 'showLoginDialog']),
    // 提交修改文章
    sendEditArticle () {
      if (this.userInfo) {
        // 已登录,向后台发起请求
        this.$axios.post('/api/blog/sendEditArticle.php', this.$qs.stringify({
          // 修改的文章数据
          data: {
            id: this.articleData.id,
            title: this.articleData.title,
            content: this.editor.txt.html()
          },
          // 用户信息
          author: this.userInfo.name
        }))
          .then(res => {
            const data = res.data
            console.log(data)
            // 后台响应成功
            if (data.success) {
              // 更新文章数据
              this.$emit('upArticleData')
              // 弹出成功信息
              this.$notify.success({
                title: data.active,
                message: '审核通过将发送邮件通知您，请留意邮箱信息',
                duration: 0
              })
              // 后台响应失败,弹出警告信息
            } else this.$message.warning(data.active)
          })
          // 未登录,弹出登陆框
      } else this.showLoginDialog()
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.config.height = 400
    this.editor.config.zIndex = 100
    this.editor.create()
    this.editor.txt.html(this.articleData.content)
  }
}
</script>

<style lang="less" scoped>
  .el-card {
    min-height: 555px;
    padding: 0;
    .is-editor {
      .el-button {
        margin-top: 20px;
        margin-left: 20px;
        float: right;
      }
    }
    .el-card {
      min-height: 0;
      transform: translateY(-10px);
      h1 {
        font-size: 45px;
        line-height: 20px;
        text-align: center;
      }
      .el-tag {
        margin-left: 10px;
      }
    }
    .right {
      float: right;
      text-align: right;
    }
  }
</style>
