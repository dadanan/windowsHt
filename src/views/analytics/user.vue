<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="isEditKanbanDialogVisible = true">编辑看板</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#5DADE2' }"></data-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :lg="12" v-for="item in kanbanData.图表展示" :key="item.id" v-if="item.isVisible">
        <el-card class="mb20">
          <chart :options="item.options" v-if="item.isVisible" class="chart" auto-resize></chart>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select v-model="form.type" placeholder="搜索条件">
              <el-option label="用户名" value="1"></el-option>
              <el-option label="区域" value="2"></el-option>
              <el-option label="设备型号" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type == 1">
            <el-input v-model="query.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item v-if="form.type == 2">
            <el-input v-model="query.location" placeholder="请输入区域"></el-input>
          </el-form-item>
          <el-form-item v-if="form.type == 3">
            <el-input v-model="query.modelName" placeholder="请输入设备型号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column prop="nickname" label="用户名">
        </el-table-column>
        <el-table-column prop="region" label="区域">
        </el-table-column>
        <el-table-column prop="typeName" label="设备类型">
        </el-table-column>
        <el-table-column prop="modelName" label="设备型号">
        </el-table-column>
        <el-table-column prop="lastVisitTime" label="最后操作时间">
          <template slot-scope="scope">
            {{new Date(scope.row.lastVisitTime).toLocaleString()}}
          </template>
        </el-table-column>
      </el-table>
      <div class="excel-container">
        <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <el-button type="primary">导出 Excel</el-button>
      </div>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑看板" :visible.sync="isEditKanbanDialogVisible" class="kanban-edit">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="数据展示">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="图表展示">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.图表展示" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if='!fakeData' @click="test">切换测试数据</el-button>
        <el-button v-else @click="test">切换真实数据</el-button>
        <el-button @click="isEditKanbanDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isEditKanbanDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import DTitle from '@/components/Title'
import {selectCustomerUserCount,queryHomePageStatistic,selectCustomerUser,selectLiveCustomerUserCountPerMonth} from '@/api/big-picture-mode/bigPictureMode'
import { userData, userDataT } from '../dashboardData'
export default {
  components: {
    DataCard,
    DTitle
  },
  data() {
    const mockData = []
    // for (let i = 0; i < 15; i++) {
    //   mockData.push({
    //     name: '测试用户',
    //     pos: '测试区域',
    //     deviceType: '测试类型',
    //     deviceSN: '0TRQCFGA',
    //     updateDatetime: '2018-06-01'
    //   })
    // }
    return {
      fakeData: false, // 是否切换为虚假数据
      kanbanData:userDataT,
      isEditKanbanDialogVisible: false,
      form: {
        type: "1",
      },
      query:{
        limit:100,
        page:1
      },
      total:0,
      tableData: [],
      addPercent: [],
      userCount: [],
      addCount: [],
      devAddCount: [],
      devAddPercent: [],
      deviceCount: [],
      devedata: [],
      newDeviceCount: '',
      countPerMonth:[],
      countPerMonthData:[]
    }
  },
  methods: {
    search() {
      this.selectCustomerUser()
    },
    resetForm() {
      this.query.modelName = ''
      this.query.userName = ''
      this.query.location = ''
      this.form.type = "1"
    },
    init() {
      this.selectCustomerUserCount()
      this.queryHomePageStatistic()
      this.selectCustomerUser()
      this.selectLiveCustomerUserCountPerMonth()

    },
    test() {
      this.fakeData = !this.fakeData
      if (this.fakeData) {
        this.kanbanData = userData
      } else {
        this.kanbanData = userDataT
        this.init()
      }
    },
    selectCustomerUser() {
      // 用户列表
      selectCustomerUser(this.query).then(res => {
        const data = res.data.dataList
        this.tableData = data
        this.total = res.data.totalCount
        for(var i = 0;i<data.length;i++){
          this.tableData[i].region = (data[i].province+","+data[i].city)
        }
      //  console.log(res)
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectCustomerUser()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectCustomerUser()
    },
    queryHomePageStatistic() {
      // 查询首页数据
      queryHomePageStatistic().then(res => {
        const data = res.data
        const userAnalysis = this.kanbanData.数据展示
        userAnalysis[0].value = data.totalUserCount //用户总数
        userAnalysis[2].value = data.todayUserLiveCount //活跃数
      })
    },
    selectLiveCustomerUserCountPerMonth() {
      // 每月活跃用户统计
      selectLiveCustomerUserCountPerMonth().then(res => {
        const data = res.data
        for (let i = 0; i < data.length; i++) {
          this.countPerMonth.push(data[i].month)
          this.countPerMonthData.push(data[i].userLiveCount)
        }
        const userAnalysis = this.kanbanData.图表展示[1].options
        userAnalysis.xAxis.data = this.countPerMonth
        userAnalysis.series[0].data = this.countPerMonthData
        userAnalysis.series[1].data = this.countPerMonthData
      })
    },
    // 每月新增用户统计
    selectCustomerUserCount() {
      selectCustomerUserCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.addCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.addPercent.push(0)
          } else {
            this.addPercent.push(res.data[i].addPercent.substring(0, 3))
          }
          this.userCount.push(res.data[i].userCount)
        }
        const userC = this.kanbanData.图表展示[0].options.series
        userC[0].data = this.userCount
        userC[1].data = this.userCount
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>

<style lang="scss">
.kanban-edit {
  .el-checkbox {
    margin-right: 30px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
}
</style>
