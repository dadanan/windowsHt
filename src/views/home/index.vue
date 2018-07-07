<template>
  <div>
    <d-title>运营数据看板</d-title>
    <datacard-grid-list class="datacard-grid-list">
      <datacard v-for="data, index in datacardDataList" :key="index"
                @edit="editDatacard($event, index)" :data="data"></datacard>
    </datacard-grid-list>
    <datacard-edit @save="saveDatacard($event, editDatacardIndex)" :is-open.sync="isEditDatacard"
                   :edit-data="editDatacardData" :select-data="allDatacardDataList"></datacard-edit>
    <d-title>运营数据图表</d-title>
    <chart-grid-list>
      <chart v-for="option, index in chartOptionList" :key="index" :option="option"
             @edit="editChart($event, index)"></chart>
    </chart-grid-list>
    <chart-edit @save="saveChart($event, editChartIndex)" :is-open.sync="isEditChart" :edit-data="editChartOption"
                :select-data="allChartOptionList"></chart-edit>
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
          { id: 0, text: '当前设备总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '在线设备总数', value: '4545', color: '#E6A23C', icon: 'coffee' },
          { id: 2, text: '当前设备故障数', value: '56', color: '#F56C6C', icon: 'coffee' },
          { id: 3, text: '当前用户有人数', value: '78', color: '#909399', icon: 'coffee' },
          { id: 4, text: '昨日用户增长数', value: '879', color: '#409EFF', icon: 'coffee' },
          { id: 5, text: '今日活跃用户数', value: '454', color: '#ccc', icon: 'coffee' },
          { id: 6, text: '本月用户增长数', value: '213', color: '#ccc', icon: 'coffee' },
          { id: 7, text: '本月活跃用户数', value: '123', color: '#ccc', icon: 'coffee' },
          { id: 8, text: '当前设备在线率', value: '987', color: '#ccc', icon: 'coffee' },
          { id: 9, text: '当前用户活跃率', value: '433', color: '#ccc', icon: 'coffee' },
          { id: 10, text: '传感器总数', value: '87', color: '#ccc', icon: 'coffee' },
          { id: 11, text: 'PM2.5 传感器总数', value: '67', color: '#ccc', icon: 'coffee' },
          { id: 12, text: '甲醛传感器总数', value: '5', color: '#ccc', icon: 'coffee' },
          { id: 13, text: 'CO2 传感器总数', value: '456', color: '#ccc', icon: 'coffee' },
          { id: 14, text: 'TVOC 传感器数据总数', value: '456', color: '#ccc', icon: 'coffee' },
          { id: 15, text: '优良环境数', value: '87', color: '#ccc', icon: 'coffee' },
          { id: 16, text: '优良环境比率', value: '12', color: '#ccc', icon: 'coffee' }
        ],
        datacardDataList: [
          { id: 0, text: '当前设备总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '在线设备总数', value: '4545', color: '#E6A23C', icon: 'coffee' },
          { id: 2, text: '当前设备故障数', value: '56', color: '#F56C6C', icon: 'coffee' },
          { id: 3, text: '当前用户有人数', value: '78', color: '#909399', icon: 'coffee' },
          { id: 4, text: '昨日用户增长数', value: '879', color: '#409EFF', icon: 'coffee' },
          { id: 5, text: '今日活跃用户数', value: '454', color: '#ccc', icon: 'coffee' },
          { id: 6, text: '本月用户增长数', value: '213', color: '#ccc', icon: 'coffee' },
          { id: 7, text: '本月活跃用户数', value: '123', color: '#ccc', icon: 'coffee' }
        ],
        isEditDatacard: false,
        editDatacardData: null,
        editDatacardIndex: 0,
        allChartOptionList: [
          {
            id: 1, text: '设备增加趋势表', option: {
              title: {
                text: '设备增加趋势表'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              },
              yAxis: {},
              series: [
                {
                  name: '设备总数',
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
            id: 2, text: '设备地区分布图', option: {
              title: {
                text: '设备地区分布图'
              },
              tooltip: {},
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                data: ['其他', '江苏省', '广东省', '福建省', '湖南省', '河南省', '河北省', '江西省']
              },
              series: [
                {
                  name: '设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8]
                }
              ]
            }
          },
          {
            id: 3, text: '用户增加趋势表', option: {
              title: {
                text: '用户增加趋势表'
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
                  name: '增长趋势',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 4, text: '在线设备占比图', option: {
              title: {
                text: '在线设备占比图'
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
                    { value: 335, name: '在线设备' },
                    { value: 310, name: '离线设备' }
                  ]
                }
              ]
            }
          },
          {
            id: 5, text: '本日用户活跃曲线', option: {
              title: {
                text: '本日用户活跃曲线'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['00:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM']
              },
              yAxis: {},
              series: [
                {
                  name: '每小时用户数',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 6, text: '设备类型比重图', option: {
              title: {
                text: '设备类型比重图'
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
            id: 7, text: '公众号设备数量分布', option: {
              title: {
                text: '公众号设备数量分布'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5']
              },
              yAxis: {},
              series: [
                {
                  name: '设备总数',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10]
                }
              ]
            }
          },
          {
            id: 8, text: '设备增速排名', option: {
              title: {
                text: '设备增速排名'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5', '公众号6', '公众号7', '公众号8', '公众号9']
              },
              yAxis: {},
              series: [
                {
                  name: '增长趋势',
                  data: [5, 21, 25, 31, 34, 40, 55, 60, 62],
                  type: 'line'
                }
              ]
            }
          }
        ],
        chartOptionList: [
          {
            id: 1, text: '设备增加趋势表', option: {
              title: {
                text: '设备增加趋势表'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              },
              yAxis: {},
              series: [
                {
                  name: '设备总数',
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
            id: 2, text: '设备地区分布图', option: {
              title: {
                text: '设备地区分布图'
              },
              tooltip: {},
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                data: ['其他', '江苏省', '广东省', '福建省', '湖南省', '河南省', '河北省', '江西省']
              },
              series: [
                {
                  name: '设备数量',
                  type: 'bar',
                  data: [10, 9, 20, 25, 6, 4, 1, 8]
                }
              ]
            }
          },
          {
            id: 3, text: '用户增加趋势表', option: {
              title: {
                text: '用户增加趋势表'
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
                  name: '增长趋势',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 4, text: '在线设备占比图', option: {
              title: {
                text: '在线设备占比图'
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
                    { value: 335, name: '在线设备' },
                    { value: 310, name: '离线设备' }
                  ]
                }
              ]
            }
          },
          {
            id: 5, text: '本日用户活跃曲线', option: {
              title: {
                text: '本日用户活跃曲线'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['00:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM']
              },
              yAxis: {},
              series: [
                {
                  name: '每小时用户数',
                  data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                  type: 'line',
                  smooth: true
                }
              ]
            }
          },
          {
            id: 6, text: '设备类型比重图', option: {
              title: {
                text: '设备类型比重图'
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
            id: 7, text: '公众号设备数量分布', option: {
              title: {
                text: '公众号设备数量分布'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5']
              },
              yAxis: {},
              series: [
                {
                  name: '设备总数',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10]
                }
              ]
            }
          },
          {
            id: 8, text: '设备增速排名', option: {
              title: {
                text: '设备增速排名'
              },
              tooltip: {},
              legend: {},
              xAxis: {
                data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5', '公众号6', '公众号7', '公众号8', '公众号9']
              },
              yAxis: {},
              series: [
                {
                  name: '增长趋势',
                  data: [5, 21, 25, 31, 34, 40, 55, 60, 62],
                  type: 'line'
                }
              ]
            }
          }
        ],
        editChartOption: null,
        editChartIndex: 0,
        isEditChart: false
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
    }
  }
</script>

<style lang="scss" scoped>
  .datacard-grid-list {
    margin-bottom: 20px;
  }
</style>
