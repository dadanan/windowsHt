<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警级别" v-model="query.warnLevel">
              <el-option label="一级告警" value="1"></el-option>
              <el-option label="二级告警" value="2"></el-option>
              <el-option label="三级告警" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="query.status">
              <el-option label="禁用" value="3"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="planModel">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddDevice = true">添加</el-button>
          <el-button type="primary" @click="forbitPlanModel">禁用</el-button>
          <el-button type="primary" @click="reversePlanModel">启用</el-button>
          <el-button type="primary" @click="deletePlanModel">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-device :visible.sync="AddDevice" @add-data='addData'></add-device>
      <create-device :visible.sync="CreateDevice" :data='editingData' @updata-data='updata'></create-device>
      <details-device :visible.sync="DetailsDevice" :data='editingData' @updata-data='updata'></details-device>

      <el-table :data="alarmList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="计划名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="计划描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="linkType" label="选择关联" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="isRule" label="是否规则内" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.isRule == 1'>
              是
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="warnLevel" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="createDevice(scope.row)">修改</el-button>
            <el-button type="text" @click="detailsDevice(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddDevice from './components/AddDevice'
import CreateDevice from './components/CreateDevice'
import DetailsDevice from './components/DetailsDevice'
import { planModel, deletePlanModel, forbitPlanModel,reversePlanModel } from '@/api/alarm'
export default {
  components: {
    AddDevice,
    CreateDevice,
    DetailsDevice
  },
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      alarmList: [],
      query: {
        limit: 100,
        currentPage: 1
      },
      total: 0,
      AddDevice: false,
      CreateDevice: false,
      DetailsDevice:false,
      selectedDeviceList: [],
      ids: [],
      editingData: {}
    }
  },
  methods: {
    addData(data) {
      this.alarmList.push(data)
      this.planModel()
    },
    updata() {
      this.planModel()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      // this.query.linkType = ''
      this.planModel()
    },
    planModel() {
      planModel(this.query).then(res => {
        // console.log(res)
        const list = res.data.planRspPoList
        const mapList = {
          '1': '一级告警',
          '2': '二级告警',
          '3': '三级告警'
        }
        const linkList = {
          '0': '不关联',
          '1': '关联设备',
          '2': '关联工程'
        }
        for (var i = 0; i < list.length; i++) {
          list[i].warnLevel = mapList[list[i].warnLevel]
          list[i].linkType = linkList[list[i].linkType]
          if (list[i].status == 1) {
            list[i].status = '启用'
          }
          if (list[i].status == 3) {
            list[i].status = '禁用'
          }
        }
        this.alarmList = list
        this.total = res.data.totalCount
      })
    },
    deletePlanModel() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deletePlanModel({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.ids =[]
          this.planModel()
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
    forbitPlanModel() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      forbitPlanModel({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.ids =[]
          this.planModel()
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    reversePlanModel() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      reversePlanModel({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.ids =[]
          this.planModel()
          this.$message({
            type: 'success',
            message: '禁用成功!'
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
      this.selectList1()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.selectList1()
    },
    createDevice(data) {
      this.editingData = data
      this.CreateDevice = true
    },
    detailsDevice(data) {
      this.editingData = data
      this.DetailsDevice = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    }
  },
  created() {
    this.planModel()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
