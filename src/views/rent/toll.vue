<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addToll = true">添加</el-button>
          <!-- <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button> -->
          <el-button type="primary" @click="deleteDict">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-toll :visible.sync="addToll" @add-data='addData'></add-toll>
      <edit-toll :visible.sync="editToll" :data='editingData'></edit-toll>
      <deta-toll :visible.sync="detaToll"></deta-toll>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="label" label="工程资料分类名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="工程资料分类描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.updateTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="修改者" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="isDelete" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditToll(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="detaToll = true">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddToll from './components/AddToll'
import EditToll from './components/EditToll'
import DetaToll from './components/DetaToll'
import { selectList, deleteDict } from '@/api/rent'

export default {
  components: {
    AddToll,
    EditToll,
    DetaToll
  },
  data() {
    return {
      alarmList: [],
      addToll: false,
      editToll: false,
      detaToll: false,
      query: {
        limit: 100,
        page: 1,
        type: 'engineering'
      },
      total: 0,
      selectedDeviceList: [],
      ids: [],
      editingData: {}
    }
  },
  methods: {
    addData(data) {
      this.alarmList.push(data)
      this.selectList()
    },
    selectList() {
      selectList(this.query).then(res => {
        console.log(res)
        this.alarmList = res.data.dictRspPoList
        this.total = res.data.totalCount
      })
    },
    deleteDict() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteDict({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('update-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    EditToll(data){
      this.editingData = data
      this.editToll = true
    }
  },
  created() {
    this.selectList()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
