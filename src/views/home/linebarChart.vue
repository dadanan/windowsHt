<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题

const animationDuration = 3000
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

      this.chart.setOption({
        title: {
          text: '订单金额'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['订单金额', '增长率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2018/05/04', '2018/05/05', '2018/05/06', '2018/05/07', '2018/05/08', '2018/05/09', '2018/05/10'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '订单金额',
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          {
            type: 'value',
            name: '增长率',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '订单金额',
            type: 'bar',
            barWidth: '50%',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: [12, 20, 89, 30, 45, 34, 73]
          }
        ]
      })
    }
  }
}
</script>
