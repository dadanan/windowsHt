<template>
  <div>
    <d-title>用户数据看板</d-title>
    <datacard-grid-list class="datacard-grid-list">
      <datacard v-for="data, index in datacardDataList" :key="index"
                @edit="editDatacard($event, index)" :data="data"></datacard>
    </datacard-grid-list>
    <datacard-edit @save="saveDatacard($event, editDatacardIndex)" :is-open.sync="isEditDatacard"
                   :edit-data="editDatacardData" :select-data="allDatacardDataList"></datacard-edit>
    <d-title>用户数据图表</d-title>
    <chart-grid-list>
      <chart v-for="option, index in chartOptionList" :key="index" :option="option"
             @edit="editChart($event, index)"></chart>
    </chart-grid-list>
    <chart-edit @save="saveChart($event, editChartIndex)" :is-open.sync="isEditChart" :edit-data="editChartOption"
                :select-data="allChartOptionList"></chart-edit>
    <d-title>用户数据表</d-title>
    <!--筛选-->
    <div class="filter-bar">
      <el-form :inline="true" :model="filter">
        <el-form-item>
          <el-select v-model="filter.category" placeholder="筛选条件">
            <el-option label="类型" value="1"></el-option>
            <el-option label="用户" value="2"></el-option>
            <el-option label="运营者" value="3"></el-option>
            <el-option label="区域" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.keyword" placeholder="筛选内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.range" placeholder="时间范围">
            <el-option label="7 天" value="1"></el-option>
            <el-option label="30 天" value="2"></el-option>
            <el-option label="全部" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item style="margin-right: 0">
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="userTableData"
      style="width: 100%; margin-bottom: 20px">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="最后操作时间">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-bar">
      <el-pagination
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-button type="primary">导出 Excel</el-button>
    </div>
  </div>
</template>

<script>
  import DatacardGridList from '@/components/DatacardGridList'
  import Datacard from '@/components/Datacard'
  import DatacardEdit from '@/components/DatacardEdit'
  import DTitle from '@/components/DTitle'
  import ChartGridList from '@/components/ChartGridList'
  import Chart from '@/components/Chart'
  import ChartEdit from '@/components/ChartEdit'

  export default {
    components: {
      DatacardGridList,
      Datacard,
      DatacardEdit,
      DTitle,
      ChartGridList,
      Chart,
      ChartEdit
    },
    data() {
      return {
        allDatacardDataList: [
          { id: 0, text: '当前用户总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '昨日新增用户', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '今日活跃用户', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '昨日用户活跃率', value: '0', color: '#909399', icon: 'angry' },
          { id: 4, text: '总用户活跃率', value: '0', color: '#909399', icon: 'angry' },
          { id: 5, text: '当月新增用户', value: '0', color: '#909399', icon: 'angry' },
          { id: 6, text: '本月用户增长率', value: '0', color: '#909399', icon: 'angry' }
        ],
        datacardDataList: [
          { id: 0, text: '当前用户总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '昨日新增用户', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '今日活跃用户', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '昨日用户活跃率', value: '0', color: '#909399', icon: 'angry' }
        ],
        isEditDatacard: false,
        editDatacardData: null,
        editDatacardIndex: 0,
        allChartOptionList: [
          {
            id: 1, text: '新增用户趋势图', option: {
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
            }
          },
          {
            id: 2, text: '活跃用户趋势图', option: {
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
            }
          },
          {
            id: 3, text: '用户总数趋势图', option: {
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
            }
          },
          {
            id: 4, text: '用户区域分布图', option: {
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
            }
          }
        ],
        chartOptionList: [
          {
            id: 1, text: '新增用户趋势图', option: {
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
            }
          },
          {
            id: 2, text: '活跃用户趋势图', option: {
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
            }
          },
          {
            id: 3, text: '用户总数趋势图', option: {
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
            }
          },
          {
            id: 4, text: '用户区域分布图', option: {
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
            }
          }
        ],
        editChartOption: null,
        editChartIndex: 0,
        isEditChart: false,
        userTableData: [
          {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }
        ],
        filter: {
          category: '',
          keyword: '',
          range: ''
        }
      }
    },
    methods: {
      editDatacard(data, index) {
        this.editDatacardIndex = index
        this.editDatacardData = data
        this.isEditDatacard = true
      },
      saveDatacard(data, index) {
        this.datacardDataList[index] = data
        this.isEditDatacard = false
      },
      editChart(data, index) {
        this.editChartIndex = index
        this.editChartOption = data
        this.isEditChart = true
      },
      saveChart(data, index) {
        this.chartOptionList[index] = data
        this.isEditChart = false
      },
      search() {
      },
      reset() {
        this.filter.category = ''
        this.filter.keyword = ''
        this.filter.range = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datacard-grid-list {
    margin-bottom: 20px;
  }

  .pagination-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-bar {
    &::before {
      content: '';
    }
    display: flex;
    justify-content: space-between;
  }
</style>
