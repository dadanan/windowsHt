<template>
  <div class="chart"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
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
      })
    },
    beforeDestroy() {
      this.chart.dispose()
    }
  }
</script>

<style lang="scss" scoped>
  .chart {
    height: 400px;
  }
</style>
