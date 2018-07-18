<template>
  <div>
    <el-dialog title="设备添加" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addDeviceDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="importList"
        style="width: 100%" class="mb20" border>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form>
        <el-form-item label="添加备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            v-model="description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="$emit('update:visible', false)">确认添加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="录入设备信息" :visible.sync="addDeviceDialogVisible">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
        <el-form-item label="typeID">
          <el-select v-model="addForm.typeID">
            <el-option label="0x21331231" value="0x21331231"></el-option>
            <el-option label="0x12123131" value="0x12123131"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MAC">
          <el-input v-model="addForm.mac"></el-input>
        </el-form-item>
        <el-form-item label="生产日期">
          <el-input v-model="addForm.productDatetime"></el-input>
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-input v-model="addForm.version"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeviceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDevice">确定</el-button>
      </div>
    </el-dialog>
  </div>
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
      return {
        file: '/usr/device.xsl',
        description: '',
        importList: [],
        addForm: {
          name: '',
          type: '',
          typeID: '',
          mac: '',
          productDatetime: '',
          version: ''
        },
        addDeviceDialogVisible: false
      }
    },
    methods: {
      addDevice() {
        this.importList.push(Object.assign({}, this.addForm))
        this.addDeviceDialogVisible = false
      },
      deleteDevice(index) {
        this.importList.splice(index, 1)
      }
    }
  }
</script>
