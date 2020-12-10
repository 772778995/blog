<template>
  <div>

    <!-- 搜索框 -->
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
          <el-button type="text" size="mini" @click="sendDelCateData(data.id, data.lv, data.title, data.children, node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EditTree',
  data () {
    return {
      filterText: '',
      treeProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  computed: {
    ...mapState(['asideData'])
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    toSee (data) {
      console.log(`/${data.id}`)
      this.$router.push(`/article/${data.id}`)
    },
    sendDelCateData (id, lv, title, children, node, data) {
      this.$emit('delMenu', id, lv, title, children, node, data)
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
