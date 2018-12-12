<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加消息" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="130px" class="mb-22" :model="form">
      <el-form-item label="标题">
        <el-input type="text" placeholder="消息标题..." v-model='form.topic'></el-input>        
      </el-form-item>
      <el-form-item label="消息内容">
        <el-input type="textarea" :rows='3' placeholder="消息内容..." v-model='form.description' height="300px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='submitForm'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { read } from '@/api/message'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
      type: Object,
    }
  },
  data() {
    return {
      form: {},
    }
  },
  methods: {
    
    handleCancel() {
      this.$emit('update:visible', false)
    },
    submitForm() {
      read(this.form.id).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '感谢阅读!'
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  },
  watch: {
    data(val){
      this.form = val
    }
  }
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

