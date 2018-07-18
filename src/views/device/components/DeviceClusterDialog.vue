<template>
  <el-dialog title="设备集群" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table
          :data="deviceList"
          style="width: 100%" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="name"
            label="名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="typeID"
            label="typeID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="mac"
            label="MAC" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
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
