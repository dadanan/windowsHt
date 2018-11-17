<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :xs="24" class="btn" :sm="6" :lg="8">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
                        <h2>11</h2>
                        <p>工程总数</p>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="12">
                        <h2>290</h2>
                        <p>设备总数</p>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs="24" :sm="6" :lg="8">
                <chart :options="kanbanChart" class="chart" auto-resize></chart>
            </el-col>
            <el-col :xs="24" :sm="6" :lg="8">
                <chart :options="kanbanChart2" class="chart" auto-resize></chart>
            </el-col>
        </el-row>
        <el-card>
            <div class="table-opts">
                <el-form :inline="true" class="el-form--flex">
                    <el-form-item>
                        <el-input placeholder="工程编号"></el-input>
                        <!-- <el-select placeholder="工程编号" :value='value1'>
                            <el-option label="工程名字" value="1"></el-option>
                            <el-option label="设备序列号" value="2"></el-option>
                            <el-option label="设备名称" value="3"></el-option>
                            <el-option label="投放点" value="4"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="工程名字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="工程建设时间"></el-input>
                        <!-- <el-select placeholder="工程建设时间" :value='value2'>
                            <el-option label="预留布尔值故障" value="1"></el-option>
                            <el-option label="滤网到期提醒" value="2"></el-option>
                            <el-option label="PM 2.5 数值丢失报警" value="3"></el-option>
                            <el-option label="设备移开 1000 米报警" value="4"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="工程地址"></el-input>
                        <!-- <el-select placeholder="工程地址" :value='value3'>
                            <el-option label="未修复" value="1"></el-option>
                            <el-option label="已修复" value="2"></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-opts">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-menu" @click="switchs"></el-button>
                </el-button-group>
                <div style="flex: 1;"></div>
                <el-button-group>
                    <el-button type="primary" @click="AddMeans = true">实施</el-button>
                    <el-button type="primary">添加</el-button>
                    <el-button type="primary">删除</el-button>
                    <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
                </el-button-group>
            </div>
            <add-means :visible.sync="AddMeans"></add-means>
            <el-table :data="alarmList" style="width: 100%" class="mb20" border v-if="list">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="mac" label="工程编号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mac1" label="工程名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mac2" label="工程描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sn" label="工程建设时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="name" label="工程建设地址" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="pos" label="项目数量" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="tel" label="设备数量" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text">修改</el-button>
                        <el-button type="text">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-table :data="alarmList" style="width: 100%" class="mb20" border :span-method="arraySpanMethod">
                <el-table-column label="消息描述" show-overflow-tooltip>
                    <div class="">
                        <p>{{alarmList.name}}</p>
                    </div>
                </el-table-column>
                <el-table-column label="选择关联" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否规则化" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column label="告警级别" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table> -->
            <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import AddMeans from './components/AddMeans'


export default {
  components: {
    DataCard,
    AddMeans
  },
  data() {
    const alarmList = []

    for (let i = 0; i < 15; i++) {
      alarmList.push({
        mac: 'W3RF4ERT4',
        mac1: '设备定期年检',
        mac2: '设备定期年检设备定期年检',
        sn: '2018-10-13',
        name: '上海市新微大厦',
        pos: '3',
        tel: '111',
        createDatetime: '2018-03-28 01:24:29',
        state: '已修复'
      })
    }
    return {
      AddMeans:false,
      alarmList,
      activeTab: '1',
      list: true,
      value1: '',
      value2: '',
      value3: '',
      kanbanChart2: {
        title: {
          text: '工程量趋势图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ['2018-03', '2018-04', '2018-05', '2018-06', '2018-07']
        },
        yAxis: {},
        series: [
          {
            name: '增长趋势',
            data: [2, 54, 32, 18, 20],
            type: 'line'
          }
        ]
      },
      kanbanChart: {
        title: {
          text: '各地工程量TOP5'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '普陀区',
              '嘉定区',
              '建邺区',
              '朝阳区',
              '东城区'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '占比',
            type: 'bar',
            barWidth: '60%',
            data: [390,330, 200, 100, 50]
          }
        ]
      }
    }
  },
  methods: {
    switchs() {
      this.list = !this.list
    },
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   console.log(row, column, rowIndex, columnIndex)
    //   // 打印出的数据就是表格当前行的数据,当前列的数据,索引
    //   if (rowIndex === 2 || rowIndex === 0 || rowIndex === 1) {
    //     // 合并第二行
    //     if (columnIndex === 0) {
    //       // 从第二列开始
    //     //   return [0, 2]
    //       // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
    //       // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
    //       return {
    //          rowspan: 1,
    //          colspan: 4
    //        }
    //       // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
    //       // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
    //     } else if (columnIndex === 2 || columnIndex === 3) {
    //       return [0, 0]
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 230px;
  width: 100%;
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    padding-top: 20px;
    font-size: 50px;
  }
}
</style>
