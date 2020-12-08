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
        <el-button v-else type="primary" @click="loginDialog = true">
          登 陆
        </el-button>
      </div>
    </div>

    <!-- 登陆框开始 -->
    <el-dialog
      title="登陆"
      :visible.sync="loginDialog"
      @close="close"
      width="35%">

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

      </el-form>
      <!-- 登陆表单结束 -->

      <!-- 登陆框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialog = false">取 消</el-button>
        <el-button type="primary" @click="login">登 陆</el-button>
      </span>
    </el-dialog>
    <!-- 登陆框结束 -->

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      // 登陆框是否显示
      loginDialog: false,
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
    ...mapMutations(['loginOut']),
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
              // 登陆成功
              if (res.status === 200) {
                this.getUserInfo()
                this.$message.success('登陆成功！')
                this.loginDialog = false
              } else {
                // 登陆失败
                this.$message.error('登陆失败！')
              }
            })
        }
      })
    },
    // 关闭登陆框时重置登陆表单
    close () {
      this.$refs.loginFormRef.resetFields()
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .header{
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
