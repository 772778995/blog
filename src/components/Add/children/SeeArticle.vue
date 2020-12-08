<template>
  <div>
    <el-tree :data="asideData"
      :props="treeProps"
      show-checkbox>
    </el-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'seeArticle',
  data () {
    return {
      treeProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  computed: {
    ...mapState(['asideData'])
  }
}
</script>

<style>
</style>
