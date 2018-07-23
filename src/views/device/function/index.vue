<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加</el-button>
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
            {{ writeMethodMap[scope.row.writeMethod] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
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
    <add-dialog :visible.sync="addDialogVisible"></add-dialog>
  </div>
</template>

<script>
  import AddDialog from './components/AddDialog'
  import { fetchList } from '@/api/function'

  export default {
    components: {
      AddDialog
    },
    data() {
      // const functionList = []
      //
      // for (let i = 0; i < 15; i++) {
      //   functionList.push({
      //     id: i,
      //     name: 'PM2.5 传感器1',
      //     hwFunctionID: '11x',
      //     rwPermissions: ['read', 'write'],
      //     writeType: '0'
      //   })
      // }
      return {
        loading: true,
        list: null,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        addDialogVisible: false,
        rwPermissionsMap: { 'read': '可读', 'write': '可写' },
        writeMethodMap: { 0: '不可配置', 1: '文本', 2: '多选', 3: '单选' }
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
      }
    }
  }
</script>
