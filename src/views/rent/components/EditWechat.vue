<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form">
        <el-form-item label="实施阶段名称">
        <el-input v-model="form.label" placeholder="实施阶段名称"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" placeholder="实施阶段排序"></el-input>
        <span class="color">*使用时下拉框的排序序号</span>
      </el-form-item>
      <el-form-item label="标号">
        <el-input v-model="form.value" placeholder="标号不可重复"></el-input>
        <span class="color">*备用字段，暂未用，可默认为0</span>
      </el-form-item>
      <el-form-item label="实施阶段描述">
        <el-input type="textarea" :rows='3' placeholder="实施阶段描述..." v-model='form.description'></el-input>
      </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='editDict'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editDict } from '@/api/rent'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    editDict() {
      editDict(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('update-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  },
  watch: {
    data(val) {
      console.log(val)
      this.form = val
    }
  }
}
</script>
<style lang='scss'>
.color{
  color: #969696
}
</style>