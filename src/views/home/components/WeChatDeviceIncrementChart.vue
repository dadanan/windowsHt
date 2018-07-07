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
          text: '设备增速排名'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5', '公众号6', '公众号7', '公众号8', '公众号9']
        },
        yAxis: {},
        // grid: {
        //   left: '10px',
        //   right: '10px',
        //   bottom: '10px',
        //   top: '10px',
        //   containLabel: true
        // },
        series: [
          {
            name: '增长趋势',
            data: [5, 21, 25, 31, 34, 40, 55, 60, 62],
            type: 'line'
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
