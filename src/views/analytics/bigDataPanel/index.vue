<template>
  <div class="big-data-panel">
    <ul class="bg-bubbles">
      <li v-for="(item, index) in bubbles" :key="index"></li>
    </ul>
    <router-link to="/">返回</router-link>
    <el-row class="ui-row">
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
        <el-col :span="24" class="col">
          <a class="setting" type="primary" size="mini" @click="toggleDialog(0)">设置</a>
          <WeatherOption :id="0" :visible.sync="DialogVisile[0]" @updateOption="updateWeatherOption"
                         @toggleDialog="toggleDialog"></WeatherOption>
          <h3>天气环境</h3>
          <Weather :option="OptionData.WeatherOptionData"></Weather>

        </el-col>
        <el-col :span="24" class="col">
          <a class="setting" type="primary" size="mini" @click="toggleDialog(1)">设置</a>
          <DeviceOption :id="1" :visible.sync="DialogVisile[1]" :options="OptionData.DeviceChartOptions"></DeviceOption>
          <ChartDeviceData :options="OptionData.DeviceChartOptions" @click="toggleDialog(1)"></ChartDeviceData>
        </el-col>
        <el-col :span="24" class="col"><a class="setting" type="primary" size="mini">设置</a>
          <UserOption :id="2" :visible.sync="DialogVisile[2]" :options="OptionData.UserChartOptions"></UserOption>
          <ChartUserData :options="OptionData.UserChartOptions" @click="toggleDialog(2)"></ChartUserData>
        </el-col>
        <el-col :span="24" class="col"><a class="setting" type="primary" size="mini">设置</a>
          <DeviceTypeOption :id="3" :visible.sync="DialogVisile[3]" :options="OptionData.DeviceTypeChartData"></DeviceTypeOption>
          <ChartDeviceType :options="OptionData.DeviceTypeChartData" @click="toggleDialog(3)"></ChartDeviceType>
        </el-col>
      </el-col>

      <el-col :span="14">
        <h1>大数据看板</h1>
        <el-col :span="24" id="middle-top">
          <ChartDeviceMap></ChartDeviceMap>
        </el-col>
        <el-col :span="24" id="middle-bottom">
          <h3>工程案例</h3>
        </el-col>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
        <el-col :span="24" class="col"><a class="setting" type="primary" size="mini">设置</a>

          <Message :types="OptionData.MessageOptions.types" :msgs="OptionData.MessageOptions.data"></Message>
        </el-col>
        <el-col :span="24" class="col"><a class="setting" type="primary" size="mini">设置</a>
          <h3>解决方法</h3></el-col>
        <el-col :span="24" class="col"><a class="setting" type="primary" size="mini">设置</a>
          <ChartOperationData :options="OptionData.OperationChartData"></ChartOperationData>
        </el-col>
        <el-col :span="24" class="col">
          <MaintainChart :options="OptionData.MaintainChartOptions"></MaintainChart>
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

  // 弹窗
  import WeatherOption from './compoments/WeatherOption.vue'
  import DeviceOption from './compoments/DeviceOption.vue'
  import UserOption from './compoments/UserOption.vue'
  import DeviceTypeOption from './compoments/DeviceTypeOption.vue'
  export default {
    created() {
      this.bubbles.length = 10
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
      // 弹窗
      WeatherOption,
      DeviceOption,
      UserOption,
      DeviceTypeOption
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
        console.log('is toggle')
        this.DialogVisile.splice(id, 1, !this.DialogVisile[id])
      },
      alertTest() {
        alert('hello world')
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
    .col::before{
      filter: blur(5px);
    }
    .col {
      height: 23vh;
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
