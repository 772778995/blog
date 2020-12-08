<template>
  <div id="add-menu">
    <el-tabs tab-position="left">

      <!-- 查看文章目录选项卡 -->
      <el-tab-pane label="编辑目录">

        <!-- 多选框显示滑块 -->
        <el-row>
          <el-col :span="4" :offset="20">
            <el-switch
              v-model="checkIsShow"
              active-text="删除文章">
            </el-switch>
          </el-col>
        </el-row>

        <!-- 树目录 -->
        <el-tree
          :data="asideData"
          :props="treeProps"
          default-expand-all
          :show-checkbox="checkIsShow">
        </el-tree>

      </el-tab-pane>

      <!-- 编辑分类选项卡 -->
      <el-tab-pane label="添加新分类">
        <!-- 添加分类表单 -->
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
          <!-- 选择编辑一级分类渲染 -->
          <el-form-item v-if="addMenuForm.radio === '1'" label="已有分类:">
            <el-tag
              v-for="item in asideData"
              :key="item.id"
              @close="delMenu(item.id, 1)"
              closable>
              {{item.title}}
            </el-tag>
          </el-form-item>
          <!-- 选择编辑二级分类渲染 -->
          <div v-else>
            <el-form-item prop="parent" label="分类列表:">
              <el-select
                v-model="addMenuForm.parent"
                @change="getI"
                placeholder="请选择">
                <el-option
                  v-for="item in asideData"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
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
          <el-form-item prop="title" label="分类名称:" style="width: 310px;">
            <el-input v-model="addMenuForm.title"></el-input>
          </el-form-item>
        </el-form>
        <div class="foot">
          <el-button @click="addAsideMenu" type="primary">提交</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddMenu',
  data () {
    const checkParent = (rule, value, callback) => {
      if (this.addMenuForm.radio === '2' && !value) {
        return callback(new Error('请选择一级分类'))
      } else callback()
    }
    return {
      // 树目录属性表
      checkIsShow: false,
      treeProps: {
        label: 'title',
        children: 'children'
      },
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
    ...mapState(['asideData'])
  },
  methods: {
    // 获取二级分类列表
    getI () {
      this.addMenuForm.i = this.asideData.find((value, index, array) => value.id === this.addMenuForm.parent)
    },
    // 检验表单
    addAsideMenu () {
      this.$refs.addMenuFormRef.validate(val => {
        // 校验通过
        if (val) {
          // 提交表单
          this.$axios.post('/api/blog/addAsideMenu.php', this.$qs.stringify({
            data: this.addMenuForm
          }))
            .then(res => {
              if (res.status === 200) {
                this.$message.success('提交新分类成功！')
                this.getAsideData(() => this.getI())
              }
            })
            .catch(err => this.$message.error(err.response.statusText))
        }
      })
    },
    // 删除分类
    delMenu (id, i) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/blog/delMenu.php', this.$qs.stringify({
          data: { id: id, i: i }
        }))
          .then(res => {
            if (res.status === 200) {
              this.$message.success('删除分类成功！')
              this.getAsideData(() => this.getI())
            } else this.$message.error('删除分类失败！')
          })
      })
    },
    ...mapActions(['getAsideData'])
  }
}
</script>

<style lang="less" scoped>
  #add-menu {
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
  }
</style>
