<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false  title="设备组编辑" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <d-title>组信息</d-title>
      <el-form label-width="100px" label-position="left">
        <el-form-item label="组名">
          <el-input v-model="placeholder"></el-input>
        </el-form-item>
        <el-form-item label="组标">
          <el-button type="primary">上传文件</el-button>
        </el-form-item>
        <el-form-item label="归属">
          <el-select v-model="placeholder">
            <el-option label="Placeholder1" value="1"></el-option>
            <el-option label="Placeholder2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="OpenID">
          <el-input v-model="placeholder"></el-input>
        </el-form-item>
        <el-form-item label="组管理者">
          <el-input v-model="placeholder" disabled></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-button type="primary">上传文件</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeviceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDevice">确定</el-button>
      </div>
      <d-title>组设备管理</d-title>
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
          label="添加人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="version"
          label="添加日期" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false  title="设备添加" :visible.sync="addDeviceDialogVisible">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="typeID">
          <el-select v-model="addForm.typeID">
            <el-option label="0x21331231" value="0x21331231"></el-option>
            <el-option label="0x12123131" value="0x12123131"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MAC">
          <el-input v-model="addForm.mac"></el-input>
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
  import DTitle from '@/components/Title'

  export default {
    components: {
      DTitle
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        placeholder: 'placeholder',
        importList: [],
        addForm: {
          typeID: '',
          mac: ''
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
