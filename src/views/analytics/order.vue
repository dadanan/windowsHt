<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit"
                   :style="{ backgroundColor: '#AF7AC5' }"></data-card>
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
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="qty"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="details"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="buyer"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditKanbanVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditKanbanVisible = false">确 定</el-button>
      </div>
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
            date: '2016-05-02',
            qty: 10,
            details: '卫生纸、水桶',
            sum: '20 ￥',
            buyer: '测试用户',
            state: '退款中'
          }
        )
      }
      return {
        kanbanData: {
          '数据展示': [
            {
              id: 0,
              icon: 'hdd',
              name: '今日订单数',
              value: 998,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '昨日订单数',
              value: 20,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日订单增长率',
              value: 84,
              isVisible: true
            },
            {
              id: 3,
              icon: 'hdd',
              name: '本月订单数',
              value: 84,
              isVisible: true
            },
            {
              id: 4,
              icon: 'hdd',
              name: '今日订单金额',
              value: 84,
              isVisible: false
            },
            {
              id: 5,
              icon: 'hdd',
              name: '昨日订单金额',
              value: 84,
              isVisible: false
            },
            {
              id: 6,
              icon: 'hdd',
              name: '今日营收增长率',
              value: 84,
              isVisible: false
            },
            {
              id: 7,
              icon: 'hdd',
              name: '本月总营收',
              value: 84,
              isVisible: false
            }
          ],
          '图表展示': [
            {
              id: 0,
              name: '订单数量图表',
              options: {
                title: {
                  text: '订单数量图表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '订单数量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长率',
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
              name: '订单金额图表',
              options: {
                title: {
                  text: '订单金额图表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '订单金额',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长率',
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
              name: '订单数量区域分布',
              options: {
                title: {
                  text: '订单数量区域分布'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '江苏省',
                    '广东省',
                    '福建省',
                    '湖南省',
                    '河南省',
                    '河北省',
                    '江西省'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 3,
              name: '订单金额区域分布',
              options: {
                title: {
                  text: '订单金额区域分布'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '江苏省',
                    '广东省',
                    '福建省',
                    '湖南省',
                    '河南省',
                    '河北省',
                    '江西省'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 4,
              name: '订单数量产品分布',
              options: {
                title: {
                  text: '订单数量产品分布'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '江苏省',
                    '广东省',
                    '福建省',
                    '湖南省',
                    '河南省',
                    '河北省',
                    '江西省'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 5,
              name: '订单金额产品分布',
              options: {
                title: {
                  text: '订单金额产品分布'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '江苏省',
                    '广东省',
                    '福建省',
                    '湖南省',
                    '河南省',
                    '河北省',
                    '江西省'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8]
                  }
                ]
              },
              isVisible: false
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
