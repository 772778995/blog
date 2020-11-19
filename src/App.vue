<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <Aside/>
        <router-view class="main"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './page/header/Header.vue'
import Aside from './page/aside/Aside.vue'
export default {
  name: 'app',
  components: {
    Header,
    Aside
  }
}
</script>

<style>
  .el-header { padding: 0; }
  .el-container { height: 100%; }
</style>
