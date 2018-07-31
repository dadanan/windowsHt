<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="createConfigDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="缩图">
          <template slot-scope="scope">
            <img :src="scope.row.pic" :alt="scope.row.name" class="block">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="typeId"
          label="TypeID"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          label="功能项"
          show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.functionList.map(el => el.name).join(', ') }}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="description"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="user"
          label="创建者"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="owner"
          label="归属"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="editConfigDialogVisible = true">编辑</el-button>
            <el-button type="text">删除</el-button>
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
    <create-config-dialog :visible.sync="createConfigDialogVisible"></create-config-dialog>
    <edit-config-dialog :visible.sync="editConfigDialogVisible"></edit-config-dialog>
  </div>
</template>

<script>
  import CreateConfigDialog from './components/CreateConfigDialog'
  import EditConfigDialog from './components/EditConfigDialog'
  import { fetchList } from '@/api/device/config'

  export default {
    components: {
      CreateConfigDialog,
      EditConfigDialog
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
        createConfigDialogVisible: false,
        editConfigDialogVisible: false
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
