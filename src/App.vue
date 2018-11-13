<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Element步骤条颜色覆盖 */
/* 过去的步骤 */
.el-step__title.is-success,
.el-step__head.is-success {
  color: #303133;
  border: #303133;
}

.el-step__title.is-process,
.el-step__head.is-process {
  color: #67c23a;
  border: #67c23a;
}
</style>
