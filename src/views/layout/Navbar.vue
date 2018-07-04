<template>
  <el-menu class="navbar" mode="horizontal">
    <logo></logo>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <tabs-view style="flex: 1;"></tabs-view>
    <span class="text">设备选择</span>
    <div class="filter clearfix">
      <el-cascader
        :options="options"
        v-model="selectedOptions" style="float: left">
      </el-cascader>
      <el-cascader
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions2" style="float: left">
      </el-cascader>
      <el-button icon="search" type="primary"></el-button>
    </div>
    <el-button type="primary">消息中心</el-button>
    <el-button type="primary" icon="setting">个人设置</el-button>
    <el-button type="primary" @click="logout">退出系统</el-button>
    <!--<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>-->
    <!--<screenfull class="fullscreen"></screenfull>-->
    <!--<el-dropdown class="avatar-container" trigger="click">-->
    <!--<div class="avatar-wrapper">-->
    <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
    <!--<i class="el-icon-caret-bottom"></i>-->
    <!--</div>-->
    <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
    <!--<router-link class='inlineBlock' to="/">-->
    <!--<el-dropdown-item>-->
    <!--首页-->
    <!--</el-dropdown-item>-->
    <!--</router-link>-->
    <!--<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Levelbar from './Levelbar'
  import TabsView from './TabsView'
  import Hamburger from 'components/Hamburger'
  import Screenfull from 'components/Screenfull'
  import ErrorLog from 'components/ErrLog'
  import Logo from './Logo'
  import errLogStore from 'store/errLog'

  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      ErrorLog,
      Screenfull,
      Logo,
    },
    data () {
      return {
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {
                    value: 'yizhi',
                    label: '一致',
                  }, {
                    value: 'fankui',
                    label: '反馈',
                  }, {
                    value: 'xiaolv',
                    label: '效率',
                  }, {
                    value: 'kekong',
                    label: '可控',
                  }],
              }, {
                value: 'daohang',
                label: '导航',
                children: [
                  {
                    value: 'cexiangdaohang',
                    label: '侧向导航',
                  }, {
                    value: 'dingbudaohang',
                    label: '顶部导航',
                  }],
              }],
          }, {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {
                    value: 'layout',
                    label: 'Layout 布局',
                  }, {
                    value: 'color',
                    label: 'Color 色彩',
                  }, {
                    value: 'typography',
                    label: 'Typography 字体',
                  }, {
                    value: 'icon',
                    label: 'Icon 图标',
                  }, {
                    value: 'button',
                    label: 'Button 按钮',
                  }],
              }, {
                value: 'form',
                label: 'Form',
                children: [
                  {
                    value: 'radio',
                    label: 'Radio 单选框',
                  }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框',
                  }, {
                    value: 'input',
                    label: 'Input 输入框',
                  }, {
                    value: 'input-number',
                    label: 'InputNumber 计数器',
                  }, {
                    value: 'select',
                    label: 'Select 选择器',
                  }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器',
                  }, {
                    value: 'switch',
                    label: 'Switch 开关',
                  }, {
                    value: 'slider',
                    label: 'Slider 滑块',
                  }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器',
                  }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器',
                  }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器',
                  }, {
                    value: 'upload',
                    label: 'Upload 上传',
                  }, {
                    value: 'rate',
                    label: 'Rate 评分',
                  }, {
                    value: 'form',
                    label: 'Form 表单',
                  }],
              }, {
                value: 'data',
                label: 'Data',
                children: [
                  {
                    value: 'table',
                    label: 'Table 表格',
                  }, {
                    value: 'tag',
                    label: 'Tag 标签',
                  }, {
                    value: 'progress',
                    label: 'Progress 进度条',
                  }, {
                    value: 'tree',
                    label: 'Tree 树形控件',
                  }, {
                    value: 'pagination',
                    label: 'Pagination 分页',
                  }, {
                    value: 'badge',
                    label: 'Badge 标记',
                  }],
              }, {
                value: 'notice',
                label: 'Notice',
                children: [
                  {
                    value: 'alert',
                    label: 'Alert 警告',
                  }, {
                    value: 'loading',
                    label: 'Loading 加载',
                  }, {
                    value: 'message',
                    label: 'Message 消息提示',
                  }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框',
                  }, {
                    value: 'notification',
                    label: 'Notification 通知',
                  }],
              }, {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'menu',
                    label: 'NavMenu 导航菜单',
                  }, {
                    value: 'tabs',
                    label: 'Tabs 标签页',
                  }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑',
                  }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单',
                  }, {
                    value: 'steps',
                    label: 'Steps 步骤条',
                  }],
              }, {
                value: 'others',
                label: 'Others',
                children: [
                  {
                    value: 'dialog',
                    label: 'Dialog 对话框',
                  }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示',
                  }, {
                    value: 'popover',
                    label: 'Popover 弹出框',
                  }, {
                    value: 'card',
                    label: 'Card 卡片',
                  }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯',
                  }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板',
                  }],
              }],
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components',
              }, {
                value: 'sketch',
                label: 'Sketch Templates',
              }, {
                value: 'jiaohu',
                label: '组件交互文档',
              }],
          }],
        selectedOptions: [],
        selectedOptions2: [],

        dialogUnpdatePwdVisible: false,
        log: errLogStore.state.errLog,
        temp: {
          oldpwd: '',
          newpwd: '',
        },
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
      ]),
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar')
      },
      handerUpdate () {
        this.dialogUnpdatePwdVisible = true
      },
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filter {
    margin: 0 10px;
  }

  .navbar {
    padding-right: 50px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*z-index: 999999;*/
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    border-bottom: 1px solid #ccc;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

  .link {
    float: right;
    font-size: 14px;
    line-height: 50px;
    margin: 0 10px;
    &__inner {
      transition: color .15s linear;
      color: #48576a;
    }
    &__inner:hover {
      color: #20a0ff;
      cursor: pointer;
    }
  }

  .text {
    font-size: 14px;
    color: #48576a;
    margin-left: 10px;
  }

  .fullscreen {
    margin: 0 10px;
  }
</style>

<style lang="scss">
  .filter {
    .el-cascader__label {
      line-height: 50px;
    }
    .el-cascader:first-child .el-input__inner {
      border-radius: 4px 0 0 4px;
    }
    .el-cascader:first-child + .el-cascader .el-input__inner {
      border-radius: 0;
      border-right: 0;
      border-left: 0;
    }
    .el-button {
      border-radius: 0 4px 4px 0;
    }
  }
</style>



