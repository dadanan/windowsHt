<template>
  <div>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" style="min-height: 440px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="项目名">
                  {{form.name}}
                </el-form-item>
                <el-form-item label="客户">
                  <el-select v-model="form.customerId" disabled>
                    <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="介绍">
                  {{form.introduction}}
                </el-form-item>
                <el-form-item label="设备位置 :" v-if="form.location">
                  <!-- {{((form.location).split(","))[3]}} -->
                  <el-input v-model="location" @blur="blur"></el-input>
                </el-form-item>
                <el-form-item label="设备位置 :" v-else>
                </el-form-item>
                <el-form-item label="创建时间">
                  {{new Date(form.createTime).toLocaleString()}}
                </el-form-item>
                <el-form-item label="创建人">
                  {{form.createUser}}
                </el-form-item>
                <el-form-item label="备注">
                  {{form.remark}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map :gps='form && form.mapGps' @getLocation='getLocation'></a-map>
        </el-card>
      </div>
    </div>
    <el-table :data="form.deviceList" class="mb20" style="margin-top: 15px" border @selection-change="handleSelectionChange">
      <!-- <el-table-column v-for="value in columnData" :label="value.label" :prop="value.prop" :key="value.prop" :formatter="value.formatter" :width="value.width" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="manageName" label="管理名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="modelId" label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="onlineStatus" label="在线状态" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          {{scope.row.onlineStatus === 1 ? '在线' : '离线'}}
        </template>
      </el-table-column>
      <el-table-column prop="powerStatus" label="工作状态" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          {{scope.row.powerStatus === 1 ? '开机' : '关机'}}
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="form.deviceList.length">
    </el-pagination> -->
    <div>
      <el-button-group>
        <el-button type="primary" @click='groupControl("on")'>群开
        </el-button>
        <el-button type="primary" @click='groupControl("off")'>群关
        </el-button>
      </el-button-group>
    </div>
    <div class="photos">项目相册</div>
    <el-card class="el-card--solid group-album">
      <div v-if="!form.imagesList.length">暂无项目相册</div>
      <div v-else class="item" v-for="(img, i) in form.imagesList" :key="i" @dblclick="handlePreview(img.image)">
        <img :src="img.image">
      </div>
    </el-card>
    <el-dialog :visible="imgVisible" :before-close="() => imgVisible = false" append-to-body>
      <img width="100%" :src="imageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { selectAllCustomers as select } from '@/api/customer'
import {
  queryGroupById,
  addOrUpdateGroupAndDevice,
  groupSendFunc
} from '@/api/device/cluster'
import { deviceColumnData } from '../cluster.js'
import AMap from '@/views/device/components/deviceDetail/AMap'

export default {
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      placeholder: 'placeholder',
      activeTab: '1',
      deviceList: [],
      imgVisible: false,
      imageUrl: '',
      setInter:undefined,
      query: {
        limit: 100,
        page: 1
      },
      location:'',
      form: {
        deviceList: [],
        customerId: '',
        imagesList: []
      },
      deviceData: [],
      columnData: deviceColumnData,
      customerList: [],
      deviceIdList: []
    }
  },
  methods: {
    getLocation({ gps, location }) {
      addOrUpdateGroupAndDevice({
        ...this.form,
        mapGps: gps.join(','),
        location
      }).then(() => {
        this.form.location = location
        this.$message({
          message: `更新项目位置成功！`,
          type: 'success'
        })
      })
      this.form.location = location
      this.location = (this.form.location).split(",")[3]
    },
    handleSelectionChange(selection) {
      const selectedDeviceList = []
      for (var i = 0; i < selection.length; i++) {
        selectedDeviceList.push(selection[i].id)
      }
      this.deviceIdList = selectedDeviceList
    },
    groupControl(which) {
      if (!this.deviceIdList || this.deviceIdList.length === 0) {
        return this.$message({
          message: `请选择设备`,
          type: 'error'
        })
      }
      groupSendFunc({
        deviceIdList: this.deviceIdList,
        funcId: 210,
        value: which === 'on' ? 1 : 0
      }).then(() => {
        this.$message({
          message: `群${which === 'on' ? '开' : '关'}成功！`,
          type: 'success'
        })
      })
    },
    queryGroupById() {
      queryGroupById(this.datas.id).then(res => {
        const data = res.data
        if (!data.imagesList) {
          data.imagesList = []
        }
        this.form = data
        
        if(data.location){
        this.location = (data.location).split(",")[3]
        }
        // this.init(val)
        // this.valId = val.id
        // this.selectById(val.modelId)
      })
    },
    blur(){
      const location1 = (this.form.location).split(",")
      location1.pop()
      location1.push(this.location)
      const location = location1.toString()
      const gps = this.form.mapGps
      console.log(location1,location,gps,this.form)
    addOrUpdateGroupAndDevice({
          ...this.form,
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
    handlePreview(img) {
      this.imageUrl = img

      this.$nextTick(() => {
        this.imgVisible = true
      })
    },
    select() {
      select(this.query).then(res => {
        this.customerList = res.data || []
      })
    }
  },
  created() {
    this.select()
    this.queryGroupById()
    // this.setInter = setInterval(() => {
    //   this.queryGroupById()
    // }, 3000)
  },
  components: {
    AMap
  },
  destroyed() {
    clearInterval(this.setInter)
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
  min-height: 440px;
}

.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
.photos {
  font-size: 16px;
  color: #303133;
  margin: 20px 0;
  font-size: 16px;
}
.item {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin: 30px 1.6%;
  min-width: 120px;
  width: 11%;
  height: 120px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;

  img {
    height: 100%;
  }
}
</style>

<style lang='scss'>
.group-album .el-card__body {
  display: flex;
  align-items: center;
}
</style>
