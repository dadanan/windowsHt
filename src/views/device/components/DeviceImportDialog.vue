<template>
  <el-dialog top='4vh' :close-on-click-modal=false  title="设备导入" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="table-opts">
      <el-form inline class="el-form--flex">
        <div style="flex: 1;"></div>
        <el-form-item>
          <el-input v-model="file" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导入文件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="importList"
      style="width: 100%" class="mb20" border>
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
    <el-form>
      <el-form-item label="导入备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          v-model="description">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">导入选中项</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">导入全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const importList = []

      for (let i = 0; i < 5; i++) {
        importList.push({
          name: '测试设备',
          type: '测试型号',
          typeID: '1221313',
          mac: 'a2131f12',
          productDatetime: '2016-07-01',
          version: 'v1.0.0'
        })
      }
      return {
        file: '/usr/device.xsl',
        description: '',
        importList
      }
    }
  }
</script>
