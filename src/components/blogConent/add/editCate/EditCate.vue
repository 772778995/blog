<template>
  <div id="edit-cate">
    <el-tabs v-model="tabIndex" tab-position="left">
      <el-tab-pane
        tab-position="left"
        v-for="item in tabs"
        :key="item.name"
        :label="item.label">
          <component :is="item.component" @delMenu="delMenu"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import EditTree from './editTree/EditTree.vue'
import AddCate from './addCate/AddCate.vue'
export default {
  name: 'EditCate',
  components: { EditTree, AddCate },
  data () {
    return {
      tabIndex: '0',
      tabs: [
        { label: '编辑目录', name: '0', component: 'EditTree' },
        { label: '增删分类', name: '1', component: 'AddCate' }
      ]
    }
  },
  computed: {
    ...mapState(['asideData', 'userInfo'])
  },
  methods: {
    ...mapMutations(['showLoginDialog']),
    ...mapActions(['getAsideData', 'getLogData']),
    // 删除树目录节点
    removeNode (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
              // 如果后台响应成功
              if (data.success) {
                this.$message.success(data.active)
                // 更新侧边栏数据
                this.getAsideData()
                // 更新日志数据
                this.getLogData()
                // 移除删除的树目录节点
                if (node && data) this.removeNode(node, data)
                // 如果后台响应失败
              } else this.$message.warning(data.active)
            })
            // 未登录则显示登陆框
        } else this.showLoginDialog()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
