<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="消息名称" v-model="query.topic"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddMessage = true">添加</el-button>
          <el-button type="primary" @click="deleteMessage">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-message :visible.sync="AddMessage" @add-data='addData'></add-message>
      <edit-message :visible.sync="EditMessage" :data="editMessageData" @add-data='addData'></edit-message>

      <el-table :data="messageList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="topic" label="标题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="内容描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" show-overflow-tooltip>
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
            <el-button type="text" @click="editMessage(scope.row)">修改</el-button>
            <el-button type="text" @click="sendMessage(scope.row)">发送消息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddMessage from './components/AddMessage'
import EditMessage from './components/EditMessage'

import { selectList ,deleteMessage ,sendMessage} from '@/api/message'
export default {
  components: {
    AddMessage,
    EditMessage
  },
  data() {
    return {
      messageList: [],
      AddMessage:false,
      EditMessage:false,
      editMessageData:{},
      activeTab: '1',
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
      this.selectList()
    },
    editMessage(val){
      this.EditMessage = true
      this.editMessageData = val
    },
    reset(){
      this.query.topic ='',
      this.selectList()
    },
    search() {
      selectList(this.query).then(res => {
        this.total = res.data.currentCount
        this.messageList = res.data.userMessageList
      })
    },
    selectList(query) {
      selectList(this.query).then(res => {
        this.total = res.data.currentCount
        this.messageList = res.data.userMessageList
      })
    },
    deleteMessage(){
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteMessage({ valueList: this.ids }).then(res => {
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
    sendMessage(val){
      sendMessage(val.id).then(res=>{
         if (res.code === 200) {
          this.selectList()
          this.$message({
            type: 'success',
            message: '发送成功!'
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
      this.selectList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectList()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
  },
  created() {
    this.selectList()
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
