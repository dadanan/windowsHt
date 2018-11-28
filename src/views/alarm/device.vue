<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanCardList" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
    </el-row> -->
    <!-- <el-card class="mb20">
      <chart :options="kanbanChart" class="chart" auto-resize></chart>
    </el-card> -->
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select placeholder="选择关联" v-model="search.linkType">
              <el-option label="不关联" value="1"></el-option>
              <el-option label="关联设备" value="2"></el-option>
              <el-option label="关联工程" value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-select placeholder="告警级别" v-model="query.warnLevel">
              <el-option label="一级告警" value="1"></el-option>
              <el-option label="二级告警" value="2"></el-option>
              <el-option label="三级告警" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="query.status">
              <el-option label="禁用" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="selectList1">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddDevice = true">添加</el-button>
          <el-button type="primary" @click="forbitPlan">禁用</el-button>
          <el-button type="primary" @click="reversePlan">启用</el-button>
          <el-button type="primary" @click="deletePlan">删除</el-button>
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


import { selectList1, deletePlan, forbitPlan,reversePlan } from '@/api/alarm'
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
      // search:{
      //   warnLevel:'',
      //   limit: 100,
      //   currentPage: 1,
      //   status:1
      // },
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
      this.selectList1()
    },
    updata() {
      this.selectList1()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      this.selectList1()
    },
    selectList1() {
      selectList1(this.query).then(res => {
        console.log(res)
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
            list[i].status = '正常'
          }
          if (list[i].status == 3) {
            list[i].status = '禁用'
          }
        }
        this.alarmList = list
        this.total = res.data.totalCount
      })
    },
    deletePlan() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deletePlan({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.selectList1()
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
    forbitPlan() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      forbitPlan({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.selectList1()
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
    reversePlan() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      reversePlan({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.selectList1()
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
    this.selectList1()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
