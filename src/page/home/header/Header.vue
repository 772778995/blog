<template>
  <div class="header">
    <div>
      <h1>前端小白 - 吴某人的博客</h1>
      <div>

        <!-- 用户名 -->
        <el-tag v-if="userInfo">{{userInfo.name}}</el-tag>
        <el-tag v-else type="info">迷途的游客</el-tag>

        <el-button v-if="userInfo" type="primary" @click="loginOut">
          退 出
        </el-button>
        <router-link v-else to="/user">
          <el-button type="primary">登 陆</el-button>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['loginOut'])
  }
}
</script>

<style lang="less" scoped>
  .header{
    padding: 3px 20px 0 20px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        font-size: 1rem;
      }
      .el-tag {
        margin-right: 20px;
      }
    }
  }
</style>
