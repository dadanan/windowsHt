<template>
  <div class="bdp">
    <div class="bdp__container">
      <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="bdp-effect">
      </vue-particles>
      <div class="bdp__title">
        <div class="bdp-sprite bdp-sprite--back bdp-back" @click="back">
          返回
        </div>
      </div>
      <div class="bdp__content">
        <div class="bdp__row">
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">室外天气</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog" @click="selectLocationDialogVisible = true"></div>
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
                          <div class="bdp-weather__text1 bdp-weather__mb1">{{ prov }} {{city}}  {{district}}</div>
                          <div class="bdp-weather__text2">{{dates}}</div>
                        </div>
                        <div>
                          <div class="bdp-weather__text6 bdp-weather__mb2">空气质量: <span class="bdp-weather__text7 bdp-sprite bdp-sprite--bad">良</span></div>
                          <div class="bdp-weather__text6 bdp-weather__mb2">湿度: {{datas.outerHum}}</div>
                          <div class="bdp-weather__text6">PM2.5: {{datas.outerPm}}ug/m3</div>
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
                              <div class="bdp-weather__text3 bdp-weather__mr1">{{datas.outerTem}}</div>
                            </div>
                            <div class="col">
                              <div class="row col vcenter">
                                <div class="bdp-weather__text4">℃</div>
                                <div class="bdp-weather__text5">{{datas.weather}}</div>
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
                  <div class="bdp-sprite bdp-sprite--cog" @click="deviceDialogVisible = true"></div>
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
                  <div class="bdp-sprite bdp-sprite--cog" @click="userDialogVisible = true"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="userDataChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">设备型号</div>
                <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog" @click="deviceTypeDialogVisible = true"></div>
                </div>
              </div>
              <div class="bdp__panel-body">
                <chart :options="deviceTypeChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__map-panel">
              <chart-device-map></chart-device-map>
              <div class="bdp-count">
                <div class="row">
                  <div class="col full">
                    <div class="row col center vcenter">
                      <div class="bdp-count__text1">设备总数 (台)</div>
                      <div class="bdp-count__text2">{{deviceOfflineCount}}</div>
                    </div>
                  </div>
                  <div class="col full">
                    <div class="row col center vcenter">
                      <div class="bdp-count__text1">用户总数 (人)</div>
                      <div class="bdp-count__text3">{{totalUserCount}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bdp-map-back bdp-sprite bdp-sprite--backbtn"></div>
              <div class="bdp-map-full bdp-sprite bdp-sprite--full"></div>
              <div class="bdp-map-cog bdp-sprite bdp-sprite--cog"></div>
            </div>
            <div class="bdp__project-panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">工程案例</div>
                <!-- <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog" @click="handleShowProjectDropdown"></div>
                  <div class="project-dropdown" :class="{ 'show': showProjectDropdown }">
                    <span>设置</span>
                    <span>添加案例</span>
                    <span>设备分析</span>
                    <span>用户分析</span>
                    <span>订单分析</span>
                    <span>空气质量</span>
                  </div>
                </div> -->
              </div>
              <div class="bdp__panel-body advertisement">
                <div class="bdp-project-list">
                  <div class="bdp-project-list__item" @click="handleProject(item.id)" v-for="item in alarmList" :key="item.id">
                    <div class="bdp-project-list__item__img" v-if="(item.imgList).length > 0">
                      <img :src="item.imgList[0]" alt="item.name">
                    </div>
                    <div class="bdp-project-list__item__img" v-else>
                      <!-- <img :src="item.imgList[0]" alt="item.name"> -->
                    </div>
                    <div class="bdp-project-list__item__text">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bdp__col">
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">最新消息</div>
                <!-- <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div> -->
              </div>
              <div class="bdp__panel-body">
                <div class="bdp-message-list">
                  <div class="bdp-message-list__item" v-for = "item in queryWarnJobs" :key = 'item.id'>
                    <div class="bdp-sprite bdp-sprite--laba"></div>
                    <div class="bdp-message-list__item__text">{{item.description}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">解决方案</div>
                <!-- <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div> -->
              </div>
             <div class="bdp__panel-body bdp__panel-body--mini">
                <div class="bdp-solution-list">
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--bieshu"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">方案概览</div>
                  </div>
                  <div class="bdp-solution-list__item" @click="handleSolution">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--dafang"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">别墅大宅</div>
                  </div>
                  <div class="bdp-solution-list__item" @click="single">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--jujia"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">独栋别墅</div>
                  </div>
                  <div class="bdp-solution-list__item" @click="building">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--bangong"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">建筑楼宇</div>
                  </div>
                  <div class="bdp-solution-list__item" @click="air">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--xuexiao"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">新风热泵</div>
                  </div>
                  <div class="bdp-solution-list__item" @click="radiation">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--yiyuan"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">辐射空调</div>
                  </div>
                  <div class="bdp-solution-list__item"  @click="iap">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--shangchang"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">空气监测</div>
                  </div>
                  <div class="bdp-solution-list__item">
                    <div class="bdp-solution-list__item__img bdp-sprite bdp-sprite--iconbg">
                      <div class="bdp-sprite bdp-sprite--zhantin"></div>
                    </div>
                    <div class="bdp-solution-list__item__text">能源管理</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">告警信息</div>
                <!-- <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog" @click="alarmDialogVisible = true"></div>
                </div> -->
              </div>
              <div class="bdp__panel-body">
                <chart :options="alarmInfoChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
            <div class="bdp__panel">
              <div class="bdp__panel-title">
                <div class="bdp__panel-title__text">维护信息</div>
                <!-- <div class="bdp__panel-title__opt">
                  <div class="bdp-sprite bdp-sprite--cog"></div>
                </div> -->
              </div>
              <div class="bdp__panel-body">
                <chart :options="fixInfoChartOptions" class="bdp-chart"></chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <select-location-dialog :visible.sync="selectLocationDialogVisible" @weather='weather'></select-location-dialog>
    <alarm-dialog :visible.sync="alarmDialogVisible"></alarm-dialog>
    <device-type-dialog :visible.sync="deviceTypeDialogVisible"></device-type-dialog>
    <device-dialog :visible.sync="deviceDialogVisible"></device-dialog>
    <user-dialog :visible.sync="userDialogVisible"></user-dialog>
  </div>
</template>


<script>
import echarts from 'echarts'
import ChartDeviceMap from './compoments/ChartDeviceMap2'
import * as screenfull from 'screenfull'
import SelectLocationDialog from './compoments/SelectLocationDialog'
import AlarmDialog from './compoments/AlarmDialog'
import DeviceTypeDialog from './compoments/DeviceTypeDialog'
import DeviceDialog from './compoments/DeviceDialog'
import UserDialog from './compoments/UserDialog'
import { getCity } from '@/utils/auth'

import {
  selectCustomerUserCount,
  selectTypePercent,
  selectDeviceCount,
  typePercent,
  queryHomePageStatistic,
  queryWeather,
  queryMaintenance,
  queryWarnData
} from '@/api/big-picture-mode/bigPictureMode'
import { EngList , queryWarnJob } from '@/api/alarm'


export default {
  data() {
    return {
      dates: this.times() ,
      deviceOfflineCount:0,
      totalUserCount:0,
      userCount: [],
      addCount: [],
      addPercent: [],
      devAddPercent: [],
      deviceCount: [],
      devAddCount: [],
      showProjectDropdown: false,
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
            // min: 0,
            // max: 500000,
            // interval: 10,
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
            // min: 0,
            // max: 100000000,
            // interval: 100,
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
            name: '用户数量',
            // min: 0,
            // max: 10000000,
            // interval: 10,
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
            // min: 0,
            // max: 10000000,
            // interval: 50,
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
                value: 90,
                name: '设备类型1',
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
                name: '设备类型2',
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
              },{
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
                        color: '#d662c4' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#f71b73' // 100% 处的颜色
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
          dimensions: ['月份', '维保数量'],
          source: [
            { 月份: '1月', 软件升级: 10, 滤芯维护: 45, 传感器校准: 93 },
            { 月份: '2月', 软件升级: 23, 滤芯维护: 53, 传感器校准: 80 },
            { 月份: '3月', 软件升级: 12, 滤芯维护: 60, 传感器校准: 82 },
            { 月份: '4月', 软件升级: 21, 滤芯维护: 33, 传感器校准: 70 },
            { 月份: '5月', 软件升级: 7, 滤芯维护: 12, 传感器校准: 50 },
            { 月份: '6月', 软件升级: 2, 滤芯维护: 98, 传感器校准: 31 }
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
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#1ba1fa' },
                  { offset: 1, color: '#69f0cd' }
                ])
              }
            }
          },
          // {
          //   type: 'bar',
          //   itemStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: '#6f47d2' },
          //         { offset: 1, color: '#2599fb' }
          //       ])
          //     }
          //   }
          // },
          // {
          //   type: 'bar',
          //   itemStyle: {
          //     normal: {
          //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //         { offset: 0, color: '#ff7200' },
          //         { offset: 1, color: '#ffe000' }
          //       ])
          //     }
          //   }
          // }
        ]
      },
      selectLocationDialogVisible: false,
      alarmDialogVisible: false,
      deviceTypeDialogVisible: false,
      deviceDialogVisible: false,
      userDialogVisible: false,
      datas:{},
      district:'朝阳区',
      city:'北京',
      prov:'北京',
      chanId:0,
      query: {
        limit: 8,
        page: 1
      },
      query1: {
        limit: 6,
        page: 1
      },
      alarmList:[],
      queryWarnJobs:[]
    }
  },
  components: {
    ChartDeviceMap,
    SelectLocationDialog,
    AlarmDialog,
    DeviceTypeDialog,
    DeviceDialog,
    UserDialog
  },
  methods: {
    times() {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
    },
    EngList() {
      EngList(this.query).then(res => {
        this.alarmList = res.data.projectRspPoList
        // console.log(this.alarmList)
      })
    },
    queryWarnData() {
      queryWarnData().then(res => {
        // console.log(res.data)
        const list = res.data
        for(var i = 0;i<list.length;i++){
          this.alarmInfoChartOptions.series[0].data[i].value = list[i].num
          this.alarmInfoChartOptions.series[0].data[i].name = list[i].name
        }
      })
    },
    queryMaintenance() {
      queryMaintenance().then(res => {
        const list = res.data
        const lists = []
        for(var i = 0;i<list.length;i++){
          lists.push({"月份":list[i].dateStr,"维保数量":list[i].num})
        }
        this.fixInfoChartOptions.dataset.source = lists
      })
    },
    queryWarnJob() {
      queryWarnJob(this.query1).then(res => {
        this.queryWarnJobs = res.data.projectJobInfoList
        // console.log(this.queryWarnJobs)
      })
    },

    queryWeather(){
      if(unescape(getCity())){
        const s = unescape(getCity())
        const ss = s.split(',')
        this.city = ss[0]
        this.prov = ss[1]
        this.district = ss[2]
        queryWeather({"location":this.city}).then(res=>{
            this.datas = res.data
        })
      }else{
        queryWeather({"location":this.city}).then(res=>{
            this.datas = res.data
        })
      }
      
    },
    weather(data){
      // console.log(data)
      this.datas = data.weathers
      this.datas.outerTem = this.datas.outerTem.substring(0,(this.datas.outerTem.length-1))
      this.prov = data.prov
      this.city = data.city
      this.district = data.district
    },
    back() {
      this.$router.back()
      if (screenfull.enabled) {
        screenfull.exit()
      }
    },
    selectCustomerUserCount() {
      selectCustomerUserCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.addCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.addPercent.push(0)
          } else {
            this.addPercent.push(res.data[i].addPercent.substring(0, (res.data[i].addPercent.length-4)))
          }
          this.userCount.push(res.data[i].userCount)
        }
        this.userDataChartOptions.series[0].data = this.userCount
        this.userDataChartOptions.series[1].data = this.addPercent
      })
    },
    selectDeviceCount() {
      selectDeviceCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.devAddCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.devAddPercent.push(0)
          } else {
            this.devAddPercent.push(res.data[i].addPercent.substring(0, (res.data[i].addPercent.length-4)))
          }
          this.deviceCount.push(res.data[i].deviceCount)
        }
        this.deviceDataChartOptions.series[0].data = this.deviceCount
        this.deviceDataChartOptions.series[1].data = this.devAddPercent
      })
    },
    typePercent() {
      typePercent().then(res => {
        const deviceTypeChartOptions = this.deviceTypeChartOptions.series[0]
        for (let i = 0; i < res.data.length; i++) {
          deviceTypeChartOptions.data[i].value = res.data[i].typePercent.substring(0, (res.data[i].typePercent.length-4))
          deviceTypeChartOptions.data[i].name = res.data[i].typeName
        }
      })
    },
    queryHomePageStatistic() {
      queryHomePageStatistic().then(res => {
        this.totalUserCount = res.data.totalUserCount
        this.deviceOfflineCount = res.data.deviceTotalCount
      })
    },
    handleShowProjectDropdown() {
      this.showProjectDropdown = !this.showProjectDropdown
    },
    handleSolution() {
      // let {href} = this.$router.resolve({path: `/big-picture-mode/solution/villa`,name: 'big-picture-mode-villa'});
      // window.open(href, '_blank');
      this.$router.push({ name: 'big-picture-mode-villa' })
    },
    single() {
      // let {href} = this.$router.resolve({ name: 'big-picture-mode-floor' })
      // window.open(href, '_blank');
      this.$router.push({ name: 'big-picture-mode-floor' })
    },
    building() {
      this.$router.push({ name: 'big-picture-mode-constant' })
    },
    air() {
      this.$router.push({ name: 'big-picture-mode-air' })
    },
    radiation() {
      this.$router.push({ name: 'big-picture-mode-combination' })
    },

    iap() {
      this.$router.push({ name: 'big-picture-mode-iaq' })
    },
    handleProject(val) {
      this.chanId = val
      this.$router.push({
        path: '/big-picture-mode/project',
        query:{
          ids:this.chanId
        }
      })
    }
  },
  created() {
    this.selectCustomerUserCount()
    this.typePercent()
    this.selectDeviceCount()
    this.queryHomePageStatistic()
    this.EngList()
    this.queryWeather()
    this.queryWarnJob()
    this.queryMaintenance(),
    this.queryWarnData()
  }
}
</script>

<style lang="scss" scoped>
.project-dropdown {
  display: none;
  position: absolute;
  top: 34px;
  right: 0;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #0a4e7f;
  font-weight: normal;
  text-align: center;
  width: 150px;

  &.show {
    display: flex;
  }
  span {
    line-height: 40px;
    padding: 0 40px;
    font-size: 15px;
    border-bottom: 1px solid #0a4e7f;
    cursor: pointer;
    &:hover {
      color: #008dff;
    }
  }
  span:nth-child(1) {
    font-size: 20px;
    cursor: unset;
    &:hover {
      color: #fff;
    }
  }
}

.bdp-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px;
}

.bdp-map-full {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 63px;
}

.bdp-map-cog {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.bdp-map-back {
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
}

.bdp-back {
  text-indent: 18px;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  top: 6px;
  left: 30px;
  position: relative;
}

.bdp-count {
  background: url('/static/images/bdp_count_bg.png');
  width: 417px;
  height: 75px;
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  margin: auto;

  &__text1 {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    color: rgb(255, 255, 255);
    margin-bottom: 5px;
  }

  &__text2,
  &__text3 {
    font-size: 25px;
    font-family: 'Microsoft YaHei';
    color: rgb(91, 255, 232);
    font-weight: bold;
  }

  &__text3 {
    color: #ffc600;
  }
}

.bdp-message-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // height: 100%;
  &__item {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    font-size: 12px;
    font-family: 'Microsoft YaHei', serif;
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
  .text_ss{
    cursor: pointer;
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
      text-align: left;
      font-size: 12px;
      font-family: 'Microsoft YaHei', serif;
      color: rgb(0, 180, 255);
      margin-top: 5px;
    }
  }
}

.advertisement {
  height: 253px;
}

.bdp-project-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  overflow: auto;
  &__item {
    cursor: pointer;
    margin-bottom: 10px;
    &__img {
      width: 172px;
      height: 82px;
      background-size: 100%, 100%;
      background: rgba(2, 177, 252, 0.26)
        url('/static/images/bdp_project_item_panel.png') no-repeat;
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
      font-family: 'Microsoft YaHei', serif;
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
  /* 滚动条 */
  ::-webkit-scrollbar-thumb:horizontal {
    /*水平滚动条的样式*/
    width: 0px;
  }
  ::-webkit-scrollbar {
    width: 2px; /*滚动条的宽度*/
  }
  ::-webkit-scrollbar-thumb:vertical {
    /*垂直滚动条的样式*/
    -webkit-border-radius: 4px;
    outline-offset: -2px;
    border: 2px solid #0b2a57;
  }

  &__container {
    width: 1920px;
    height: 1080px;
    background: url('/static/images/bdp_topbar.png') no-repeat,
      url('/static/images/bdp_bg.jpg') no-repeat;
    background-size: 100%, 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__title {
    height: 85px;
    position: relative;
  }

  &__panel {
    width: 452px;
    height: 222px;
    background: url('/static/images/bdp_panel.png') no-repeat;
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
    background: url('/static/images/bdp_map_panel.png') no-repeat;
    background-size: 100%;
    height: 630px;
    position: relative;
  }

  &__project-panel {
    width: 852px;
    height: 292px;
    background: url('/static/images/bdp_project_panel.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
  }

  &__panel-title {
    position: relative;
    height: 39px;
    line-height: 39px;
    font-size: 18px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    &__text {
      text-align: center;
      width: 170px;
    }

    &__opt {
      position: relative;
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
    position: relative;
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
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
  }

  &__text2 {
    font-size: 14px;
    font-family: 'Microsoft YaHei', serif;
    color: rgb(0, 180, 255);
  }

  &__text6 {
    font-size: 14px;
    font-family: 'Microsoft YaHei', serif;
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
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
    font-size: 42px;
  }

  &__text4 {
    font-family: 'Microsoft YaHei', serif;
    color: rgb(255, 255, 255);
    font-size: 14px;
  }

  &__text5 {
    font-family: 'Microsoft YaHei', serif;
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
  background-image: url('/static/images/bdp_sprite.png');

  &--cog {

    background-position: -84px -59px;
    // background: url(./solution/assets/fa.png) no-repeat center center;
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
    // background-position: -1px -3px;
    background: url(./solution/assets/fa.png) no-repeat center center;
    width: 35px;
    height: 34px;
  }

  &--dafang {
    background: url(./solution/assets/bss.png) no-repeat center center;
    // background-position: -51px -2px;
    width: 35px;
    height: 35px;
  }

  &--jujia {
    // background-position: -101px -8px;
    background: url(./solution/assets/dd.png) no-repeat center center;
    width: 37px;
    height: 29px;
  }

  &--bangong {
    // background-position: -153px -4px;
    background: url(./solution/assets/ly.png) no-repeat center center;
    width: 33px;
    height: 33px;
  }

  &--xuexiao {
    // background-position: -300px 0;
    background: url(./solution/assets/xf.png) no-repeat center center;
    width: 37px;
    height: 37px;
  }

  &--yiyuan {
    // background-position: -250px -2px;
    background: url(./solution/assets/fs.png) no-repeat center center;
    width: 35px;
    height: 35px;
  }

  &--shangchang {
    // background-position: -201px -2px;
    background: url(./solution/assets/kq.png) no-repeat center center;
    width: 34px;
    height: 35px;
  }

  &--zhantin {
    // background-position: -352px -3px;
    background: url(./solution/assets/ny.png) no-repeat center center;

    width: 33px;
    height: 34px;
  }

  &--laba {
    background-position: -179px -62px;
    width: 16px;
    height: 14px;
  }

  &--back {
    background-position: 0 -142px;
    width: 131px;
    height: 42px;
  }

  &--full {
    background-position: -46px -58px;
    width: 23px;
    height: 23px;
  }
}
.sd{
  background: url(./project/assets/fanganzhizuo_huaban.png) no-repeat center center;
  width:20px;
  height: 20px;
  background-size: 100% 100%;
}
.bdp-chart {
  height: 100%;
  width: 100%;
}
</style>
