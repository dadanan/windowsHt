<template>
  <div>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="请输入组名" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入创建人" v-model="query.createName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="queryTeamList">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>  
      <div class="table-opts">  
        <el-button-group>
          <el-button type="primary" @click="getTrusteeship">托管</el-button>
          <el-button type="primary" @click="createDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="isClientColumnVisibleDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table :data="computeList" v-loading.body="loading" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="组ID" show-overflow-tooltip sortable v-if='clientColumnVisible.id'>
          <template slot-scope="scope">
            {{`${scope.row.createUserOpenId} ${scope.row.id}`}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="组名" show-overflow-tooltip sortable v-if='clientColumnVisible.name'>
        </el-table-column>
        <el-table-column label="组标" show-overflow-tooltip sortable v-if='clientColumnVisible.icon'>
          <template slot-scope="scope">
            <img class='table-img' :src='scope.row.icon'>
          </template>
        </el-table-column>
        <el-table-column prop="createUserNickName" label="创建者" show-overflow-tooltip sortable v-if='clientColumnVisible.createUserNickName'>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="formatDate" show-overflow-tooltip sortable v-if='clientColumnVisible.createTime'>
        </el-table-column>
        <el-table-column prop="customerName" label="客户/公众号" show-overflow-tooltip sortable v-if='clientColumnVisible.masterNickName'>
        </el-table-column>
        <el-table-column prop="masterNickName" label="归属" show-overflow-tooltip sortable v-if='clientColumnVisible.masterNickName'>
        </el-table-column>
        <el-table-column prop="masterOpenId" label="归属者OpenID" show-overflow-tooltip sortable v-if='clientColumnVisible.masterOpenId'>
        </el-table-column>
        <el-table-column label="封面" show-overflow-tooltip sortable v-if='clientColumnVisible.cover'>
          <template slot-scope="scope">
            <img class='table-img' :src='scope.row.cover'>
          </template>
        </el-table-column>
        <el-table-column prop="sceneDescription" label="介绍" show-overflow-tooltip sortable v-if='clientColumnVisible.sceneDescription'>
        </el-table-column>
        <el-table-column label="组状态" show-overflow-tooltip sortable v-if='clientColumnVisible.teamStatus'>
          <template slot-scope="scope">
            {{scope.row.teamStatus === 1 ? '普通终端组' : '托管组'}}
          </template>
        </el-table-column>
        <el-table-column label="组类型" show-overflow-tooltip sortable v-if='clientColumnVisible.teamType'>
          <template slot-scope="scope">
            {{scope.row.teamType === 1 ? '用户组' : (scope.row.teamType === 2? '联动组' :'自成组') }}
          </template>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable v-if='clientColumnVisible.deviceCount'>
        </el-table-column>
        <el-table-column label="操作" width='100'>
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[50,100,200,300]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
      <create-dialog :visible.sync="createDialogVisible" @add-data='addData'></create-dialog>
      <edit-dialog :visible.sync="editDialogVisible" @update-data='updateData' :data='editingData'></edit-dialog>
      <trusteeship-dialog :visible.sync="trusteeshipDialogVisible" :data='selectionTable'></trusteeship-dialog>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义显示列" :visible.sync="isClientColumnVisibleDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.name">名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.id">组ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.icon">组标</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.createUserNickName">创建者</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.createTime">创建时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.masterNickName">设备名/公共号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.masterOpenId">归属者OpenID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.cover">封面</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.sceneDescription">介绍</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.teamStatus">组状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.teamType">组类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.deviceCount">设备数量</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="isClientColumnVisibleDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateDialog from './CreateDialog'
import EditDialog from './EditDialog'
import TrusteeshipDialog from './TrusteeshipDialog'
import {
  queryTeamList,
  queryTeamCount,
  deleteOneTeam,
  queryTeamById
} from '@/api/device/team'
import axios from 'axios'

export default {
  data() {
    return {
      list: [],
      loading: false,
      createDialogVisible: false,
      editDialogVisible: false,
      trusteeshipDialogVisible: false,
      isClientColumnVisibleDialogVisible: false,
      editingData: {},
      clientColumnVisible: {
        id: true,
        name: true,
        icon: true,
        createUserNickName: true,
        createTime: true,
        masterNickName: true,
        cover: true,
        teamStatus: true,
        teamType: true
      },
      query: {
        limit: 50,
        page: 1,
        status: 1,
        createName:'',
        name:''
      },
      selectionTable: [],
      total: 0
    }
  },
  computed: {
    computeList() {
      return this.list.filter(item => item.status !== 2)
    }
  },
  methods: {
    reset(){
      this.query,createName = ''
      this.query,name = ''
      this.queryTeamList()
    },
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
    handleSelectionChange(selection) {
      this.selectionTable = selection
    },
    getTrusteeship() {
      if (!this.selectionTable.length) {
        this.$message.warning('请选择分组后再进行托管操作！')
        return
      }
      this.trusteeshipDialogVisible = true
    },
    queryTeamList() {
      queryTeamList(this.query).then(res => {
        this.list = res.data.filter(item => item.status === 1)
      })
    },
    queryTeamCount() {
      queryTeamCount(this.query.status).then(res => {
        this.total = res.data
      })
    },
    showEditRoleDialog(data) {
      this.getDetail(data.id)
    },
    getDetail(id) {
      queryTeamById(id).then(res => {
        this.editDialogVisible = true
        this.editingData = res.data
      })
    },
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
    deleteRow(id) {
      this.$confirm('将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOneTeam({
            teamId: id
          }).then(res => {
            this.list = this.list.filter(item => item.id !== id)
            this.$message({
              type: 'success',
              message: `删除成功！`
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.queryTeamList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.queryTeamList()
    }
  },
  created() {
    this.queryTeamCount()
    this.queryTeamList()
  },
  components: {
    CreateDialog,
    EditDialog,
    TrusteeshipDialog
  }
}
</script>


<style lang="scss">
.table-img {
  width: 100%;
}
</style>
