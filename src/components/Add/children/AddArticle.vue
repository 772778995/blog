<template>
  <!-- 提交文章表单 -->
  <el-form label-width="80px"
    label-position="top"
    :model="articleForm"
    ref="articleFormRef"
    :rules="articleFormRules">
    <!-- 标签页 -->
    <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeLeaveTabs">

      <!-- 标签页-文章分类 -->
      <el-tab-pane label="文章分类/标题" name="1">
        <!-- 第一行 -->
        <el-row>
          <el-col :span="8" :offset="4">
            <!-- 一级分类选择器 -->
            <el-form-item label="一级分类:" prop="lv1">
              <el-select v-model="articleForm.lv1" @change="getLv2List">
                <el-option
                  v-for="item in asideData"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 二级分类选择器 -->
            <el-form-item label="二级分类:" prop="lv2">
              <el-select v-model="articleForm.lv2" @change="getParentID">
                <el-option
                  v-for="item in lv2List"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="7" :offset="4">
            <!-- 文章标题输入框 -->
            <el-form-item label="文章标题:" prop="title">
              <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" :offset="4">
            <el-button type="primary" @click="activeIndex = '2'">下一步</el-button>
          </el-col>
        </el-row>
        <!-- 标签页-编辑文章 -->
      </el-tab-pane>
      <el-tab-pane label="新文章内容" name="2">
        <div id="editor"></div>
        <el-form-item>
          <el-button class="addArticleBtn" type="primary" @click="addArcicle">提交文章</el-button>
        </el-form-item>
      </el-tab-pane>

    </el-tabs>
  </el-form>
</template>

<script>
import E from 'wangeditor'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AddLv1',
  data () {
    return {
      activeIndex: '1',
      lv2List: [],
      editor: null,
      articleForm: {
        lv1: '',
        lv2: '',
        parentID: '',
        title: '',
        content: ''
      },
      articleFormRules: {
        lv1: [{ required: true, message: '请选择一级分类', trigger: 'change' }],
        lv2: [{ required: true, message: '请选择二级分类', trigger: 'change' }],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 2, max: 30, message: '请输入2-30个字符的标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['asideData', 'userInfo'])
  },
  watch: {
    activeIndex (val) {
      this.activeIndex = val
    }
  },
  methods: {
    ...mapMutations(['showLoginDialog']),
    ...mapActions(['getAsideData', 'getLogData']),

    // 选中一级分类后获取该分类下的二级分类
    getLv2List (i) {
      const ele = this.asideData.find((value, index, array) => value.title === i)
      this.lv2List = ele.children
      this.articleForm.lv2 = ''
    },
    // 获取选中二级分类的id
    getParentID (i) {
      const ele = this.lv2List.find((value, index, array) => value.title === i)
      this.articleForm.parentID = ele.id
    },
    // 进入编辑文章前校验表单
    beforeLeaveTabs (to, from) {
      if (to === '2') {
        let isCheck = true
        this.$refs.articleFormRef.validateField(['lv1', 'lv2', 'title'], val => {
          if (val !== '') isCheck = false
        })
        if (isCheck) {
          this.editor.txt.html(`
            <p>&nbsp; &nbsp; ${this.articleForm.title}的正文……</p>
        `)
        } else {
          this.$alert('请先编辑文章分类/标题')
          return isCheck
        }
      }
    },
    // 提交文章
    addArcicle () {
      // 检查登陆状态
      if (this.userInfo) {
        // 已登录，向后台提出请求
        this.articleForm.content = this.editor.txt.html()
        this.$axios.post('/api/blog/addArticle.php', this.$qs.stringify({
          data: this.articleForm,
          author: this.userInfo.name
        }))
          .then(res => {
            const data = res.data
            if (data.success) {
              this.$notify.success({ title: data.active })
              // 刷新侧边栏
              this.getAsideData()
              // 清空富文本
              this.editor.txt.clear()
              // 清空表单
              this.$refs.articleFormRef.resetFields()
              // 跳转标签页
              this.$router.push(`/article/${data.msg.id}`)
              // 刷新日志数据
              this.getLogData()
            } else this.$notify.warning({ title: data.active })
          })
          // 未登录,显示登陆框
      } else this.showLoginDialog()
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.config.height = 359
    this.editor.config.zIndex = 100
    this.editor.create()
  }
}
</script>

<style lang="less" scoped>
  .addArticleBtn {
    margin-top: 10px;
  }
</style>
