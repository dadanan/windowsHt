<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanCardList" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
    </el-row>
    <el-card class="mb20">
      <chart :options="kanbanChart" class="chart" auto-resize></chart>
    </el-card> -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6" :lg="5">
        <el-tabs class="btn" tabPosition="left" v-model="activeTab" type="card" style="height:230px">
          <el-tab-pane label="全部" name="1">
            <h2>0</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="近七日" name="2">
            <h2>0</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="当月" name="3">
            <h2>0</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="近三个月" name="4">
            <h2>0</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="当年" name="5">
            <h2>0</h2>
            <p>告警总数</p>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="7">
        <chart :options="kanbanChart1" class="chart" auto-resize></chart>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <chart :options="kanbanChart" class="chart" auto-resize></chart>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <chart :options="kanbanChart2" class="chart" auto-resize></chart>
      </el-col>
    </el-row>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="按工程名称搜索" v-model="query.name"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select placeholder="选择关联" v-model="query.linkType">
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
            <el-select placeholder="状态" v-model="query.flowStatus">
              <el-option label="待分配" value="1"></el-option>
              <el-option label="待审核" value="2"></el-option>
              <el-option label="待处理" value="3"></el-option>
              <el-option label="待归档" value="4"></el-option>
              <el-option label="完成" value="5"></el-option>
              <el-option label="忽略" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="queryWarnJob">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- CreateLevel -->
     <create-level :visible.sync="CreateLevel" :data='editingDataCre' @add-data='addData'></create-level>
      <ignore-level :visible.sync="IgnoreLevel" :data='editingData' @add-data='addData'></ignore-level>
      <deal-level :visible.sync="DealLevel" :data='editingData'></deal-level>
      <sub-deal-level :visible.sync="SubDealLevel" :data='editingDatas' @add-data='addData'></sub-deal-level>
      <dis-deal-level :visible.sync="DisDealLevel" :data='editingDataa' @add-data='addData'></dis-deal-level>
      <jud-deal-level :visible.sync="JudDealLevel" :data='editingDataj' @add-data='addData'></jud-deal-level>
      <arc-deal-level :visible.sync="ArcDealLevel" :data='editingDatal' @add-data='addData'></arc-deal-level>
      <audit-deal-level :visible.sync="AuditDealLevel" :data='editingDataD' @add-data='addData'></audit-deal-level>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="任务描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="type" label="选择关联" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.type == "关联工程"'>
              {{scope.row.linkProjectName}}
            </template>
            <template v-else>
              {{scope.row.type}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="projectTypeName" label="所属系统" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ruleName" label="维保项目名称" show-overflow-tooltip sortable>
          <!-- <template slot-scope="scope">
            <template v-if='scope.row.isRule == 1'>
              是
            </template>
            <template v-else>
              否
            </template>
          </template> -->
        </el-table-column>
        <el-table-column prop="warnLevel" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="sourceType" label="任务来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="finalTime" label="到期处理日" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.finalTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="flowStatus" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.flowStatus == '待分配'">
              <template v-if = "scope.row.editEnable">
                <el-button type="text" @click="ignoreLevel(scope.row)">忽略</el-button>
                <el-button type="text" @click="disDealLevel(scope.row)">分配</el-button>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
            <template v-else-if="scope.row.flowStatus == '待审核'">
              <template v-if = "scope.row.editEnable">
                <el-button type="text" @click="judDealLevel(scope.row)">派工审核</el-button>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
            <template v-else-if="scope.row.flowStatus == '待处理'">
              <template v-if = "scope.row.editEnable">
                <el-button type="text" @click="subDealLevel(scope.row)">提交归档</el-button>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
            <template v-else-if="scope.row.flowStatus == '待归档'">
              <template v-if = "scope.row.editEnable">
                <el-button type="text" @click="arcDealLevel(scope.row)">审核</el-button>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
            <template v-else-if="scope.row.flowStatus == '完成'">
              <template>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
            <template v-else-if="scope.row.flowStatus == '忽略'">
              <template>
                <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
              </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import CreateLevel from './components/CreateLevel'
import IgnoreLevel from './components/IgnoreLevel'
import DealLevel from './components/DealLevel'
import SubDealLevel from './components/SubDealLevel'
import AuditDealLevel from './components/AuditDealLevel'
import DisDealLevel from './components/DisDealLevel'
import JudDealLevel from './components/JudDealLevel'
import ArcDealLevel from './components/ArcDealLevel'

import { queryWarnJob,subselect, deletePlan, forbitPlan ,jobWarningSourceCount} from '@/api/alarm'
export default {
  components: {
    DataCard,
    CreateLevel,
    IgnoreLevel,
    DealLevel,
    SubDealLevel,
    AuditDealLevel,
    DisDealLevel,
    JudDealLevel,
    ArcDealLevel
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      query: {
        limit: 100,
        currentPage: 1
      },
      total: 0,
      selectedDeviceList: [],
      ids: [],
      CreateLevel: false,
      IgnoreLevel: false,
      DealLevel: false,
      SubDealLevel: false,
      DisDealLevel:false,
      JudDealLevel:false,
      AuditDealLevel: false,
      ArcDealLevel:false,
      editingData: {},
      editingDatas:{},
      editingDataD:{},
      editingDataCre:{},
      editingDataa:{},
      editingDataj:{},
      editingDatal:{},
      activeTab: '1',
      kanbanChart1: {
        title: {
          text: '告警设备占比'
        },
        tooltip: {
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {},
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: [
              {
                value: 671,
                name: '正常设备'
              },
              {
                value: 181,
                name: '告警设备'
              }
            ]
          }
        ]
      },
      kanbanChart2: {
        title: {
          text: '告警量趋势图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['2018.6', '2018.7', '2018.8', '2018.9', '2018.10']
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
          text: '告警来源分布'
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
            data: [
              '计划任务',
              '用户报修',
              '设备告警'
            ],
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
            data: [10, 52, 200]
          }
        ]
      }
    }
  },
  methods: {
    addData(data) {
      this.queryWarnJob()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      this.query.linkType =''
      this.queryWarnJob()
    },
    queryWarnJob() {
      queryWarnJob(this.query).then(res => {
        const list = res.data.projectJobInfoList
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
        const sourceType = {
          '1': '计划维保',
          '2': '微信端反馈',
          '3': '设备告警'
        }
        const flowStatus = {
          '1': '待分配',
          '2': '待审核',
          '3': '待处理',
          '4': '待归档',
          '5': '完成',
          '6': '忽略',
        }
        for (var i = 0; i < list.length; i++) {
          list[i].warnLevel = mapList[list[i].warnLevel]
          list[i].type = linkList[list[i].type] 
          list[i].sourceType = sourceType[list[i].sourceType]
          list[i].flowStatus = flowStatus[list[i].flowStatus]
        }
        this.levelList = list
        this.total = res.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.queryWarnJob()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.queryWarnJob()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    createLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataCre = res.data
        this.CreateLevel = true
      })
    },
    jobWarningSourceCount() {
      jobWarningSourceCount().then(res=>{
        const list = res.data
        const listCound = []
        const listNum = []
        for(var i = 0;i<list.length;i++){
          listCound.push(list[i].date)
          listNum.push(list[i].jobCount)
        }
        this.kanbanChart.xAxis[0].data = listCound
        this.kanbanChart.series[0].data = listNum
      })
    },
    ignoreLevel(val) {
      this.editingData = val
      this.IgnoreLevel = true
    },
    dealLevel(val) {
      this.editingData = val
      this.DealLevel = true
    },
    subDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDatas = res.data
        this.SubDealLevel = true
      })
    },
     arcDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDatal = res.data
        this.ArcDealLevel = true
      })
    },
    judDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataj = res.data
        this.JudDealLevel = true
      })
    },
    disDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataa = res.data
        this.DisDealLevel = true
      })
    },
    auditDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataD = res.data
        this.AuditDealLevel = true
      })
    }
  },
  created() {
    this.queryWarnJob()
    this.jobWarningSourceCount()
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
