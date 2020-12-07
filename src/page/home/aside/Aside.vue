<template>
  <!-- 侧边栏 -->
  <el-aside :width="collapse ? '64px' : '200px'">
    <div class="open-aside" @click="collapse = !collapse">|||</div>
    <el-menu
      :default-active="activePath"
      :collapse-transition = "false"
      :collapse = "collapse"
      unique-opened
      background-color = "#9dc6ff"
      text-color = "#000"
      router
      active-text-color = "#fff">
      <!-- 一级菜单 -->
      <el-submenu
        v-for = "item in asideData"
        :index = "'LV'+item.id"
        :key = "item.id">
        <template slot = "title">
          <i class = "el-icon-s-grid"></i>
          <span>{{item.title}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-submenu
          v-for = "item2 in item.children"
          :index = "'lv'+item2.id"
          :key = "item2.id">
          <template slot = "title">
            <i class = "el-icon-menu"></i>
            {{item2.title}}
          </template>
          <!-- 三级菜单 -->
          <el-menu-item
          v-for = "item3 in item2.children"
          :index = "'/article/'+item3.id"
          :key = "item3.id">
            <i class="el-icon-tickets"></i>
            {{item3.title}}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- 添加一级菜单 -->
      <el-menu-item index="/article/add">
        <i class = "el-icon-edit"></i>
        <span slot="title">编辑内容</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Aside',
  data () {
    return {
      // 侧边栏导航默认项
      activePath: this.$route.path,
      // 侧边栏是否折叠
      collapse: false,
      // 添加新内容表单数据
      addForm: {
        // 添加内容抽屉是否显示
        isShow: false,
        // 添加新内容选择器内的数据
        option: {
          // 选择器的选项列表
          list: [
            { label: '添加一级分类', value: 1 },
            { label: '添加二级分类', value: 2 },
            { label: '添加新文章', value: 3 }
          ],
          value: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['asideData'])
  },
  methods: {
    // 获取侧边栏菜单
    ...mapActions(['getAsideData'])
  },
  created () {
    this.getAsideData()
  }
}
</script>

<style lang="less" scoped>
  .el-aside {
    background-color: #9dc6ff;
    height: 100%;
    .open-aside {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      letter-spacing: 3px;
      background-color: deepskyblue;
      font-size: 14px;
      color: #303133;
      padding: 0 20px;
      cursor: pointer;
      transition: border-color .3s,background-color .3s,color .3s;
      box-sizing: border-box;
      font-weight: bolder;
    }
    .open-aside:hover {
      background-color: rgb(126, 158, 204);
    }
    .el-menu {
      border: none;
    }
    .el-drawer {
      .el-form {
        padding: 0 30px;
      }
    }
  }
</style>
