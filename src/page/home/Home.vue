<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <Aside/>
        <Main/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './header/Header.vue'
import Aside from './aside/Aside.vue'
import Main from './main/Main.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    Main
  }
}
</script>

<style>
  .el-header {
    padding: 0;
    background-color: #a5bcff;
  }
  .el-container {
    height: 100%;
  }
</style>
