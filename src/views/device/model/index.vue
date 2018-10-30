<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="createModelDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="typeNo" label="类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="缩图">
          <template slot-scope="scope">
            <img class='table-inside-image block' :src="scope.row.icon" :alt="scope.row.name">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="source" label="来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="功能项" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{ scope.row.deviceTypeAbilitys.map(el => el.abilityName).join('、') }}
          </template>
        </el-table-column>
        <el-table-column prop='stopWatch' label="码表" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteModel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[50,100,200,300]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-model-dialog @add-data='addData' :visible.sync="createModelDialogVisible"></create-model-dialog>
    <edit-model-dialog @update-data='updateData' :visible.sync="editModelDialogVisible" :abilityList='abilityList' :data='editingData'></edit-model-dialog>
  </div>
</template>

<script>
import CreateModelDialog from './components/CreateModelDialog'
import EditModelDialog from './components/EditModelDialog'
import {
  fetchList,
  selectCount,
  deleteDeviceType,
  selectById
} from '@/api/device/type'
import { fetchList as fetchAbilityList } from '@/api/device/function'

export default {
  components: {
    CreateModelDialog,
    EditModelDialog
  },
  data() {
    return {
      loading: true,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 50,
        status: 1
      },
      createModelDialogVisible: false,
      editModelDialogVisible: false,
      editingData: {},
      abilityList: []
    }
  },
  created() {
    this.getList()
    this.selectCount()
    this.fetchAbilityList()
  },
  methods: {
    fetchAbilityList() {
      fetchAbilityList({
        page: 1,
        limit: 1000
      }).then(res => {
        res.data.forEach(item => {
          item.isChecked = false
        })
        this.abilityList = res.data
      })
    },
    showEditRoleDialog(data) {
      this.selectById(data.id)
    },
    addData(data) {
      this.list.push(data)
    },
    selectById(id) {
      selectById(id).then(res => {
        this.editModelDialogVisible = true
        this.editingData = res.data
      })
    },
    updateData(data) {
      this.list.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    getList() {
      this.loading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.loading = false
      })
    },
    selectCount() {
      this.loading = true
      selectCount(this.listQuery.status).then(response => {
        this.total = response.data
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
    deleteModel(id) {
      this.$confirm('此操作将永久删除该备案机型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDeviceType(id).then(res => {
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

<style>
.table-inside-image {
  width: 100%;
}
</style>
