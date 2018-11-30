<template>
    <div>
        <el-dialog top='4vh' class='device-detail-container' :close-on-click-modal=false :visible="visible" width='95%' @update:visible="$emit('update:visible', $event)" >
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane label="工程基本信息" name="1">
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-card class="el-card--solid">
                                <h3 style="margin-bottom:30px">基本信息</h3>
                                <el-form label-width="130px" class="mb-22">
                                    <el-form-item label="工程编号">
                                        <el-input v-model='form.projectNo'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程名称">
                                        <el-input v-model='form.name'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程描述">
                                        <el-input type="textarea" :rows='3' v-model='form.description'></el-input>
                                    </el-form-item>
                                    <el-form-item label="工程建设时间">
                                        <!-- <el-date-picker type="date" v-model='form.buildTime' value-format="timestamp"></el-date-picker> -->
                                        {{new Date(form.buildTime).toLocaleString()}}
                                    </el-form-item>
                                    <el-form-item label="工程建设地址">
                                        <!-- <el-input v-model='form.buildAddress'></el-input> -->
                                        {{form.buildAddress}}
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </div>
                        <div class="flex-item">
                            <el-card class="el-card--solid map-container">
                                <el-tabs v-model="activeTabT" type="card">
                                    <el-tab-pane label="工程分析" name="5">
                                        <el-row :gutter="20">
                                            <el-col :xs="24" class="btn" :sm="6" :lg="10">
                                                <el-row :gutter="20">
                                                    <h3>工程建设日期 : <span style="font-size:20px">2018年12月12日</span></h3>
                                                    <div style="padding-top:20px">
                                                        <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
                                                            <h2>11</h2>
                                                            <p>工程总数</p>
                                                        </el-col>
                                                        <el-col :xs="24" :sm="12" :lg="12">
                                                            <h2>290</h2>
                                                            <p>设备总数</p>
                                                        </el-col>
                                                    </div>
                                                    <div style="padding-top:140px">
                                                        <el-col :xs="24" :sm="12" :lg="12" style="border-right:2px solid #66c8d9">
                                                            <h2>11</h2>
                                                            <p>维保次数</p>
                                                        </el-col>
                                                        <el-col :xs="24" :sm="12" :lg="12">
                                                            <h2>290</h2>
                                                            <p>设备告警次数</p>
                                                        </el-col>
                                                    </div>
                                                </el-row>
                                            </el-col>
                                            <el-col :xs="24" :sm="6" :lg="14">
                                                <div class="progress">
                                                    <h2>在线设备占比图</h2>
                                                    <el-progress :text-inside="true" :stroke-width="30" :percentage="name"></el-progress>
                                                </div>
                                                <div class="progress1">
                                                    <h2>开机设备占比图</h2>
                                                    <el-progress :text-inside="true" :stroke-width="30" :percentage="70"></el-progress>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="工程地点" name="6">
                                        <a-map :gps='form && form.gps' @getLocation='getLocation'></a-map>
                                    </el-tab-pane>
                                    <el-tab-pane label="概况预览" name="7">
                                        <p>111</p>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-card>
                        </div>
                    </div>
                    <div class="flex-item">
                        <el-card class="el-card--solid ">
                            <el-tabs v-model="activeTabS" type="card">
                                <el-tab-pane label="设备项目信息" name="8">
                                    <el-table :data="selectGroup" style="width: 100%" class="mb20" border>
                                        <el-table-column type="expand">
                                            <template slot-scope="scope">
                                                <el-table :data="scope.row.deviceList" style="width: 100%" class="mb20" border>
                                                    <el-table-column type="index"></el-table-column>
                                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip >
                                                    </el-table-column>
                                                    <el-table-column prop="mac" label="mac" show-overflow-tooltip >
                                                    </el-table-column>
                                                    <el-table-column prop="belongTo" label="归属" show-overflow-tooltip >
                                                    </el-table-column>
                                                    <el-table-column prop="workStatus" label="工作状态" show-overflow-tooltip >
                                                        <template slot-scope="scope">
                                                            <template v-if='scope.row.workStatus'>
                                                                {{scope.row.workStatus === 1 ? '开机' : '关机'}}
                                                            </template>
                                                            <template v-else>
                                                                 - -
                                                            </template>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="lastOnlineTime" label="最后上线时间" show-overflow-tooltip >
                                                    </el-table-column>
                                                </el-table>
                                            </template>
                                        </el-table-column>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="name" label="项目名称" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="introduction" label="项目介绍" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="location" label="地点" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="belongTo" label="归属" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip >
                                            <template slot-scope="scope">
                                                <template v-if='scope.row.createTime'>
                                                    {{new Date(scope.row.createTime).toLocaleString()}}
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="其他设备" name="9">
                                    <el-table :data="form.extraDeviceList" style="width: 100%" class="mb20" border>
                                        <!-- <el-table-column type="expand">
                                            <template slot-scope="scope">
                                                <el-table :data="scope.row.childDeviceList" style="width: 100%" class="mb20" border>
                                                    <el-table-column type="index"></el-table-column>
                                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="mac" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="归属" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="工作状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="在线状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="告警状态" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                    <el-table-column prop="childId" label="最后上线时间" show-overflow-tooltip sortable>
                                                    </el-table-column>
                                                </el-table>
                                            </template>
                                        </el-table-column> -->
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="name" label="设备名称" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="model" label="设备型号" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="factory" label="厂家" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="direction" label="说明书" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <a :href="scope.row.direction">下载</a>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <template v-if='scope.row.createTime'>
                                                    {{new Date(scope.row.createTime).toLocaleString()}}
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="材料类" name="10">
                                    <el-table :data="material" style="width: 100%" class="mb20" border>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="name" label="品名规格" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="nums" label="库存数量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="id" label="库存变更详情" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="ChangeDetails = true">详情</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <template v-if='scope.row.createTime'>
                                                    {{new Date(scope.row.createTime).toLocaleString()}}
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="耗材类" name="11">
                                    <el-table :data="consumables" style="width: 100%" class="mb20" border>
                                        <el-table-column type="index"></el-table-column>
                                        <el-table-column prop="name" label="品名规格" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="nums" label="库存数量" show-overflow-tooltip >
                                        </el-table-column>
                                        <el-table-column prop="id" label="库存变更详情" show-overflow-tooltip >
                                            <template slot-scope="scope">
                                                <el-button type="text" @click="ChangeDetailsT = true">详情</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <template v-if='scope.row.createTime'>
                                                    {{new Date(scope.row.createTime).toLocaleString()}}
                                                </template>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工程资料" name="2">
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-card class="el-card--solid">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">
                                            <img :src="describe.imgUrl" alt="" style="width:100%;min-height:244px">
                                        </div>
                                    </el-col>
                                    <el-col :span="16">
                                        <div class="grid-content bg-purple-light">
                                            <el-form label-width="130px" class="mb-22">
                                                <el-form-item label="实施阶段">
                                                    <el-input v-model='describe.typeName' disabled></el-input>
                                                </el-form-item>
                                                <el-form-item label="实施时间">
                                                     <template v-if = "describe.implTime">
                                                        <el-date-picker v-model="describe.implTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="timestamp" disabled> </el-date-picker>
                                                     </template>
                                                     <template v-else>
                                                         <el-input disabled></el-input>
                                                     </template>
                                                </el-form-item>
                                                <el-form-item label="实施描述">
                                                    <el-input type="textarea" :rows='3' v-model='describe.description' disabled></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </div>
                        <div class="flex-item">
                            <el-card class="el-card--solid map-container2">
                                <!-- <el-table  v-if="(item) in describe.as" style="width: 100%" class="mb20">
                                    <el-table-column label="文件类型">
                                        {{item}}
                                    </el-table-column>
                                    <el-table-column label="文件名称">
                                        <template> -->
                                            <!-- <template v-if='scope.row.sd'>
                                                <div class="" v-for="(item,index) in scope.row.typeId">
                                                    <p>{{item.id}} <span>{{index}}</span></p>
                                                </div>
                                            </template> -->
                                            <!-- <template v-else>
                                                {{scope.row.typeId}}
                                            </template> -->
                                        <!-- </template>
                                    </el-table-column>
                                </el-table> -->
                                <div v-for="(item,key) in describe.as" class="tab" >
                                        <table class="table" border style="width:100%">
                                        <tr>
                                            <th>文件类型</th>
                                            <th>文件</th>
                                        </tr>
                                        <tr style="text-align:center" v-for="(items,key) in item">
                                            <td style="width:200px">{{ key }}</td>
                                            <td style="width:200px">
                                                <div class="" v-for="itemss in items">
                                                    <div class="" style="padding:10px 0px;">
                                                        {{itemss.substring((itemss.lastIndexOf('/')) + 1, itemss.length )}}
                                                        <a :href="itemss" style="padding-left:20px">下载</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="flex mb20">
                        <div class="flex-item flex-item--full">
                            <el-table :data="describeData" style="width: 100%" class="mb20" border>
                                <el-table-column type="index"></el-table-column>
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
                                <el-table-column prop="imgList" label="图册" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <img :src="scope.row.imgList[0]" style="width:100%">
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
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工程维保" name="3">
                    <el-table :data="maintenances" style="width: 100%" class="mb20" border>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="ruleName" label="规则分类" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="name" label="维保项" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="description" label="维保内容" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="warnLevel" label="告警级别" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip sortable>
                            <template slot-scope="scope">
                                <template v-if='scope.row.createTime'>
                                    {{new Date(scope.row.createTime).toLocaleString()}}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createName" label="创建者" show-overflow-tooltip sortable>
                        </el-table-column>
                        <el-table-column prop="typeId" label="操作" show-overflow-tooltip sortable>
                            <template slot-scope="scope">
                                <el-button type="text">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination :current-page="qurey.currentPage" :page-sizes="[100,200,300,400]" :page-size="qurey.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="材料类库存变更详情" :visible.sync="ChangeDetails">
            <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                <el-table-column prop="name" label="操作时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作者" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作环节" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="数量变化情况" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="耗材类库存变更详情" :visible.sync="ChangeDetailsT">
            <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                <el-table-column prop="name" label="操作时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作者" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="操作环节" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="数量变化情况" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import AMap from './AMap'

import { selectGroups ,project ,maintenance} from "@/api/alarm";

export default {
  components: {
      AMap
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
        type:Object
    }
  },
  data() {
    return {
      consumablesList1: [],
      activeTab: '1',
      activeTabT: '5',
      activeTabS: '8',
      ChangeDetails: false,
      ChangeDetailsT: false,
      form: {},
      name: 90,
      material:[], //材料
      consumables:[], //耗材
      selectGroup:[],
      qurey:{
          currentPage:1,
          limit:100,
          projectId:0
      },
      maintenances:[],
      total:0,
      describeData:[],
      describe:{}
    }
  },
  methods: {
    getLocation({ gps, location }) {},
    selectGroups(val){
        selectGroups({valueList:val}).then(res=>{
            this.selectGroup = res.data
        })
    },
    //工程资料
    project(val){
        project(val).then(res=>{
            // console.log(res.data)
            this.describeData = res.data
            this.describe = (this.describeData)[0]
            this.describe.imgUrl = this.describe.imgList[0]
            this.describe.as = []
            this.describe.as.push(this.describe.fileMap)
            // console.log(this.describe)
            const list = res.data
            for(var i = 0;i<list.length;i++){
                list[i].as = []
                list[i].as.push(list[i].fileMap)
                // console.log(list)
            }
            // console.log(list)
            // console.log(111)
        })
    },
    //维保项
    maintenance(){
        maintenance(this.qurey).then(res=>{
            const list = res.data.planRspPoList
            const mapList = {
                '1': '一级告警',
                '2': '二级告警',
                '3': '三级告警'
            }
            const linkList = {
                '0': '不关联',
                '1': '关联设备',
                '2': '关联工程'
            }
            for (var i = 0; i < list.length; i++) {
                list[i].warnLevel = mapList[list[i].warnLevel]
                list[i].linkType = linkList[list[i].linkType]
                if (list[i].status == 1) {
                    list[i].status = '正常'
                }
                if (list[i].status == 3) {
                    list[i].status = '禁用'
                }
            }
            this.maintenances = list
            this.total = res.data.totalCount
        })
    },
     handleSizeChange(val) {
      this.query.limit = val
      this.maintenance()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.maintenance()
    },
    
  },
  watch: {
      data(val){
          this.activeTab='1',
          this.activeTabT='5',
          this.activeTabS='8',
          this.form = val
          const materialInfoList = this.form.materialInfoList
          for(var i = 0;i< materialInfoList.length ;i++){
              if(materialInfoList[i].type == 1){
                  this.material.push(materialInfoList[i])
              }else{
                  this.consumables.push(materialInfoList[i])
              }
          }
          const groupIds = this.form.groupIds.split(",")
          this.selectGroups(groupIds)
          this.project(this.form.id)
          this.qurey.projectId = this.form.id
          this.maintenance()
      }
  }
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.device-detail-container {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 860px;
  min-height: 414px;
}
.map-container1 {
  width: 760px;
  min-height: 414px;
}
.map-container2 {
  width: 760px;
  height: 290px;
  overflow: auto;
}
.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    font-size: 36px;
    margin: 0px;
    margin: 10px 0px;
  }
}
.progress {
  padding: 60px 0px 40px 0px;
  h2 {
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 10px solid #969696;
  }
}
.progress1 {
  h2 {
    margin-bottom: 30px;
    padding-left: 20px;
    border-left: 10px solid #969696;
  }
}
.table-img {
  width: 100%;
}
.tab{
    border: #ccc;
    table{
        border: #ccc;
        tr{
            border-bottom: none;
            border-right: none;
            th{
                border: 1px solid #ccc;
                padding: 10px 0px;
                border-right: none;            
            }
            td{
                border: 1px solid #ccc;
                border-top: none;
                border-right: none;

            }
        }
    }
}
.tab table tr th:last-child,.tab table tr td:last-child{
    border-right: 1px solid #ccc
}
.tabs{
    border:none;
    table{
        border:none;
        tr{
            border:none;
            th{
                // border: 1px solid #ccc;
                padding: 10px 0px;
                border:none;          
            }
            td{
                // border: 1px solid #ccc;
                border:none;
            }
        }
    }
}
.tabs table tr th:last-child,.tabs table tr td:last-child{
    border-right:none
}
</style>

