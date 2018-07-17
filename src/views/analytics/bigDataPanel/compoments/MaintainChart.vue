<!--
    用户数据图表
-->
<template>
  <chart :options="option" class="chart"></chart>
</template>
<script>
  export default {
    props: ['options'],
    data() {
      return {
        option: null,
        intergrals: [],
        data: [],
        data2: [],
        data3: []
      }
    },
    mounted() {
      this.option = {
        title: {
          text: '维护信息',
          left: 'center',
          textStyle: {
            color: '#fff',
            textShadowColor: 'rgba(73, 217, 252, 1)',
            textShadowBlur: 10
          }
        },
        xAxis: {
          type: 'category',
          data: this.intergrals,
          axisLine: {
            lineStyle: {
              color: 'rgba(231, 254, 243, 0.5)',
              shadowColor: 'rgba(73, 217, 252, 1)',
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
            name: '系统升级',
            data: this.data,
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#e7fef3',
                shadowColor: 'rgba(73, 217, 252, 1)',
                shadowBlur: 10
              },
              textStyle: {
                color: '#fff'
              }
            }
          },
          {
            name: '系统维护',
            type: 'bar',
            data: this.data2,
            itemStyle: {
              normal: {
                color: '#00fb78',
                shadowColor: 'rgba(44, 175, 175, 0.5)',
                shadowBlur: 10
              },
              textStyle: {
                color: '#fff'
              }
            }
          },
          {
            name: '传感器校准',
            type: 'bar',
            data: this.data3,
            itemStyle: {
              normal: {
                color: '#39A6DC',
                shadowColor: 'rgba(44, 175, 175, 0.5)',
                shadowBlur: 10
              },
              textStyle: {
                color: '#fff'
              }

            }
          }
        ]
      }
    },
    beforeDestroy() {
      this.chart.dispose()
    },
    created() {
      this.populateData()
    },
    methods: {
      populateData() {
        this.intergrals = this.options.integrals
        this.data = this.options.data.update
        this.data2 = this.options.data.maintain
        this.data3 = this.options.data.calibration
      }
    }
  }
</script>
<style lang="scss" scoped>
  .chart {
    height: 100%;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 10px;
  }
</style>
