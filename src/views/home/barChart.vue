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

      this.chart.setOption({
        title: {
          text: '设备地区分布排行'
        },
        color: ['rgb(255, 236, 148)'],
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: {
          axisTick: {
            show: false
          },
          type: 'category',
          data: ['其他', '江苏省', '广东省', '福建省', '湖南省', '河南省', '河北省', '江西省']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside',
                color: '#333'
              }
            },
            data: [182031, 231489, 291034, 104970, 131744, 630230, 681807, 230455]
          }
        ]
      })
    }
  }
}
</script>
