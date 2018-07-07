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
