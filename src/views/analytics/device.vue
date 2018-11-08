<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#58D68D' }"></data-card>
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
        <el-form :inline="true" :model="form" ref="form" class="el-form--flex">
          <el-form-item>
            <el-select v-model="form.type" placeholder="搜索条件">
              <el-option label="类型" value="1"></el-option>
              <el-option label="用户" value="2"></el-option>
              <el-option label="运营者" value="3"></el-option>
              <el-option label="区域" value="4"></el-option>
              <el-option label="全部" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.keywords" placeholder="搜索关键词"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.date" placeholder="搜索范围">
              <el-option label="7 天" value="1"></el-option>
              <el-option label="30 天" value="2"></el-option>
              <el-option label="全部" value="3"></el-option>
            </el-select>
          </el-form-item>
          <div style="flex: 1;"></div>
          <el-form-item>
            <el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="user" label="用户">
        </el-table-column>
        <el-table-column prop="onlineState" label="在线状态">
        </el-table-column>
        <el-table-column prop="powerState" label="使用状态">
        </el-table-column>
        <el-table-column prop="alarmState" label="告警状态">
        </el-table-column>
      </el-table>
      <div class="excel-container">
        <!-- <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination> -->
        <el-button type="primary">导出 Excel</el-button>
      </div>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑看板" :visible.sync="dialogEditKanbanVisible" class="kanban-edit">
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
        <el-button @click="dialogEditKanbanVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogEditKanbanVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import DTitle from '@/components/Title'
import {modelPercent,selectDeviceCount ,newDeviceCountOfToday,queryHomePageStatistic} from '@/api/big-picture-mode/bigPictureMode'
import { developData, developDataT } from '../dashboardData'

export default {
  components: {
    DataCard,
    DTitle
  },
  data() {
    const mockData = []
    // for (let i = 0; i < 15; i++) {
    //   mockData.push({
    //     type: '测试类型',
    //     name: '测试设备',
    //     user: '测试用户',
    //     onlineState: '离线',
    //     powerState: '关机',
    //     alarmState: '无'
    //   })
    // }
    return {
      fakeData: false, // 是否切换为虚假数据
      kanbanData:developDataT,
      dialogEditKanbanVisible: false,
      form: {
        type: '',
        keywords: '',
        date: ''
      },
      tableData: mockData,
      addPercent: [],
      userCount: [],
      addCount: [],
      devAddCount: [],
      devAddPercent: [],
      deviceCount: [],
      devedata: [],
      newDeviceCount: '',
      ttt:false,
      status: 1
    }
  },
  created () {
    this.init()
    this.selectDeviceCount()
    this.modelPercent()
    this.newDeviceCountOfToday()
    // this.queryCount()
  },
  methods: {
    search() {},
    resetForm() {
      this.$refs.form.resetFields()
    },
    init() {
      this.selectDeviceCount()
      this.modelPercent()
      this.newDeviceCountOfToday()
      this.queryHomePageStatistic()
    },
    test() {
      this.fakeData = !this.fakeData
      if (this.fakeData) {
        this.kanbanData = developData
      } else {
        this.kanbanData = developDataT
        this.init()
      }
    },
    // 查询首页数据
    queryHomePageStatistic() {
      queryHomePageStatistic().then(res => {
        const data = res.data
        const dataAnalysis = this.kanbanData.数据展示
        dataAnalysis[0].value = data.deviceTotalCount //设备总数
        dataAnalysis[1].value = data.todayDeviceAddCount //今日设备新增数
        dataAnalysis[3].value = data.todayDeviceBugCount //今日设备故障数
        dataAnalysis[4].value = Number(data.deviceOnlinePercent) //今日设备在线率
      })
    },
    // 每月新增设备统计
    selectDeviceCount() {
      selectDeviceCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.devAddCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.devAddPercent.push(0)
          } else {
            this.devAddPercent.push(res.data[i].addPercent.substring(0, 3))
          }
          this.deviceCount.push(res.data[i].deviceCount)
        }
        this.kanbanData.图表展示[0].options.series[0].data = this.deviceCount
        this.kanbanData.图表展示[0].options.series[1].data = this.deviceCount
      })
    },
    // 设备类型统计
    modelPercent() {
      modelPercent().then(res => {
        for(var i = 0; i<res.data.length;i++){
          this.devedata.push({value:((res.data[i].modelPercent).substring(0, 2)),name:res.data[i].modelName})
        }
        this.kanbanData.图表展示[3].options.series[0].data = this.devedata
      })
    },
    // 今日新增设备统计
    newDeviceCountOfToday() {
      newDeviceCountOfToday().then(res => {
       this.kanbanData.数据展示[1].value = res.data
      })
    },
    // 设备总数
    queryCount() {
      queryCount(this.status).then(res => {
        this.kanbanData.数据展示[0].value= res.data
      })
    },
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
