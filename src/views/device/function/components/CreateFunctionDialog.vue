<template>
  <el-dialog title="添加功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="form.ablityName"></el-input>
      </el-form-item>
      <el-form-item label="指令">
        <el-input v-model="form.dirValue"></el-input>
      </el-form-item>
      <el-form-item label="运行状态">
        <el-radio v-model="form.runStatus" label="1">可运行</el-radio>
        <el-radio v-model="form.runStatus" label="0">不可运行</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item label="功能类型(标签)">
        <el-input v-model="form.ablityType"></el-input>
      </el-form-item>
      <el-form-item label="读写权限">
        <el-checkbox-group v-model="form.permissions" @change="handlePermissionListChange">
          <el-checkbox label="r">可读</el-checkbox>
          <el-checkbox label="w">可写</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <template v-if="form.writeStatus">
        <el-form-item label="配置方式">
          <el-radio-group v-model="form.configType" @change="handleConfigTypeChange">
            <el-radio :label="1">文本</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">单选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输入文本" v-if='form.configType === 1'>
          <el-input v-model="form.text"></el-input>
        </el-form-item>
        <template v-if="form.configType === 2 || form.configType === 3">
          <el-form-item v-for="(option, i) in form.deviceAblityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="选项值"></el-input>
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
      <el-button type="primary" @click="createHandler">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createDeviceAblity } from '@/api/device/function'

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
        ablityName: '',
        dirValue: '',
        remark: '',
        ablityType: '',
        permissions: [],
        writeStatus: 0,
        readStatus: 0,
        configType: 1,
        deviceAblityOptions: [],
        runStatus: 0
      }
    }
  },
  methods: {
    createHandler() {
      console.log(JSON.stringify(this.form))
      createDeviceAblity(this.form)
        .then(res => {
          this.$emit('add-data', {
            ...this.form,
            id: res.data
          })
          this.$emit('update:visible', false)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    handlePermissionListChange(permissions) {
      if (permissions.some(el => el === 'w')) {
        this.$set(this.form, 'writeStatus', 1)
      } else {
        this.$set(this.form, 'writeStatus', 0)
      }

      if (permissions.some(el => el === 'r')) {
        this.$set(this.form, 'readStatus', 1)
      } else {
        this.$set(this.form, 'readStatus', 0)
      }
    },
    handleConfigTypeChange(type) {
      if (type === 2 || type === 3) {
        this.$set(this.form, 'configType', type)
        this.$set(this.form, 'deviceAblityOptions', [
          {
            optionName: '',
            optionValue: ''
          }
        ])
      }
    },
    deleteConfigOption(i) {
      this.form.deviceAblityOptions.splice(i, 1)
    },
    createConfigOption() {
      this.form.deviceAblityOptions.push({
        optionName: '',
        optionValue: ''
      })
    }
  }
}
</script>
