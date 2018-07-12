<!--
    设备数据图表
-->
<template>
  <div class="panel" @click="$emit('click')">
    <div class="chart"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    props: ['options'],
    data() {
      return {
        chart: null,
        integrals: [],
        data: [],
        active: [],
        increase: []
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
          data: this.integrals,
          axisLine: {
            lineStyle: {
              color: 'rgba(231, 254, 243, 0.5)',
              shadowColor: '#2cafaf',
              shadowBlur: 10
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '设备数据',
            max: this.findMaxVal(this.data),
            min: 0,
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(231, 254, 243, 0.5)',
                shadowColor: '#2cafaf',
                shadowBlur: 10
              }
            }
          },
          {
            type: 'value',
            name: '增长率',
            min: 0,

            max: this.findMaxVal(this.increase),

            axisLabel: {
              formatter: '{value}%'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(231, 254, 243, 0.5)',
                shadowColor: '#2cafaf',
                shadowBlur: 10
              }
            }
          }

        ],
        series: [
          {
            name: '设备数据',
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
            name: '活跃设备',
            data: this.active,
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#56D6FD',
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
            data: this.increase,
            yAxisIndex: 1,
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
    },
    created() {
      this.populateData()
    },
    methods: {
      // 生成数据
      populateData() {
        this.integrals = this.options.integrals
        this.data = this.options.data.data
        this.active = this.options.data.active
        this.increase = this.options.data.increase
      },
      findMaxVal(numberData) {
        return Math.max.apply(Math, numberData)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .panel {
    height: 100%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
