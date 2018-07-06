<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">当前设备总数</div>
            <div class="colcount">{{ totalDevcieCount }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-green">
          <i class="iconSet"></i>
          <div class="colBox">
            <div class="colname">在线设备总数</div>
            <div class="colcount">{{ onlineCount }}</div>
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
        <div class="grid-content bg-blue">
          <i class="iconUser"></i>
          <div class="colBox">
            <div class="colname">当前用户人数</div>
            <div class="colcount">{{userCount}}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-blue">
          <i class="iconUser"></i>
          <div class="colBox">
            <div class="colname">昨日用户增长数</div>
            <div class="colcount">0%</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-blue">
          <i class="iconUser"></i>
          <div class="colBox">
            <div class="colname">今日活跃用户数</div>
            <div class="colcount">373</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconList"></i>
          <div class="colBox">
            <div class="colname">今日订单数</div>
            <div class="colcount">33</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="iconList"></i>
          <div class="colBox">
            <div class="colname">本月订单数</div>
            <div class="colcount">1373</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <linebar-chart></linebar-chart>
      </el-col>

      <el-col :span="12">
        <bar-chart></bar-chart>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="12">
        <line-chart></line-chart>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 当前设备总数
  // 在线设备总数
  // 当前设备故障数
  // 当前用户有人数
  // 昨日用户增长数
  // 今日活跃用户数
  // 本月用户增长数
  // 本月活跃用户数
  //
  // 当前设备在线率
  // 当前用户活跃率
  // 传感器总数
  // PM2.5 传感器总数
  // 甲醛传感器总数
  // CO2 传感器总数
  // TVOC 传感器数据总数
  // 优良环境数
  // 优良环境比率
  import { obtainIndexVo } from '@/api/index'
  import { mapGetters } from 'vuex'
  import countTo from 'vue-count-to'
  import panThumb from '@/components/PanThumb/index'
  import todoList from '@/components/TodoList/index'
  import pieChart from './pieChart'
  import linebarChart from './linebarChart'
  import lineChart from './lineChart'
  import barChart from './barChart.vue'

  export default {
    name: 'dashboard-admin',
    components: { countTo, panThumb, todoList, pieChart, lineChart, linebarChart, barChart},
    data() {
      return {
        totalDevcieCount: 0,
        onlineCount: 0,
        userCount: 0
      }
    },
    created() {
      obtainIndexVo().then(response => {
        this.totalDevcieCount = response.data.data.deviceCount
        this.onlineCount = response.data.data.onlineCount
        this.userCount = response.data.data.userCount
      })
    },
    methods: {
      getList() {

      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    margin: 30px;
    .btn-group {
      margin-bottom: 60px;
    }
    .box-card-header {
      position: relative;
      height: 160px;
    }
    .panThumb {
      z-index: 100;
      height: 150px;
      width: 150px;
      position: absolute;
      left: 0px;
      right: 0px;
      margin: auto;
    }
    .display_name {
      font-size: 30px;
      display: block;
    }
    .info-item {
      display: inline-block;
      margin-top: 10px;
      font-size: 14px;
      &:last-of-type {
        margin-left: 15px;
      }
    }

    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }

    .grid-content {
      border-radius: 4px;
      height: 114px;
      margin-top: 20px;
      padding: 27px;
      color: white;
      display: flex;
    }
    .grid-content i {
      display: block;
      width: 60px;
      height: 60px;
      margin-right: 25px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .colname {
      font-size: 14px;
      margin-top: 5px;
    }
    .colcount {
      font-size: 27px;
    }
    .el-row {
      margin-top: 50px;
    }
  }
</style>
