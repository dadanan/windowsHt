<template>
  <el-dialog title="添加功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="硬件功能 ID">
        <el-input v-model="addForm.hwFunctionID"></el-input>
      </el-form-item>
      <el-form-item label="读写权限">
        <el-checkbox-group v-model="addForm.rwPermissions">
          <el-checkbox label="read">可读</el-checkbox>
          <el-checkbox label="write">可写</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="配置方式" v-if="isWritable()">
        <el-radio-group v-model="addForm.writeMethod">
          <el-radio :label="1">文本</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">单选</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="addForm.writeMethod === 2 || addForm.writeMethod === 3">
        <el-form-item v-for="option, index in addForm.writeMethodConfig.options" :key="index" :label="'选项 ' + index">
          <div class="input-group">
            <el-input v-model="option.label" placeholder="选项名称"></el-input>
            <el-input v-model="option.value" placeholder="选项值"></el-input>
            <el-button type="danger" @click="deleteWriteMethodOption(index)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addWriteMethodOption">新增选项</el-button>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        addForm: {
          name: '',
          hwFunctionID: '',
          rwPermissions: ['read'],
          writeMethod: '0',
          writeMethodConfig: {
            options: [{ label: '', value: '' }]
          }
        }
      }
    },
    methods: {
      isWritable() {
        return this.addForm.rwPermissions.some((el) => {
          return el === 'write'
        })
      },
      deleteWriteMethodOption(i) {
        this.addForm.writeMethodConfig.options.splice(i, 1)
      },
      addWriteMethodOption() {
        this.addForm.writeMethodConfig.options.push({ label: '', value: '' })
      }
    }
  }
</script>
