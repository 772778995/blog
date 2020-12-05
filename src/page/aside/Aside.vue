<template>
  <!-- 侧边栏 -->
  <el-aside :width="collapse ? '60px' : '200px'">
    <div class="open-aside" @click="collapse = !collapse">|||</div>
    <el-menu
      :collapse-transition = "false"
      :collapse = "collapse"
      unique-opened
      v-for = "item in asideData"
      :key = "item.id"
      background-color = "#9dc6ff"
      text-color = "#000"
      router
      active-text-color = "#fff">
      <!-- 一级菜单 -->
      <el-submenu
        :index = "item.id"
        :key = "item.id">
        <template slot = "title">
          <i :class = "item.icon" style="margin-right: 5px;"></i>
          <span>{{item.title}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-submenu
          v-for = "item2 in item.children"
          :index = "item2.id"
          :key = "item2.id">
          <template slot = "title">
            <i :class = "item2.icon"></i>
            {{item2.title}}
          </template>
          <!-- 三级菜单 -->
          <el-menu-item
          v-for = "item3 in item2.children"
          :index = "item3.id"
          :key = "item3.id">
            <i class="iconfont icon-16"></i>
            {{item3.title}}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <!-- 添加一级菜单 -->
      <el-menu-item index = "add">
        <template slot = "title">
          <i class = "iconfont icon-add" style="margin-right: 5px;"></i>
          <span>添加新内容</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      asideData: [],
      collapse: false
    }
  },
  methods: {
    // 获取侧边栏菜单
    getAsideData () {
      this.$axios.get('/api/blog/asideData.php')
        .then(res => { this.asideData = res.data })
    }
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
  }
</style>
