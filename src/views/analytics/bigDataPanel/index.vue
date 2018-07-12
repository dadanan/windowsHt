<template>
  <div class="big-data-panel">
    <router-link to="/">返回</router-link>
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
        <el-col :span="24" id="col">
          <a id="setting" type="primary" size="mini" @click="toggleDialog(0)">设置</a>
          <WeatherOption :id="0" :visible.sync="DialogVisile[0]" @updateOption="updateWeatherOption"
                         @toggleDialog="toggleDialog"></WeatherOption>
          <h3>天气环境</h3>
          <Weather :option="OptionData.WeatherOptionData"></Weather>

        </el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <ChartDeviceData></ChartDeviceData>
        </el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <ChartUserData></ChartUserData>
        </el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <ChartDeviceType></ChartDeviceType>
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
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <h3>信息发布</h3></el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <h3>解决方法</h3></el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <ChartOperationData></ChartOperationData>
        </el-col>
        <el-col :span="24" id="col"><a id="setting" type="primary" size="mini">设置</a>
          <FilteredData></FilteredData>
        </el-col>
      </el-col>
    </el-row>

  </div>


</template>
<script>
  import ChartDeviceMap from './compoments/ChartDeviceMap.vue'
  import ChartDeviceData from './compoments/ChartDeviceData.vue'
  import ChartUserData from './compoments/ChartUserData.vue'
  import ChartDeviceType from './compoments/ChartDeviceType.vue'
  import ChartOperationData from './compoments/ChartOperationData.vue'
  import FilteredData from './compoments/FilteredData.vue'
  import Weather from './compoments/Weather.vue'

  import WeatherOption from './compoments/WeatherOption.vue'

  export default {
    components: {
      ChartDeviceMap,
      ChartDeviceData,
      ChartUserData,
      ChartDeviceType,
      ChartOperationData,
      FilteredData,
      Weather,

      WeatherOption
    },
    data() {
      return {
        OptionData: {
          WeatherOptionData: {
            province: '上海',
            city: '上海市',
            suburb: '普陀区'
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
    #col {
      height: 25vh;

    }
    #setting {
      float: right;
      &:hover {
        color: #4CD8FC;
      }
    }
    h1, h2, h3 {
      text-align: center;
    }

  }

</style>
