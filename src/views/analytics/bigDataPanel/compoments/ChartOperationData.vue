<!--
    设备类型图表
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
      allTypes: [],
      data: []
    }
  },
  mounted() {
    this.option = {
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
        data: this.allTypes,
        textStyle: {
          color: '#fff',
          textShadowColor: 'rgba(73, 217, 252, 1)',
          textShadowBlur: 10
        }
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
      this.allTypes = this.options.allTypes
      this.data = this.options.data
    }
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
