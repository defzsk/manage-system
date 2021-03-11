<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-logo">
        <img src="./logo_index.png">
      </div>
      <div class="login-form">
        <el-form ref="user" :rules="rules" :model="user" >
  <el-form-item >
    <el-input v-model="user.mobile" placeholder="请输入手机号" prop="mobile"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="user.code" placeholder="请输入验证码" prop="code"></el-input>
  </el-form-item>
  <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"></el-checkbox>
          <el-button type="text" @click="open">用户隐私协议</el-button>
        </el-form-item>
  <el-form-item>
    <el-button class="login-btn" type="primary" @click="onSubmit" :loading="loginLoading">登录</el-button>
  </el-form-item>
</el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            // validator 验证函数不是你来调用的，而是当 element 表单触发验证的时候它会自己内部调用
            // 所以你只需要提供校验函数处理逻辑就可以了
            //   通过：callback()
            validator: (rule, value, callback) => {
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {
    open () {
      this.$router.push('/xieyi')
    },
    onSubmit () {
      this.$refs.user.validate(valid => {
      // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }

        // 验证通过，请求登录
        this.login()
      })
    },
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        // console.log(res.data.data)
        this.$message({
          showClose: true,
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push('/')
      }).catch(err => { // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')

        // 关闭 loading
        this.loginLoading = false
      })
    }
  },

  watch: {}
}
</script>
<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content:center;
  align-items: center;
  .login-form-wrap {
    min-width: 350px;
    padding: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login-logo {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
  .tiaokuan {
    padding-left: 5px;
  }
}
</style>
