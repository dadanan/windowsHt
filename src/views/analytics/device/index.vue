<template>
  <div>
    <d-title>设备数据看板</d-title>
    <datacard-grid-list class="datacard-grid-list">
      <datacard v-for="data, index in allDatacardDataList" :key="index"
                @edit="editDatacard($event, index)" :data="data"></datacard>
    </datacard-grid-list>
    <datacard-edit @save="saveDatacard($event, editDatacardIndex)" :is-open.sync="isEditDatacard"
                   :edit-data="editDatacardData" :select-data="allDatacardDataList"></datacard-edit>
    <d-title>设备数据图表</d-title>
    <chart-grid-list>
      <chart v-for="option, index in chartOptionList" :key="index" :option="option"
             @edit="editChart($event, index)"></chart>
    </chart-grid-list>
    <chart-edit @save="saveChart($event, editChartIndex)" :is-open.sync="isEditChart" :edit-data="editChartOption"
                :select-data="allChartOptionList"></chart-edit>
    <d-title>设备数据表</d-title>
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
        prop="type"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="user"
        label="设备用户">
      </el-table-column>
      <el-table-column
        prop="onlineStatus"
        label="在线状态">
      </el-table-column>
      <el-table-column
        prop="powerStatus"
        label="使用状态">
      </el-table-column>
      <el-table-column
        prop="alarmStatus"
        label="告警状态">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-bar">
      <el-pagination
        :current-page="2"
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
      ChartGridList,
      Chart,
      ChartEdit,
      DTitle
    },
    data() {
      return {
        allDatacardDataList: [
          { id: 0, text: '当前设备总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '今日设备新增数', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '当前设备故障数', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '当前设备故障率', value: '0', color: '#909399', icon: 'angry' },
          { id: 4, text: '当前设备在线数', value: '0', color: '#909399', icon: 'angry' },
          { id: 5, text: '当前设备在线率', value: '0', color: '#909399', icon: 'angry' },
          { id: 6, text: '当前设备开机数', value: '0', color: '#909399', icon: 'angry' },
          { id: 7, text: '当前设备开机率', value: '0', color: '#909399', icon: 'angry' }
        ],
        datacardDataList: [
          { id: 0, text: '当前设备总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '今日设备新增数', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '当前设备故障数', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '当前设备故障率', value: '0', color: '#909399', icon: 'angry' }
        ],
        editDatacardData: null,
        editDatacardIndex: 0,
        isEditDatacard: false,
        allChartOptionList: [
          {
            id: 1, text: '新增设备趋势图', option: {
              title: {
                text: '新增设备趋势图'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              },
              yAxis: {},
              series: [
                {
                  name: '设备数量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                },
                {
                  name: '设备增长率',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 2, text: '设备区域排行图', option: {
              title: {
                text: '设备区域排行图'
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
                  name: '设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
                }
              ]
            }
          },
          {
            id: 3, text: '故障设备区域分布', option: {
              title: {
                text: '故障设备区域分布'
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
                  name: '故障设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
                }
              ]
            }
          },
          {
            id: 4, text: '设备类型分布', option: {
              title: {
                text: '设备类型分布'
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
                    { value: 60, name: '设备类型1' },
                    { value: 10, name: '设备类型2' },
                    { value: 5, name: '设备类型3' },
                    { value: 98, name: '设备类型4' }
                  ]
                }
              ]
            }
          },
          {
            id: 5, text: '设备告警曲线图', option: {
              title: {
                text: '设备告警曲线图'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              },
              yAxis: {},
              series: [
                {
                  name: '告警数量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                },
                {
                  name: '告警增长率',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 6, text: '告警类型占比图', option: {
              title: {
                text: '告警类型占比图'
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
                    { value: 60, name: '告警类型1' },
                    { value: 10, name: '告警类型2' },
                    { value: 5, name: '告警类型3' },
                    { value: 98, name: '告警类型4' }
                  ]
                }
              ]
            }
          },
          {
            id: 7, text: '告警设备类型占比图', option: {
              title: {
                text: '告警类型占比图'
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
                    { value: 60, name: '设备类型1' },
                    { value: 10, name: '设备类型2' },
                    { value: 5, name: '设备类型3' },
                    { value: 98, name: '设备类型4' }
                  ]
                }
              ]
            }
          }
        ],
        chartOptionList: [
          {
            id: 1, text: '新增设备趋势图', option: {
              title: {
                text: '新增设备趋势图'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              },
              yAxis: {},
              series: [
                {
                  name: '设备数量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                },
                {
                  name: '设备增长率',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 2, text: '设备区域排行图', option: {
              title: {
                text: '设备区域排行图'
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
                  name: '设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
                }
              ]
            }
          },
          {
            id: 3, text: '故障设备区域分布', option: {
              title: {
                text: '故障设备区域分布'
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
                  name: '故障设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
                }
              ]
            }
          },
          {
            id: 4, text: '设备类型分布', option: {
              title: {
                text: '设备类型分布'
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
                    { value: 60, name: '设备类型1' },
                    { value: 10, name: '设备类型2' },
                    { value: 5, name: '设备类型3' },
                    { value: 98, name: '设备类型4' }
                  ]
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
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
          },
          {
            id: '1',
            type: '测试类型',
            name: '测试设备',
            user: '测试用户',
            onlineStatus: '离线',
            powerStatus: '关机',
            alarmStatus: '无'
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
