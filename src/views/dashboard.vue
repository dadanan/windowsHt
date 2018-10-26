<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>

    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.设备分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#58D68D' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.用户分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#5DADE2' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.订单分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#AF7AC5' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.环境分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#F5B041' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.告警分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.分润分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#F4D03F' }"></data-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-20">
      <el-col :xs="24" :lg="12" v-for="item in kanbanData.图表展示.设备分析" :key="item.id" v-if="item.isVisible">
        <el-card class="mb20">
          <chart :options="item.options" v-if="item.isVisible" class="chart" auto-resize></chart>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" v-for="item in kanbanData.图表展示.用户分析" :key="item.id" v-if="item.isVisible">
        <el-card class="mb20">
          <chart :options="item.options" v-if="item.isVisible" class="chart" auto-resize></chart>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑看板" :visible.sync="dialogEditKanbanVisible" class="kanban-edit">
      <d-title>数据展示</d-title>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="设备分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.设备分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="用户分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.用户分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="环境分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.环境分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="订单分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.订单分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="告警分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.告警分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="分润分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.分润分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
      </el-form>
      <d-title>图表展示</d-title>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="设备分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.图表展示.设备分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="用户分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.图表展示.用户分析" :key="item.id">{{ item.name }}
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
import {
  selectCustomerUserCount,
  selectTypePercent,
  selectDeviceCount,
  newDeviceCountOfToday,
  queryHomePageStatistic
} from '@/api/big-picture-mode/bigPictureMode'
import { dashboardData, realData } from './dashboard'

export default {
  components: {
    DataCard,
    DTitle
  },
  data() {
    return {
      kanbanData: realData,
      dialogEditKanbanVisible: false,
      addPercent: [],
      userCount: [],
      addCount: [],
      devAddCount: [],
      devAddPercent: [],
      deviceCount: [],
      devedata: [],
      newDeviceCount: '',
      fakeData: false, // 是否切换为虚假数据
      status: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selectCustomerUserCount()
      this.selectDeviceCount()
      this.selectTypePercent()
      this.newDeviceCountOfToday()
      this.queryHomePageStatistic()
    },
    test() {
      this.fakeData = !this.fakeData
      if (this.fakeData) {
        this.kanbanData = dashboardData
      } else {
        this.kanbanData = realData
        this.init()
      }
    },
    queryHomePageStatistic() {
      // 查询首页数据
      queryHomePageStatistic().then(res => {
        const data = res.data
        const dataAnalysis = this.kanbanData.数据展示.设备分析
        dataAnalysis[0].value = data.deviceTotalCount
        dataAnalysis[1].value = data.todayDeviceAddCount
        dataAnalysis[2].value = data.todayDeviceOrderCount
        dataAnalysis[3].value = data.todayDeviceBugCount

        const userAnalysis = this.kanbanData.数据展示.用户分析
        userAnalysis[0].value = data.totalUserCount
        userAnalysis[1].value = data.preDayUserAddCount
        userAnalysis[2].value = data.todayUserLiveCount

        const orderAnalysis = this.kanbanData.数据展示.订单分析
        orderAnalysis[0].value = data.todayOrderCount

        const environmentAnalysis = this.kanbanData.数据展示.环境分析
        environmentAnalysis[0].value = data.totalPMCount
        environmentAnalysis[5].value = data.envPercent

        const alarmAnalysis = this.kanbanData.数据展示.告警分析
        alarmAnalysis[0].value = data.nowDeviceAlarmCount

        const profitAnalysis = this.kanbanData.数据展示.分润分析
        profitAnalysis[0].value = data.todayReceiveBillCount
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
        this.kanbanData.图表展示.用户分析[0].options.series[0].data = this.userCount
        this.kanbanData.图表展示.用户分析[0].options.series[1].data = this.userCount
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
        this.kanbanData.图表展示.设备分析[0].options.series[0].data = this.deviceCount
        this.kanbanData.图表展示.设备分析[0].options.series[1].data = this.deviceCount
      })
    },
    // 设备类型统计
    selectTypePercent() {
      selectTypePercent().then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.devedata.push({
            value: res.data[i].typePercent.substring(0, 2),
            name: res.data[i].typeName
          })
        }
        this.kanbanData.图表展示.设备分析[3].options.series[0].data = this.devedata
      })
    },
    // 今日新增设备统计
    newDeviceCountOfToday() {
      newDeviceCountOfToday().then(res => {
        this.kanbanData.数据展示.设备分析[1].value = res.data
      })
    }
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
