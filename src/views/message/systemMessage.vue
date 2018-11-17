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
            <h2>1220</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="近七日" name="2">
            <h2>120</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="当月" name="3">
            <h2>122</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="近三个月" name="4">
            <h2>10</h2>
            <p>告警总数</p>
          </el-tab-pane>
          <el-tab-pane label="当年" name="5">
            <h2>12220</h2>
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
        <el-button-group>
          <el-button type="primary">添加</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="mac" label="消息名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mac1" label="消息描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="mac2" label="选择关联" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sn" label="是否规则化" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="pos" label="告警来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="pos1" label="告警时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'

export default {
  components: {
    DataCard
  },
  data() {
    const alarmList = []

    for (let i = 0; i < 15; i++) {
      alarmList.push({
        mac: '任务名称1',
        mac1: '任务描述',
        mac2: '不关联',
        sn: '是',
        name: '一级',
        pos: '计划维保',
        pos1: '2018-10-9',
        tel: '13166666007',
        createDatetime: '2018-03-28 01:24:29',
        state: '已修复'
      })
    }
    return {
      alarmList,
      activeTab: '1',
      kanbanChart1: {
        title: {
          text: '个状态占比图'
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
                name: '在线设备'
              },
              {
                value: 181,
                name: '离线设备'
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
            data: [
              '计划维保',
              'H5端反馈',
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
