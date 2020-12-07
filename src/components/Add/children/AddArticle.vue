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
      <el-tab-pane label="文章分类/标题" name="0">
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
        <!-- 标签页-编辑文章 -->
      </el-tab-pane>
      <el-tab-pane label="新文章内容" name="1">
        <div id="editor"></div>
        <el-form-item>
          <el-button type="primary" @click="addArcicle">提交文章</el-button>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import E from 'wangeditor'
import { mapState } from 'vuex'
export default {
  name: 'AddLv1',
  data () {
    return {
      activeIndex: '0',
      lv2List: [],
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
      },
      editor: null
    }
  },
  computed: {
    ...mapState(['asideData'])
  },
  methods: {
    getLv2List (i) {
      const ele = this.asideData.find((value, index, array) => value.title === i)
      this.lv2List = ele.children
      this.articleForm.lv2 = ''
    },
    getParentID (i) {
      const ele = this.lv2List.find((value, index, array) => value.title === i)
      this.articleForm.parentID = ele.id
    },
    // 进入编辑文章前校验表单
    beforeLeaveTabs (to, from) {
      if (to === '1') {
        let isCheck = true
        this.$refs.articleFormRef.validateField(['lv1', 'lv2', 'title'], val => {
          if (val !== '') isCheck = false
        })
        return isCheck
      }
    },
    addArcicle () {
      this.articleForm.content = this.editor.txt.html()
      this.$axios.post('/api/blog/addArticle.php', this.$qs.stringify({
        data: this.articleForm
      }))
        .then(res => {
          if (res.status === 200) {
            this.$notify.success({
              title: '成功添加新文章！'
            })
            console.log(res.data)
          }
        })
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.config.height = 420
    this.editor.create()
  }
}
</script>

<style lang="less" scoped>
</style>
