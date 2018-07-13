<template>
  <el-dialog
    :title="name"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="close"
    :modal="false">
    这里放图片
    {{img}}
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['visible', 'id', 'options'],
    data() {
      return {
        name: null,
        img: null,
        dialogVisible: false
      }
    },
    watch: {
      visible(newVal) {
        this.dialogVisible = newVal
      }
    },
    created() {
      const selectedId = this.options.selectedId
      this.populateData(selectedId)
    },
    methods: {
      populateData(id) {
        this.options.data.forEach((element) => {
          if (parseInt(element.id) === parseInt(id)) {
            this.name = element.name + '方案'
            this.img = element.img
          }
        })
      },
      close() {
        console.log('弹窗关闭了')
        this.dialogVisible = false
        this.$emit('toggleDialog', this.id)
      }
    }
  }
</script>

<style scoped>

</style>
