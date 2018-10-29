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
        <el-table-column prop="abilityName" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="类型(标签)" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{typeModel[scope.row.abilityType]}}
          </template>
        </el-table-column>
        <el-table-column label="运行状态" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.runStatus === 1 ? '可运行' : '不可运行' }}
          </template>
        </el-table-column>
        <el-table-column label="读写权限" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.readStatus === 1 ? '可读' : '不可读'}} {{ scope.row.writeStatus === 1 ? '、可写' : '、不可写'}}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="指令" prop="dirValue" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteFunction(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[10, 20, 30,40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-function-dialog :visible.sync="createFunctionDialogVisible" @add-data='addData'></create-function-dialog>
    <edit-function-dialog :visible.sync="editFunctionDialogVisible" @update-data='updateData' :data='editingData'></edit-function-dialog>
  </div>
</template>

<script>
import CreateFunctionDialog from './components/CreateFunctionDialog'
import EditFunctionDialog from './components/EditFunctionDialog'
import { fetchList, deleteAbility, selectCount } from '@/api/device/function'

export default {
  components: {
    CreateFunctionDialog,
    EditFunctionDialog
  },
  data() {
    return {
      loading: true,
      list: [],
      total: 1,
      listQuery: { limit: 10, page: 1, status: 1 },
      permissionListMap: { r: '可读', w: '可写' },
      createFunctionDialogVisible: false,
      editFunctionDialogVisible: false,
      editingData: {},
      typeModel: {
        1: '文本类',
        2: '单选类',
        3: '多选类',
        4: '阈值类',
        5: '阈值选择类'
      }
    }
  },
  created() {
    this.getList()
    this.selectCount()
  },
  methods: {
    addData(data) {
      this.list.push(data)
    },
    updateData(data) {
      this.list.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    showEditRoleDialog(data) {
      this.editFunctionDialogVisible = true
      this.editingData = data
    },
    getList() {
      this.loading = true
      fetchList(this.listQuery).then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    selectCount() {
      this.loading = true
      selectCount(this.listQuery.status).then(res => {
        this.total = res.data
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
    deleteFunction(id) {
      this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteAbility(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 从表格中移除此条数据
              this.list = this.list.filter(item => item.id !== id)
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
