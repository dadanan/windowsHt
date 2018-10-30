<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备详情" :visible="visible" @update:visible="$emit('update:visible', $event)" fullscreen>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称">
                  <el-input v-model="form.name" style="width:74%"></el-input>
                  <el-button @click='updateDeviceName'>修改名称</el-button>
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
                <el-form-item label="项目名">
                  <el-input v-model="form.groupName" disabled></el-input>
                </el-form-item>
                <el-form-item label="在线状态">
                  {{form.onlineStatus === 1 ? '在线' : '离线'}}
                </el-form-item>
                <el-form-item label="工作状态">
                  <template v-if='form.onlineStatus'>
                    {{form.powerStatus === 1 ? '开机' : '关机'}}
                  </template>
                  <template v-else>
                    - -
                  </template>
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
                <el-form-item label="项目ID">
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
          <a-map :id='detailData.id'></a-map>
        </el-card>
      </div>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="设备操作" name="1">
        <operation :modelId='detailData.modelId'></operation>
      </el-tab-pane>
      <el-tab-pane label="设备管理名" name="2">
        <el-table style="width: 100%" border :data="deviceList1">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="deviceId" label="设备ID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="co2" label="co2" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="hcho" label="甲醛"  show-overflow-tooltip sortable>
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
            <template slot-scope="scope">
              {{new Date(scope.row.startTime).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              {{new Date(scope.row.endTime).toLocaleString()}}
            </template>
          </el-table-column>
        </el-table>
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
        <el-pagination :current-page="page" :page-sizes="[50,100,200,300]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="100">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="4">
        <el-table style="width: 100%" border :data="deviceList">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="funcId" label="指令ID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcName" label="操作指令" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="opertye" label="操作来源" :formatter="opertye" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="funcValue" label="操作值" show-overflow-tooltip sortable>
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
        <el-pagination :current-page="page" :page-sizes="[50,100,200,300]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="100">
        </el-pagination>
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
        <el-pagination :current-page="page" :page-sizes="[50,100,200,300]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="100">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label='设备设置' name='6'>
        <el-button-group>
          <el-popover placement="right" trigger="click">
            <vue-qrcode :value="shareURL" :options="{ width: 200 }"></vue-qrcode>
            <el-button type="primary" slot="reference">分享</el-button>
          </el-popover>
          <el-button type="primary">授权管理</el-button>
          <el-popover placement="top" trigger="click" @after-enter='showDistrict'>
            <area-cascader ref='areaCascader' @change='districtChanged' :level="1" type="text" placeholder="请选择地区" v-model="selected" :data="$pcaa"></area-cascader>
            <el-button type="primary" slot="reference">更改设备地址</el-button>
          </el-popover>
        </el-button-group>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Operation from './deviceDetail/Operation'
import AMap from './deviceDetail/AMap'
import {
  queryOperLog, //操作日志
  queryDeviceSensorStat, //查看设备数据
  updateDevice, //地理位置
  // shareDeviceToken, //分享设备的token
  queryDeviceWorkLog // 工作日志
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
      form: {},
      limit: 50,
      page: 1,
      deviceId: 1,
      deviceList1: [],
      deviceWorkLog: [],
      shareURL: '...'
    }
  },
  watch: {
    detailData(val) {
      this.init(val)
    }
  },
  methods: {
    opertye(row) {
      let opertye = row.operType
      if (opertye == 1) {
        return 'h5操作'
      } else if (opertye == 2) {
        return '安卓操作'
      } else if (opertye == 3) {
        return '管理端'
      }
    },
    init(val) {
      this.queryOperLog(val.id)
      this.queryDeviceSensorStat(val.id)
      this.form = JSON.parse(JSON.stringify(val))
      // this.getShareToken()
      this.queryDeviceWorkLog(val.id)
    },
    showDistrict() {
      // 显示地区卡片
      const location = this.form.location
      // 通过手动干预地区选择组件的内部属性，来解决v-model数据刷新后，组件没有实时更新的问题
      if (!this.$refs.areaCascader) {
        return
      }
      const areaCascader = this.$refs.areaCascader.$children[0]

      if (location) {
        this.selected = location.split(',')
        areaCascader.label = location.replace(/,/g, '/')
      } else {
        this.selected = []
        areaCascader.label = ''
      }
    },
    districtChanged(district) {
      // 如果地点没有变化，无操作
      const location = district.join(',')
      if (location === this.form.location) {
        return
      }
      updateDevice({
        id: this.form.id,
        location: location
      }).then(() => {
        this.form.location = location
        this.$message({
          message: '设置设备位置成功！',
          type: 'success'
        })
      })
    },
    updateDeviceName() {
      updateDevice({
        id: this.form.id,
        name: this.form.name
      }).then(() => {
        this.$message({
          message: '名称修改成功！',
          type: 'success'
        })
      })
    },
    //工作日志
   queryDeviceWorkLog(id) {
      queryDeviceWorkLog({
        limit: this.limit,
        page: this.page,
        deviceId: id
      }).then(res => {
        console.log(res.data)
        this.deviceWorkLog = res.data
      })
    },
    queryOperLog(id) {
      queryOperLog({ limit: this.limit, page: this.page, deviceId: id }).then(
        res => {
          this.deviceList = res.data
        }
      )
    },
    // 设备数据
    queryDeviceSensorStat(id) {
      queryDeviceSensorStat({
        limit: this.limit,
        page: this.page,
        deviceId: id
      }).then(res => {
        // console.log(res.data)
        this.deviceList1 = res.data
      })
    },
  //   getShareToken() {
  //     shareDeviceToken(this.form.id).then(res => {
  //       const form = this.form
  //       const url = `${this.shareBaseURL}?masterOpenId=${Store.fetch(
  //         'Ticket'
  //       )}&deviceId=${form.id}&token=${res.data}&customerId=${form.customerId}`
  //       this.shareURL = url
  //     })
  //   }
  },
  components: {
    Operation,
    AMap,
    VueQrcode
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
