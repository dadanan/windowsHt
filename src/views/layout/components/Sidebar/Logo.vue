<template>
  <el-menu-item class="logo" index="logo">
    <img v-if='logo' :src="logo" alt="logo">
    <img v-else src="/static/images/logo.svg" alt="logo">
  </el-menu-item>
</template>

<script>
export default {
  computed: {
    logo() {
      return this.$store.getters.logo
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 50px;
  background-color: #fff !important;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>
