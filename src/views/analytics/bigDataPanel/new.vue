<template>
  <div class="bdp">
    <div class="bdp__container">
      <div class="bdp__title"></div>
      <div class="bdp__content">
        <div class="bdp__row">
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">室外天气</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <div class="bdp-weather">
                  <div class="row">
                    <div class="col">
                      <div class="bdp-sprite bdp-sprite--pos bdp-weather__pos"></div>
                    </div>
                    <div class="col">
                      <div class="row col space-between">
                        <div>
                          <div class="bdp-weather__text1 bdp-weather__mb1">上海 普陀区</div>
                          <div class="bdp-weather__text2">2018-07-07 13:28 周三</div>
                        </div>
                        <div>
                          <div class="bdp-weather__text6 bdp-weather__mb2">空气质量: <span
                            class="bdp-weather__text7 bdp-sprite bdp-sprite--bad">良</span></div>
                          <div class="bdp-weather__text6 bdp-weather__mb2">湿度: 53%</div>
                          <div class="bdp-weather__text6">PM2.5: 58ug/m3</div>
                        </div>
                      </div>
                    </div>
                    <div class="col full">
                      <div class="row col space-between center">
                        <div>
                          <div class="bdp-sprite bdp-sprite--sun"></div>
                        </div>
                        <div>
                          <div class="row">
                            <div class="col">
                              <div class="bdp-weather__text3 bdp-weather__mr1">24</div>
                            </div>
                            <div class="col">
                              <div class="row col vcenter">
                                <div class="bdp-weather__text4">℃</div>
                                <div class="bdp-weather__text5">晴</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">设备数据</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="deviceDataChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">用户数据</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="userDataChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">设备类型</div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__map-panel"></div>
            <div class="bdp__project-panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">工程案例</div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">最新消息</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">解决方案</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">告警信息</div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">维护信息</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bdp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1002;
    overflow: auto;

    &__container {
      width: 1920px;
      height: 1080px;
      background: url("/static/images/bdp_topbar.png") no-repeat, url("/static/images/bdp_bg.jpg") no-repeat;
      background-size: 100%, 100%;
      display: flex;
      flex-direction: column;
    }

    &__title {
      height: 85px;
    }

    &__panel {
      width: 452px;
      height: 222px;
      background: url("/static/images/bdp_panel.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
    }

    &__panel-body {
      padding: 15px;
      flex: 1;
    }

    &__map-panel {
      width: 852px;
      background: url("/static/images/bdp_map_panel.png") no-repeat;
      background-size: 100%;
      height: 630px;
    }

    &__project-panel {
      width: 852px;
      height: 292px;
      background: url("/static/images/bdp_project_panel.png") no-repeat;
      background-size: 100% 100%;
    }

    &__panel-title {
      height: 39px;
      line-height: 39px;
      font-size: 18px;
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      &__text {
        text-align: center;
        width: 170px;
      }

      &__opt {
        margin-right: 10px;
        align-items: center;
        display: flex;

        & > * {
          cursor: pointer;
        }
      }
    }

    &__content {
      padding: 10px 30px 36px;
      flex: 1;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    &__col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .bdp-weather {
    height: 100%;

    &__text1 {
      font-size: 18px;
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
    }

    &__text2 {
      font-size: 14px;
      font-family: "Microsoft YaHei", serif;
      color: rgb(0, 180, 255);
    }

    &__text6 {
      font-size: 14px;
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
    }

    &__mb1 {
      margin-bottom: 10px;
    }

    &__mb2 {
      margin-bottom: 15px;
    }

    &__mr1 {
      margin-right: 10px;
    }

    &__text3 {
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
      font-size: 42px;
    }

    &__text4 {
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
      font-size: 14px;
    }

    &__text5 {
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
      font-size: 14px;
    }

    &__text7 {
      display: inline-block;
      text-align: center;
      padding-top: 2px;
    }

    &__pos {
      margin-right: 15px;
    }
  }

  .bdp-sprite {
    background-image: url("/static/images/bdp_sprite.png");

    &--cog {
      background-position: -84px -59px;
      width: 22px;
      height: 22px;
    }

    &--sun {
      background-position: -201px -122px;
      width: 96px;
      height: 96px;
    }

    &--pos {
      background-position: -145px -55px;
      width: 19px;
      height: 26px;
    }

    &--bad {
      background-position: -1px -102px;
      width: 52px;
      height: 20px;
    }
  }

  .bdp-chart {
    height: 100%;
    width: 100%;
  }
</style>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        deviceDataChartOptions: {
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
              name: '设备数量',
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
              name: '设备数量',
              type: 'bar',
              barWidth: '50%',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#2797fa' },
                      // {offset: 0.5, color: '#188df0'},
                      { offset: 1, color: '#6f47d2' }
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
        userDataChartOptions: {
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
        }
      }
    }
  }
</script>

