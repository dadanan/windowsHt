<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="导出设备列表" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form>
      <el-form-item label="导出方式">
        <el-radio-group v-model="radio">
          <el-radio :label="0">导出当前页</el-radio>
          <el-radio :label="1">导出全部</el-radio>
        </el-radio-group>
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
      radio: 0
    }
  },
  methods: {
    handleExport(query) {
      console.log(this.deviceColumnVisible)
      this.deviceColumnVisible.limit = query.deviceListQueryRequest.limit
      this.deviceColumnVisible.page = query.deviceListQueryRequest.page
      for(var i = 0; i<this.deviceColumnVisible.length;i++){
      }
      exportDeviceData({
        ...this.deviceColumnVisible,
        // ...query,
        fileName: '设备列表.xlsx',
        sheetTitle: 'Sheet1'
      }).then(res => {
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
