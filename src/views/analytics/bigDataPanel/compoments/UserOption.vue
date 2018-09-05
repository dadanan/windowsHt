<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false 
      title="用户信息"
      :visible="dialogVisible"
      size="large"
      :before-close="close"
      :modal="false"
      width="80%">
      <el-row>
        <el-col :span="16">
          <el-radio-group v-model="filterIntegrate">
            <el-radio-button label="7天"></el-radio-button>
            <el-radio-button label="30天"></el-radio-button>
            <el-radio-button label="60天"></el-radio-button>
            <el-radio-button label="90天"></el-radio-button>
          </el-radio-group>
          <chart id="main-chart" :options="mainChartOption"></chart>
        </el-col>
        <el-col :span="8">
          <el-col :span="24">

            <chart id="active-chart" :options="activePieChart"></chart>

          </el-col>
          <el-col :span="24">
            <chart id="increase-chart" :options="monthlyIncreaseRate"></chart>
            <el-radio-group v-model="filterType">
              <el-radio :label="1">总用户</el-radio>
              <el-radio :label="2">绑定用户</el-radio>
              <el-radio :label="3">分享用户</el-radio>
              <el-radio :label="4">订单用户</el-radio>
            </el-radio-group>
          </el-col>

        </el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">

            <el-button type="primary" @click="close">关闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['visible', 'id', 'options'],
    // ///////////////////////
    data: function() {
      this.populateData()
      return {
        filterIntegrate: '30天',
        filterType: 1,
        // //////////////////
        integrals: [],
        data: [],
        active: [],
        increase: [],
        pieActiveData: [],
        pieMonthlyData: [],
        // //////////////////
        mainChartOption: {
          title: {
            text: '用户数据',
            left: 'center'

          },
          legend: {
            data: ['用户数', '活跃用户', '增长率'],
            y: 'bottom'
          },
          xAxis: {
            type: 'category',
            data: this.integrals
          },

          yAxis: [
            {
              type: 'value',
              name: '用户数',
              max: this.findMaxVal(this.data),
              min: 0,
              splitLine: { show: false },
              axisLine: {}
            },
            {
              type: 'value',
              name: '增长率',
              min: 0,
              max: this.findMaxVal(this.increase),
              axisLabel: {
                formatter: '{value}%'
              }

            }
          ],
          series: [
            {
              name: '用户数',
              data: this.data,
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: this.active,
              type: 'bar'
            },
            {
              name: '增长率',
              type: 'line',
              data: this.increase,
              yAxisIndex: 1
            }
          ]
        },
        activePieChart: {
          title: {
            text: '活跃比率',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['A', 'B', 'C']
          },
          series: [
            {

              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.pieActiveData
            }
          ]
        },

        monthlyIncreaseRate: {
          title: {
            text: '本月新增',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['A', 'B', 'C']
          },
          series: [
            {

              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.pieMonthlyData
            }
          ]
        },

        dialogVisible: false
      }
    },
    created() {
      this.dialogVisible = this.visible
      /* main logic */
      this.populateData()
    },
    watch: {
      visible: function(newVal) {
        this.dialogVisible = newVal
      },
      filterType: function(newVal) {
        this.onTypeFilterSelect(newVal)
      },
      filterIntegrate: function(newVal) {
        this.onIntergralFilterSelect(newVal)
      }
    },
    methods: {
      // 生成数据
      populateData() {
        this.integrals = this.options.integrals
        this.data = this.options.data.data
        this.active = this.options.data.active
        this.increase = this.options.data.increase
        this.pieActiveData = this.options.data.pieActiveData
        this.pieMonthlyData = this.options.data.pieMonthlyData
      },
      findMaxVal(numberData) {
        return Math.max.apply(Math, numberData)
      },
      // ///////////////////////
      updateOption(p, c, s) {
        const WeatherOptionData = {
          province: p,
          city: c,
          suburb: s
        }
        this.$emit('updateOption', WeatherOptionData)
      },
      onTypeFilterSelect(type) {
        console.log('数据过滤器，类型选择了: ' + type + ',可以在这里请求服务端更新过滤数据。')
      },
      onIntergralFilterSelect(intergral) {
        console.log('时间周期过滤器，类型选择了: ' + intergral + ',可以在这里请求服务端更新过滤数据。')
      },
      close() {
        console.log('弹窗关闭了')
        this.dialogVisible = false
        this.$emit('toggleDialog', this.id)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #main-chart {
    height: 500px;
    width: 100%;
  }

  #active-chart {
    height: 250px;
    width: 100%;
  }

  #increase-chart {
    height: 250px;
    width: 100%;
  }
</style>
