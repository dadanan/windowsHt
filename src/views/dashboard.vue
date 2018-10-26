<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>
      
    </div>
    <el-row :gutter="20" >
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.设备分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#58D68D' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.用户分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#5DADE2' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.订单分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#AF7AC5' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.环境分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#F5B041' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.告警分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanData.数据展示.分润分析" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#F4D03F' }"></data-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-20">
      <el-col :xs="24" :lg="12" v-for="item in kanbanData.图表展示.设备分析" :key="item.id" v-if="item.isVisible">
        <el-card class="mb20">
          <chart :options="item.options" v-if="item.isVisible" class="chart" auto-resize></chart>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12" v-for="item in kanbanData.图表展示.用户分析" :key="item.id" v-if="item.isVisible">
        <el-card class="mb20">
          <chart :options="item.options" v-if="item.isVisible" class="chart" auto-resize></chart>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog top='4vh' :close-on-click-modal=false title="编辑看板" :visible.sync="dialogEditKanbanVisible" class="kanban-edit">
      <d-title>数据展示</d-title>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="设备分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.设备分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="用户分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.用户分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="环境分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.环境分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="订单分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.订单分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="告警分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.告警分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="分润分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.数据展示.分润分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
      </el-form>
      <d-title>图表展示</d-title>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="设备分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.图表展示.设备分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
        <el-form-item label="用户分析">
          <el-checkbox v-model="item.isVisible" v-for="item in kanbanData.图表展示.用户分析" :key="item.id">{{ item.name }}
          </el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ttt1">测试</el-button>
        <el-button @click="dialogEditKanbanVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogEditKanbanVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import DTitle from '@/components/Title'
import {selectCustomerUserCount,selectTypePercent,selectDeviceCount ,newDeviceCountOfToday} from '@/api/big-picture-mode/bigPictureMode'
import { queryCount } from '@/api/device/list'
export default {
  components: {
    DataCard,
    DTitle
  },
  data() {
    return {
      kanbanData: {
        数据展示: {
          设备分析: [
            {
              id: 0,
              icon: 'hdd',
              name: '当前设备总数',
              value: 852,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '今日设备新增数',
              value: 10,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日设备订单',
              value: 10,
              isVisible: false
            },
            {
              id: 3,
              icon: 'hdd',
              name: '当前设备故障数',
              value: 11,
              isVisible: false
            },
            {
              id: 4,
              icon: 'hdd',
              name: '当前设备在线率',
              value: 80,
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 5,
              icon: 'hdd',
              name: '当前用户总人数',
              value: 760,
              isVisible: false
            },
            {
              id: 6,
              icon: 'hdd',
              name: '昨日用户增长数',
              value:23,
              isVisible: false
            },
            {
              id: 7,
              icon: 'hdd',
              name: '今日活跃用户数',
              value: 671,
              isVisible: false
            },
            {
              id: 8,
              icon: 'hdd',
              name: '昨日用户活跃数',
              value: 604,
              isVisible: false
            },
            {
              id: 9,
              icon: 'hdd',
              name: '当前用户活跃数',
              value: 759,
              isVisible: false
            }
          ],
          环境分析: [
            {
              id: 10,
              icon: 'hdd',
              name: 'PM 2.5 传感器总数',
              value: 843,
              isVisible: false
            },
            {
              id: 11,
              icon: 'hdd',
              name: '甲醛传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 12,
              icon: 'hdd',
              name: 'CO2 传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 13,
              icon: 'hdd',
              name: 'TVOC 传感器数据总数',
              value: 0,
              isVisible: false
            },
            {
              id: 14,
              icon: 'hdd',
              name: '优良环境数',
              value: 718,
              isVisible: false
            },
            {
              id: 15,
              icon: 'hdd',
              name: '优良环境比率',
              value: 80,
              unit: '',
              isVisible: false
            }
          ],
          订单分析: [
            {
              id: 16,
              icon: 'hdd',
              name: '今日订单数',
              value: 10,
              isVisible: false
            },
            {
              id: 17,
              icon: 'hdd',
              name: '昨日订单数',
              value: 40,
              isVisible: false
            },
            {
              id: 18,
              icon: 'hdd',
              name: '昨日订单增长率',
              value: 4,
              isVisible: false
            },
            {
              id: 19,
              icon: 'hdd',
              name: '本月订单数',
              value: 80,
              isVisible: false
            }
          ],
          告警分析: [
            {
              id: 20,
              icon: 'hdd',
              name: '当前设备告警数',
              value: 43,
              isVisible: false
            },
            {
              id: 21,
              icon: 'hdd',
              name: '今日新增告警记录',
              value: 0,
              isVisible: false
            },
            {
              id: 22,
              icon: 'hdd',
              name: '当前设备故障率',
              value: 1,
              isVisible: false
            }
          ],
          分润分析: [
            {
              id: 23,
              icon: 'hdd',
              name: '今日分润账单数',
              value: 28,
              isVisible: false
            },
            {
              id: 24,
              icon: 'hdd',
              name: '今日分润金额',
              value: 0,
              isVisible: false
            }
          ]
        },
        图表展示: {
          设备分析: [
            {
              id: 0,
              name: '设备增加趋势表',
              options: {
                title: {
                  text: '设备增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 1,
              name: '设备地区分布图',
              options: {
                title: {
                  text: '设备地区分布图'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '上海',
                    '江苏',
                    '北京',
                    '浙江',
                    '广东',
                    '湖南'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [70, 137, 218, 102, 90, 90, 170]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 2,
              name: '在线设备占比图',
              options: {
                title: {
                  text: '在线设备占比图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 671, name: '在线设备' },
                      { value: 181, name: '离线设备' }
                    ]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 3,
              name: '设备类型比重图',
              options: {
                title: {
                  text: '设备类型比重图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 10.23, name: 'A型控制器' },
                      { value: 2.73, name: '慧洋环保科技' },
                      { value: 16.15, name: '智慧新风' },
                      { value: 22.26, name: '检测探头' },
                      { value: 1.94, name: '德杯电子净化' }
                    ]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 4,
              name: '公众号设备数量分布',
              options: {
                title: {
                  text: '公众号设备数量分布'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [442, 104, 138, 142, 26]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 5,
              name: '设备增速排名',
              options: {
                title: {
                  text: '设备增速排名'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data:['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
                },
                yAxis: {},
                series: [
                  {
                    name: '增长趋势',
                    data: [2,54,32,18,20],
                    type: 'line'
                  }
                ]
              },
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 6,
              name: '用户增加趋势表',
              options: {
                title: {
                  text: '用户增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '用户总数',
                    type: 'bar',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80]
                  },
                  {
                    name: '增长趋势',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 7,
              name: '本日用户活跃曲线',
              options: {
                title: {
                  text: '本日用户活跃曲线'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '每小时用户数',
                    data: [2,0,0,1,214,673,349,291,416,544,410,593],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: false
            }
          ]
        }
      },
      dialogEditKanbanVisible: false,
      addPercent: [],
      userCount: [],
      addCount: [],
      devAddCount: [],
      devAddPercent: [],
      deviceCount: [],
      devedata: [],
      newDeviceCount: '',
      ttt:false,
      status: 1
    }

  },
  created () {
    this.selectCustomerUserCount()
    this.selectDeviceCount()
    this.selectTypePercent()
    this.newDeviceCountOfToday()
    this.queryCount()
  },
  methods: {
    ttt1(){  
      this.ttt =! this.ttt
      if(this.ttt){
      this.kanbanData={
        数据展示: {
          设备分析: [
            {
              id: 0,
              icon: 'hdd',
              name: '当前设备总数',
              value: 852,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '今日设备新增数',
              value: 10,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日设备订单',
              value: 10,
              isVisible: true
            },
            {
              id: 3,
              icon: 'hdd',
              name: '当前设备故障数',
              value: 11,
              isVisible: true
            },
            {
              id: 4,
              icon: 'hdd',
              name: '当前设备在线率',
              value: 80,
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 5,
              icon: 'hdd',
              name: '当前用户总人数',
              value: 760,
              isVisible: true
            },
            {
              id: 6,
              icon: 'hdd',
              name: '昨日用户增长数',
              value:23,
              isVisible: true
            },
            {
              id: 7,
              icon: 'hdd',
              name: '今日活跃用户数',
              value: 671,
              isVisible: true
            },
            {
              id: 8,
              icon: 'hdd',
              name: '昨日用户活跃数',
              value: 604,
              isVisible: false
            },
            {
              id: 9,
              icon: 'hdd',
              name: '当前用户活跃数',
              value: 759,
              isVisible: false
            }
          ],
          环境分析: [
            {
              id: 10,
              icon: 'hdd',
              name: 'PM 2.5 传感器总数',
              value: 843,
              isVisible: false
            },
            {
              id: 11,
              icon: 'hdd',
              name: '甲醛传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 12,
              icon: 'hdd',
              name: 'CO2 传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 13,
              icon: 'hdd',
              name: 'TVOC 传感器数据总数',
              value: 0,
              isVisible: false
            },
            {
              id: 14,
              icon: 'hdd',
              name: '优良环境数',
              value: 718,
              isVisible: false
            },
            {
              id: 15,
              icon: 'hdd',
              name: '优良环境比率',
              value: 80,
              unit: '',
              isVisible: true
            }
          ],
          订单分析: [
            {
              id: 16,
              icon: 'hdd',
              name: '今日订单数',
              value: 10,
              isVisible: true
            },
            {
              id: 17,
              icon: 'hdd',
              name: '昨日订单数',
              value: 40,
              isVisible: false
            },
            {
              id: 18,
              icon: 'hdd',
              name: '昨日订单增长率',
              value: 4,
              isVisible: false
            },
            {
              id: 19,
              icon: 'hdd',
              name: '本月订单数',
              value: 80,
              isVisible: false
            }
          ],
          告警分析: [
            {
              id: 20,
              icon: 'hdd',
              name: '当前设备告警数',
              value: 43,
              isVisible: true
            },
            {
              id: 21,
              icon: 'hdd',
              name: '今日新增告警记录',
              value: 0,
              isVisible: false
            },
            {
              id: 22,
              icon: 'hdd',
              name: '当前设备故障率',
              value: 1,
              isVisible: false
            }
          ],
          分润分析: [
            {
              id: 23,
              icon: 'hdd',
              name: '今日分润账单数',
              value: 28,
              isVisible: true
            },
            {
              id: 24,
              icon: 'hdd',
              name: '今日分润金额',
              value: 0,
              isVisible: false
            }
          ]
        },
        图表展示: {
          设备分析: [
            {
              id: 0,
              name: '设备增加趋势表',
              options: {
                title: {
                  text: '设备增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 1,
              name: '设备地区分布图',
              options: {
                title: {
                  text: '设备地区分布图'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '上海',
                    '江苏',
                    '北京',
                    '浙江',
                    '广东',
                    '湖南'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [70, 137, 218, 102, 90, 90, 170]
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 2,
              name: '在线设备占比图',
              options: {
                title: {
                  text: '在线设备占比图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 671, name: '在线设备' },
                      { value: 181, name: '离线设备' }
                    ]
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 3,
              name: '设备类型比重图',
              options: {
                title: {
                  text: '设备类型比重图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 10.23, name: 'A型控制器' },
                      { value: 2.73, name: '慧洋环保科技' },
                      { value: 16.15, name: '智慧新风' },
                      { value: 22.26, name: '检测探头' },
                      { value: 1.94, name: '德杯电子净化' }
                    ]
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 4,
              name: '公众号设备数量分布',
              options: {
                title: {
                  text: '公众号设备数量分布'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['环可','英德罗曼', '惠阳','智慧新风', '宝智']
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [26,442, 104, 138,142]
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 5,
              name: '设备增速排名',
              options: {
                title: {
                  text: '设备增速排名'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data:['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
                },
                yAxis: {},
                series: [
                  {
                    name: '增长趋势',
                    data: [2,54,32,18,20],
                    type: 'line'
                  }
                ]
              },
              isVisible: true
            }
          ],
          用户分析: [
            {
              id: 6,
              name: '用户增加趋势表',
              options: {
                title: {
                  text: '用户增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '用户总数',
                    type: 'bar',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80]
                  },
                  {
                    name: '增长趋势',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 7,
              name: '本日用户活跃曲线',
              options: {
                title: {
                  text: '本日用户活跃曲线'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '每小时用户数',
                    data: [2,0,0,1,214,673,349,291,416,544,410,593],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            }
          ]
        }
      }
      }else{
       this.kanbanData= {
        数据展示: {
          设备分析: [
            {
              id: 0,
              icon: 'hdd',
              name: '当前设备总数',
              value: 852,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '今日设备新增数',
              value: 10,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日设备订单',
              value: 10,
              isVisible: false
            },
            {
              id: 3,
              icon: 'hdd',
              name: '当前设备故障数',
              value: 11,
              isVisible: false
            },
            {
              id: 4,
              icon: 'hdd',
              name: '当前设备在线率',
              value: 80,
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 5,
              icon: 'hdd',
              name: '当前用户总人数',
              value: 760,
              isVisible: false
            },
            {
              id: 6,
              icon: 'hdd',
              name: '昨日用户增长数',
              value:23,
              isVisible: false
            },
            {
              id: 7,
              icon: 'hdd',
              name: '今日活跃用户数',
              value: 671,
              isVisible: false
            },
            {
              id: 8,
              icon: 'hdd',
              name: '昨日用户活跃数',
              value: 604,
              isVisible: false
            },
            {
              id: 9,
              icon: 'hdd',
              name: '当前用户活跃数',
              value: 759,
              isVisible: false
            }
          ],
          环境分析: [
            {
              id: 10,
              icon: 'hdd',
              name: 'PM 2.5 传感器总数',
              value: 843,
              isVisible: false
            },
            {
              id: 11,
              icon: 'hdd',
              name: '甲醛传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 12,
              icon: 'hdd',
              name: 'CO2 传感器总数',
              value: 770,
              isVisible: false
            },
            {
              id: 13,
              icon: 'hdd',
              name: 'TVOC 传感器数据总数',
              value: 0,
              isVisible: false
            },
            {
              id: 14,
              icon: 'hdd',
              name: '优良环境数',
              value: 718,
              isVisible: false
            },
            {
              id: 15,
              icon: 'hdd',
              name: '优良环境比率',
              value: 80,
              unit: '',
              isVisible: false
            }
          ],
          订单分析: [
            {
              id: 16,
              icon: 'hdd',
              name: '今日订单数',
              value: 10,
              isVisible: false
            },
            {
              id: 17,
              icon: 'hdd',
              name: '昨日订单数',
              value: 40,
              isVisible: false
            },
            {
              id: 18,
              icon: 'hdd',
              name: '昨日订单增长率',
              value: 4,
              isVisible: false
            },
            {
              id: 19,
              icon: 'hdd',
              name: '本月订单数',
              value: 80,
              isVisible: false
            }
          ],
          告警分析: [
            {
              id: 20,
              icon: 'hdd',
              name: '当前设备告警数',
              value: 43,
              isVisible: false
            },
            {
              id: 21,
              icon: 'hdd',
              name: '今日新增告警记录',
              value: 0,
              isVisible: false
            },
            {
              id: 22,
              icon: 'hdd',
              name: '当前设备故障率',
              value: 1,
              isVisible: false
            }
          ],
          分润分析: [
            {
              id: 23,
              icon: 'hdd',
              name: '今日分润账单数',
              value: 28,
              isVisible: false
            },
            {
              id: 24,
              icon: 'hdd',
              name: '今日分润金额',
              value: 0,
              isVisible: false
            }
          ]
        },
        图表展示: {
          设备分析: [
            {
              id: 0,
              name: '设备增加趋势表',
              options: {
                title: {
                  text: '设备增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
                  },
                  {
                    name: '增长趋势',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 1,
              name: '设备地区分布图',
              options: {
                title: {
                  text: '设备地区分布图'
                },
                tooltip: {},
                xAxis: {
                  type: 'value'
                },
                yAxis: {
                  type: 'category',
                  data: [
                    '其他',
                    '上海',
                    '江苏',
                    '北京',
                    '浙江',
                    '广东',
                    '湖南'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [70, 137, 218, 102, 90, 90, 170]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 2,
              name: '在线设备占比图',
              options: {
                title: {
                  text: '在线设备占比图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 671, name: '在线设备' },
                      { value: 181, name: '离线设备' }
                    ]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 3,
              name: '设备类型比重图',
              options: {
                title: {
                  text: '设备类型比重图'
                },
                tooltip: {
                  formatter: '{b}: {c} ({d}%)'
                },
                legend: {},
                series: [
                  {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [
                      { value: 10.23, name: 'A型控制器' },
                      { value: 2.73, name: '慧洋环保科技' },
                      { value: 16.15, name: '智慧新风' },
                      { value: 22.26, name: '检测探头' },
                      { value: 1.94, name: '德杯电子净化' }
                    ]
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 4,
              name: '公众号设备数量分布',
              options: {
                title: {
                  text: '公众号设备数量分布'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: ['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [442, 104, 138, 142, 26]
                  }
                ]
              },
              isVisible: false
            },
            {
              id: 5,
              name: '设备增速排名',
              options: {
                title: {
                  text: '设备增速排名'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data:['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
                },
                yAxis: {},
                series: [
                  {
                    name: '增长趋势',
                    data: [2,54,32,18,20],
                    type: 'line'
                  }
                ]
              },
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 6,
              name: '用户增加趋势表',
              options: {
                title: {
                  text: '用户增加趋势表'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '用户总数',
                    type: 'bar',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80]
                  },
                  {
                    name: '增长趋势',
                    data: [80, 70, 90, 70, 50, 90, 70, 70, 90, 80],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            },
            {
              id: 7,
              name: '本日用户活跃曲线',
              options: {
                title: {
                  text: '本日用户活跃曲线'
                },
                tooltip: {},
                legend: {},
                xAxis: {
                  data: [
                    '00:00',
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '每小时用户数',
                    data: [2,0,0,1,214,673,349,291,416,544,410,593],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: false
            }
          ]
        }
      }
      this.selectCustomerUserCount()
      this.selectDeviceCount()
      this.selectTypePercent()
      this.newDeviceCountOfToday()
      this.queryCount()
    }
    },

    // 每月新增用户统计
    selectCustomerUserCount() {
      selectCustomerUserCount().then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.addCount.push(res.data[i].addCount)
          if (res.data[i].addPercent === '--') {
            this.addPercent.push(0)
          } else {
            this.addPercent.push(res.data[i].addPercent.substring(0, 3))
          }
          this.userCount.push(res.data[i].userCount)
        }
        this.kanbanData.图表展示.用户分析[0].options.series[0].data = this.userCount
        this.kanbanData.图表展示.用户分析[0].options.series[1].data = this.userCount
      })
    },
    // 设备总数
    queryCount() {
      queryCount(this.status).then(res => {
        this.kanbanData.数据展示.设备分析[0].value= res.data
      })
    },
    // 每月新增设备统计
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
        this.kanbanData.图表展示.设备分析[0].options.series[0].data = this.deviceCount
        this.kanbanData.图表展示.设备分析[0].options.series[1].data = this.deviceCount
      })
    },
    // 设备类型统计
    selectTypePercent() {
      selectTypePercent().then(res => {
        for(var i = 0; i<res.data.length;i++){
          this.devedata.push({value:((res.data[i].typePercent).substring(0, 2)),name:res.data[i].typeName})
        }
        this.kanbanData.图表展示.设备分析[3].options.series[0].data = this.devedata
      })
    },
    // 今日新增设备统计
    newDeviceCountOfToday() {
      newDeviceCountOfToday().then(res => {
       this.kanbanData.数据展示.设备分析[1].value = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>

<style lang="scss">
.kanban-edit {
  .el-checkbox {
    margin-right: 30px;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
}
</style>
