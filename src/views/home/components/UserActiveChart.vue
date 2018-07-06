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
          text: '本日用户活跃曲线'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['00:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM']
        },
        yAxis: {},
        series: [
          {
            name: '每小时用户数',
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
