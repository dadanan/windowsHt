<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger :toggleClick="toggleSideBar" :isActive="sidebar.opened" class="sidebar-btn"></hamburger>
      <!--<breadcrumb></breadcrumb>-->
      <div class="search">
        <div class="search__label">设备选择：</div>
        <el-input placeholder="请输入关键词" v-model="keywords" class="cascader-with-input">
          <el-cascader slot="prepend" :options="options" v-model="selectedOptions" placeholder="请选择条件" style="width: 202px">
          </el-cascader>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div style="flex: 1"></div>
      <el-dropdown>
        <div class="profile">
          <font-awesome-icon icon="user"></font-awesome-icon>
          {{profileForm.nickName}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="dialogEditProfileVisible = true" style="display: block">个人设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="profile" @click="bigPictureMode">
        <font-awesome-icon icon="expand"></font-awesome-icon>
        大数据模式
      </div>
    </el-menu>
    <el-dialog top='4vh' :close-on-click-modal=false title="个人设置" :visible.sync="dialogEditProfileVisible">
      <el-form :rules="rules" :model="profileForm" ref='form' label-width="80px" label-position="left">
        <el-form-item label="账号">
          <el-input v-model="profileForm.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="profileForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-input v-model="profileForm.roleName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='telephone'>
          <el-input type='number' v-model="profileForm.telephone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditProfileVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import * as screenfull from 'screenfull'
import { getCurrentUser, updateUser } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  data() {
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
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      selectedOptions: [],
      keywords: '',
      dialogEditProfileVisible: false,
      profileForm: {},
      rules: {
        nickName: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        telephone: [
          { min: 11, max: 11, message: '长度为11个数字', trigger: 'blur' },
          {
            required: true,
            message: '请输入合法手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    bigPictureMode() {
      this.$router.push({ name: 'big-picture-mode' })
      if (screenfull.enabled) {
        screenfull.request()
      }
    },
    updateUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          updateUser({
            ...this.profileForm,
            lastUpdateTime: new Date().toISOString()
          })
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
                this.dialogEditProfileVisible = false
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
          return
        }
        this.$message({
          type: 'error',
          message: '表单验证失败！'
        })
      })
    },
    getUserInfo() {
      getCurrentUser()
        .then(res => {
          if (res.code === 200) {
            this.profileForm = res.data
            this.$store.commit('SET_USER', res.data)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  border-bottom: none;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  .search {
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    &__label {
      white-space: nowrap;
      font-size: 14px;
      color: #606266;
      margin-right: 10px;
    }
  }

  .profile {
    position: relative;
    height: 100%;
    cursor: pointer;
    padding: 0 20px;
    transition: all 0.3s ease-out;
    color: #606266;
    font-size: 14px;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: #fff;
      transition: all 0.3s ease-out;
    }

    &:hover {
      color: #108ee9;
      /*background-color: rgba(16,142,233,.15);*/
      &::after {
        background-color: #108ee9;
      }
    }
  }
}
</style>

<style lang="scss">
.el-input-group__prepend .el-cascader {
  display: inline-block;
  margin: -10px -20px;
}

.cascader-with-input {
  .el-input-group__prepend {
    overflow: hidden;
  }

  .el-cascader input {
    border-color: transparent;
  }
}
</style>
