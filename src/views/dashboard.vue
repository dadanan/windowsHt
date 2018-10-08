<template>
  <div class="dashboard-container">
    <div class="mb20">
      <el-button icon="el-icon-edit" type="primary" @click="dialogEditKanbanVisible = true">编辑看板</el-button>
    </div>
    <el-row :gutter="20">
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
        <el-button @click="dialogEditKanbanVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogEditKanbanVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import DTitle from '@/components/Title'

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
              value: 10,
              isVisible: true
            },
            {
              id: 1,
              icon: 'hdd',
              name: '今日设备新增数',
              value: 0,
              isVisible: true
            },
            {
              id: 2,
              icon: 'hdd',
              name: '今日设备订单率',
              value: 0,
              isVisible: true
            },
            {
              id: 3,
              icon: 'hdd',
              name: '当前设备故障数',
              value: 0,
              isVisible: true
            },
            {
              id: 4,
              icon: 'hdd',
              name: '当前设备在线率',
              value: 0,
              isVisible: false
            }
          ],
          用户分析: [
            {
              id: 5,
              icon: 'hdd',
              name: '当前用户总人数',
              value: 0,
              isVisible: true
            },
            {
              id: 6,
              icon: 'hdd',
              name: '昨日用户增长率',
              value: 0,
              isVisible: true
            },
            {
              id: 7,
              icon: 'hdd',
              name: '今日活跃用户数',
              value: 0,
              isVisible: true
            },
            {
              id: 8,
              icon: 'hdd',
              name: '昨日用户活跃率',
              value: 0,
              isVisible: false
            },
            {
              id: 9,
              icon: 'hdd',
              name: '当前用户活跃率',
              value: 0,
              isVisible: false
            }
          ],
          环境分析: [
            {
              id: 10,
              icon: 'hdd',
              name: 'PM 2.5 传感器总数',
              value: 0,
              isVisible: true
            },
            {
              id: 11,
              icon: 'hdd',
              name: '甲醛传感器总数',
              value: 0,
              isVisible: false
            },
            {
              id: 12,
              icon: 'hdd',
              name: 'CO2 传感器总数',
              value: 0,
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
              value: 0,
              isVisible: false
            },
            {
              id: 15,
              icon: 'hdd',
              name: '优良环境比率',
              value: 0,
              unit: '',
              isVisible: true
            }
          ],
          订单分析: [
            {
              id: 16,
              icon: 'hdd',
              name: '今日订单数',
              value: 0,
              isVisible: true
            },
            {
              id: 17,
              icon: 'hdd',
              name: '昨日订单数',
              value: 0,
              isVisible: false
            },
            {
              id: 18,
              icon: 'hdd',
              name: '昨日订单增长率',
              value: 0,
              isVisible: false
            },
            {
              id: 19,
              icon: 'hdd',
              name: '本月订单数',
              value: 0,
              isVisible: false
            }
          ],
          告警分析: [
            {
              id: 20,
              icon: 'hdd',
              name: '当前设备告警数',
              value: 0,
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
              value: 0,
              isVisible: false
            }
          ],
          分润分析: [
            {
              id: 23,
              icon: 'hdd',
              name: '今日分润账单数',
              value: 0,
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
                    '江苏省',
                    '广东省',
                    '福建省',
                    '湖南省',
                    '河南省',
                    '河北省',
                    '江西省'
                  ]
                },
                series: [
                  {
                    name: '设备数量',
                    type: 'bar',
                    data: [10, 9, 20, 25, 6, 4, 1, 8]
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
                      { value: 335, name: '在线设备' },
                      { value: 310, name: '离线设备' }
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
                      { value: 60, name: '设备类型1' },
                      { value: 10, name: '设备类型2' },
                      { value: 5, name: '设备类型3' },
                      { value: 98, name: '设备类型4' }
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
                  data: ['公众号1', '公众号2', '公众号3', '公众号4', '公众号5']
                },
                yAxis: {},
                series: [
                  {
                    name: '设备总数',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10]
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
                  data: [
                    '公众号1',
                    '公众号2',
                    '公众号3',
                    '公众号4',
                    '公众号5',
                    '公众号6',
                    '公众号7',
                    '公众号8',
                    '公众号9'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '增长趋势',
                    data: [5, 21, 25, 31, 34, 40, 55, 60, 62],
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
                    '00:00 AM',
                    '01:00 AM',
                    '02:00 AM',
                    '03:00 AM',
                    '04:00 AM',
                    '05:00 AM',
                    '06:00 AM',
                    '07:00 AM',
                    '08:00 AM',
                    '09:00 AM',
                    '10:00 AM',
                    '11:00 AM',
                    '12:00 AM'
                  ]
                },
                yAxis: {},
                series: [
                  {
                    name: '每小时用户数',
                    data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
                    type: 'line',
                    smooth: true
                  }
                ]
              },
              isVisible: true
            }
          ]
        }
      },
      dialogEditKanbanVisible: false
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
