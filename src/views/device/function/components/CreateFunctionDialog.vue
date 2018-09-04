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
        <el-radio v-model="form.runStatus" :label="1">可运行</el-radio>
        <el-radio v-model="form.runStatus" :label="0">不可运行</el-radio>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item label="读写权限">
        <el-checkbox-group v-model="form.permissions" @change="handlePermissionListChange">
          <el-checkbox label="r">可读</el-checkbox>
          <el-checkbox label="w">可写</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <template v-if="form.writeStatus">
        <el-form-item label="功能类型(标签)">
          <el-select v-model='form.configType' placeholder="请选择" @change="handleConfigTypeChange">
            <el-option v-for='item in typeList' :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.configType === 2 || form.configType === 3">
          <el-form-item v-for="(option, i) in form.deviceAblityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="指令"></el-input>
              <el-button type="danger" @click="deleteConfigOption(i)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addConfigOption">新增选项</el-button>
          </el-form-item>
        </template>
        <template v-else-if="form.configType === 4">
          <el-form-item label="极值">
            <div class="input-group">
              <el-input v-model="form.minVal" placeholder="最小值"></el-input>
              <el-input v-model="form.maxVal" placeholder="最大值"></el-input>
              <el-button type="danger" @click="deleteConfigOption(i)">删除</el-button>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="form.configType === 5">
          <el-form-item v-for="(option, i) in form.deviceAblityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="选项指令"></el-input>
              <el-input v-model="option.maxVal" placeholder="最大值"></el-input>
              <el-input v-model="option.minVal" placeholder="最小值"></el-input>
              <el-button type="danger" @click="deleteConfigOption(i)">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addConfigOption">新增选项</el-button>
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
        permissions: [],
        writeStatus: 0,
        readStatus: 0,
        configType: 1,
        deviceAblityOptions: [],
        runStatus: 0
      },
      typeList: [
        {
          label: '文本类',
          value: 1
        },
        {
          label: '单选类',
          value: 2
        },
        {
          label: '多选类',
          value: 3
        },
        {
          label: '阈值类',
          value: 4
        },
        {
          label: '阈值选择类',
          value: 5
        }
      ]
    }
  },
  methods: {
    createHandler() {
      this.form['ablityType'] = this.form.configType
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
      this.$set(this.form, 'configType', type)
      if (type === 1) {
        delete this.form.deviceAblityOptions
        return
      }
      if (type === 2 || type === 3) {
        this.$set(this.form, 'deviceAblityOptions', [
          {
            optionName: '',
            optionValue: ''
          }
        ])
        return
      }
      if (type === 4) {
        this.form.maxVal = ''
        this.form.minVal = ''
        delete this.form.deviceAblityOptions
        return
      }
      if (type === 5) {
        this.$set(this.form, 'deviceAblityOptions', [
          {
            optionName: '',
            optionValue: '',
            minVal: '',
            maxVal: ''
          }
        ])
      }
    },
    deleteConfigOption(i) {
      this.form.deviceAblityOptions.splice(i, 1)
    },
    addConfigOption() {
      const type = this.form.configType
      if (type === 2 || type === 3) {
        this.form.deviceAblityOptions.push({
          optionName: '',
          optionValue: ''
        })
        return
      }
      if (type === 5) {
        this.form.deviceAblityOptions.push({
          optionName: '',
          optionValue: '',
          minVal: '',
          maxVal: ''
        })
      }
    }
  }
}
</script>
