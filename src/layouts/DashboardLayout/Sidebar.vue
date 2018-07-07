<template>
  <el-menu class="menu" mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss">
  .menu {
    border-radius: 0;
    top: 50px !important;
    border-right: 1px solid #ccc;
  }
</style>
