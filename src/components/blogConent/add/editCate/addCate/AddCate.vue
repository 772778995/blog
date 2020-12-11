<template>
  <div>
    <el-form
      label-width="90px"
      :rules="addMenuFormRules"
      ref="addMenuFormRef"
      :model="addMenuForm">

      <!-- 分类等级单选按钮 -->
      <el-form-item label-width="0">
        <el-radio v-model="addMenuForm.radio" label = "1">添加一级分类</el-radio>
        <el-radio v-model="addMenuForm.radio" label = "2">添加二级分类</el-radio>
      </el-form-item>

      <!-- 添加一级分类 -->
      <el-form-item v-if="addMenuForm.radio === '1'" label="已有分类:">
        <el-tag
          v-for="item in asideData"
          :key="item.id"
          @close="sendDelCateData(item.id, 1, item.title, item.children)"
          closable>
          {{item.title}}
        </el-tag>
      </el-form-item>

      <!-- 添加二级分类 -->
      <div v-else>
        <el-form-item prop="parent" label="分类列表:">
          <el-select
            @change="getChildren"
            v-model="addMenuForm.parent"
            placeholder="请选择">
            <el-option
              v-for="item in asideData"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 已存在分类标签 -->
        <el-form-item v-if="addMenuForm.parent && addMenuForm.i.children.length" label="已有分类:">
          <el-tag
            v-for="item in addMenuForm.i.children"
            :key="item.id"
            @close="delMenu(item.id, 2)"
            closable>
            {{item.title}}
          </el-tag>
        </el-form-item>

      </div>
      <!-- 表单结束 -->

      <el-form-item prop="title" label="分类名称:" style="width: 310px;">
        <el-input v-model="addMenuForm.title"></el-input>
      </el-form-item>
    </el-form>
    <div class="foot">
      <el-button @click="addAsideMenu" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'AddCate',
  data () {
    const checkParent = (rule, value, callback) => {
      if (this.addMenuForm.radio === '2' && !value) {
        return callback(new Error('请选择一级分类'))
      } else callback()
    }
    return {
      addMenuForm: {
        // 添加等级分类单选按钮
        radio: '1',
        // 二级菜单的父id
        parent: '',
        // 分类名称
        title: '',
        // 选中的一级分类下的所有children元素
        i: {}
      },
      // 校验表单
      addMenuFormRules: {
        parent: [{ validator: checkParent, trigger: 'change' }],
        title: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 20, min: 2, message: '请输入2-20个字符之间的名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['asideData', 'userInfo'])
  },
  watch: {
  },
  methods: {
    ...mapMutations(['showLoginDialog']),
    ...mapActions(['getAsideData', 'getLogData']),
    // 触发父组件的删除分类的方法
    sendDelCateData (id, lv, title, children, node, data) {
      this.$emit('delMenu', id, lv, title, children, node, data)
    },
    getChildren () {
      const children = this.asideData.find((value, index, array) => value.id === this.addMenuForm.parent)
      this.addMenuForm.i = children
    },
    // 添加新分类
    addAsideMenu () {
      // 检验表单
      this.$refs.addMenuFormRef.validate(val => {
        // 校验通过
        if (val) {
          // 检查登陆状态
          if (this.userInfo) {
            // 已登陆，发起请求
            this.$axios.post('/api/blog/addAsideMenu.php', this.$qs.stringify({
              // 表单数据
              data: this.addMenuForm,
              // 用户信息
              author: this.userInfo.name
            }))
              .then(res => {
                const data = res.data
                // 后台响应成功
                if (data.success) {
                  // 弹出后台响应状态信息
                  this.$message.success(data.active)
                  // 更新侧边栏数据和选择器列表的数据
                  this.getAsideData(() => this.getChildren())
                  // 重置表单数据
                  this.$refs.addMenuFormRef.resetFields()
                  // 更新日志数据
                  this.getLogData()
                  // 后台响应失败弹出状态信息
                } else this.$message.warning(data.active)
              })
              // 未登录,显示登陆框
          } else this.showLoginDialog()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-form {
    margin: 50px auto;
    max-width: 400px !important;
    .el-form-item {
      .el-tag {
        margin-right: 10px;
      }
    }
  }
  .foot {
    text-align: center;
  }
</style>
