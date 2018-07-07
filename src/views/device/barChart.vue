<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption( {
        xAxis: {
          type: 'category',
          data: ['预留布尔值故障', '滤网到期提醒', 'pm2.5数据丢失报警', '设备移开1000米报警']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          barWidth : 60,//柱图宽度
          data: [1120, 1200, 2150, 380],
          type: 'bar'
        }]
      })
    }
  }
}
</script>
