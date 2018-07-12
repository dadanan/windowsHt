<template>
  <div style="padding: 20px">
    <el-card>
      <chart :options="polar" class="echarts"></chart>
    </el-card>
    <el-card>
      <chart :options="map" class="echarts"></chart>
    </el-card>
  </div>
</template>

<style scoped>
  .echarts {
    height: 300px;
  }
</style>

<script>
  import map from './map'

  export default {
    data() {
      const data = []

      for (let i = 0; i <= 360; i++) {
        const t = i / 180 * Math.PI
        const r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      return {
        polar: {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000
        },
        map
      }
    }
  }
</script>
