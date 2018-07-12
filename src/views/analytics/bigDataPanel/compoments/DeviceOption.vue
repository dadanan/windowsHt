<template>
  <div>
    <el-dialog
      title="设备信息"
      :visible="dialogVisible"
      size="large"
      :before-close="close"
      :modal="false">
      <el-row>
        <el-col :span="16">
          <chart id="main-chart" :options="mainChartOption"></chart>
          {{data}}
        </el-col>
        <el-col :span="8">
          <el-col :span="24">
            <el-radio-group v-model="filterIntegrate">
              <el-radio-button label="7天"></el-radio-button>
              <el-radio-button label="30天"></el-radio-button>
              <el-radio-button label="60天"></el-radio-button>
              <el-radio-button label="90天"></el-radio-button>
            </el-radio-group>
            <chart id="active-chart" :options="activePieChart"></chart>

          </el-col>
          <el-col :span="24">
            <chart id="increase-chart" :options="monthlyIncreaseRate"></chart>
            <el-radio-group v-model="filterDevices">
              <el-radio :label="1">总设备</el-radio>
              <el-radio :label="2">检测设备</el-radio>
              <el-radio :label="3">第三方设备</el-radio>
              <el-radio :label="4">终端展示设备</el-radio>
              <el-radio :label="5">净化设备</el-radio>
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
  /*
    import EChart from "vue-echarts/components/ECharts";
    import "echarts";
  */
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'

  export default {
    props: ['visible', 'id', 'options'],

    components: {
      chart: ECharts
    },
    // ///////////////////////
    data: function() {
      this.populateData()
      return {
        filterIntegrate: '30天',
        filterDevices: 1,
        // //////////////////
        integrals: [],
        data: [],
        active: [],
        increase: [],
        // //////////////////
        mainChartOption: {
          title: {
            text: '设备数据',
            left: 'center'

          },
          legend: {
            data: ['设备数据', '活跃设备', '增长率'],
            y: 'bottom'
          },
          xAxis: {
            type: 'category',
            data: this.integrals
          },

          yAxis: [
            {
              type: 'value',
              name: '设备数据',
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
              name: '设备数据',
              data: this.data,
              type: 'bar'
            },
            {
              name: '活跃设备',
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
              data: [
                { value: 335, name: 'A' },
                { value: 310, name: 'B' },
                { value: 234, name: 'C' }

              ]
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
              data: [
                { value: 335, name: 'A' },
                { value: 310, name: 'B' },
                { value: 234, name: 'C' }

              ]
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
      visible: function(newVal, oldVal) {
        this.dialogVisible = newVal
      }
    },
    methods: {
      // 生成数据
      populateData() {
        this.integrals = this.options.integrals
        this.data = this.options.alldata
        this.active = this.options.active
        this.increase = this.options.increaseRate
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

      close() {
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
