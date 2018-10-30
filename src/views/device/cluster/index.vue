<template>
  <div>
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="openDialog('create')">添加
          </el-button>
        </el-button-group>
      </div>
      <el-table :data="clusterList" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="introduction" label="介绍" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="location" label="地点" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="introduction" label="项目介绍" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="创建时间" :formatter="formatDate" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.createTime).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="创建人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip s>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width='200'>
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog('detail', scope.row)">查看详情</el-button>
            <el-button type="text" @click="openDialog('edit', scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="page" :page-sizes="[50,100,200,300]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
    </el-card>
    <default-dialog :visible.sync="visible" :title="title" :fullscreen="fullscreen" @closed="handleClosed">
      <div :is="dialogComp" :datas="rowData" @close="visible = false" @update="handleUpdate"></div>
    </default-dialog>
  </div>
</template>

<script>
import DefaultDialog from '@/components/DefaultDialog'
import Detail from './components/Detail'
import Create from './components/Create'
import Edit from './components/Edit'
import { columnData, dialogDatas } from './cluster.js'
import {
  queryGroupByPage,
  deleteGroupById,
  queryGroupCount
} from '@/api/device/cluster'
export default {
  components: {
    DefaultDialog,
    detail: Detail,
    create: Create,
    edit: Edit
  },
  data() {
    return {
      addDialogVisible: false,
      clusterList: [],
      columnData: columnData,
      loading: false,
      dialogComp: '',
      visible: false,
      fullscreen: false,
      title: '',
      rowData: {},
      page: 1,
      limit: 50,
      total: 0,
      status: 1
    }
  },
  created() {
    this.queryGroupByPage()
    this.queryGroupCount()
  },
  methods: {
    formatDate(row) {
      let date = new Date(parseInt(row.createTime))
      let Y = date.getFullYear() + '-'
      let M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1) + '-'
          : date.getMonth() + 1 + '-'
      let D =
        date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h =
        date.getHours() < 10
          ? '0' + date.getHours() + ':'
          : date.getHours() + ':'
      let m =
        date.getMinutes() < 10
          ? '0' + date.getMinutes() + ':'
          : date.getMinutes() + ':'
      let s =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    queryGroupByPage() {
      queryGroupByPage({
        page: this.page,
        limit: this.limit,
        status: 1
      }).then(res => {
        if (res.code === 200) {
          this.clusterList = res.data // status:1.正常；2.已删除
        }
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.queryGroupByPage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryGroupByPage()
    },
    handleUpdate(data) {
      const index = this.clusterList.findIndex(v => v.id === data.id)
      index !== -1
        ? this.clusterList.splice(index, 1, data)
        : (this.clusterList = [data, ...this.clusterList])

      this.visible = false
      this.handleClosed()
    },
    deleteRow(id) {
      this.$confirm('将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteGroupById(id)
            .then(res => {
              this.clusterList = this.clusterList.filter(item => item.id !== id)
              this.$message({
                type: 'success',
                message: `删除成功！`
              })
            })
            .catch(err => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    openDialog(comp, data) {
      this.title = dialogDatas[comp].title
      this.rowData = data
      this.dialogComp = comp
      if (comp === 'detail') {
        this.fullscreen = true
      }

      this.$nextTick(() => {
        this.visible = true
      })
    },
    handleClosed() {
      this.fullscreen = false
      this.dialogComp = ''
    },
    queryGroupCount() {
      queryGroupCount(this.status).then(res => {
        if (res.code === 200) {
          this.total = res.data
        }
      })
    }
  }
}
</script>
