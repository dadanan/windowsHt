<template>
  <el-dialog class='sharelist-container' :close-on-click-modal=false title="授权管理" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="name" label="头像" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <img class='inside-image' :src='scope.row.img'>
        </template>
      </el-table-column>
      <el-table-column label="管理" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.useful" active-text="启用" inactive-text="禁用">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <el-button type='danger' @click='deleteUser'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button-group>
      <el-button type="primary">全部许可</el-button>
      <el-button type="primary">全部禁用</el-button>
    </el-button-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible',false)">关闭</el-button>
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

<style lang="scss" scoped>
.sharelist-container {
  .inside-image {
    width: 100%;
  }
}
</style>
