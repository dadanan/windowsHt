<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger :toggleClick="toggleSideBar" :isActive="sidebar.opened" class="sidebar-btn"></hamburger>
      <div class="search">
        <div class="search__label">设备选择：</div>
        <el-select v-model='filterKey' @change='filterOptionChanged' placeholder="请选择查询条件">
          <el-option v-for='item in filterData' :key='item.value' :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input v-if='filterType !== 1' placeholder="请输入关键词" v-model="keyword" class="cascader-with-input">
          <el-button slot="append" icon="el-icon-search" @click='searchDevice'></el-button>
        </el-input>
        <template v-else>
          <el-select v-model='keyword' placeholder="请选择状态">
            <el-option v-for='item in filterOption' :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click='searchDevice'></el-button>
        </template>
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
import { selectBackendConfigBySLD } from '@/api/customer'

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
      filterData: [
        {
          label: '分配状态',
          value: 'assignStatus',
          type: 1, // 表示用户的查询关键词只能是 1或者 0
          option: [
            {
              label: '已分配',
              value: 1
            },
            {
              label: '未分配',
              value: 0
            }
          ]
        },
        {
          label: '绑定状态',
          value: 'bindStatus',
          type: 1,
          option: [
            {
              label: '已绑定',
              value: 1
            },
            {
              label: '未绑定',
              value: 0
            }
          ]
        },
        {
          label: '启用状态',
          value: 'enableStatus',
          type: 1,
          option: [
            {
              label: '已启用',
              value: 1
            },
            {
              label: '已禁用',
              value: 0
            }
          ]
        },
        {
          label: '在线状态',
          value: 'onlineStatus',
          type: 1,
          option: [
            {
              label: '在线',
              value: 1
            },
            {
              label: '离线',
              value: 0
            }
          ]
        },
        {
          label: '工作状态',
          value: 'powerStatus',
          type: 1,
          option: [
            {
              label: '开机',
              value: 1
            },
            {
              label: '关机',
              value: 0
            }
          ]
        },
        {
          label: '设备名称',
          value: 'name'
        },
        {
          label: '管理名称',
          value: 'manageName'
        },
        {
          label: 'MAC',
          value: 'mac'
        }
      ],
      filterKey: '',
      filterType: 0,
      filterOption: [],
      selectedOptions: [],
      keyword: '',
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
    filterOptionChanged(value) {
      const data = this.filterData.filter(item => item.value === value)[0]
      const type = data.type
      this.filterType = type === 1 ? 1 : 0
      if (type) {
        this.filterType = 1
        this.filterOption = data.option
      } else {
        this.filterType = 0
      }
      this.keyword = ''
    },
    searchDevice() {
      console.log(this.keyword)
      this.$router.push({
        path: '/device/list',
        query: {
          [this.filterKey]: this.keyword,
          limit:200,
          page:1
        }
      })
    },
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
          }).then(res => {
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
          return
        }
        this.$message({
          type: 'error',
          message: '表单验证失败！'
        })
      })
    },
    getUserInfo() {
      getCurrentUser().then(res => {
        if (res.code === 200) {
          const data = res.data
          this.profileForm = data
          this.$store.commit('SET_USER', data)
        }
      })
    },
    selectBackendConfigBySLD() {
      selectBackendConfigBySLD()
        .then(res => {
          const data = res.data
          if (data.logo) {
            this.$store.commit('SET_LOGO', data.logo)
          }
          if (data.name) {
            document.title = data.name
            this.$store.commit('SET_SITENAME', data.name)
          }
        })
        .catch(() => {})
    }
  },
  created() {
    this.getUserInfo()
    this.selectBackendConfigBySLD()
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
