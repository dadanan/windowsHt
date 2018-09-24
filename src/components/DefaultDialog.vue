<template>
  <el-dialog :visible="visible"
             :title="title"
             :width="width"
             :before-close="handleClose"
             :close-on-click-modal=false
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
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>