<template>
  <div>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" style="min-height: 440px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="集群名">
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
                  <el-input v-model="form.location" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input v-model="form.createTime" disabled></el-input>
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
          <el-card class="el-card--solid">
          <iframe width='560' height='440' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='http://f.amap.com/rRZS_0F85dWA'></iframe>
          </el-card>
      </div>
    </div>
    <el-table :data="form.deviceList" class="mb20" style="margin-top: 15px" border>
      <el-table-column v-for="value in columnData"
                      :label="value.label"
                      :prop="value.prop"
                      :key="value.prop"
                      :formatter="value.formatter"
                      :width="value.width"
                      show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div>
      <el-button-group>
        <el-button type="primary">群开
        </el-button>
        <el-button type="primary">群关
        </el-button>
      </el-button-group>
    </div>
    <div class="photos">集群相册</div>
    <el-card class="el-card--solid">
      <div class="item" v-for="(img, i) in images" :key="i" @dblclick="handlePreview(img)">
        <img :src="img">
      </div>
    </el-card>
    <el-dialog :visible="imgVisible" :before-close="() => imgVisible = false" append-to-body>
      <img width="100%" :src="imageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { select } from '@/api/customer'
import { queryGroupById } from '@/api/device/cluster'
import { deviceColumnData } from '../cluster.js'

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
        customerId: ''
      },
      deviceData: [],
      columnData: deviceColumnData,
      customerList: []
    }
  },
  created() {
    this.select()
    this.queryGroupById()
  },
  methods: {
    queryGroupById() {
      queryGroupById(this.datas.id).then(res => {
        if (res.code === 200) {
          this.form = { ...res.data }
        }
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
  watch: {
    datas(val) {
      this.form = JSON.parse(JSON.stringify(val))
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
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
    width: 100%;
  }
}
</style>
