<template>
  <el-dialog title="设备集群" :visible="visible" @update:visible="$emit('update:visible', $event)"></el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
