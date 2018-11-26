<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="实施阶段名称" prop="label">
          <el-input v-model="form.label" placeholder="实施阶段名称"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" placeholder="请输入实施排序"></el-input>
        </el-form-item>
        <el-form-item label="标号">
          <el-input v-model="form.value" placeholder="标号不可重复"></el-input>
        </el-form-item>
        <el-form-item label="实施阶段描述" prop="description">
          <el-input type="textarea" :rows='3' placeholder="实施阶段描述..." v-model='form.description'></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='addDict'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDict } from '@/api/rent'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        description: '', //描述
        isDelete: 0, // 删除标志 0 为true 未删除 1 false
        label: '', //分类名
        sort: 0, //排序 可重复
        type: 'implementation', // 类型名
        value: 0  // 不可重复  标号
      },
      rules: {
        label: [
          { required: true, message: '请输入实施阶段名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入实施阶段描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addDict() {
      addDict(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
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
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
