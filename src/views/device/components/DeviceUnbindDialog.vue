<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备解绑" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-card>
      <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" highlight-current-row border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="typeID" label="typeID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="untieDeviceToUserPart">解绑选中项</el-button>
      <el-button type="primary" @click="untieDeviceToUserAll">解绑全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { untieDeviceToUser } from '@/api/device/list'

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
    untieDeviceToUserPart() {
      this.$confirm('此操作将执行解绑动作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          untieDeviceToUser({
            deviceVos: this.selectedDeviceList.map(item => {
              return {
                mac: item.mac,
                deviceId: item.id
              }
            })
          }).then(() => {
            this.$message({
              message: '解绑成功！',
              type: 'success'
            })
            this.$emit('update:visible', false)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          })
        })
    },
    untieDeviceToUserAll() {
      this.$confirm('此操作将执行解绑动作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          untieDeviceToUser({
            deviceVos: this.deviceList.map(item => {
              return {
                mac: item.mac,
                deviceId: item.id
              }
            })
          }).then(() => {
            this.$message({
              message: '解绑成功！',
              type: 'success'
            })
            this.$emit('update:visible', false)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          })
        })
    }
  }
}
</script>
