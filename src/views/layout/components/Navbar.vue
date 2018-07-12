<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggleClick="toggleSideBar" :isActive="sidebar.opened" class="sidebar-btn"></hamburger>
    <breadcrumb></breadcrumb>
    <div style="flex: 1"></div>
    <el-dropdown>
      <div class="profile"><font-awesome-icon icon="user"></font-awesome-icon> 运维1</div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          个人设置
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!--<div class="right-menu">-->
      <!--&lt;!&ndash;<error-log class="errLog-container right-menu-item"></error-log>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">&ndash;&gt;-->
        <!--&lt;!&ndash;<screenfull class="screenfull right-menu-item"></screenfull>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->

      <!--&lt;!&ndash;<lang-select class="international right-menu-item"></lang-select>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">&ndash;&gt;-->
        <!--&lt;!&ndash;<theme-picker class="theme-switch right-menu-item"></theme-picker>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->

      <!--&lt;!&ndash;<el-dropdown class="avatar-container right-menu-item" trigger="click">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="avatar-wrapper">&ndash;&gt;-->
          <!--&lt;!&ndash;<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">&ndash;&gt;-->
          <!--&lt;!&ndash;<i class="el-icon-caret-bottom"></i>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-dropdown-menu slot="dropdown">&ndash;&gt;-->
          <!--&lt;!&ndash;<router-link to="/">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-dropdown-item>&ndash;&gt;-->
              <!--&lt;!&ndash;{{$t('navbar.dashboard')}}&ndash;&gt;-->
            <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
          <!--&lt;!&ndash;<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-dropdown-item>&ndash;&gt;-->
              <!--&lt;!&ndash;{{$t('navbar.github')}}&ndash;&gt;-->
            <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
          <!--&lt;!&ndash;</a>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-dropdown-item divided>&ndash;&gt;-->
            <!--&lt;!&ndash;<span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-dropdown-menu>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-dropdown>&ndash;&gt;-->
    <!--</div>-->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

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
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
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

  .profile {
    position: relative;
    height: 100%;
    cursor: pointer;
    padding: 0 20px;
    transition: all .3s ease-out;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: #fff;
      transition: all .3s ease-out;
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
