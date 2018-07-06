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
          text: '设备地区分布图'
        },
        tooltip: {},
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['其他', '江苏省', '广东省', '福建省', '湖南省', '河南省', '河北省', '江西省']
        },
        // grid: {
        //   left: '10px',
        //   right: '10px',
        //   bottom: '10px',
        //   top: '10px',
        //   containLabel: true
        // },
        series: [
          {
            name: '设备数量',
            type: 'bar',
            data: [10, 9, 20, 25, 6, 4, 1, 8]
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
