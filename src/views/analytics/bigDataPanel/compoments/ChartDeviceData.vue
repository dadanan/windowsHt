<!--
    设备数据图表
-->
<template>
    <div class="chart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      month: ['JAN', 'FEB', 'MAR', 'JUN', 'JULY', 'AUG', 'SEP'],
      data: [Math.round(Math.random() * 200), Math.round(Math.random() * 200), Math.round(Math.random() * 600), Math.round(Math.random() * 200), Math.round(Math.random() * 500), Math.round(Math.random() * 300), Math.round(Math.random() * 200)]
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.chart.setOption({
      title: {
        text: '设备数据',
        left: 'center',
        textStyle: {
          color: '#fff',
          textShadowColor: 'rgba(73, 217, 252, 1)',
          textShadowBlur: 10

        }
      },
      xAxis: {
        type: 'category',
        data: this.month,
        axisLine: {
          lineStyle: {
            color: 'rgba(231, 254, 243, 0.5)',
            shadowColor: '#2cafaf',
            shadowBlur: 10
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(231, 254, 243, 0.5)',
            shadowColor: '#2cafaf',
            shadowBlur: 10
          }
        }
      },
      series: [
        {
          data: this.data,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#e7fef3',
              shadowColor: '#49D9FC',
              shadowBlur: 10
            },
            textStyle: {
              color: '#fff'
            }
          }
        },
        {
          name: '增长率',
          type: 'line',
          data: this.data,
          itemStyle: {
            normal: {
              color: '#00fb78',
              shadowColor: 'rgba(73, 217, 252, 1)',
              shadowBlur: 10
            },
            textStyle: {
              color: '#fff'
            }

          }
        }
      ]
    })
  },
  beforeDestroy() {
    this.chart.dispose()
  }
}
</script>
<style lang="scss" scoped>
.chart {
  height: 100%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
