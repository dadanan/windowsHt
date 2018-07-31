<template>
  <div class="row col">
    <div class="col" v-if="value">
      <img :src="value" class="block">
    </div>
    <div class="col">
      <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value']
  }
</script>
