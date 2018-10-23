<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备详情" :visible="visible" @update:visible="$emit('update:visible', $event)" fullscreen>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称">
                  <el-input v-model="form.name" style="width:80%"></el-input>
                  <el-button type="">确认</el-button>
                </el-form-item>
                <el-form-item label="MAC">
                  <el-input v-model="form.mac" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备归属">
                  <el-input v-model="form.customerName" disabled></el-input>
                </el-form-item>
                <el-form-item label="分配状态">
                  {{form.assignStatus === 1 ? '已分配' : '未分配'}}
                </el-form-item>
                <el-form-item label="绑定状态">
                  {{form.bindStatus === 1 ? '已绑定' : '未绑定'}}
                </el-form-item>
                <el-form-item label="启用状态">
                  {{form.enableStatus === 1 ? '启用' : '禁用'}}
                </el-form-item>
                <el-form-item label="集群名">
                  <el-input v-model="form.groupName" disabled></el-input>
                </el-form-item>
                <el-form-item label="在线状态">
                  {{form.onlineStatus === 1 ? '在线' : '离线'}}
                </el-form-item>
                <el-form-item label="工作状态">
                  {{form.workStatus === 1 ? '开机/租赁中' : '关机/空闲'}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="型号ID">
                  <el-input v-model="form.modelId" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备型号名称">
                  <el-input v-model="form.modelName" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备类型ID">
                  <el-input v-model="form.typeId" disabled></el-input>
                </el-form-item>
                <el-form-item label="集群ID">
                  <el-input v-model="form.groupId" disabled></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                  {{new Date(form.birthTime).toLocaleString()}}
                </el-form-item>
                <el-form-item label="最后上线时间">
                  {{new Date(form.lastUpdateTime).toLocaleString()}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map></a-map>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="设备操作" name="1">
        <operation></operation>
      </el-tab-pane>
      <el-tab-pane label="设备数据" name="2">
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceId" label="设备ID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="co2" label="co2" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="甲醛" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hum" label="湿度" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="pm" label="PM2.5" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tem" label="温度" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="tvoc" label="tvoc" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工作日志" name="3">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="PM 2.5" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="温度" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="传感器" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="滤网时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="定时" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="4">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="funcId" label="id" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcName" label="操作指令" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcRemark" label="操作来源" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcValue" label="操作值" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="operName" label="修改人" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="operateTime" label="操作时间" :formatter="formatDate2" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="responseTime" label="响应时间" :formatter="formatDate3" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备告警" name="5">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="状态" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="PM 2.5" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="温度" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="传感器" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="滤网时间" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="name" label="定时" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import { queryOperLog, queryDeviceSensorStat } from '@/api/device/list'

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
      placeholder: 'placeholder',
      activeTab: '1',
      deviceList: [],
      form: {},
      limit: 10,
      page: 1,
      deviceId: 1,
      deviceList1: []
    }
  },
  watch: {
    detailData(val) {
      this.queryOperLog(val.id)
      this.queryDeviceSensorStat(val.id)
      this.form = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    queryOperLog(id) {
      queryOperLog({ limit: this.limit, page: this.page, deviceId: id }).then(
        res => {
          this.deviceList = res.data
          console.log(res.data)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    queryDeviceSensorStat(id) {
      queryDeviceSensorStat({"limit":this.limit,"page":this.page,"deviceId":id})
        .then(res => {
          // console.log(res.data)
          this.deviceList1 = res.data
          // console.log(this.deviceList1)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    formatDate(row) {
        let date = new Date(parseInt(row.startTime));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    formatDate1(row) {
        let date = new Date(parseInt(row.endTime));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
     formatDate2(row) {
        let date = new Date(parseInt(row.operateTime));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
     formatDate3(row) {
       if(row.responseTime){
         let date = new Date(parseInt(row.responseTime));
         let Y = date.getFullYear() + '-';
         let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
         let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
         let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
         let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
         let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
         return Y + M + D + h + m + s;
       }else{
         return ''
       }
    }
  },
  components: {
    Operation,
    AMap
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 560px;
  height: 440px;
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
</style>
