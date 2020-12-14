<template>
  <div class="user">
    <Cube/>
    <router-view></router-view>
  </div>
</template>

<script>
import Cube from './cube/Cube.vue'
export default {
  name: 'User',
  components: { Cube }
}
</script>

<style lang="less" scoped>
  .user {
    width: 100%; height: 100%;;
  }
</style>
