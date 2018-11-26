<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addBlackList = true">添加</el-button>
          <!-- <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button> -->
          <el-button type="primary" @click="deleteDict">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-black-list :visible.sync="addBlackList" @add-data='addData'></add-black-list>
      <edit-black-list :visible.sync="editBlackList" :data='editingData'></edit-black-list>
      <deta-black-list :visible.sync="detaBlackList"></deta-black-list>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="label" label="规划分类名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="规划分类描述" show-overflow-tooltip sortable>
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
        <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.updateTime">
              {{new Date(scope.row.updateTime).toLocaleString()}}
            </template>
             <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="updateName" label="修改者" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.updateName">
              {{ scope.row.updateName }}
            </template>
             <template v-else>
              暂无修改
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="isDelete" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditBlackList(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="detaBlackList = true">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddBlackList from './components/AddBlackList'
import EditBlackList from './components/EditBlackList'
import DetaBlackList from './components/DetaBlackList'
import { selectList , deleteDict} from '@/api/rent'

export default {
  components: {
    AddBlackList,
    EditBlackList,
    DetaBlackList
  },
  data() {
    return {
      alarmList: [],
      addBlackList: false,
      editBlackList: false,
      detaBlackList: false,
      query: {
        limit: 100,
        page: 1,
        type: 'planning'
      },
      total: 0,
      selectedDeviceList: [],
      ids:[],
      editingData:{}
    }
  },
  methods: {
    addData(data) {
      this.alarmList.push(data)
      this.selectList()
    },
    selectList() {
      selectList(this.query).then(res => {
        this.alarmList = res.data.dictRspPoList
        this.total = res.data.totalCount
      })
    },
    deleteDict() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteDict({valueList:this.ids}).then(res => {
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
    EditBlackList(data){
      this.editingData = data
      this.editBlackList = true
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
