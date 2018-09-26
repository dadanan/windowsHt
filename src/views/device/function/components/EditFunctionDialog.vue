<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="form.abilityName"></el-input>
      </el-form-item>
      <el-form-item label="指令">
        <el-input v-model="form.dirValue"></el-input>
      </el-form-item>
      <el-form-item label="运行状态">
        <el-radio-group v-model="form.runStatus">
          <el-radio :label="1">可运行</el-radio>
          <el-radio :label="0">不可运行</el-radio>
        </el-radio-group>
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
          <el-select v-model='form.abilityType' placeholder="请选择" @change="handleConfigTypeChange">
            <el-option v-for='item in typeList' :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.abilityType === 2 || form.abilityType === 3">
          <template v-for="(option, i) in form.deviceAbilityOptions">
            <el-form-item v-if="option.status !== 2" :key="i" :label="'选项 ' + i">
              <div class="input-group">
                <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
                <el-input v-model="option.optionValue" placeholder="选项值"></el-input>
                <el-button type="danger" @click="deleteConfigOption(option,i)">删除</el-button>
              </div>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="addConfigOption">新增选项</el-button>
          </el-form-item>
        </template>
        <template v-else-if="form.abilityType === 4">
          <el-form-item label="极值">
            <div class="input-group">
              <el-input v-model="form.minVal" placeholder="最小值"></el-input>
              <el-input v-model="form.maxVal" placeholder="最大值"></el-input>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="form.abilityType === 5">
          <el-form-item label="极值">
            <div class="input-group">
              <el-input v-model="form.minVal" placeholder="最小值"></el-input>
              <el-input v-model="form.maxVal" placeholder="最大值"></el-input>
            </div>
          </el-form-item>
          <el-form-item v-if="option.status !== 2" v-for="(option, i) in form.deviceAbilityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="选项指令"></el-input>
              <el-input v-model="option.maxVal" placeholder="最大值"></el-input>
              <el-input v-model="option.minVal" placeholder="最小值"></el-input>
              <el-button type="danger" @click="deleteConfigOption(option,i)">删除</el-button>
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
      <el-button type="primary" @click="editForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateDeviceAbility } from '@/api/device/function'

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
      form: {
        permissions: []
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
    editForm() {
      // 抛弃用户新增，却又溢出的项（没有id，有status）
      this.form.deviceAbilityOptions = this.form.deviceAbilityOptions
        ? this.form.deviceAbilityOptions.filter(
            item =>
              item.hasOwnProperty('id') ||
              (!item.hasOwnProperty('id') && !item.hasOwnProperty('status'))
          )
        : []

      updateDeviceAbility(this.form).then(res => {
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
      this.$set(this.form, 'abilityType', type)
      if (type === 1) {
        return
      }
      if (type === 2 || type === 3) {
        this.$set(this.form, 'deviceAbilityOptions', [
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
        delete this.form.deviceAbilityOptions
        return
      }
      if (type === 5) {
        this.$set(this.form, 'deviceAbilityOptions', [
          {
            optionName: '',
            optionValue: '',
            minVal: '',
            maxVal: ''
          }
        ])
      }
    },
    deleteConfigOption(data, i) {
      this.form.deviceAbilityOptions.splice(
        i,
        1,
        Object.assign({}, data, { status: 2 })
      )
    },
    addConfigOption() {
      const type = this.form.abilityType
      if (type === 2 || type === 3) {
        this.form.deviceAbilityOptions.push({
          optionName: '',
          optionValue: ''
        })
        return
      }
      if (type === 5) {
        this.form.deviceAbilityOptions.push({
          optionName: '',
          optionValue: '',
          minVal: '',
          maxVal: ''
        })
      }
    }
  },
  watch: {
    data(val) {
      const form = Object.assign({}, val)
      form.permissions = []
      if (val.readStatus) {
        form.permissions.push('r')
      }
      if (val.writeStatus) {
        form.permissions.push('w')
      }
      this.form = form
    }
  }
}
</script>
