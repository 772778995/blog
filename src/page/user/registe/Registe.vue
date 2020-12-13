<template>
  <div class="registe_box">
    <!-- 注册表单区域 -->
    <el-form
      :model="registeForm"
      ref="registeFormRef"
      class="registe_form"
      :rules="rigisteFormRules"
      status-icon>
        <!-- 邮箱文本框 -->
        <el-form-item prop="Email">
          <el-input
            placeholder="请输入用于注册的邮箱 (必选)"
            prefix-icon="el-icon-message"
            v-model="registeForm.Email"
            @focus="noSendEmail">
          </el-input>
        </el-form-item>
        <!-- 验证码文本框 -->
        <el-form-item prop="EmailNum">
          <!-- 如果以发送邮件进入倒计时60秒，按钮不可选 -->
          <el-button
            v-if="registeForm.leftTime"
            type="primary"
            disabled>
              剩余{{registeForm.leftTime}}秒
          </el-button>
          <!-- 如果倒计时为0或未发送邮件且邮箱文本框中的值的格式正确，则可以发送邮件 -->
          <el-button
            v-else
            type="primary"
            :disabled="registeForm.isEmailExist"
            @click="sendEmail">
              发送邮件验证码
          </el-button>
          <!-- 验证码文本框 -->
          <el-input
            placeholder="请输入验证码 (必选)"
            prefix-icon="el-icon-message"
            class="EmailNum right"
            v-model="registeForm.EmailNum">
          </el-input>
        </el-form-item>
        <!-- 昵称文本框 -->
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入昵称  (必选)"
            prefix-icon="el-icon-user"
            v-model="registeForm.userName">
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="passWord">
          <el-input
            type="passWord"
            placeholder="请输入密码  (必选)"
            show-password
            prefix-icon="el-icon-lock"
            v-model="registeForm.passWord">
          </el-input>
        </el-form-item>
        <!-- 电话文本框 -->
        <el-form-item prop="tel">
          <el-input
            placeholder="请输入电话号码  (可选)"
            prefix-icon="el-icon-phone-outline"
            v-model="registeForm.tel">
          </el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="block"
            @click="registe">
              注册
          </el-button>
        </el-form-item>
        <!-- 已有账号 -->
        <el-form-item>
          <router-link
            class="right"
            to="/user/login">
              已经有了账号？
          </router-link>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setCookies, getCookies } from '../../../assets/js/cookies.js'
export default {
  name: 'Registe',
  data () {
    // 检查邮箱是否注册
    const checkEmail = (rule, value, callback) => {
      if (!value) callback(new Error('请输入邮箱地址'))
      this.$axios.post(
        '/api/email/checkEmailExist.php',
          `Email=${this.registeForm.Email}`
      )
        .then(res => {
          if (res.data === 2) {
            this.registeForm.isEmailExist = false
            callback()
          } else {
            this.registeForm.isEmailExist = true
            callback(new Error('该邮箱地址已被注册或不可用'))
          }
        })
    }
    // 判断手机号码的正则
    const checkTel = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value)) && value !== '') {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      registeForm: {
        Email: '',
        isEmailExist: true,
        leftTime: 0,
        EmailNum: '',
        userName: '',
        passWord: '',
        tel: ''
      },
      // 表单校验规则
      rigisteFormRules: {
        Email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        EmailNum: [
          { required: true, message: '验证码不得为空', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '昵称不得为空', trigger: 'blur' },
          { min: 2, max: 12, message: '请输入6-12位字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码不得为空', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: checkTel, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  当邮箱文本框获取焦点，发送邮件按钮不可点击
    noSendEmail: function () {
      this.registeForm.isEmailExist = true
    },
    // 发送邮件验证码
    sendEmail: function () {
      this.countTime()
      const { Email } = this.registeForm
      this.$axios.post(
        '/api/email/sendEmail.php',
          `Email=${Email}`
      )
        .then(res => {
          if (res.status === 200) this.$message.success('发送邮件成功！')
          else this.$message.error('发送邮件失败！')
        })
    },
    // 计时器
    countEmailTime () {
      const emailTime = setInterval(() => {
        this.registeForm.leftTime--
        if (!this.registeForm.leftTime) clearInterval(emailTime)
      }, 1000)
    },
    // 发送邮件后记录cookies
    countTime: function () {
      const overTime = Math.floor(new Date().getTime() / 1000) + 60
      this.registeForm.leftTime = 60
      setCookies('overTime', overTime, 1)
      // 调用计时器
      this.countEmailTime()
    },
    // 根据cookies倒计时
    howMuchTime () {
      if (getCookies().overTime) {
        const leftTime = getCookies().overTime - Math.floor(new Date().getTime() / 1000)
        if (leftTime > 0) {
          this.registeForm.leftTime = leftTime
          // 调用计时器
          this.countEmailTime()
        } else setCookies('overTime', '', -1)
      }
    },
    // 注册
    registe: function () {
      this.$refs.registeFormRef.validate(value => {
        if (value) {
          const { Email, EmailNum, userName, passWord, tel } = this.registeForm
          this.$axios.post(
            '/api/blog/registe.php',
              `Email=${Email}&EmailNum=${EmailNum}&userName=${userName}&passWord=${passWord}&tel=${tel}`
          )
            .then(res => {
              const { data } = res
              if (data === 1) {
                this.$message.success('注册成功！')
                this.$router.push('/user/login')
              } else if (data === 2) {
                this.$message.error('注册失败！')
              } else if (data === 3) {
                this.$message.warning('请检查验证码是否正确或者过期！')
              }
            })
        }
      })
    }
  },
  created () {
    this.howMuchTime()
  }
}
</script>

<style scoped>
  .registe_box {
    width: 400px; height: 455px;
    background: #fff;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
  }
  .registe_form {
    padding: 1.875rem;
  }
  .EmailNum{
    width: 185px;
  }
  .right{
    float: right;
    text-align: right;
  }
  .block{
    width: 100%;
  }
</style>
