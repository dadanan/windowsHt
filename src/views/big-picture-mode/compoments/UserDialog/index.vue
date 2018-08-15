<template>
  <div class="modal" v-show="visible" @click.self="handleClose">
    <div class="dialog">
      <div class="dialog__close" @click.self="handleClose"></div>
      <chart :options="chart1Options" class="dialog__chart1"></chart>
      <div>
        <chart :options="chart2Options" class="dialog__chart2"></chart>
        <chart :options="chart3Options" class="dialog__chart3"></chart>
      </div>
      <div class="dialog__wtf"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    font-family: "Microsoft YaHei", serif;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .7);

    * {
      font-family: "Microsoft YaHei", serif;
    }
  }

  .dialog {
    padding: 65px 9px 9px;
    width: 1277px;
    height: 657px;
    background: url("./assets/bg.png");
    margin: auto;
    position: relative;
    display: flex;

    &__wtf {
      background: url("assets/button-group.png");
      width: 386px;
      height: 36px;
      position: absolute;
      bottom: 29px;
      right: 29px;
    }

    &__chart1, &__chart2, &__chart3 {
      padding: 20px;
      width: 629.5px;
      height: 583px;
      flex: 1;
    }

    &__chart2 {
      height: 262.5px;
    }

    &__chart3 {
      height: 262.5px;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      width: 22px;
      height: 22px;
      top: 20px;
      right: 29px;
    }
  }
</style>

<script>
  import echarts from 'echarts'

  export default {
    props: ['visible'],
    data() {
      return {
        chart1Options: {
          color: ['#ff6600', '#2797fa'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            // show: false
            left: 0,
            top: '28px',
            right: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisLabel: {
                interval: 0
              },
              axisPointer: {
                label: {
                  color: '#fff',
                  backgroundColor: '#333',
                  shadowColor: 'transparent'
                }
              }
            }
          ],
          yAxis: [
            {
              splitLine: { show: false },
              type: 'value',
              name: '用户数量',
              min: 0,
              max: 1500,
              interval: 300,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisPointer: {
                label: {
                  color: '#fff',
                  backgroundColor: '#333',
                  shadowColor: 'transparent'
                }
              }
            },
            {
              splitLine: { show: false },
              type: 'value',
              name: '增长率',
              min: 0,
              max: 100,
              interval: 20,
              axisLabel: {
                formatter: '{value}%'
              },
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              },
              axisPointer: {
                label: {
                  color: '#fff',
                  backgroundColor: '#333',
                  shadowColor: 'transparent'
                }
              }
            }
          ],
          series: [
            {
              name: '用户数量',
              type: 'bar',
              barWidth: '50%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#69f0cd' },
                      // {offset: 0.5, color: '#188df0'},
                      { offset: 1, color: '#1ca3f9' }
                    ]
                  )
                }
              },
              data: [10, 100, 258, 400, 984, 52, 14, 23, 90, 1000, 1254, 1500]
            },
            {
              name: '增长率',
              type: 'line',
              yAxisIndex: 1,
              smooth: true,
              showSymbol: false,
              data: [10, 20, 50, 25, 73, 87, 64, 41, 50, 69, 100, 1],
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#ff6600' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#f6e40c' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ]
        },
        chart2Options: {
          legend: {
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            formatter: '{b}: {c} ({d}%)'
          },
          grid: {
            // show: false
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['40%', '50%'],
              label: { formatter: '{d}%', color: '#fff' },
              data: [
                {
                  value: 58, name: '控制器',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#1fa6f7' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#5ee5d3' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 10, name: '新风机',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ace296' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#23a400' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 12, name: '检测探头',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ffd500' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ff6b00' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 20, name: '净化器',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ba9af0' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#7035d1' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              ]
            }
          ]
        },
        chart3Options: {
          legend: {
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            formatter: '{b}: {c} ({d}%)'
          },
          grid: {
            // show: false
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            containLabel: true
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['40%', '50%'],
              label: { formatter: '{d}%', color: '#fff' },
              data: [
                {
                  value: 58, name: '控制器',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#1fa6f7' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#5ee5d3' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 10, name: '新风机',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ace296' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#23a400' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 12, name: '检测探头',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ffd500' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#ff6b00' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                },
                {
                  value: 20, name: '净化器',
                  itemStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: '#ba9af0' // 0% 处的颜色
                      }, {
                        offset: 1, color: '#7035d1' // 100% 处的颜色
                      }],
                      globalCoord: false // 缺省为 false
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
