<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" class="btn" :sm="6" :lg="8">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
            <h2>11</h2>
            <p>工程总数</p>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <h2>290</h2>
            <p>设备总数</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="8">
        <chart :options="kanbanChart" class="chart" auto-resize></chart>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="8">
        <chart :options="kanbanChart2" class="chart" auto-resize></chart>
      </el-col>
    </el-row>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="工程编号"></el-input>
            <!-- <el-select placeholder="工程编号" :value='value1'>
                            <el-option label="工程名字" value="1"></el-option>
                            <el-option label="设备序列号" value="2"></el-option>
                            <el-option label="设备名称" value="3"></el-option>
                            <el-option label="投放点" value="4"></el-option>
                        </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-input placeholder="工程名字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="工程建设时间"></el-input>
            <!-- <el-select placeholder="工程建设时间" :value='value2'>
                            <el-option label="预留布尔值故障" value="1"></el-option>
                            <el-option label="滤网到期提醒" value="2"></el-option>
                            <el-option label="PM 2.5 数值丢失报警" value="3"></el-option>
                            <el-option label="设备移开 1000 米报警" value="4"></el-option>
                        </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-input placeholder="工程地址"></el-input>
            <!-- <el-select placeholder="工程地址" :value='value3'>
                            <el-option label="未修复" value="1"></el-option>
                            <el-option label="已修复" value="2"></el-option>
                        </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-menu" @click="switchs"></el-button>
        </el-button-group>
        <div style="flex: 1;"></div>
        <el-button-group>
          <el-button type="primary" @click="AddMessage = true">添加</el-button>
          <el-button type="primary">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-means :visible.sync="AddMeans" :data ='editingData'></add-means>
      <add-message :visible.sync="AddMessage" :data ='editingData' @add-data='addData'></add-message>
      <create-message :visible.sync="CreateMessage" :data ='editingData' @add-data='addData'></create-message>
      <project-details :visible.sync="ProjectDetails"></project-details>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border v-if="list">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="projectNo" label="工程编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="工程名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="工程描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="buildTime" label="工程建设时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.buildTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="buildAddress" label="工程建设地址" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="projectCount" label="项目数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addMeans(scope.row)">实施</el-button>
            <el-button type="text" @click="createMessage(scope.row)">修改</el-button>
            <el-button type="text" @click="ProjectDetails = true">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import AddMeans from './components/AddMeans'
import AddMessage from './components/AddMessage'
import CreateMessage from './components/CreateMessage'
import ProjectDetails from './components/ProjectDetails'
import { EngList } from '@/api/alarm'

export default {
  components: {
    DataCard,
    AddMeans,
    AddMessage,
    ProjectDetails,
    CreateMessage
  },
  data() {
    return {
      AddMeans: false,
      AddMessage: false,
      ProjectDetails: false,
      CreateMessage:true,
      alarmList: [],
      editingData:{},
      activeTab: '1',
      list: true,
      value1: '',
      value2: '',
      value3: '',
      query: {
        limit: 100,
        page: 1
      },
      total: 0,
      kanbanChart2: {
        title: {
          text: '工程量趋势图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['2018-03', '2018-04', '2018-05', '2018-06', '2018-07']
        },
        yAxis: {},
        series: [
          {
            name: '增长趋势',
            data: [2, 54, 32, 18, 20],
            type: 'line'
          }
        ]
      },
      kanbanChart: {
        title: {
          text: '各地工程量TOP5'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['普陀区', '嘉定区', '建邺区', '朝阳区', '东城区'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '占比',
            type: 'bar',
            barWidth: '60%',
            data: [390, 330, 200, 100, 50]
          }
        ]
      }
    }
  },
  methods: {
    addData(val){
      this.EngList()
    },
    switchs() {
      this.list = !this.list
    },
    EngList() {
      EngList(this.query).then(res => {
        console.log(res.data)
        this.alarmList = res.data.projectRspPoList
        this.total = res.data.totalCount
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
    addMeans(val){
      this.AddMeans = true
      this.editingData = val
    },
    createMessage(val){
      this.CreateMessage = true
      this.editingData = val
    }
  },
  created() {
    this.EngList()
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
