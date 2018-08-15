<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="login-header">
          <div class="login-header__logo">
            <img src="/static/images/logo.svg" alt="logo">
          </div>
          <div class="login-header__title">空气管理平台</div>
        </div>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.username')" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="$t('login.password')" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <div class="login-form-item">
          <el-button type="text" @click="showDialog = true">忘记密码?</el-button>
        </div>
        <div class="login-form-item">
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
        </div>
        <!--<el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>-->
      </el-form>
    </el-card>

    <el-dialog title="密码找回提示" :visible.sync="showDialog" append-to-body>
      <pre>
        *1 若超级管理员忘记密码，可以联系环可平台客服人员；

        *2 若为其它角色忘记密码，可以联系该角色的上级管理员（即该子平台的超级管理员）；

        *3 点击忘记密码应弹出相应的密码找回页面，该页面有上述两个途径可以找回密码；

        （暂不支持线上找回功能，因本平台针对的是专业管理用户，非终端用户）
      </pre>
    </el-dialog>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  components: { LangSelect, SocialSign },
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
        callback(new Error('密码不能小于 6 位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'wkk',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
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
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #3b516d;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
  }

  .login-form-item {
    margin-bottom: 22px;
  }

  .login-header {
    text-align: center;
    &__logo {
      margin-bottom: 22px;
      img {
        width: 250px;
      }
    }
    &__title {
      color: #eee;
      font-size: 22px;
      margin-bottom: 22px;
    }
  }

  .login-card {
    background-color: #2d3a4b;
    border: none;
    min-width: 400px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
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
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
