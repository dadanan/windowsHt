<template>
  <el-dialog class='device-detail-container' top='4vh' width='95%' :close-on-click-modal=false title="设备详情" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称 :">
                  {{form.name}}
                </el-form-item>
                <!-- <el-form-item label="MAC :">
                  {{form.mac}}
                </el-form-item> -->
                <el-form-item label="设备归属 :">
                  {{form.customerName}}
                </el-form-item>
                <!-- <el-form-item label="分配状态 :">
                  {{form.assignStatus === 1 ? '已分配' : '未分配'}}
                </el-form-item> -->
                <!-- <el-form-item label="绑定状态 :">
                  {{form.bindStatus === 1 ? '已绑定' : '未绑定'}}
                </el-form-item> -->
                <!-- <el-form-item label="启用状态">
                  {{form.enableStatus === 1 ? '启用' : '禁用'}}
                </el-form-item> -->
                <el-form-item label="modelNo :">
                  {{form.modelNo}}
                </el-form-item>
                <el-form-item label="型号名称 :">
                  {{form.modelName}}
                </el-form-item>
                <el-form-item label="项目名 :">
                  {{form.groupName}}
                </el-form-item>
                <el-form-item label="管理名称 :">
                  {{form.manageName}}
                </el-form-item>
                <el-form-item label="在线状态 :">
                  {{form.onlineStatus === 1 ? '在线' : '离线'}}
                </el-form-item>
                <el-form-item label="工作状态 :">
                  <template v-if='form.powerStatus'>
                    {{form.powerStatus === 1 ? '开机' : '关机'}}
                  </template>
                  <template v-else>
                    - -
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建人 :">
                  {{form.createUserName}}
                </el-form-item>
                
                <el-form-item label="型号 :">
                  {{form.modelCode}}
                </el-form-item>
                <el-form-item label="类型名称 :">
                  {{form.deviceType}}
                </el-form-item>
                <el-form-item label="typeNo :">
                  {{form.typeNo}}
                </el-form-item>
                <el-form-item label="项目ID :">
                  <template v-if='form.groupId > 0'>
                    {{form.groupId}}
                  </template>
                  <template v-else>
                    {{form.group}}
                  </template>
                </el-form-item>
                <el-form-item label="注册时间 :">
                  <template v-if='form.birthTime'>
                    {{new Date(form.birthTime).toLocaleString()}}
                  </template>
                  <template v-else>
                    - -
                  </template>
                </el-form-item>
                <el-form-item label="最后上线时间">
                  <template v-if='form.lastUpdateTime'>
                    {{new Date(form.lastUpdateTime).toLocaleString()}}
                  </template>
                  <template v-else>
                    - -
                  </template>
                </el-form-item>
                <el-form-item label="设备位置 :" v-if="form.location">
                  <!-- {{((form.location).split(","))[3]}} -->
                  <el-input v-model="location" @blur="blur"></el-input>
                </el-form-item>
                <el-form-item label="设备位置 :" v-else>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map :gps='detailData && detailData.mapGps' @getLocation='getLocation'></a-map>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="设备操作" name="1">
        <operation :detailData='detailData'></operation>
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="2">
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column v-for="(item,index) in heades" :key="index" :prop="item.datas" :label="item.label" show-overflow-tooltip sortable>
            <!-- <template slot-scope="scope">
              {{scope.row}}{{item.unit}}
            </template> -->
          </el-table-column>
          <!-- <el-table-column prop="hcho" label="甲醛" v-if="deviceModelAbility.hcho" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="湿度" v-if="deviceModelAbility.hum" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="PM2.5" v-if="deviceModelAbility.pm25" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="温度" v-if="deviceModelAbility.temp" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="tvoc" v-if="deviceModelAbility.tvoc" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="" label="侧回水温度" v-if="deviceModelAbility.temp1"  show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="" label="回水设定温度" v-if="deviceModelAbility.temp3"  show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="" label="侧出水温度"  v-if="deviceModelAbility.temp2" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="" label="出水设定温度" v-if="deviceModelAbility.temp4"  show-overflow-tooltip sortable>
          </el-table-column>-->
          <el-table-column prop="startTime" label="状态时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.startTime).toLocaleString()}}
            </template>
          </el-table-column> 
        </el-table>
        <el-pagination :current-page="queryDevice.page" :page-sizes="[50,100,200,300]" :page-size="queryDevice.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryDeviceSensorStatCound" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="工作日志" name="3">
        <el-table style="width: 100%" border :data="deviceWorkLog">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="createTime" label="时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="deviceStatus" label="状态" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryDeviceW.page" :page-sizes="[50,100,200,300]" :page-size="queryDeviceW.limit" layout="total, sizes, prev, pager, next, jumper" :total="deviceWorkLogCound" @size-change="handleSizeChange3" @current-change="handleCurrentChange3">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="4">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="funcId" label="指令" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcName" label="功能项" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="opertye" label="操作来源" :formatter="opertye" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcValue" label="操作指令" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="operName" label="修改人" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="operateTime" label="操作时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.operateTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="responseTime" label="响应时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if='scope.row.responseTime'>
                {{new Date(scope.row.responseTime).toLocaleString()}}
              </template>
              <template v-else>
                - -
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="queryOperLog.page" :page-sizes="[50,100,200,300]" :page-size="queryOperLog.limit" layout="total, sizes, prev, pager, next, jumper" :total="queryOperLogCound" @size-change="handleSizeChange1" @current-change="handleCurrentChange1">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="故障记录" name="5">
        <el-table style="width: 100%" border :data="queryDeviceFailures">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="index" label="序号" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="alarmTime" label="告警时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.alarmTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="告警内容" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="level" label="告警等级" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.level == 1">
                一级告警
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="recoverTime" label="恢复时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.recoverTime).toLocaleString()}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="0" :page-sizes="[50,100,200,300]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="0" @size-change="handleSizeChange1" @current-change="handleCurrentChange1">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="设备告警" name="6">
        <el-table style="width: 100%" border :data="queryDeviceAlarms">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="content" label="故障内容" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="code" label="故障代码" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="status" label="当前状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="level" label="告警等级" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <template v-if="scope.row.level == 1">
                一级告警
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="0" :page-sizes="[50,100,200,300]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="0" @size-change="handleSizeChange1" @current-change="handleCurrentChange1">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import ShareList from './deviceDetail/ShareList'
import { selectById ,queryDeviceOperation ,queryDeviceAlarm, queryDeviceFailure} from '@/api/device/model'
import {
  queryOperLog, //操作日志
  queryDeviceSensorStat, //查看设备数据
  updateDevice, //地理位置
  shareDeviceToken, //分享设备的token
  queryDeviceWorkLog, // 工作日志
  queryDeviceSensorStatHeades
} from '@/api/device/list'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailData: {
      type: Object
    }
  },
  data() {
    return {
      selected: [],
      placeholder: 'placeholder',
      activeTab: '1',
      deviceList: [],
      deviceListJ: [],
      form: {},
      heades:[],
      deviceId: 1,
      queryOperLogc: {
        limit: 50,
        page: 1
      },
      queryDevice: {
        limit: 50,
        page: 1
      },
      queryDeviceW: {
        limit: 50,
        page: 1
      },
      deviceList1: [],
      deviceWorkLog: [],
      shareURL: '...',
      valId: '',
      queryOperLogCound: 0,
      queryDeviceSensorStatCound: 0,
      deviceWorkLogCound: 0,
      shareListVisible: false,
      shareData: {}, // 分享数据
      group: '--',
      location:'',
      deviceModelAbilitys: [],
      deviceModelAbility: {
        co2: false,
        tvoc: false,
        temp: false,
        hum: false,
        pm25: false,
        hcho: false,
        temp1:false,
        temp2:false,
        temp3:false,
        temp4:false,
      },
      queryDeviceFailures:[],
      queryDeviceAlarms:[]
    }
  },
  watch: {
    detailData(val) {
      if(val.location){
        this.location = (val.location).split(",")[3]
      }
      this.init(val)
      this.valId = val.id
      this.selectById(val.modelId)
      this.queryDeviceSensorStatHeades(val.id)
      this.deviceModelAbility.co2 = false
      this.deviceModelAbility.tvoc = false
      this.deviceModelAbility.temp = false
      this.deviceModelAbility.hum = false
      this.deviceModelAbility.pm25 = false
      this.deviceModelAbility.hcho = false
      this.deviceModelAbility.temp1 = false
      this.deviceModelAbility.temp2 = false
      this.deviceModelAbility.temp3 = false
      this.deviceModelAbility.temp4 = false
      this.queryDeviceAlarm(val)
      this.queryDeviceFailure(val)
    }
  },
  methods: {
    queryDeviceAlarm(val){
      queryDeviceAlarm({deviceId:val.id}).then(res=>{
        // console.log(res,1111)
        this.queryDeviceAlarms = res.data
      })
    },
    queryDeviceFailure(val){
      queryDeviceFailure({deviceId:val.id}).then(res=>{
        // console.log(res,2222)
        this.queryDeviceFailures = res.data
      })
    },
    opertye(row) {
      let opertye = row.operType
      if (opertye == 1) {
        return '微信操作'
      } else if (opertye == 2) {
        return '安卓操作'
      } else if (opertye == 3) {
        return '管理端'
      }
    },
    queryDeviceSensorStatHeades(id){
      queryDeviceSensorStatHeades({deviceId:id}).then(res=>{
        console.log(res.data)
        this.heades = res.data
      })
    },
    selectById(id) {
      selectById(id).then(res => {
        this.deviceModelAbilitys = res.data.deviceModelAbilitys
      })
    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
    updateDevice({
          id: this.form.id,
          location,
          mapGps: gps
        }).then(() => {
          this.$message({
            message: '设备位置信息更新成功！',
            type: 'success'
          })
          
          this.location = location.split(",")[3]
      })
    },
    init(val) {
      this.form = JSON.parse(JSON.stringify(val))
      console.log(this.form)
      this.queryOperLog(val.id)
      this.queryDeviceSensorStat(val.id)
      // this.getShareToken()
      this.queryDeviceWorkLog(val.id)
    },
    getLocation({ gps, location }) {
      updateDevice({
        id: this.form.id,
        location,
        mapGps: gps.toString()
      }).then(() => {
        this.$message({
          message: '设备位置信息更新成功！',
          type: 'success'
        })
        this.form.location = location
        this.location = (this.form.location).split(",")[3]
      })
    },
    // 工作日志
    queryDeviceWorkLog(id) {
      queryDeviceWorkLog({
        limit: this.queryDeviceW.limit,
        page: this.queryDeviceW.page,
        deviceId: id
      }).then(res => {
        if(!res.data || !res.data.dataList){
          return
        }
        this.deviceWorkLog = res.data.dataList
        this.deviceWorkLogCound = res.data.totalCount
      })
    },
    // 操作日志
    queryOperLog(id) {
      queryOperLog({
        limit: this.queryOperLogc.limit,
        page: this.queryOperLogc.page,
        deviceId: id
      }).then(res => {
        if(!res.data || !res.data.dataList){
          return
        }
        this.deviceList = res.data.dataList
        this.queryOperLogCound = res.data.totalCount
      })
    },
    // 设备数据
    queryDeviceSensorStat(id) {
      queryDeviceSensorStat({
        limit: this.queryDevice.limit,
        page: this.queryDevice.page,
        deviceId: id
      }).then(res => {
        if(!res.data || !res.data.dataList){
          return
        }
        this.deviceList1 = res.data.dataList
        for (var i = 0; i < this.deviceList1.length; i++) {
          this.deviceList1[i].hcho = this.deviceList1[i].hcho / 100 
          this.deviceList1[i].tvoc = this.deviceList1[i].tvoc / 100
          this.deviceList1[i].tem = this.deviceList1[i].tem +'℃'
          this.deviceList1[i].hum = this.deviceList1[i].hum +'%'
          this.deviceList1[i].pm = this.deviceList1[i].pm +'ug/m3'
          this.deviceList1[i].co2 = this.deviceList1[i].co2 +'ppm'
        }
        this.queryDeviceSensorStatCound = res.data.totalCount
      })
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).silelai/)
      if (sld) {
        return sld[1]
      }
      return ''
    },
    isDev() {
      // 是开发环境？
      const sld = this.getSld()
      return sld === '' || sld === 'dev'
    },
    getShareToken() {
      shareDeviceToken(this.form.wxDeviceId).then(res => {
        const form = this.form

        const url = `http://${
          this.isDev() ? 'dev' : form.sld
        }.sikelai.net/h5/init?masterOpenId=${form.userOpenId}&deviceId=${
          form.id
        }&token=${res.data}&customerId=${form.customerId}`

        // console.log('分享URL: ', url)
        this.shareURL = url
      })
    },
    handleSizeChange(val) {
      this.queryDevice.limit = val
      this.queryDeviceSensorStat(this.valId)
    },
    handleCurrentChange(val) {
      this.queryDevice.page = val
      this.queryDeviceSensorStat(this.valId)
    },
    handleSizeChange1(val) {
      this.queryOperLogc.limit = val
      this.queryOperLog(this.valId)
    },
    handleCurrentChange1(val) {
      this.queryOperLogc.page = val
      this.queryOperLog(this.valId)
    },
    handleSizeChange3(val) {
      this.queryDeviceW.limit = val
      this.queryDeviceWorkLog(this.valId)
    },
    handleCurrentChange3(val) {
      this.queryDeviceW.page = val
      this.queryDeviceWorkLog(this.valId)
    }
  },
  components: {
    Operation,
    AMap,
    VueQrcode,
    ShareList
  }
}
</script>

<style lang="scss" scoped>
.device-detail-container {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 560px;
  min-height: 440px;
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
</style>
