<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <navbar></navbar>
    <div class="main-container">
      <div class="footer-container">
        <app-main></app-main>
        <d-footer></d-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import Sidebar from './Sidebar'
  import AppMain from './AppMain'
  import DFooter from './DFooter'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      DFooter
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .footer-container {
    min-height: 100%;
    padding-bottom: 50px;
    position: relative;
  }

  .app-wrapper {
    &.hideSidebar {
      .sidebar-container {
        width: 36px;
        overflow: inherit;
      }
      .main-container {
        margin-left: 36px;
      }
    }
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 180px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none
      }
    }
    .main-container {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
      transition: margin-left 0.28s ease-out;
      margin-left: 180px;
    }
  }
</style>
