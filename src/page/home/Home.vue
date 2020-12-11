<template>
  <div id="app">
    <Bg class="bg" />
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
import Bg from '../bg/Bg.vue'
import Header from './header/Header.vue'
import Aside from './aside/Aside.vue'
import Main from './main/Main.vue'
export default {
  name: 'Home',
  components: {
    Bg,
    Header,
    Aside,
    Main
  },
  mounted () {
    this.$axios.get('/api/public/getIP.php')
  }
}
</script>

<style lang="less">
  .bg {
    opacity: 0.5;
    z-index: 0;
  }
  .el-header {
    padding: 0;
    background-color: rgba(165,100,255,0.5);
  }
  .el-container {
    height: 100%;
    opacity: 0.94;
  }
</style>
