<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addWechat = true">添加</el-button>
          <el-button type="primary" @click ="disableDict">禁用</el-button>
          <el-button type="primary" @click="enableDict">启用</el-button>
          <el-button type="primary" @click="deleteDict">删除</el-button>
        </el-button-group>
      </div>
      <add-wechat :visible.sync="addWechat"  @add-data='addData'></add-wechat>
      <edit-wechat :visible.sync="editWechat" :data ='editingData'></edit-wechat>
      <deta-wechat :visible.sync="detaWechat" ></deta-wechat>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="label" label="实施阶段名称" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="description" label="实施阶段描述" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip >
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="updateName" label="创建者" show-overflow-tooltip >
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
        <el-table-column prop="isDelete" label="状态" show-overflow-tooltip >
          <template slot-scope="scope">
            <template v-if = "scope.row.isDelete == 0">
              启用
            </template>
            <template v-if = "scope.row.isDelete == 2">
              禁用
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="EditWechat(scope.row)">编辑</el-button>
            <!-- <el-button type="text" @click="detaWechat = true">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddWechat from './components/AddWechat'
import EditWechat from './components/EditWechat'
import DetaWechat from './components/DetaWechat'
import { selectList , deleteDict } from '@/api/rent'
import { disableDict ,enableDict } from '@/api/alarm'


export default {
  components: {
    AddWechat,
    EditWechat,
    DetaWechat
  },
  data() {
    return {
      alarmList:[],
      addWechat:false,
      editWechat:false,
      detaWechat:false,
      query:{
        limit:100,
        page:1,
        type:"implementation"
      },
      total:0,
      selectedDeviceList:[],
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
        console.log(res)
        this.alarmList = res.data.dictRspPoList
        this.total = res.data.totalCount
      })
    },
    deleteDict() {
      deleteDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.ids = []
          this.selectedDeviceList = []
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
    disableDict() {
      disableDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '禁用成功!'
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
    enableDict() {
      enableDict({valueList:this.ids}).then(res => {
        if (res.code === 200) {
          this.selectList()
          this.ids = []
          this.selectedDeviceList = []
          this.$message({
            type: 'success',
            message: '启用成功!'
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
      for(var i=0;i<this.selectedDeviceList.length;i++){
        this.ids.push(this.selectedDeviceList[i].id)
      }
      console.log(this.ids)
      // if (this.selectedDeviceList.length) {
      //   this.unassignStatus = this.selectedDeviceList[0].assignStatus
      // }
    },
    EditWechat(data){
      this.editingData = data
      this.editWechat = true
    }

  },
  created () {
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
