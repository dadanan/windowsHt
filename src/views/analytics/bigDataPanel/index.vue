<template>
  <div class="big-data-panel">
    <ul class="bg-bubbles">
      <li v-for="(item, index) in bubbles" :key="index"></li>
    </ul>
    <router-link to="/">返回</router-link>
    <el-row class="ui-row">
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
        <el-col :span="24">
          <weather-option :id="0" :visible.sync="DialogVisile[0]" @updateOption="updateWeatherOption"
                          @toggleDialog="toggleDialog"></weather-option>
          <div ref="weather" class="col" data-tilt>
            <a class="setting" type="primary" size="mini" @click="toggleDialog(0)"><font-awesome-icon icon="cog" /></a>
            <weather :option="OptionData.WeatherOptionData"></weather>
          </div>
        </el-col>

        <el-col :span="24">
          <device-option :id="1" :visible.sync="DialogVisile[1]" :options="OptionData.DeviceChartOptions"
                         @toggleDialog="toggleDialog"></device-option>
          <div ref="device" class="col" data-tilt>

            <chart-device-data :options="OptionData.DeviceChartOptions" @click="toggleDialog(1)"></chart-device-data>
          </div>
        </el-col>

        <el-col :span="24">
          <div ref="users" class="col" data-tilt>
            <chart-user-data :options="OptionData.UserChartOptions" @click="toggleDialog(2)"></chart-user-data>
          </div>
          <user-option :id="2" :visible.sync="DialogVisile[2]" :options="OptionData.UserChartOptions" @toggleDialog="toggleDialog"></user-option>

        </el-col>

        <div ref="type" class="duang" data-tilt>
          <el-col :span="24" class="col">
            <device-type-option :id="3" :visible.sync="DialogVisile[3]" :options="OptionData.DeviceTypeChartData"

            <chart-device-type :options="OptionData.DeviceTypeChartData" @click="toggleDialog(3)"></chart-device-type>
          </el-col>
        </div>
      </el-col>

      <el-col :span="14">

        <h1>大数据看板</h1>
        <div ref="main" data-tilt>
          <el-col :span="24" id="middle-top">
            <chart-device-map></chart-device-map>
          </el-col>
        </div>
        <el-col :span="24" id="middle-bottom">
          <project-sample :id="5" :detailid="7" :options="OptionData.ProjectSampleData" @toggleDialog="toggleDialog"></project-sample>
          <project-sample-option :id="5" :options="OptionData.ProjectSampleData" :visible.sync="DialogVisile[5]"
                                 @toggleDialog="toggleDialog"></project-sample-option>
          <sample-detail-prompt :id="7" :options="OptionData.ProjectSampleData" :visible.sync="DialogVisile[7]"
                                @toggleDialog="toggleDialog"></sample-detail-prompt>
        </el-col>

      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
        <el-col :span="24" class="col">
          <message :types="OptionData.MessageOptions.types" :msgs="OptionData.MessageOptions.data"></message>
        </el-col>
        <el-col :span="24" class="col">

          <solution-option :id="4" :visible.sync="DialogVisile[4]" :options="OptionData.SolutionData"
                           @toggleDialog="toggleDialog"></solution-option>
          <solution-panel @itemSelected="itemSelected" :options="OptionData.SolutionData"></solution-panel>
        </el-col>
        <el-col :span="24" class="col">
          <chart-operation-option :id="6" :visible.sync="DialogVisile[6]" :options="OptionData.OperationChartData"
                                  @toggleDialog="toggleDialog"></chart-operation-option>
          <chart-operation-data @click="toggleDialog(6)" :options="OptionData.OperationChartData"></chart-operation-data>
        </el-col>
        <el-col :span="24" class="col">
          <maintain-chart :options="OptionData.MaintainChartOptions"></maintain-chart>
        </el-col>
      </el-col>
    </el-row>

  </div>


</template>
<script>
  // 各模块(共10个)
  import ChartDeviceMap from './compoments/ChartDeviceMap.vue'
  import ChartDeviceData from './compoments/ChartDeviceData.vue'
  import ChartUserData from './compoments/ChartUserData.vue'
  import ChartDeviceType from './compoments/ChartDeviceType.vue'
  import ChartOperationData from './compoments/ChartOperationData.vue'
  import FilteredData from './compoments/FilteredData.vue'
  import Weather from './compoments/Weather.vue'
  import Message from './compoments/MessageData.vue'
  import MaintainChart from './compoments/MaintainChart.vue'
  import SolutionPanel from './compoments/SolutionPanel.vue'
  import ProjectSample from './compoments/ProjectSample.vue'

  // 弹窗
  import WeatherOption from './compoments/WeatherOption.vue'
  import DeviceOption from './compoments/DeviceOption.vue'
  import UserOption from './compoments/UserOption.vue'
  import DeviceTypeOption from './compoments/DeviceTypeOption.vue'
  import SolutionOption from './compoments/SolutionOption.vue'
  import ProjectSampleOption from './compoments/ProjectSampleOption.vue'
  import ChartOperationOption from './compoments/ChartOperationOption.vue'
  import SampleDetailPrompt from './compoments/SampleDetailPrompt.vue'

  // 特效

  import VanillaTilt from 'vanilla-tilt'

  export default {
    created() {
      this.bubbles.length = 10
    },
    mounted() {
      /*
        VanillaTilt.init([this.$refs.weather, this.$refs.device, this.$refs.users], {
          max: 25,
          speed: 400
        })
      */
      VanillaTilt.init(this.$refs.main, {
        max: 10,
        speed: 400
      })
    },
    components: {
      // 模块
      ChartDeviceMap,
      ChartDeviceData,
      ChartUserData,
      ChartDeviceType,
      ChartOperationData,
      FilteredData,
      Weather,
      Message,
      MaintainChart,
      SolutionPanel,
      ProjectSample,
      // 弹窗
      WeatherOption,
      DeviceOption,
      UserOption,
      DeviceTypeOption,
      SolutionOption,
      ProjectSampleOption,
      ChartOperationOption,
      SampleDetailPrompt
    },
    data() {
      return {
        bubbles: [],
        OptionData: {
          WeatherOptionData: {
            province: '上海',
            city: '上海市',
            suburb: '普陀区'
          },
          MessageOptions: {
            types: [
              { id: 0, name: '系统信息' },
              { id: 1, name: '设备信息' },
              { id: 2, name: '订单信息' }
            ],
            data: [
              { type: 0, message: '系统讯息测试' },
              { type: 0, message: '系统讯息测试2' },
              { type: 0, message: '系统讯息测试3' },
              { type: 0, message: '系统讯息测试3' },
              { type: 1, message: '设备信息测试数据' },
              { type: 1, message: '设备信息测试数据2' },
              { type: 2, message: '订单讯息测试' }
            ]

          },
          // 设备信息数据
          DeviceChartOptions: {
            integrals: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月'
            ],
            data: {
              data: [ // 设备数据
                500,
                1000,
                2000,
                3000,
                4100
              ],
              active: [
                100,
                500,
                600,
                750,
                800
              ],
              increase: [
                20,
                40,
                50,
                60,
                100
              ],
              // Pie chart data
              pieActiveData: [
                { value: 335, name: 'A' },
                { value: 34, name: 'B' },
                { value: 563, name: 'C' }
              ],
              pieMonthlyData: [
                { value: 335, name: 'A' },
                { value: 323, name: 'B' },
                { value: 34, name: 'C' }
              ]
            }

          },
          // 用户信息数据
          UserChartOptions: {
            integrals: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月'
            ],
            data: {
              data: [ // 设备数据
                100,
                200,
                343,
                650,
                1000,
                1100
              ],
              active: [
                100,
                120,
                202,
                320,
                400,
                400
              ],
              increase: [
                5,
                10,
                11,
                12,
                30,
                20
              ],
              // Pie chart data
              pieActiveData: [
                { value: 135, name: 'A' },
                { value: 234, name: 'B' },
                { value: 563, name: 'C' }
              ],
              pieMonthlyData: [
                { value: 475, name: 'A' },
                { value: 123, name: 'B' },
                { value: 34, name: 'C' }
              ]
            }

          },
          // 维护信息数据
          MaintainChartOptions: {
            integrals: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月'
            ],
            data: {
              update: [
                100, 200, 300, 400, 500
              ],
              maintain: [
                100, 300, 400, 600, 800
              ],
              calibration: [
                20, 50, 40, 80, 43, 67
              ]
            }

          },
          // 设备类型图表数据
          DeviceTypeChartData: {
            allTypes: ['检测探头', '净化器', '控制器', '新风机'],
            allStatus: ['在线', '离线'],
            totalOnline: [18203, 23489, 29034, 30493],
            totalOffline: [5203, 43250, 11000, 22202],
            totalDevices: 3052,
            data: [
              { value: 335, name: '检测探头' },
              { value: 310, name: '净化器' },
              { value: 234, name: '控制器' },
              { value: 135, name: '新风机' }
            ]
          },
          // 设备告警信息数据
          OperationChartData: {
            allTypes: [
              '已处理',
              '待处理',
              '总告警'
            ],
            data: [
              { value: 335, name: '已处理' },
              { value: 310, name: '待处理' },
              { value: 1548, name: '总告警' }
            ],
            lineChart: {
              intergrals: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          },
          // 解决方案数据
          SolutionData: {
            selectedId: 0,
            data: [
              {
                id: 0,
                icon: 'null',
                name: '别墅',
                img: '动图....'
              },
              {
                id: 1,
                icon: 'null',
                name: '大房',
                img: '动图....'
              },
              {
                id: 2,
                icon: 'null',
                name: '居家',
                img: '动图....'
              },
              {
                id: 3,
                icon: 'null',
                name: '办公',
                img: '动图....'
              },
              {
                id: 4,
                icon: 'null',
                name: '学校',
                img: '动图....'
              },
              {
                id: 5,
                icon: 'null',
                name: '医院',
                img: '动图....'
              },
              {
                id: 6,
                icon: 'null',
                name: '商场',
                img: '动图....'
              },
              {
                id: 7,
                icon: 'null',
                name: '展厅',
                img: '动图....'
              }
            ]
          },
          // 工程案列数据
          ProjectSampleData: {
            data: [
              {
                id: 0,
                name: '龙湖一期',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 1,
                name: '九亭工坊',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 2,
                name: '桃浦智创',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 3,
                name: '恒大丽宫',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 4,
                name: '新汇大厦',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 5,
                name: '万科横桥',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              },
              {
                id: 6,
                name: '绿地大厦',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' }
                ]
              },
              {
                id: 7,
                name: '万达武汉',
                icon: '工程示意图地址',
                imgs: [
                  { id: 0, url: '案列图片1' },
                  { id: 1, url: '案列图片2' },
                  { id: 2, url: '案列图片3' },
                  { id: 3, url: '案列图片4' },
                  { id: 4, url: '案列图片5' }
                ]
              }
            ]
          }
        },

        DialogVisile: [false, false, false, false, false, false, false, false, false, false]
      }
    },

    methods: {
      updateWeatherOption(options) {
        this.OptionData.WeatherOptionData = options
      },
      toggleDialog(id) {
        console.log(id + ' is toggle')
        this.DialogVisile.splice(id, 1, !this.DialogVisile[id])
      },
      alertTest() {
        alert('hello world')
      },
      itemSelected(id) {
        console.log('[解决方案选中] 父组件收到id = ' + id)
        this.OptionData.SolutionData.selectedId = id
        this.toggleDialog(4)
      }

    }

  }

</script>

<style lang="scss" scoped>

  .big-data-panel {

    color: white;
    top: 0;
    position: fixed;
    left: 0;
    right: 0;
    background-color: #041a32;
    background: linear-gradient(173deg, rgba(14, 92, 141, 1) 0%, rgba(3, 10, 39, 1) 100%);
    bottom: 0;
    z-index: 2001;
    #middle-top {
      height: 60vh;
    }
    #middle-bottom {
      height: 40vh;
    }
    .col::before {
      filter: blur(5px);
    }
    .col {
      height: 22vh;
      -webkit-backdrop-filter: blur(5px);
      border-radius: 5px;
      /* Google Chrome */
      backdrop-filter: blur(5px);

      /* 设置背景半透明黑色 */
      background: rgba(0, 0, 0, 0.2);
      margin-top: 10px;
      margin-bottom: 10px;


    }
    .ui-row {

      margin-left: 10px;
      margin-right: 10px;
    }
    .setting {
      float: right;
      &:hover {
        color: #4CD8FC;
      }
    }
    h1, h2, h3 {
      text-align: center;
    }
    //Duang duang
    .bg-bubbles {
      position: absolute;
      // 使气泡背景充满整个屏幕
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      li {
        border-radius: 100px;
        position: absolute;
        // bottom 的设置是为了营造出气泡从页面底部冒出的效果；
        bottom: -160px;
        // 默认的气泡大小；
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.15);
        list-style: none;
        // 使用自定义动画使气泡渐现、上升和翻滚；
        animation: square 15s infinite;
        transition-timing-function: linear;
        // 分别设置每个气泡不同的位置、大小、透明度和速度，以显得有层次感；
        &:nth-child(1) {
          left: 10%;
        }
        &:nth-child(2) {
          left: 20%;
          width: 90px;
          height: 90px;
          animation-delay: 2s;
          animation-duration: 7s;
        }
        &:nth-child(3) {
          left: 25%;
          animation-delay: 4s;
        }
        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-duration: 8s;
          background-color: rgba(255, 255, 255, 0.3);
        }
        &:nth-child(5) {
          left: 70%;
        }
        &:nth-child(6) {
          left: 80%;
          width: 120px;
          height: 120px;
          animation-delay: 3s;
          background-color: rgba(255, 255, 255, 0.2);
        }
        &:nth-child(7) {
          left: 32%;
          width: 160px;
          height: 160px;
          animation-delay: 2s;
        }
        &:nth-child(8) {
          left: 55%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
          animation-duration: 15s;
        }
        &:nth-child(9) {
          left: 25%;
          width: 10px;
          height: 10px;
          animation-delay: 2s;
          animation-duration: 12s;
          background-color: rgba(255, 255, 255, 0.3);
        }
        &:nth-child(10) {
          left: 85%;
          width: 160px;
          height: 160px;
          animation-delay: 5s;
        }
      }
      // 自定义 square 动画；
      @keyframes square {
        0% {
          opacity: 0.5;
          transform: translateY(0px) rotate(45deg);
        }
        25% {
          opacity: 0.75;
          transform: translateY(-400px) rotate(90deg)
        }
        50% {
          opacity: 1;
          transform: translateY(-600px) rotate(135deg);
        }
        100% {
          opacity: 0;
          transform: translateY(-1000px) rotate(180deg);
        }
      }
    }
  }


</style>
