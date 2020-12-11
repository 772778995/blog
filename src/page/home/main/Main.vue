<template>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="less" scoped>
  .el-main {
    background-color: rgba(241,238,252,0.5);
    height: 100%;
  }
</style>
