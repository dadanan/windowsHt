<template>
  <el-dialog title="设备召回" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-table
      :data="freeList"
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">召回选中项</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">召回全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      freeList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
