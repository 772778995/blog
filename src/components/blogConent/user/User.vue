<template>
  <div>
    个人中心
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style>
</style>
