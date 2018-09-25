<template>
  <el-dialog :visible="visible"
             :title="title"
             :width="fullscreen ? 'auto' : width"
             :before-close="handleClose"
             :close-on-click-modal=false
             :fullscreen="fullscreen"
             @closed="handleClosed"
             show-close
             top='4vh'>
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
    width: {
      type: String,
      default: '600px'
    },
    fullscreen: Boolean
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    // Dialog 关闭动画结束时的回调
    handleClosed() {
      this.$emit('closed')
    }
  }
}
</script>