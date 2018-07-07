<template>
  <div class="app-container calendar-list-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">当前设备总数</div>
            <div class="colcount">1985</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">今日设备新增数</div>
            <div class="colcount">0</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">当前设备故障数</div>
            <div class="colcount">0</div>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">今日设备订单日</div>
            <div class="colcount">0</div>
          </div>
        </div>
      </el-col>

    </el-row>

    <div class="selectBox">
      <el-select v-model="value1" placeholder="设备MAC">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>

      <el-select v-model="value2" placeholder="设备状态">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>

      <el-select v-model="value3" placeholder="在线状态">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>
    <!--地图容器-->
    <div id="XSDFXPage" class="XSDFXPage"></div>
  </div>
</template>

<script>

  export default {
    name: 'devicemap',
    data() {
        return {
          options1: [{
            value: '设备MAC',
            label: ''
          }, {
            value: '设备序列号',
            label: '设备序列号',
          }, {
            value: '设备名称',
            label: '设备名称'
          }, {
            value: '投放点',
            label: '投放点'
          }],
          value1: '',
          options2: [{
            value: '设备状态',
            label: ''
          }, {
            value: '使用中',
            label: '使用中',
          }, {
            value: '空闲',
            label: '空闲'
          }, {
            value: '障碍',
            label: '障碍'
          }],
          value2: '',
          options3: [{
            value: '在线状态',
            label: ''
          }, {
            value: '在线',
            label: '在线',
          }, {
            value: '离线',
            label: '离线'
          }],
          value3: '',
        };
    },

    mounted() {
      // 百度地图API功能
      // 创建Map实例
      var map = new BMap.Map("XSDFXPage", {enableMapClick: true});
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5);
      // 添加地图类型控件
      map.addControl(new BMap.MapTypeControl());
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);
      map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
      }));
    }
  }
</script>

<style scoped>
  .selectBox{
    margin-top: 20px;
  }
  .XSDFXPage{
    width: 100%;
    height: 800px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
    margin-top: 30px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    height:114px;
    margin-top: 20px;
    padding:27px;
    color:white;
    display: flex;
  }
  .grid-content i{
    display: block;
    width: 60px;
    height: 60px;
    margin-right: 25px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .colname{
    font-size: 14px;
    margin-top: 5px;
  }
  .colcount{
    font-size: 27px;
  }

</style>
