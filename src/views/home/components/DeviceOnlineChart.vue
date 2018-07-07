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
