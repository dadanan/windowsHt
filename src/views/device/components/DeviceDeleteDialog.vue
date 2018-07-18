<template>
  <el-dialog title="设备删除" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-table
      :data="deleteList"
      style="width: 100%" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="name"
        label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="type"
        label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="typeID"
        label="typeID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="mac"
        label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="productDatetime"
        label="生产日期" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="version"
        label="硬件版本" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
    <div class="alert-text">* 警示文字描述</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">删除选中项</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">删除全部</el-button>
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
      deleteList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>
