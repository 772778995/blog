<template>
  <!-- 登陆表单开始 -->
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginFormRules"
    status-icon>

      <!-- 邮箱输入框开始 -->
      <el-form-item prop="Email">
        <el-input
          placeholder="请输入邮箱地址"
          v-model="loginForm.Email"
          prefix-icon="el-icon-message">
        </el-input>
      </el-form-item>
      <!-- 邮箱输入框结束 -->

      <!-- 密码框开始 -->
      <el-form-item prop="passWord">
        <el-input
          type="passWord"
          placeholder="请输入密码"
          v-model="loginForm.passWord"
          prefix-icon="el-icon-lock">
        </el-input>
      </el-form-item>
      <!-- 密码框结束 -->

      <div>
        <el-button type="primary" @click="login">登 陆</el-button>
        <router-link to="/user/registe">
          <el-button>注 册</el-button>
        </router-link>
      </div>

  </el-form>
  <!-- 登陆表单结束 -->
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      // 登陆表单
      loginForm: {
        Email: '',
        passWord: ''
      },
      // 登陆表单校验
      loginFormRules: {
        Email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['showLoginDialog']),
    ...mapActions(['getUserInfo']),
    // 登陆事件
    login () {
      // 校验表单
      this.$refs.loginFormRef.validate(value => {
        // 表单校验成功
        if (value) {
          // 向服务器发送请求
          this.$axios.post('/api/public/login.php', this.$qs.stringify({
            data: this.loginForm
          }))
            .then(res => {
              const data = res.data
              // 后台响应成功
              if (data.success) {
                // 获取用户数据
                this.getUserInfo()
                // 弹出成功信息
                this.$message.success(data.active)
                // 跳转博客页面
                this.$router.push('/article/add')
                // 后台响应失败,弹出警告信息
              } else this.$message.warning(data.active)
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-form {
    width: 400px; height: 300px;
    background-color: #fff;
    opacity: .9;
    padding: 20px;
    position: absolute;
    top: 50%; left:  50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .el-button {
      margin: 0 5px;
    }
  }
</style>
