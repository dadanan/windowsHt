<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false 
      title="设备类型"
      :visible="dialogVisible"
      size="large"
      :before-close="close"
      :modal="false"
      width="80%">
      <el-row>
        <el-col :span="24">
          <el-radio-group v-model="filterIntegrate">
            <el-radio-button label="7天"></el-radio-button>
            <el-radio-button label="30天"></el-radio-button>
            <el-radio-button label="60天"></el-radio-button>
            <el-radio-button label="90天"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="16">
          <chart id="main-chart" :options="mainChartOption"></chart>
        </el-col>
        <el-col :span="8">
          <el-col :span="24">

            <chart id="chartSide" :options="chartSideOption"></chart>

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
        // //////////////////
        allTypes: [],
        data: [],
        totalDevices: null,
        // 侧边数据
        chartSideCat: [],
        chartSideType: [],
        chartSideData1: [],
        chartSideData2: [],
        // //////////////////
        mainChartOption: {
          title: [
            {
              text: '设备类型',
              left: 'center'
            },
            {
              text: '设备总数\n' + this.totalDevices + '台',
              top: '45%',
              left: 'center'
            }
          ],
          legend: {
            y: 'bottom',
            data: this.allTypes
          },
          series: [
            {
              name: '设备类型',
              type: 'pie',
              radius: ['50%', '70%'],
              data: this.data
            }
          ]
        },
        chartSideOption: {
          title: {
            text: '设备类型'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: this.chartSideType
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.chartSideCat
          },
          series: [
            {
              name: this.chartSideType[0],
              type: 'bar',
              data: this.chartSideData1
            },
            {
              name: this.chartSideType[1],
              type: 'bar',
              data: this.chartSideData2
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
      filterIntegrate: function(newVal) {
        this.onIntergralFilterSelect(newVal)
      }
    },
    methods: {
      // 生成数据
      populateData() {
        this.allTypes = this.options.allTypes
        this.data = this.options.data
        this.totalDevices = this.options.totalDevices
        this.chartSideCat = this.options.allTypes
        this.chartSideType = this.options.allStatus
        this.chartSideData1 = this.options.totalOnline
        this.chartSideData2 = this.options.totalOffline
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

  #chartSide {
    height: 500px;
    width: 100%;
  }

</style>
