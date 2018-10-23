<!--
    滤网数据图表
-->
<template>
    <chart :options="option"></chart>
</template>
<script>
export default {
  data() {
    return {
      option: null,
      time: [],
      data: []
    }
  },
  mounted() {
    this.option = {
      title: {
        text: '滤网数据',
        left: 'center',
        textStyle: {
          color: '#fff',
          textShadowColor: 'rgba(73, 217, 252, 1)',
          textShadowBlur: 10
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: {
        type: 'category',
        data: this.time,
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
              shadowColor: '#2cafaf',
              shadowBlur: 10
            },
            textStyle: {
              color: '#fff'
            }

          }
        }
      ]
    }

    this.chart.setOption(this.option)
    this.generateRandomData()
  },
  methods: {
    generateRandomData: function() {
      if (!this.time) this.time = []
      if (!this.data) this.data = []

      setInterval(() => {
        var now = new Date()
        var res = []
        var len = 10
        while (len--) {
          res.push(now.toLocaleTimeString().replace(/^\D*/, ''))
          now = new Date(now - 2000)
        }
        this.time.push(res[0])
        this.data.push(Math.round(Math.random() * 500))
        if (this.time.length > 10) {
          this.time.splice(0, 1)
          this.data.splice(0, 1)
        }
        this.chart.setOption(this.option)
      }, 500)
    }
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
