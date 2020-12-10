<template>
  <div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane
        v-for="item in activeList"
        :key="item.name"
        :label="item.label"
        :name="item.name">
        <component :is="item.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EditCate from './editCate/EditCate.vue'
import AddArticle from './addArticle/AddArticle.vue'
import Log from './log/Log.vue'
export default {
  name: 'Add',
  components: {
    EditCate, AddArticle, Log
  },
  data () {
    return {
      activeIndex: 0,
      activeList: [
        { label: '增删分类/文章', name: '0', component: 'EditCate' },
        { label: '添加新文章', name: '1', component: 'AddArticle' },
        { label: '查看日志', name: '2', component: 'Log' }
      ]
    }
  }
}
</script>

<style>
</style>
