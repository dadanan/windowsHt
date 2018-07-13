<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit"
                   :style="{ backgroundColor: '#5DADE2' }"></data-card>
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
      <div class="filter-form-container">
        <el-form :inline="true" :model="form" ref="form">
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
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%" class="mb20">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="pos"
          label="区域">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="deviceSN"
          label="设备型号">
        </el-table-column>
        <el-table-column
          prop="updateDatetime"
          label="最后操作时间">
        </el-table-column>
      </el-table>
      <div class="excel-container">
        <el-pagination
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        <el-button type="primary">导出 Excel</el-button>
      </div>
    </el-card>
    <el-dialog title="编辑看板" :visible.sync="dialogEditKanbanVisible" class="kanban-edit">
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
    </el-dialog>
  </div>
</template>

<script>
  import DataCard from '@/components/DataCard'
  import DTitle from '@/components/Title'

  export default {
    components: {
      DataCard,
      DTitle
    },
    data() {
      const mockData = []
      for (let i = 0; i < 15; i++) {
        mockData.push(
          {
            name: '测试用户',
            pos: '测试区域',
            deviceType: '测试类型',
            deviceSN: '0TRQCFGA',
            updateDatetime: '2018-06-01'
          }
        )
      }
      return {
        kanbanData: {
          '数据展示': [
            {
              id: 0,
              icon: 'hdd',
              name: '当前用户总数',
              value: 998,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '昨日新增用户',
              value: 20,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日活跃用户',
              value: 84,
              isVisible: true
            },
            {
              id: 3,
              icon: 'hdd',
              name: '昨日用户活跃率',
              value: 84,
              isVisible: true
            },
            {
              id: 4,
              icon: 'hdd',
              name: '总用户活跃率',
              value: 84,
              isVisible: false
            },
            {
              id: 5,
              icon: 'hdd',
              name: '当月新增用户',
              value: 84,
              isVisible: false
            },
            {
              id: 6,
              icon: 'hdd',
              name: '本月用户增长率',
              value: 84,
              isVisible: false
            }
          ],
          '图表展示': [
            {
              id: 0,
              name: '新增用户趋势图',
              options: {
                title: {
                  text: '新增用户趋势图'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {},
                series: [
                  {
                    name: '用户数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 1,
              name: '活跃用户趋势图',
              options: {
                title: {
                  text: '活跃用户趋势图'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {},
                series: [
                  {
                    name: '活跃用户数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '活跃趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 2,
              name: '用户总数趋势图',
              options: {
                title: {
                  text: '用户总数趋势图'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {},
                series: [
                  {
                    name: '用户总数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '总数趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 3,
              name: '用户区域分布图',
              options: {
                title: {
                  text: '用户区域分布图'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: ['其他', '江苏省', '广东省', '福建省', '湖南省', '河南省', '河北省', '江西省', '青海省', '海南省']
                },
                series: [
                  {
                    name: '用户数',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
                  }
                ]
              },
              isVisible: true
            }
          ]
        },
        dialogEditKanbanVisible: false,
        form: {
          type: '',
          keywords: '',
          date: ''
        },
        tableData: mockData
      }
    },
    methods: {
      search() {
      },
      resetForm() {
        this.$refs.form.resetFields()
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
