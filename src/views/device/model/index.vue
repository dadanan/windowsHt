<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="modelCreateDialogVisible = true">添加</el-button>
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
          prop="model"
          label="型号"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="modelEditDialogVisible = true">编辑</el-button>
            <el-button type="text" @click="modelDelete">删除</el-button>
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
    <model-create-dialog :visible.sync="modelCreateDialogVisible"></model-create-dialog>
    <model-edit-dialog :visible.sync="modelEditDialogVisible"></model-edit-dialog>
  </div>
</template>

<script>
  import ModelCreateDialog from './components/ModelCreateDialog'
  import ModelEditDialog from './components/ModelEditDialog'
  import { fetchList } from '@/api/model'

  export default {
    components: {
      ModelCreateDialog,
      ModelEditDialog
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
        modelCreateDialogVisible: false,
        modelEditDialogVisible: false
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
      modelDelete() {
        this.$confirm('此操作将永久删除该备案机型, 是否继续?', '提示', {
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
