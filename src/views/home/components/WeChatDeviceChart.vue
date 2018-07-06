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
          text: '公众号设备数量分布'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5']
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
            name: '设备总数',
            type: 'bar',
            data: [5, 20, 36, 10, 10]
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
