// 测试数据
export const dashboardData = {
  数据展示: {
    设备分析: [{
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
        name: '今日设备故障数',
        value: 11,
        isVisible: true
      },
      {
        id: 99,
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
        isVisible: true
      }
    ],
    用户分析: [{
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
        value: 23,
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
        isVisible: true
      },
      {
        id: 9,
        icon: 'hdd',
        name: '当前用户活跃数',
        value: 759,
        isVisible: true
      }
    ],
    环境分析: [{
        id: 10,
        icon: 'hdd',
        name: 'PM 2.5 传感器总数',
        value: 843,
        isVisible: true
      },
      {
        id: 11,
        icon: 'hdd',
        name: '甲醛传感器总数',
        value: 770,
        isVisible: true
      },
      {
        id: 12,
        icon: 'hdd',
        name: 'CO2 传感器总数',
        value: 770,
        isVisible: true
      },
      {
        id: 13,
        icon: 'hdd',
        name: 'TVOC 传感器数据总数',
        value: 0,
        isVisible: true
      },
      {
        id: 14,
        icon: 'hdd',
        name: '优良环境数',
        value: 718,
        isVisible: true
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
    订单分析: [{
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
        isVisible: true
      },
      {
        id: 18,
        icon: 'hdd',
        name: '昨日订单增长率',
        value: 4,
        isVisible: true
      },
      {
        id: 19,
        icon: 'hdd',
        name: '本月订单数',
        value: 80,
        isVisible: true
      }
    ],
    告警分析: [{
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
        isVisible: true
      },
      {
        id: 22,
        icon: 'hdd',
        name: '当前设备故障率',
        value: 1,
        isVisible: true
      }
    ],
    分润分析: [{
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
        isVisible: true
      }
    ]
  },
  图表展示: {
    设备分析: [{
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
          series: [{
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
            data: ['其他', '上海', '江苏', '北京', '浙江', '广东', '湖南']
          },
          series: [{
            name: '设备数量',
            type: 'bar',
            data: [70, 137, 218, 102, 90, 90, 170]
          }]
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
          series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{
                value: 671,
                name: '在线设备'
              },
              {
                value: 181,
                name: '离线设备'
              }
            ]
          }]
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
          series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{
                value: 10.23,
                name: 'A型控制器'
              },
              {
                value: 2.73,
                name: '慧洋环保科技'
              },
              {
                value: 16.15,
                name: '智慧新风'
              },
              {
                value: 22.26,
                name: '检测探头'
              },
              {
                value: 1.94,
                name: '德杯电子净化'
              }
            ]
          }]
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
          series: [{
            name: '设备总数',
            type: 'bar',
            data: [442, 104, 138, 142, 26]
          }]
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
            data: ['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
          },
          yAxis: {},
          series: [{
            name: '增长趋势',
            data: [2, 54, 32, 18, 20],
            type: 'line'
          }]
        },
        isVisible: true
      }
    ],
    用户分析: [{
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
          series: [{
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
          series: [{
            name: '每小时用户数',
            data: [2, 0, 0, 1, 214, 673, 349, 291, 416, 544, 410, 593],
            type: 'line',
            smooth: true
          }]
        },
        isVisible: true
      }
    ]
  }
}

export const realData = {
  数据展示: {
    设备分析: [{
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
        name: '今日设备故障数',
        value: 11,
        isVisible: false
      },
      {
        id: 99,
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
    用户分析: [{
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
        value: 23,
        isVisible: false
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
    环境分析: [{
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
    订单分析: [{
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
    告警分析: [{
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
        isVisible: true
      },
      {
        id: 22,
        icon: 'hdd',
        name: '当前设备故障率',
        value: 1,
        isVisible: false
      }
    ],
    分润分析: [{
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
    设备分析: [{
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
          series: [{
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
            data: ['其他', '上海', '江苏', '北京', '浙江', '广东', '湖南']
          },
          series: [{
            name: '设备数量',
            type: 'bar',
            data: [70, 137, 218, 102, 90, 90, 170]
          }]
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
          series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{
                value: 671,
                name: '在线设备'
              },
              {
                value: 181,
                name: '离线设备'
              }
            ]
          }]
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
          series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{
                value: 10.23,
                name: 'A型控制器'
              },
              {
                value: 2.73,
                name: '慧洋环保科技'
              },
              {
                value: 16.15,
                name: '智慧新风'
              },
              {
                value: 22.26,
                name: '检测探头'
              },
              {
                value: 1.94,
                name: '德杯电子净化'
              }
            ]
          }]
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
          series: [{
            name: '设备总数',
            type: 'bar',
            data: [442, 104, 138, 142, 26]
          }]
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
            data: ['英德罗曼', '惠阳', '智慧新风', '宝智', '环可']
          },
          yAxis: {},
          series: [{
            name: '增长趋势',
            data: [2, 54, 32, 18, 20],
            type: 'line'
          }]
        },
        isVisible: false
      }
    ],
    用户分析: [{
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
          series: [{
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
          series: [{
            name: '每小时用户数',
            data: [2, 0, 0, 1, 214, 673, 349, 291, 416, 544, 410, 593],
            type: 'line',
            smooth: true
          }]
        },
        isVisible: true
      }
    ]
  }
}
// 用户数据测试
export const userData = {
  数据展示: [{
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
      value: 23,
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
      isVisible: true
    },
    {
      id: 9,
      icon: 'hdd',
      name: '当前用户活跃数',
      value: 600,
      isVisible: true
    }
  ],
  图表展示: [{
      id: 0,
      name: '新增用户趋势图',
      options: {
        title: {
          text: '新增用户趋势图'
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
        series: [{
            name: '用户数',
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
      name: '活跃用户趋势图',
      options: {
        title: {
          text: '活跃用户趋势图'
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
        series: [{
            name: '活跃用户数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '活跃趋势',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: true
    },
    {
      id: 2,
      name: '用户总数趋势图',
      options: {
        title: {
          text: '用户总数趋势图'
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
        series: [{
            name: '用户总数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '总数趋势',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: true
    },
    {
      id: 3,
      name: '用户区域分布图',
      options: {
        title: {
          text: '用户区域分布图'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '用户数',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: true
    }
  ]
}
// 用户数据真实
export const userDataT = {
  数据展示: [{
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
      value: 23,
      isVisible: false
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
      value: 600,
      isVisible: false
    }
  ],
  图表展示: [{
      id: 0,
      name: '新增用户趋势图',
      options: {
        title: {
          text: '新增用户趋势图'
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
        series: [{
            name: '用户数',
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
      name: '活跃用户趋势图',
      options: {
        title: {
          text: '活跃用户趋势图'
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
        series: [{
            name: '活跃用户数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '活跃趋势',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: true
    },
    {
      id: 2,
      name: '用户总数趋势图',
      options: {
        title: {
          text: '用户总数趋势图'
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
        series: [{
            name: '用户总数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '总数趋势',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: false
    },
    {
      id: 3,
      name: '用户区域分布图',
      options: {
        title: {
          text: '用户区域分布图'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '用户数',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: false
    }
  ]
}
// 设备数据测试
export const developData = {
  数据展示: [{
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
      isVisible: true
    }
  ],
  图表展示: [{
      id: 0,
      name: '新增设备趋势图',
      options: {
        title: {
          text: '新增设备趋势图'
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
        series: [{
            name: '设备数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '设备增长率',
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
      name: '设备区域排行图',
      options: {
        title: {
          text: '设备区域排行图'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '设备数量',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: true
    },
    {
      id: 2,
      name: '故障设备区域分布',
      options: {
        title: {
          text: '故障设备区域分布'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '故障设备数量',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: true
    },
    {
      id: 3,
      name: '设备型号占比图',
      options: {
        title: {
          text: '设备型号占比图'
        },
        tooltip: {
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {},
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          data: [{
              value: 60,
              name: '设备类型1'
            },
            {
              value: 10,
              name: '设备类型2'
            },
            {
              value: 5,
              name: '设备类型3'
            },
            {
              value: 98,
              name: '设备类型4'
            }
          ]
        }]
      },
      isVisible: true
    },
    {
      id: 4,
      name: '设备告警曲线图',
      options: {
        title: {
          text: '设备告警曲线图'
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
        series: [{
            name: '告警数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '告警增长率',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: true
    },
    {
      id: 5,
      name: '告警类型占比图',
      options: {
        title: {
          text: '告警类型占比图'
        },
        tooltip: {
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {},
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          data: [{
              value: 60,
              name: '告警类型1'
            },
            {
              value: 10,
              name: '告警类型2'
            },
            {
              value: 5,
              name: '告警类型3'
            },
            {
              value: 98,
              name: '告警类型4'
            }
          ]
        }]
      },
      isVisible: true
    }
  ]
}
// 设备数据真实
export const developDataT = {
  数据展示: [{
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
      isVisible: true
    },
    {
      id: 4,
      icon: 'hdd',
      name: '当前设备在线率',
      value: 5,
      isVisible: true
    }
  ],
  图表展示: [{
      id: 0,
      name: '新增设备趋势图',
      options: {
        title: {
          text: '新增设备趋势图'
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
        series: [{
            name: '设备数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '设备增长率',
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
      name: '设备区域排行图',
      options: {
        title: {
          text: '设备区域排行图'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '设备数量',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: true
    },
    {
      id: 2,
      name: '故障设备区域分布',
      options: {
        title: {
          text: '故障设备区域分布'
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
            '江西省',
            '青海省',
            '海南省'
          ]
        },
        series: [{
          name: '故障设备数量',
          type: 'bar',
          data: [10, 9, 20, 25, 6, 4, 1, 8, 15, 6]
        }]
      },
      isVisible: true
    },
    {
      id: 3,
      name: '设备型号占比图',
      options: {
        title: {
          text: '设备类型分布'
        },
        tooltip: {
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {},
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          data: [{
              value: 60,
              name: '设备类型1'
            },
            {
              value: 10,
              name: '设备类型2'
            },
            {
              value: 5,
              name: '设备类型3'
            },
            {
              value: 98,
              name: '设备类型4'
            }
          ]
        }]
      },
      isVisible: true
    },
    {
      id: 4,
      name: '设备告警曲线图',
      options: {
        title: {
          text: '设备告警曲线图'
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
        series: [{
            name: '告警数量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
          },
          {
            name: '告警增长率',
            data: [5, 21, 10, 34, 5, 20, 11, 22, 50, 34, 5, 20],
            type: 'line',
            smooth: true
          }
        ]
      },
      isVisible: true
    },
    {
      id: 5,
      name: '告警类型占比图',
      options: {
        title: {
          text: '告警类型占比图'
        },
        tooltip: {
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {},
        series: [{
          type: 'pie',
          radius: ['50%', '70%'],
          data: [{
              value: 60,
              name: '告警类型1'
            },
            {
              value: 10,
              name: '告警类型2'
            },
            {
              value: 5,
              name: '告警类型3'
            },
            {
              value: 98,
              name: '告警类型4'
            }
          ]
        }]
      },
      isVisible: true
    }
  ]
}
