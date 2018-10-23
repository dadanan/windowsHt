<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="softwareList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="首页缩图" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <img :src='scope.row.previewImg' class='table-img'>
          </template>
        </el-table-column>
        <el-table-column label="客户" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{scope.row.customerIds}}
          </template>
        </el-table-column>
        <el-table-column label="级别" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{scope.row.owerType === 1 ? '私有' : (scope.row.owerType === 2 ? '共有' : '专有')}}
          </template>
        </el-table-column>
        <el-table-column prop="htmlUrl" label="预览地址" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="version" label="版本" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[50, 100, 150, 200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="softwareList.length" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-model-dialog @add-data='addData' :visible.sync="isCreateDialogVisible"></create-model-dialog>
    <edit-model-dialog @update-data='updateData' :visible.sync="isEditDialogVisible" :data='editingData'></edit-model-dialog>
  </div>
</template>

<script>
import CreateModelDialog from './software/createDialog'
import EditModelDialog from './software/editDialog'
import { select, deleteById, selectById } from '@/api/format'
import { select as getCustomer } from '@/api/customer'

export default {
  data() {
    return {
      isCreateDialogVisible: false,
      isEditDialogVisible: false,
      userID: undefined,
      addForm: {
        roleDesc: '',
        name: ''
      },
      editingData: {}, // 当前正在编辑的角色数据
      softwareList: [],
      customers: [],
      listQuery: {
        limit: 1000,
        page: 1
      }
    }
  },
  methods: {
    addData(data) {
      this.softwareList.push(data)
    },
    showEditDialog(data) {
      this.selectById(data.id)
    },
    selectById(id) {
      selectById(id).then(res => {
        this.editingData = res.data
        this.isEditDialogVisible = true
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteById(id)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 从表格中移除此条数据
                this.softwareList = this.softwareList.filter(
                  item => item.id !== id
                )
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    updateData(data) {
      // console.log(123, data)
      this.softwareList.forEach((item, index) => {
        if (item.id === data.id) {
          this.softwareList.splice(index, 1, data)
        }
      })
    },
    getSoftwareList() {
      select({
        limit: 100,
        page: 1
      }).then(res => {
        this.softwareList = res.data
        console.log(this.softwareList)
      })
    },
     handleSizeChange(val) {
      this.listQuery.limit = val
      this.getSoftwareList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getSoftwareList()
    },
    getCustomer() {
      getCustomer({
        limit: 100,
        page: 1
      }).then(res => {
        this.customers = res.data
      })
    }
  },
  created() {
    this.getSoftwareList()
    this.getCustomer()
  },
  components: {
    CreateModelDialog,
    EditModelDialog
  }
}
</script>

<style lang="scss">
.permission-list {
  background-color: #eee;
  border: 1px solid #ddd;
}

.table-img {
  width: 100%;
}
</style>
