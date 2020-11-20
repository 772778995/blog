<template>
  <el-aside width="200px">
    <el-menu
      background-color="#9dc6ff"
      text-color="#000"
      active-text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>编程基础</span>
        </template>
        <el-submenu index="1-4">
          <template slot="title">
            <i class="el-icon-location"></i>
            HTML
          </template>
          <el-menu-item index="1-4-1">
            <i class="el-icon-location"></i>
            select
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style scoped>
  .el-aside {
    background-color: #9dc6ff;
    height: 100%;
  }
</style>
