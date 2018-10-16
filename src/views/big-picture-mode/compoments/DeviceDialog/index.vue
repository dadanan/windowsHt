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
  font-family: 'Microsoft YaHei', serif;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);

  * {
    font-family: 'Microsoft YaHei', serif;
  }
}

.dialog {
  padding: 65px 9px 9px;
  width: 1277px;
  height: 657px;
  background: url('./assets/bg.png');
  margin: auto;
  position: relative;
  display: flex;

  &__wtf {
    background: url('assets/button-group.png');
    width: 386px;
    height: 36px;
    position: absolute;
    bottom: 29px;
    right: 29px;
  }

  &__chart1,
  &__chart2,
  &__chart3 {
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
import {
  selectDeviceCount,
  selectTypePercent
} from '@/api/big-picture-mode/bigPictureMode'
export default {
  props: ['visible'],
  data() {
    return {
      devAddPercent: [],
      deviceCount: [],
      devAddCount: [],
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
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
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
            name: '设备数量',
            min: 0,
            max: 50,
            interval: 10,
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
            max: 600,
            interval: 50,
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
            name: '设备数量',
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2797fa' },
                  // {offset: 0.5, color: '#188df0'},
                  { offset: 1, color: '#6f47d2' }
                ])
              }
            },
            data: []
          },
          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            showSymbol: false,
            data: [],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#ff6600' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#f6e40c' // 100% 处的颜色
                  }
                ],
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
                value: 58,
                name: '控制器',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#1fa6f7' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5ee5d3' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              {
                value: 10,
                name: '新风机',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ace296' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#23a400' // 100% 处的颜色
                      }
                    ],
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
                value: 58,
                name: '控制器',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#1fa6f7' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#5ee5d3' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              {
                value: 10,
                name: '新风机',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ace296' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#23a400' // 100% 处的颜色
                      }
                    ],
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
    },
    selectDeviceCount() {
      selectDeviceCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.devAddCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.devAddPercent.push(0)
          } else {
            this.devAddPercent.push(res.data[i].addPercent.substring(0, 3))
          }
          this.deviceCount.push(res.data[i].deviceCount)
        }
        this.chart1Options.series[0].data = this.deviceCount
        this.chart1Options.series[1].data = this.devAddPercent
      })
    },
    selectTypePercent() {
      selectTypePercent().then(res => {
        const chart3Options = this.chart3Options.series[0]
        const chart2Options = this.chart2Options.series[0]
        for (let i = 0; i < res.data.length; i++) {
          chart3Options.data[i].value = res.data[i].typePercent.substring(0, 3)
          chart3Options.data[i].name = res.data[i].typeName
          chart2Options.data[i].value = res.data[i].typePercent.substring(0, 3)
          chart2Options.data[i].name = res.data[i].typeName
        }
      })
    }
  },
  created() {
    this.selectDeviceCount()
    this.selectTypePercent()
  }
}
</script>
