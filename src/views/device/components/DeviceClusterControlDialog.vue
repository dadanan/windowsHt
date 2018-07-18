<template>
  <el-dialog title="设备群控" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="table-opts">
      <el-button-group>
        <el-button type="primary">开关</el-button>
        <el-button type="primary">启用</el-button>
        <el-button type="primary">禁用</el-button>
        <el-button type="primary">OTA</el-button>
        <el-button type="primary">中断 OTA</el-button>
      </el-button-group>
    </div>
    <el-table :data="deviceList" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="name"
        label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="typeID"
        label="Type ID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="mac"
        label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="isPowerOn"
        label="工作状态" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="isEnabled"
        label="启用状态" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="version"
        label="软件版本" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="isOnline"
        label="在线状态" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="state"
        label="操作状态" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
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
    }
  }
</script>
