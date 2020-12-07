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
import AddMenu from './children/AddMenu.vue'
import AddArticle from './children/AddArticle.vue'
export default {
  name: 'Add',
  components: {
    AddMenu, AddArticle
  },
  data () {
    return {
      activeIndex: 0,
      activeList: [
        { label: '编辑分类', name: '0', component: 'AddMenu' },
        { label: '编辑文章', name: '1', component: 'AddArticle' }
      ]
    }
  }
}
</script>

<style>
</style>
