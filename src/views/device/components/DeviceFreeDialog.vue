<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备召回" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-table :data="deviceList" @selection-change="handleSelectionChange" highlight-current-row style="width: 100%" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="typeID" label="typeID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="callBackPart">召回选中项</el-button>
      <el-button type="primary" @click="callBackAll">召回全部</el-button>
    </div>
  </el-dialog>
</template>


<script>
import { callBackDeviceFromCustomer } from '@/api/device/list'
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
    callBackPart() {
      callBackDeviceFromCustomer({
        deviceList: this.selectedDeviceList
      }).then(() => {
        this.$emit('update:visible', false)
        this.$message({
          message: '召回成功！',
          type: 'success'
        })
      })
    },
    callBackAll() {
      callBackDeviceFromCustomer({
        deviceList: this.selectedDeviceList
      }).then(() => {
        this.$emit('update:visible', false)
        this.$message({
          message: '召回成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
