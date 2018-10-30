<template>
  <div>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" style="min-height: 440px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="项目名">
                  <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="客户">
                  <el-select v-model="form.customerId" disabled>
                    <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="介绍">
                  <el-input v-model="form.introduction" disabled></el-input>
                </el-form-item>
                <el-form-item label="地点">
                  <el-input v-model="form.createLocation" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  {{new Date(form.createTime).toLocaleString()}}
                </el-form-item>
                <el-form-item label="创建人">
                  <el-input v-model="form.customerName" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.remark" disabled>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div class="flex-item">
        <el-card class="el-card--solid map-container">
          <a-map :id='datas.deviceList && datas.deviceList[0] &&  datas.deviceList[0].id'></a-map>
        </el-card>
      </div>
    </div>
    <el-table :data="form.deviceList" class="mb20" style="margin-top: 15px" border>
      <el-table-column v-for="value in columnData" :label="value.label" :prop="value.prop" :key="value.prop" :formatter="value.formatter" :width="value.width" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="form.deviceList.length">
    </el-pagination>
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
import { queryGroupById } from '@/api/device/cluster'
import { deviceColumnData } from '../cluster.js'
import { groupSendFunc } from '@/api/device/cluster'
import AMap from '@/views/device/components/deviceDetail/AMap'

const img = require('@/assets/404_images/404.png')

const images = new Array(20).fill(img)

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
      images: images,
      imgVisible: false,
      imageUrl: '',
      query: {
        limit: 100,
        page: 1
      },
      form: {
        deviceList: [],
        customerId: '',
        imagesList: []
      },
      deviceData: [],
      columnData: deviceColumnData,
      customerList: []
    }
  },
  methods: {
    groupControl(which) {
      if (!this.form.deviceList || this.form.deviceList.length === 0) {
        return
      }
      groupSendFunc({
        deviceIdList: this.form.deviceList.map(item => item.id),
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
  },
  components: {
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
