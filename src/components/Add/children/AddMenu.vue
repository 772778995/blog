<template>
  <div id="add-menu">
    <el-tabs tab-position="left">

      <!-- 查看文章目录选项卡 -->
      <el-tab-pane label="编辑目录">

        <el-input
          class="search"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <!-- 树目录 -->
        <el-tree
          :data="asideData"
          :props="treeProps"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button v-if="!data.children" type="text" size="mini" @click="toSee(data)">
                查看
              </el-button>
              <el-button v-if="!data.children" type="text" size="mini" @click="d(data)">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="delMenu(data.id, data.lv, data.title, data.children, node, data)">
                删除
              </el-button>
            </span>
          </span>
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
              @close="delMenu(item.id, 1, item.title, item.children)"
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
import { mapState, mapMutations, mapActions } from 'vuex'
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
      filterText: '',
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
    ...mapState(['asideData', 'userInfo'])
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    ...mapMutations(['showLoginDialog']),
    ...mapActions(['getAsideData', 'getLogData']),
    // 搜索树目录
    filterNode (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 查看文章
    toSee (data) {
      console.log(`/${data.id}`)
      this.$router.push(`/article/${data.id}`)
    },
    // 删除树目录节点
    removeNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    // 获取二级分类列表
    getI () {
      this.addMenuForm.i = this.asideData.find((value, index, array) => value.id === this.addMenuForm.parent)
    },
    // 检验表单
    addAsideMenu () {
      this.$refs.addMenuFormRef.validate(val => {
        // 校验通过
        if (val) {
          // 检查登陆状态
          if (this.userInfo) {
            // 已登陆提交新分类表单
            this.$axios.post('/api/blog/addAsideMenu.php', this.$qs.stringify({
              data: this.addMenuForm,
              author: this.userInfo.name
            }))
              .then(res => {
                const data = res.data
                console.log(data)
                if (data.success) {
                  this.$message.success(data.active)
                  this.getAsideData(() => this.getI())
                  this.$refs.addMenuFormRef.resetFields()
                  this.getLogData()
                } else this.$message.warning(data.active)
              })
              // 未登录状态显示登陆框
          } else this.showLoginDialog()
        }
      })
    },
    // 删除分类
    delMenu (id, i, title, children, node, data) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认删除
        // 检查登陆状态
        if (this.userInfo) {
          this.$axios.post('/api/blog/delMenu.php', this.$qs.stringify({
            data: { id: id, i: i, title: title, children: children },
            author: this.userInfo.name
          }))
            .then(res => {
              const data = res.data
              console.log(data)
              if (data.success) {
                this.$message.success(data.active)
                this.getAsideData(() => this.getI())
                this.getLogData()
                if (node && data) this.removeNode(node, data)
              } else this.$message.warning(data.active)
            })
        } else this.showLoginDialog()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #add-menu {
    .search {
      width: 400px;
      margin: 10px 0 20px 5%;
    }
    .el-tree {
      max-width: 90%;
      min-width: 300px;
      margin: auto;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
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
