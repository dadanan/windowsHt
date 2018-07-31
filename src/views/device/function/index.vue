<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="createFunctionDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="functionId"
          label="硬件功能 ID"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          label="读写权限"
          show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.permissionList.map(el => permissionListMap[el]).join(', ') }}
          </template>
        </el-table-column>
        <el-table-column
          label="配置方式"
          show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.config === undefined ? '不可配置' : configTypeMap[scope.row.config.type] }}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="description"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="editFunctionDialogVisible = true">编辑</el-button>
            <el-button type="text" @click="deleteFunction">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-function-dialog :visible.sync="createFunctionDialogVisible"></create-function-dialog>
    <edit-function-dialog :visible.sync="editFunctionDialogVisible"></edit-function-dialog>
  </div>
</template>

<script>
  import CreateFunctionDialog from './components/CreateFunctionDialog'
  import EditFunctionDialog from './components/EditFunctionDialog'
  import { fetchList } from '@/api/device/function'

  export default {
    components: {
      CreateFunctionDialog,
      EditFunctionDialog
    },
    data() {
      return {
        loading: true,
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        permissionListMap: { 'r': '可读', 'w': '可写' },
        configTypeMap: { 1: '文本', 2: '多选', 3: '单选' },
        createFunctionDialogVisible: false,
        editFunctionDialogVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.loading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      deleteFunction() {
        this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
