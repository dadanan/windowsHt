<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备恢复" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-card>
      <el-table :data="list" @selection-change="handleSelectionChange" style="width: 100%" highlight-current-row border>
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
      <el-button type="primary" @click="recoverDevicePart">恢复选中项</el-button>
      <!-- <el-button type="primary" @click="recoverDeviceAll">恢复全部</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import { recoverDevice } from '@/api/device/list'

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
      selectedDeviceList: [],
      list: []
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    recoverDevicePart() {
      this.$confirm('此操作将执行恢复动作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          recoverDevice({
            mac: this.selectedDeviceList[0].mac,
            deviceId: this.selectedDeviceList[0].id
          }).then(() => {
            this.$message({
              message: '恢复成功！',
              type: 'success'
            })
            this.$emit('update:visible', false)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          })
        })
    },
    recoverDeviceAll() {
      this.$confirm('此操作将执行恢复动作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          recoverDevice({
            deviceVos: this.list.map(item => {
              return {
                mac: item.mac,
                deviceId: item.id
              }
            })
          }).then(() => {
            this.$message({
              message: '恢复成功！',
              type: 'success'
            })
            this.$emit('update:visible', false)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          })
        })
    }
  },
  watch: {
    deviceList(val) {
      this.list = val.filter(item => item.status === 2)
    }
  }
}
</script>
