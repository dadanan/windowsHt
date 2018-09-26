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
        <el-table-column v-for="value in columnData"
                         :label="value.label"
                         :prop="value.prop"
                         :key="value.prop"
                         :formatter="value.formatter"
                         :width="value.width"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width='200'>
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog('detail', scope.row)">查看详情</el-button>
            <el-button type="text" @click="openDialog('edit', scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="page"
                     :page-sizes="[10, 20, 50]"
                     :page-size="limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
    </el-card>
    <default-dialog :visible.sync="visible"
                    :title="title"
                    :fullscreen="fullscreen"
                    @closed="handleClosed">
      <div :is="dialogComp"
           :datas="rowData"
           @close="visible = false"></div>
    </default-dialog>
  </div>
</template>

<script>
import DefaultDialog from '@/components/DefaultDialog'
import Detail from './components/Detail'
import Create from './components/Create'
import Edit from './components/Edit'
import { tableData, columnData, dialogDatas } from './cluster.js'
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
      clusterList: tableData(),
      columnData: columnData,
      loading: false,
      dialogComp: '',
      visible: false,
      fullscreen: false,
      title: '',
      rowData: {},
      page: 1,
      limit: 10,
      total: 0
    }
  },
  created() {
    this.queryGroupByPage()
    this.queryGroupCount()
  },
  methods: {
    queryGroupByPage() {
      queryGroupByPage({
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.clusterList = res.data
        }
      })
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
            .catch(err => {
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
      queryGroupCount().then(res => {
        if (res.code === 200) {
          this.total = res.data
        }
      })
    }
  }
}
</script>
