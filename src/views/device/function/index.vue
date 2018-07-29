<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="functionCreateDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="hwFunctionID"
          label="硬件功能 ID"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="rwPermissions"
          label="读写权限"
          show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.rwPermissions.map(el => rwPermissionsMap[el]).join(', ') }}
          </template>
        </el-table-column>
        <el-table-column
          label="配置方式"
          show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ writeMethodMap[scope.row.writeMethod] === undefined ? '不可配置' : writeMethodMap[scope.row.writeMethod] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="functionEditDialogVisible = true">编辑</el-button>
            <el-button type="text" @click="functionDelete">删除</el-button>
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
    <function-create-dialog :visible.sync="functionCreateDialogVisible"></function-create-dialog>
    <function-edit-dialog :visible.sync="functionEditDialogVisible"></function-edit-dialog>
  </div>
</template>

<script>
  import FunctionCreateDialog from './components/FunctionCreateDialog'
  import FunctionEditDialog from './components/FunctionEditDialog'
  import { fetchList } from '@/api/function'

  export default {
    components: {
      FunctionCreateDialog,
      FunctionEditDialog
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
        rwPermissionsMap: { 'read': '可读', 'write': '可写' },
        writeMethodMap: { 0: '不可配置', 1: '文本', 2: '多选', 3: '单选' },
        functionCreateDialogVisible: false,
        functionEditDialogVisible: false
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
      functionDelete() {
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
