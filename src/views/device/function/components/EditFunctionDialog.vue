<template>
  <el-dialog title="编辑功能" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="form.ablityName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="硬件功能 ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item> -->
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
      <el-form-item label="功能类型(标签)">
        <el-input v-model="form.type"></el-input>
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
          <template v-for="(option, i) in form.deviceAblityOptions">
            <el-form-item v-if="option.status !== 2" :key="i" :label="'选项 ' + i">
              <div class="input-group">
                <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
                <el-input v-model="option.optionValue" placeholder="选项值"></el-input>
                <el-button type="danger" @click="deleteConfigOption(option,i)">删除</el-button>
              </div>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="createConfigOption">新增选项</el-button>
          </el-form-item>
        </template>
      </template>
      <!-- <el-form-item label="能力类型">
        <el-radio-group v-model="form.ablityType">
          <el-radio :label="0">范围值</el-radio>
          <el-radio :label="1">固定可选值</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.ablityType === 0">
        <el-form-item label="范围">
          <div class="input-group">
            <el-input v-model="maxValue" placeholder="最大值"></el-input>
            <el-input v-model="minValue" placeholder="最小值"></el-input>
          </div>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item v-for="(option, i) in form.deviceAblityOptionCreateOrUpdateRequests" :key="i" :label="'选项 ' + i">
          <div class="input-group">
            <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
            <el-input v-model="option.optionValue" placeholder="选项值"></el-input>
            <el-button type="danger" @click="deleteConfigOption(i)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createConfigOption">新增选项</el-button>
        </el-form-item>
      </template> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="editForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateDeviceAblity } from '@/api/device/function'

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
      }
    }
  },
  methods: {
    editForm() {
      delete this.form.permissions

      // 抛弃用户新增，却又溢出的项（没有id，有status）
      this.form.deviceAblityOptions = this.form.deviceAblityOptions.filter(
        item =>
          item.hasOwnProperty('id') ||
          (!item.hasOwnProperty('id') && !item.hasOwnProperty('status'))
      )

      updateDeviceAblity(this.form)
        .then(res => {
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
        .catch(err => {
          console.log(err)
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
    deleteConfigOption(data, i) {
      this.form.deviceAblityOptions.splice(
        i,
        1,
        Object.assign({}, data, { status: 2 })
      )
    },
    createConfigOption() {
      this.form.deviceAblityOptions.push({
        optionName: '',
        optionValue: ''
      })
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
