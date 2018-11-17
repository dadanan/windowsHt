<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="导出设备列表" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form>
      <el-form-item label="导出方式">
        <el-radio-group v-model="radio">
          <el-radio :label="0">导出当前页</el-radio>
          <el-radio :label="1">导出全部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="导出名字">
        <el-input type="text" v-model="name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { exportDeviceData } from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    query: Object,
    total: Number,
    deviceColumnVisible: Object
  },
  data() {
    return {
      radio: 0,
      name:''
    }
  },
  methods: {
    handleExport(query) {
      this.deviceColumnVisible['deviceListQueryRequest.limit'] =
        query.deviceListQueryRequest.limit
      this.deviceColumnVisible['deviceListQueryRequest.page'] =
        query.deviceListQueryRequest.page
      this.deviceColumnVisible['typeNo'] =true
      if (!this.deviceColumnVisible.assignStatus) {
        delete this.deviceColumnVisible.assignStatus
      }
      if (!this.deviceColumnVisible.bindStatus) {
        delete this.deviceColumnVisible.bindStatus
      }
      if (!this.deviceColumnVisible.bindCustomer) {
        delete this.deviceColumnVisible.bindCustomer
      }
      if (!this.deviceColumnVisible.birthTime) {
        delete this.deviceColumnVisible.birthTime
      }
      if (!this.deviceColumnVisible.createUser) {
        delete this.deviceColumnVisible.createUser
      }
      if (!this.deviceColumnVisible.customerName) {
        delete this.deviceColumnVisible.customerName
      }
      if (!this.deviceColumnVisible.deviceType) {
        delete this.deviceColumnVisible.deviceType
      }
      if (!this.deviceColumnVisible.enableStatus) {
        delete this.deviceColumnVisible.enableStatus
      }
      if (!this.deviceColumnVisible.groupId) {
        delete this.deviceColumnVisible.groupId
      }
      if (!this.deviceColumnVisible.groupName) {
        delete this.deviceColumnVisible.groupName
      }
      if (!this.deviceColumnVisible.id) {
        delete this.deviceColumnVisible.id
      }
      if (!this.deviceColumnVisible.lastOnlineTime) {
        delete this.deviceColumnVisible.lastOnlineTime
      }
      if (!this.deviceColumnVisible.location) {
        delete this.deviceColumnVisible.location
      }
      if (!this.deviceColumnVisible.mac) {
        delete this.deviceColumnVisible.mac
      }
      if (!this.deviceColumnVisible.manageName) {
        delete this.deviceColumnVisible.manageName
      }
      if (!this.deviceColumnVisible.modelName) {
        delete this.deviceColumnVisible.modelName
      }
      if (!this.deviceColumnVisible.modelCode) {
        delete this.deviceColumnVisible.modelCode
      }
      if (!this.deviceColumnVisible.name) {
        delete this.deviceColumnVisible.name
      }
      if (!this.deviceColumnVisible.onlineStatus) {
        delete this.deviceColumnVisible.onlineStatus
      }
      if (!this.deviceColumnVisible.powerStatus) {
        delete this.deviceColumnVisible.powerStatus
      }
      this.deviceColumnVisible.fileName = (this.name+".xlsx")
      this.deviceColumnVisible.sheetTitle = '1'
      console.log(this.deviceColumnVisible)
      exportDeviceData(this.deviceColumnVisible).then(res => {
        console.log(res.data)
      })
    },
    handleConfirm() {
      if (this.radio) {
        this.handleExport({
          deviceListQueryRequest: {
            page: 1,
            limit: this.total
          }
        })
      } else {
        this.handleExport({ deviceListQueryRequest: this.query })
      }
    }
  }
}
</script>
