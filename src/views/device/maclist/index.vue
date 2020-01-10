<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateUserDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="dele">删除</el-button>
        </el-button-group>
      </div>
      <el-table :data="list" class="mb20" border @selection-change="handleSelectionChange"> 
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="设备ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加设备mac地址" :visible.sync="isCreateUserDialogVisible">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="查询的mac">
          <el-input v-model="mac"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isCreateUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="validate()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectList,
  deviceExport,
  deviceExportDelete
} from '@/api/device/list'

export default {
  components: {
  },
  data() {
    return {
      loading: true,
      list: [],
      total: 1,
      listQuery: { limit: 100, currentPage: 1 },
      editingData: {},
      isCreateUserDialogVisible : false,
      mac:'',
      macs:[],
      selectedDeviceList:[],
      ids:[]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    dele(){
      for(var i = 0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deviceExportDelete({valueList:this.ids}).then(res=>{
         this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
      })
    },
    validate(){
      this.macs.push(this.mac)
      deviceExport({valueList:this.macs}).then(res=>{
         if (res.code === 200) {
              this.isCreateUserDialogVisible = false
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.getList()
         }
      })
    },
    showEditRoleDialog(data) {
      this.editFunctionDialogVisible = true
      this.editingData = data
    },
    getList() {
      selectList(this.listQuery).then(res => {
        this.list = res.data.macList
        this.total = res.data.totalCount
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    }
  }
}
</script>
