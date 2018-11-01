<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
      <el-form-item label="名称" prop="abilityName">
        <el-input v-model="form.abilityName"></el-input>
      </el-form-item>
      <el-form-item label="指令" prop="dirValue">
        <el-input v-model="form.dirValue"></el-input>
      </el-form-item>
      <el-form-item label="运行状态">
        <el-radio v-model="form.runStatus" :label="1">可运行</el-radio>
        <el-radio v-model="form.runStatus" :label="0">不可运行</el-radio>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
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
          <el-select v-model='form.abilityType' placeholder="请选择" @change="handleAbilityTypeChange">
            <el-option v-for='item in typeList' :key='item.value' :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="form.abilityType === 2 || form.abilityType === 3">
          <el-form-item v-for="(option, i) in form.deviceAbilityOptions" :key="i" :label="'选项 ' + i">
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
          <el-form-item v-for="(option, i) in form.deviceAbilityOptions" :key="i" :label="'选项 ' + i">
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
        <template v-else-if="form.abilityType === 6">
          <el-form-item v-for="(option, i) in form.deviceAbilityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.defaultVal" placeholder="默认值"></el-input>
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
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createDeviceAbility } from '@/api/device/function'

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
        abilityName: '',
        dirValue: '',
        remark: '',
        permissions: [],
        writeStatus: 0,
        readStatus: 0,
        abilityType: 1,
        abilityType: 1,
        deviceAbilityOptions: [],
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
        },
        {
          label: '设备传参类',
          value: 6
        }
      ],
      rules: {
        abilityName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        dirValue: [
          { required: true, message: '请输入指令', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请添加备注', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createHandler() {
      this.form.abilityType = this.form.abilityType
      createDeviceAbility(this.form).then(res => {
        this.$emit('add-data', {
          ...this.form,
          id: res.data
        })
        this.$emit('update:visible', false)
      })
    },
    submitForm(formName) {  //判断表单数据是否为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createHandler()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) { //清空表单里面的数据
      this.$refs[formName].resetFields();
      this.$emit('update:visible', false)
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
    handleAbilityTypeChange(type) {
      this.$set(this.form, 'abilityType', type)
      if (type === 1) {
        delete this.form.deviceAbilityOptions
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
      if (type === 6) {
        this.$set(this.form, 'deviceAbilityOptions', [
          {
            optionName: '',
            defaultVal: '',
            minVal: '',
            maxVal: ''
          }
        ])
      }
      
    },
    deleteConfigOption(i) {
      this.form.deviceAbilityOptions.splice(i, 1)
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
      if (type === 6) {
        this.form.deviceAbilityOptions.push({
          optionName: '',
          defaultVal: '',
          minVal: '',
          maxVal: ''
        })
      }
    }
  }
}
</script>
