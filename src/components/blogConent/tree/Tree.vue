<template>
  <el-row>
    <el-col :span="10" :offset="1">
      <!-- 搜索框 -->
      <el-input
        class="search"
        placeholder="请输入关键字"
        prefix-icon="el-icon-search"
        v-model="filterText">
      </el-input>

      <!-- 树目录 -->
      <el-tree
        :data="asideData"
        :props="treeProps"
        node-key="id"
        :filter-node-method="filterNode"
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button v-if="!data.children" type="text" size="mini" @click="toSee(data)">
              查看
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-col>

    <el-col class="ji-tang" :span="10" :offset="2">
      <p v-html="txt"></p>
      <el-divider></el-divider>
    </el-col>

  </el-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Tree',
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
    ...mapState(['asideData', 'txt'])
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    ...mapMutations(['changeIsEditor']),
    ...mapActions(['getTxt']),
    filterNode (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    toSee (data) {
      this.$router.push(`/article/${data.id}`)
    }
  },
  created () {
    this.getTxt()
    setInterval(this.getTxt, 30000)
  }
}
</script>

<style lang="less" scoped>
  .el-row {
    .search {
      margin: 10px 0 20px 0;
    }
    .el-tree {
      min-width: 300px;
      margin: auto;
      background: rgba(255,255,255,0);
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
    .ji-tang {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 462px;
    }
  }
</style>
