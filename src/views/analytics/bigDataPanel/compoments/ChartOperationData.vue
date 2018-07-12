<!--
    设备类型图表
-->
<template>
    <div class="chart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      chart: null,
      types: ['已处理', '待处理', '总告警'],
      data: [
        { value: 335, name: '已处理' },
        { value: 310, name: '待处理' },
        { value: 1548, name: '总告警' }
      ]
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.chart.setOption({
      title: [
        {
          text: '告警信息',
          left: 'center',
          textStyle: {
            color: '#fff',
            textShadowColor: 'rgba(73, 217, 252, 1)',
            textShadowBlur: 10
          }
        },
        {
          text: '已经处理\n80%',
          top: '40%',
          left: 'center',
          textStyle: {
            color: '#fff',
            textShadowColor: 'rgba(73, 217, 252, 1)',
            textShadowBlur: 10
          }
        }

      ],

      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.types
      },
      color: ['#6DEE18', '#F3CE38', 'rgba(231, 254, 243, 0.8)'],

      series: [
        {
          name: '详细',
          type: 'pie',
          radius: ['50%', '70%'],

          data: this.data,

          itemStyle: {
            normal: {

              shadowColor: '#2cafaf',
              shadowBlur: 10
            },
            emphasis: {
              color: '#e7fef3',
              shadowColor: '#2cafaf',
              shadowBlur: 10
            }
          }
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
  height: 100%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>