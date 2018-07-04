<template>
  <div class="login-container" :style="ui.bgStyle">
    <el-card class="card-box">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
               label-position="left">
        <div class="login-header">
          <div class="login-header__logo">
            <img src="/static/images/logo.svg" alt="logo">
          </div>
          <div class="login-header__title">空气管理平台</div>
        </div>
        <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="user"/>
        </span>
          <el-input name="username" type="text" v-model="loginForm.name" autoComplete="on" placeholder="请输入用户名"/>
        </el-form-item>

        <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password"/>
        </span>
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码"/>
          <span class='show-pwd' @click='showPwd'><icon-svg icon-class="eye"/></span>
        </el-form-item>
        <div class="text"></div>
        <el-button type="text">忘记密码?</el-button>
        <div class="login-btn-group">
          <el-button class="login-btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          <div class='login-tips'>{{loginTips}}</div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        ui: {
          title: '空气管理平台',
          logo: '',
          btnStyle: {},
          bgStyle: {}
        },
        loginForm: {
          name: '',
          password: ''
        },
        loginTips: '',
        loginRules: {
          name: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        pwdType: 'password',
        loading: false,
        showDialog: false
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then((succ) => {
              this.loading = false
              if (succ) {
                this.$router.push({ path: '/' })
              } else {
                this.loginTips = '用户名或者密码错误'
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #3b516d;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .card-box {
      border: none;
      background-color: $bg;
      min-width: 400px;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
  }
  .login-header {
    &__logo {
      margin-bottom: 20px;
    }
    &__title {
      color: #eee;
      font-size: 22px;
      margin-bottom: 22px;
    }
  }
  .login-btn {
    width: 100%;
  }
  .login-tips {
    position: absolute;
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
  }
  .login-btn-group {
    position: relative;
    margin: 32px 0;
  }
</style>
