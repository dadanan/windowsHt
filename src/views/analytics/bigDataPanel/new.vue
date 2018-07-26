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
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="deviceTypeChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__map-panel"></div>
            <div class="bdp__project-panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">工程案例</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <div class="bdp-project-list">
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project1.jpg" alt="龙湖一期">
                    </div>
                    <div class="bdp-project-list__item__text">龙湖一期</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project2.jpg" alt="九亭工坊">
                    </div>
                    <div class="bdp-project-list__item__text">九亭工坊</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project3.jpg" alt="桃浦智创">
                    </div>
                    <div class="bdp-project-list__item__text">桃浦智创</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project4.jpg" alt="恒大丽宫">
                    </div>
                    <div class="bdp-project-list__item__text">恒大丽宫</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project5.jpg" alt="新微大厦">
                    </div>
                    <div class="bdp-project-list__item__text">新微大厦</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project6.jpg" alt="万科虹桥">
                    </div>
                    <div class="bdp-project-list__item__text">万科虹桥</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project7.jpg" alt="绿地大厦">
                    </div>
                    <div class="bdp-project-list__item__text">绿地大厦</div>
                  </div>
                  <div class="bdp-project-list__item">
                    <div class="bdp-project-list__item__img">
                      <img src="/static/images/bdp_project8.jpg" alt="万达武汉">
                    </div>
                    <div class="bdp-project-list__item__text">万达武汉</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">最新消息</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <div class="bdp-message-list">
                  <div class="bdp-message-list__item">
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容</div>
                  </div>
                  <div class="bdp-message-list__item">
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容</div>
                  </div>
                  <div class="bdp-message-list__item">
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容</div>
                  </div>
                  <div class="bdp-message-list__item">
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容</div>
                  </div>
                  <div class="bdp-message-list__item">
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容最新消息文字内容</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">解决方案</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body bdp__panel-body--mini">
                <div class="bdp-solution-list">
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--bieshu"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">别墅</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--dafang"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">大房</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--jujia"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">居家</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--bangong"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">办公</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--xuexiao"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">学校</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--yiyuan"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">医院</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--shangchang"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">商场</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--zhantin"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">展厅</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">告警信息</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="alarmInfoChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">维护信息</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="fixInfoChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bdp-message-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    &__item {
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      font-size: 12px;
      font-family: "Microsoft YaHei", serif;
      color: rgb(255, 255, 255);
      line-height: 2.5;
      white-space: nowrap;
      .bdp-sprite {
        margin-right: 15px;
      }

      &__text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .bdp-solution-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100%;
    &__item {
      cursor: pointer;
      flex: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &__img {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__text {
        text-align: center;
        font-size: 12px;
        font-family: "Microsoft YaHei", serif;
        color: rgb(0, 180, 255);
        margin-top: 5px;
      }
    }
  }

  .bdp-project-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100%;
    &__item {
      cursor: pointer;
      &__img {
        width: 172px;
        height: 87px;
        background-size: 100%, 100%;
        background: rgba(2, 177, 252, 0.26) url("/static/images/bdp_project_item_panel.png") no-repeat;
        padding: 8px;

        img {
          display: block;
          height: 100%;
          width: 100%;
        }
      }
      &__text {
        margin-top: 5px;
        font-size: 14px;
        font-family: "Microsoft YaHei", serif;
        color: rgb(255, 255, 255);
        text-align: center;
      }
    }
  }

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

      &--mini {
        padding: 5px;
      }

      &--medium {
        padding: 10px;
      }
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
      display: flex;
      flex-direction: column;
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

    &--iconbg {
      background-position: -210px -49px;
      width: 59px;
      height: 59px;
    }

    &--bieshu {
      background-position: -1px -3px;
      width: 35px;
      height: 34px;
    }

    &--dafang {
      background-position: -51px -2px;
      width: 35px;
      height: 35px;
    }

    &--jujia {
      background-position: -101px -8px;
      width: 37px;
      height: 29px;
    }

    &--bangong {
      background-position: -153px -4px;
      width: 33px;
      height: 33px;
    }

    &--xuexiao {
      background-position: -300px 0;
      width: 37px;
      height: 37px;
    }

    &--yiyuan {
      background-position: -250px -2px;
      width: 35px;
      height: 35px;
    }

    &--shangchang {
      background-position: -201px -2px;
      width: 34px;
      height: 35px;
    }

    &--zhantin {
      background-position: -352px -3px;
      width: 33px;
      height: 34px;
    }

    &--laba {
      background-position: -179px -62px;
      width: 16px;
      height: 14px;
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
        },
        deviceTypeChartOptions: {
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
                  value: 58, name: '设备类型1',
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
                  value: 10, name: '设备类型2',
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
                  value: 12, name: '设备类型3',
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
                  value: 20, name: '设备类型4',
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
        alarmInfoChartOptions: {
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
                  value: 58, name: '已处理',
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
                  value: 10, name: '处理中',
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
                  value: 12, name: '待处理',
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
                  value: 20, name: '其他',
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
        fixInfoChartOptions: {
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
          tooltip: {},
          dataset: {
            dimensions: ['月份', '软件升级', '滤芯维护', '传感器校准'],
            source: [
              { '月份': '1月', '软件升级': 10, '滤芯维护': 45, '传感器校准': 93 },
              { '月份': '2月', '软件升级': 23, '滤芯维护': 53, '传感器校准': 80 },
              { '月份': '3月', '软件升级': 12, '滤芯维护': 60, '传感器校准': 82 },
              { '月份': '4月', '软件升级': 21, '滤芯维护': 33, '传感器校准': 70 },
              { '月份': '5月', '软件升级': 7, '滤芯维护': 12, '传感器校准': 50 },
              { '月份': '6月', '软件升级': 2, '滤芯维护': 98, '传感器校准': 31 }
            ]
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            splitLine: { show: false },
            type: 'value',
            name: '次数',
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
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#1ba1fa' },
                      { offset: 1, color: '#69f0cd' }
                    ]
                  )
                }
              }
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#6f47d2' },
                      { offset: 1, color: '#2599fb' }
                    ]
                  )
                }
              }
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#ff7200' },
                      { offset: 1, color: '#ffe000' }
                    ]
                  )
                }
              }
            }
          ]
        }
      }
    }
  }
</script>

