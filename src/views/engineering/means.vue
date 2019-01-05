<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" class="btn" :sm="6" :lg="8">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
            <h2>{{total}}</h2>
            <p>工程总数</p>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <h2>{{deviceTotalCount}}</h2>
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
            <el-input placeholder="工程编号" v-model="query.projectNo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="工程名字" v-model="query.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="工程建设时间" v-model="createTime">
                <el-option label="今天" value="1"></el-option>
                <el-option label="前七天" value="2"></el-option>
                <el-option label="前30天" value="3"></el-option>
                <el-option label="全部" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="工程地址" v-model="query.buildAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <!-- <el-button-group>
          <el-button type="primary" icon="el-icon-menu" @click="switchs"></el-button>
        </el-button-group> -->
        <div style="flex: 1;"></div>
        <el-button-group>
          <el-button type="primary" @click="AddMessage = true">添加</el-button>
          <el-button type="primary" @click="deleteProject">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-means :visible.sync="AddMeans" :data ='editingDatas'></add-means>
      <create-means :visible.sync="CreateMeans" :data ='editingDatasc'></create-means>
      <add-message :visible.sync="AddMessage" :data ='editingData' @add-data='addData'></add-message>
      <create-message :visible.sync="CreateMessage" :data ='editingDataa' @add-data='addData'></create-message>
      <project-details :visible.sync="ProjectDetails" :data ='editingDataf'></project-details>
      <el-table @expand-change="expandChanged"  :data="alarmList" style="width: 100%" class="mb20" border v-if="list" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table v-if="scope.row.describeData" :data="scope.row.describeData" style="width: 100%" class="mb20" border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="imgList" label="图册" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <img :src="scope.row.imgList[0]" style="width:100%">
                    </template>
                </el-table-column>
                <el-table-column prop="typeName" label="实施阶段" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="description" label="工程实施描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="implTime" label="实施时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <template v-if='scope.row.implTime'>
                            {{new Date(scope.row.implTime).toLocaleString()}}
                        </template>
                        <template v-else>
                            - -
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="as" label="工程资料分配" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <template v-for="(item,key) in scope.row.as">
                            <template v-for="(items,key) in item">
                                <div class="" style="padding:20px 0px;">
                                    {{key}}
                                </div>
                            </template>
                        </template>
                    </template>
                  </el-table-column>
                  <el-table-column prop="as" label="文件列表" show-overflow-tooltip width="400px">
                    <template slot-scope="scope">
                          <template v-for="(item,key) in scope.row.as">
                            <template v-for="(items,key) in item">
                                  <template v-for="(itemss,key) in items">
                                    <div class="" style="padding:10px 0px;">
                                        {{itemss.substring((itemss.lastIndexOf('/')) + 1, itemss.length )}}
                                        <a :href="itemss" style="padding-left:20px">下载</a>
                                    </div>
                                </template>
                              </template>
                        </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-button type="text" @click="createMeans(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
            </el-table>
            <el-alert v-else title="该工程下没有对应的实施！" type="info" center show-icon :closable="false"></el-alert>
          </template>
        </el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="projectNo" label="工程编号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="工程名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="description" label="工程描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="buildTime" label="工程建设时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.buildTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="buildAddress" label="工程建设地址" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="projectCount" label="项目数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="deviceCount" label="设备数量" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addMeans(scope.row)">归档</el-button>
            <el-button type="text" @click="createMessage(scope.row)">修改</el-button>
            <el-button type="text" @click="projectDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import AddMeans from './components/AddMeans'
import AddMessage from './components/AddMessage'
import CreateMessage from './components/CreateMessage'
import CreateMeans from './components/CreateMeans'
import ProjectDetails from './components/ProjectDetails'
import { implId,EngList ,createselect ,deleteProject ,projectLocationCount ,projectTrendCount ,project} from '@/api/alarm'
import { queryHomePageStatistic } from '@/api/big-picture-mode/bigPictureMode'
export default {
  components: {
    DataCard,
    AddMeans,
    AddMessage,
    ProjectDetails,
    CreateMessage,
    CreateMeans
  },
  data() {
    return {
      AddMeans: false,
      AddMessage: false,
      ProjectDetails: false,
      CreateMessage:false,
      CreateMeans:false,
      editingDataa:{},
      editingDatas:{},
      editingDatasc:{},
      editingDataf:{},
      alarmList: [],
      editingData:{},
      activeTab: '1',
      selectedDeviceList:[],
      ids:[],
      list: true,
      deviceTotalCount:0,
      query: {
        limit: 100,
        page: 1
      },
      createTime:'',
      total: 0,
      kanbanChart2: {
        title: {
          text: '工程量趋势图'
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '增长趋势',
            data: [],
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
            data:[],
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
            data: []
          }
        ]
      }
    }
  },
  methods: {
    addData(val){
      this.EngList()
    },
    search(){
      const taday = new Date(new Date().setHours(0, 0, 0, 0))
      const SevenDayAgo = taday - 86400 * 7
      const SevenDayAgos = taday - 86400 * 30
      if(this.createTime ==1){
        this.query.createTime =taday
      }else if(this.createTime ==2){
        this.query.createTime =SevenDayAgo
      }else if(this.createTime ==3){
        this.query.createTime =SevenDayAgos
      }
      this.EngList()
    },
    reset(){
      this.query.buildAddress ='',
      this.createTime ='',
      this.query.name ='',
      this.query.projectNo =''
      this.EngList()
    },
    switchs() {
      this.list = !this.list
    },
    expandChanged(data) {
      if (data.describeData) {
        return
      }
      project(data.id).then(res=>{
            const list = res.data
            for(var i = 0;i<list.length;i++){
                list[i].as = []
                list[i].as.push(list[i].fileMap)
            }
            console.log(list)

        data.describeData = Object.assign([], list, []);
      })
    },
    EngList() {
      EngList(this.query).then(res => {
        this.alarmList = res.data.projectRspPoList
        this.total = res.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectList1()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.selectList1()
    },
    addMeans(val){
      this.AddMeans = true
      this.editingDatas = val
    },
    createMessage(val){
     createselect(val.id).then(res=>{
          this.CreateMessage = true
          this.editingDataa = res.data
      })
    },
    createMeans(val){
      console.log(val)
      // implId(val.typeId).then(res=>{
      //   this.CreateMeans = true
      //   this.editingDatasc = res.data
      // })
      this.CreateMeans = true
      this.editingDatasc = val
    },
    projectDetails(val){
      createselect(val.id).then(res=>{
          this.ProjectDetails = true
          this.editingDataf = res.data
      })
    },
    projectLocationCount(){
      projectLocationCount().then(res=>{
          const list = res.data
          const distance = []
          const projectPercent = []
          for(var i = 0;i<list.length;i++){
            distance.push(list[i].distance)
            projectPercent.push(list[i].projectCount)
          }
          this.kanbanChart.xAxis[0].data = distance
          this.kanbanChart.series[0].data = projectPercent
      })
    },
    projectTrendCount(){
      projectTrendCount().then(res=>{
          const list = res.data
          const date = []
          const projectCount = []
          for(var i = 0;i<list.length;i++){
            date.push(list[i].date)
            projectCount.push(list[i].projectCount)
          }
          this.kanbanChart2.xAxis.data = date
          this.kanbanChart2.series[0].data = projectCount
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    deleteProject(){
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteProject({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.selectedDeviceList = []
          this.ids =[]
          this.EngList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    queryHomePageStatistic() {
      // 查询首页数据
      queryHomePageStatistic().then(res => {
        const data = res.data
        this.deviceTotalCount=data.deviceTotalCount
      })
    }
  },
  created() {
    this.EngList()
    this.projectLocationCount()
    this.projectTrendCount()
    this.queryHomePageStatistic()
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
