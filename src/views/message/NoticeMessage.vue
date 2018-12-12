<template>
  <div class="dashboard-container">
    <el-card>
       <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="deleteMessage">删除</el-button>
        </el-button-group>
      </div>
      <edit-message-log :visible.sync="EditMessageLog" :data="editMessageData" @add-data='addData'></edit-message-log>
      <el-table :data="messageList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="topic" label="标题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="内容描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createUser" label="创建人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.createTime'>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="readStatus" label="消息状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if='scope.row.readStatus == 1'>
              未读
            </template>
            <template v-else>
             已读
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if='scope.row.status == 1'>
              正常
            </template>
            <template v-else>
             删除
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editMessage(scope.row)">查询</el-button>
            <el-button type="text" @click="read(scope.row)">标记已读</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import EditMessageLog from './components/EditMessageLog'

import { logSelectList ,read ,deleteMessageLog } from '@/api/message'
export default {
  components: {
    EditMessageLog
  },
  data() {
    return {
      messageList: [],
      EditMessageLog:false,
      editMessageData:{},
      query: {
        limit: 100,
        currentPage: 1
      },
      total: 0,
      selectedDeviceList:[],
      ids:[]
    }
  },
  methods: {
    addData(){
      this.logSelectList()
    },
    editMessage(val){
      this.EditMessageLog = true
      this.editMessageData = val
    },
    logSelectList() {
      logSelectList(this.query).then(res => {
        this.total = res.data.currentCount
        this.messageList = res.data.userMessageList
      })
    },
    deleteMessage(){
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteMessageLog({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.ids =[]
          this.selectList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    read(val) {
      read(val.id).then(res => {
        if (res.code === 200) {
          this.logSelectList()
          this.$message({
            type: 'success',
            message: '标记成功!'
          })
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
      this.logSelectList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.logSelectList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
  },
  created() {
    this.logSelectList()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 230px;
  width: 100%;
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    padding-top: 20px;
    font-size: 50px;
  }
}
</style>
