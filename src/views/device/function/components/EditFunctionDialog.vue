<template>
  <el-dialog title="编辑功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="硬件功能 ID">
        <el-input v-model="form.functionId"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item label="读写权限">
        <el-checkbox-group v-model="form.permissions" @change="handlePermissionListChange">
          <el-checkbox label="r">可读</el-checkbox>
          <el-checkbox label="w">可写</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <template v-if="form.config">
        <el-form-item label="配置方式">
          <el-radio-group v-model="form.config.type" @change="handleConfigTypeChange">
            <el-radio :label="1">文本</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">单选</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.config.type === 2 || form.config.type === 3">
          <el-form-item v-for="(option, i) in form.config.options" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.label" placeholder="选项名称"></el-input>
              <el-input v-model="option.value" placeholder="选项值"></el-input>
              <el-button type="danger" @click="deleteConfigOption(i)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createConfigOption">新增选项</el-button>
          </el-form-item>
        </template>
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
        form: {
          name: '温度传感器 1',
          functionId: '233',
          description: '暂无',
          permissions: ['r']
        }
      }
    },
    methods: {
      handlePermissionListChange(permissions) {
        if (permissions.some(el => el === 'w')) {
          this.$set(this.form, 'config', { type: 1 })
        } else {
          this.$delete(this.form, 'config')
        }
      },
      handleConfigTypeChange(type) {
        if (type === 2 || type === 3) {
          this.$set(this.form, 'config', { type, options: [{ label: '', value: '' }] })
        }
      },
      deleteConfigOption(i) {
        this.form.config.options.splice(i, 1)
      },
      createConfigOption() {
        this.form.config.options.push({ label: '', value: '' })
      }
    }
  }
</script>
