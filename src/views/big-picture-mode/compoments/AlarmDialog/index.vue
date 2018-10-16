<template>
  <div class="modal" v-show="visible" @click.self="handleClose">
    <div class="dialog">
      <div class="dialog__alarm1">
        <span>总告警数（起）</span>
        <span>1082</span>
      </div>
      <div class="dialog__alarm2">
        已处理：1047
      </div>
      <div class="dialog__alarm3">
        处理中：39
      </div>
      <div class="dialog__alarm4">
        待处理：14
      </div>
      <div class="dialog__alarm5">
        最长处理时间：47小时58分钟
      </div>
      <table class="dialog__table">
        <tr>
          <th>已处理</th>
          <th>未处理</th>
          <th>处理中</th>
          <th>误告警</th>
        </tr>
        <tr>
          <td>传感器告警</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>订单异常</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>滤网过期</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
      <div class="dialog__close" @click.self="handleClose"></div>
      <chart :options="alarmChartOptions" class="dialog__alarm-chart"></chart>
      <chart :options="alarmChart2Options" class="dialog__alarm-chart2"></chart>
      <chart :options="alarmChart3Options" class="dialog__alarm-chart3"></chart>
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
  width: 1277px;
  height: 657px;
  background: url('./assets/bg.png');
  margin: auto;
  position: relative;

  &__wtf {
    background: url('assets/button-group.png');
    width: 386px;
    height: 36px;
    position: absolute;
    bottom: 49px;
    right: 29px;
  }

  &__alarm-chart {
    position: absolute;
    top: 65px;
    left: 9px;
    width: 507px;
    height: 360px;
  }

  &__alarm-chart2 {
    position: absolute;
    bottom: 108px;
    right: 8px;
    width: 507px;
    height: 200px;
  }

  &__alarm-chart3 {
    position: absolute;
    top: 120px;
    right: 30px;
    width: 450px;
    height: 200px;
  }

  &__alarm1 {
    position: absolute;
    top: 105px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    span:nth-child(1) {
      font-size: 11.674px;
      font-family: 'Microsoft YaHei', serif;
      color: rgb(0, 180, 255);
    }
    span:nth-child(2) {
      font-size: 30px;
      font-family: 'Microsoft YaHei', serif;
      color: rgb(255, 255, 255);
      font-weight: bold;
    }
  }

  &__alarm2 {
    position: absolute;
    top: 206px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-size: 10px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
  }

  &__alarm3 {
    position: absolute;
    top: 255px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-size: 10px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
  }

  &__alarm4 {
    position: absolute;
    top: 304px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-size: 10px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
  }

  &__alarm5 {
    position: absolute;
    top: 355px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-size: 10px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
  }

  &__table {
    position: absolute;
    bottom: 43px;
    left: 28px;
    border-collapse: collapse;
    border: solid #008dff;
    border-width: 1px 0 0 1px;
    width: 680px;
    background-color: rgba(0, 0, 0, 0.24);
    th,
    td {
      border: solid #008dff;
      border-width: 0 1px 1px 0;
    }
    th {
      line-height: 40px;
      font-size: 20px;
      color: #008dff;
    }
    td {
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      text-align: center;
    }
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
      alarmChartOptions: {
        legend: {
          bottom: 0,
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
            // center: ['40%', '50%'],
            label: { formatter: '{d}%', color: '#fff' },
            data: [
              {
                value: 58,
                name: '已处理',
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
                name: '处理中',
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
              },
              {
                value: 12,
                name: '待处理',
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
                        color: '#ffd500' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#ff6b00' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              {
                value: 20,
                name: '其他',
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
                        color: '#ba9af0' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#7035d1' // 100% 处的颜色
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
      alarmChart2Options: {
        legend: {
          orient: 'vertical',
          right: 40,
          top: 60,
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
            radius: ['30%', '70%'],
            center: ['40%', '50%'],
            roseType: 'radius',
            label: { formatter: '{d}%', color: '#fff' },
            data: [
              {
                value: 58,
                name: '传感器告警',
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
                name: '订单异常',
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
              },
              {
                value: 12,
                name: '滤网过期',
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
                        color: '#ffd500' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#ff6b00' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              {
                value: 20,
                name: '电机异常',
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
                        color: '#ba9af0' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#7035d1' // 100% 处的颜色
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
      alarmChart3Options: {
        color: ['#ff6600', '#2797fa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        // legend: {
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
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
            name: '告警数量',
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#69f0cd' },
                  // {offset: 0.5, color: '#188df0'},
                  { offset: 1, color: '#1ca3f9' }
                ])
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
