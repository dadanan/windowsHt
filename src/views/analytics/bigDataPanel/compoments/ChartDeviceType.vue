<!--
    设备类型图表
-->
<template>
  <div class="panel" @click="$emit('click')">
    <chart :options="option" class="chart"></chart>
  </div>
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
      /*
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
      */
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
  .panel{
    height: 100%;
  }
  .chart {
    height: 100%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
  }
</style>
