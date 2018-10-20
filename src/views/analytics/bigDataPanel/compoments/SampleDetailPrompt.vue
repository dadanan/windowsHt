<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="案列详情" :visible.sync="dialogVisible" width="80%" :before-close="close" :modal="false">

    <el-row class="main-row">
      <el-col :span="12" class="left-col">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="http://via.placeholder.com/350x150" width="100%" height="80%" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="12" class="right-col">
        <el-row>
          <el-col :span="24" style="height: 170px;">
            <h1 style="text-align: center;">工程示意图</h1>
          </el-col>
          <el-col :span="24">
            <chart :options="pieChartOption" class="chart" style="height: 180px; width: 180px"></chart>
          </el-col>
        </el-row>
        <chart class="chart" :options="barChaerOption"></chart>
      </el-col>
      <el-col :span="12" class="left-col">
        <el-select v-model="optionFirst.value" placeholder="Select">
          <el-option v-for="item in optionFirst.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="optionSecond.value" placeholder="Select">
          <el-option v-for="item in optionSecond.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <chart class="chart" :options="lineChartOption"></chart>
      </el-col>

    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['id', 'options', 'visible'],
  data() {
    return {
      dataSource: null,
      dialogVisible: false,
      selectedProject: {
        id: 0,
        name: '名称',
        selectImg: null,
        selectIcon: null
      },
      lineChartOption: null,
      pieChartOption: null,
      barChaerOption: null,
      optionFirst: {
        value: '客厅',
        options: [
          {
            value: '客厅',
            label: '客厅'
          },
          {
            value: '卧室',
            label: '卧室'
          },
          {
            value: '次卧',
            label: '次卧'
          },
          {
            value: '2楼',
            label: '2楼'
          }
        ]
      },
      optionSecond: {
        value: 'TVOC',
        options: [
          {
            value: 'TVOC',
            label: 'TVOC'
          },
          {
            value: '甲醛',
            label: '甲醛'
          },
          {
            value: 'CO2',
            label: 'CO2'
          }
        ]
      }
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    },
    selectedProject() {}
  },
  created() {
    this.lineChartOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        },
        {
          data: [903, 800, 755, 543, 400, 200, 50],
          type: 'line',
          smooth: true
        }
      ]
    }
    this.pieChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['a', 'b', 'c']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'a' },
            { value: 310, name: 'b' },
            { value: 234, name: 'c' }
          ]
        }
      ]
    }
    this.barChaerOption = {
      xAxis: {
        type: 'category',
        data: ['1:00 pm', '2:00 pm', '3:00 pm']
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        data: ['开机', '未开机']
      },
      series: [
        {
          name: '未开机',
          data: [120, 200, 150],
          type: 'bar'
        },
        {
          name: '开机',
          data: [50, 20, 30],
          type: 'bar'
        }
      ]
    }
    this.populateData()
  },
  methods: {
    populateData() {
      this.dataSource = this.options.data
    },
    onSelectProject() {
      this.updateProjectAttribute(this.selectedProject.id)
    },
    updateProjectAttribute(id) {
      this.selectedProject.id = id
      this.selectedProject.name = this.dataSource[id].name
    },
    close() {
      this.dialogVisible = false
      this.$emit('toggleDialog', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-samples {
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
}
.setting {
  float: right;
}
.main-row {
  height: 550px;
}
.left-col {
  height: 275px;
}
.right-col {
  height: 275px;
}
.chart {
  height: 275px;
  width: 100%;
}
</style>
