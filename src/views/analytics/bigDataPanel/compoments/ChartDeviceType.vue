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
      types: ['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4', 'TYPE5'],
      data: [
        { value: 335, name: 'TYPE1' },
        { value: 310, name: 'TYPE2' },
        { value: 234, name: 'TYPE3' },
        { value: 135, name: 'TYPE4' },
        { value: 1548, name: 'TYPE5' }
      ]
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.chart.setOption({
      title: {
        text: '设备类型',
        left: 'center',
        textStyle: {
          color: '#fff',
          textShadowColor: 'rgba(73, 217, 252, 1)',
          textShadowBlur: 10
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.types
      },
      color: ['#DF5E76', '#0CDEFD', '#6DEE18', '#F3CE38', 'rgba(231, 254, 243, 0.8)'],

      series: [
        {
          name: '设备类型',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
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