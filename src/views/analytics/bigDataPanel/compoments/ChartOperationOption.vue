<template>
  <el-dialog top='4vh' :close-on-click-modal=false 
    title="告警信息"
    :visible.sync="dialogVisible"
    :before-close="close"
    :modal="false"
    width="80%">
    <el-row>

      <el-col :span="8">
        <el-radio-group v-model="filterIntegrate">
          <el-radio-button label="7天"></el-radio-button>
          <el-radio-button label="30天"></el-radio-button>
          <el-radio-button label="60天"></el-radio-button>
          <el-radio-button label="90天"></el-radio-button>
        </el-radio-group>
        <chart :options="mainChartOption"></chart>
      </el-col>
      <el-col :span="8">
        <h2 class="center">总告警:<br/>{{total}}起</h2>
      </el-col>
      <el-col :span="8">
        <chart class="chart" :options="lineChartOption"></chart>
        <chart class="chart" :options="roseChartOption"></chart>
      </el-col>
      <el-col :span="24">
        <h2 class="center">最长处理时间: {{maxProcessTime}}</h2>

        <table class="table">
         <th>已处理</th>
         <th>未处理</th>
         <th>处理中</th>
         <th>误告警</th>
         <tr>
           <td>传感器不准</td>
           <td></td>
           <td></td>
         </tr>
         <tr>
           <td>订单异常</td>
           <td></td>
           <td></td>
         </tr>
         <tr>
           <td>滤网过期</td>
           <td></td>
           <td></td>
         </tr>
       </table>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">返回</el-button>
  </span>
  </el-dialog>

</template>

<script>
export default {
  props: ['id', 'visible', 'options'],
  data() {
    return {
      dialogVisible: false,
      mainChartOption: null,
      filterIntegrate: '30天',
      // Data
      allTypes: [],
      data: [],
      maxProcessTime: '47小时53分钟',
      total: '1080',
      lineChartData: null,
      lineChartOption: null,
      roseChartOption: null
    }
  },
  mounted() {
    this.mainChartOption = {
      title: [
        {
          text: '已经处理\n80%',
          top: '40%',
          left: 'center'
        }
      ],

      legend: {
        orient: 'vertical',
        left: 'right',
        data: this.allTypes,
        top: 50
        /*
        formatter: function (series) {
          return series[0].name[0].value;
        },
        */
      },

      series: [
        {
          name: '详细',
          type: 'pie',
          radius: ['50%', '70%'],
          data: this.data
        }
      ]
    }
    this.lineChartOption = {
      xAxis: {
        type: 'category',
        data: this.lineChartData.intergrals
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.lineChartData.data,
        type: 'line'
      }]
    }
    this.roseChartOption = {

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      /*
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
      }
      /*
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      */
      calculable: true,
      series:
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          center: ['50%', '60%'],
          roseType: 'area',
          data: [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
          ]
        }

    }
  },
  created() {
    this.populateData()
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    populateData() {
      this.allTypes = this.options.allTypes
      this.data = this.options.data
      this.lineChartData = this.options.lineChart
    },
    close() {
      this.dialogVisible = false
      this.$emit('toggleDialog', this.id)
    }
  }
}
</script>

<style scoped>
  .center {
    text-align: center;
  }
  .chart {
    width: 100%;
    height: 200px;
  }
  .table {
    width: 100%;
  }
</style>
