<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备启用" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="type" label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="typeID" label="typeID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="productDatetime" label="生产日期" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="version" label="硬件版本" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="updateDeivceEnablePart">启用选中项</el-button>
      <el-button type="primary" @click="updateDeivceEnableAll">启用全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateDeivceEnable } from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deviceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedDeviceList: []
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    updateDeivceEnablePart() {
      updateDeivceEnable({
        deviceVos: this.selectedDeviceList.map(item => {
          return {
            mac: item.mac,
            deviceId: item.id
          }
        })
      }).then(() => {
        this.$message({
          message: '启用成功！',
          type: 'success'
        })
        this.$emit('update:visible', false)
      })
    },
    updateDeivceEnableAll() {
      updateDeivceEnable({
        deviceVos: this.deviceList.map(item => {
          return {
            mac: item.mac,
            deviceId: item.id
          }
        })
      }).then(() => {
        this.$message({
          message: '启用成功！',
          type: 'success'
        })
        this.$emit('update:visible', false)
      })
    }
  }
}
</script>
