<template>
  <div>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" style="min-height: 440px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="名称">
                  <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                  <el-input v-model="form.typeId" disabled></el-input>
                </el-form-item>
                <el-form-item label="地点">
                  <el-input v-model="form.customerName" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input v-model="form.mac" disabled></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                  <el-input v-model="form.create" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.mark" disabled>
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
    <el-table :data="deviceData" class="mb20" border>
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
      <img :src="img" v-for="(img, i) in images" :key="i" @dblclick="imageUrl = img">
    </el-card>
    <el-dialog :visible.sync="imgVisible">
      <div class="item">
        <img width="100%" :src="imageUrl">
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      form: {
        name: '集群',
        typeId: '集群',
        customerName: '本地xx号xx楼',
        mac: '2018-09-24 11: 11: 24',
        create: 'ww',
        mark: '无'
      },
      deviceData: [],
      columnData: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'device',
          label: '型号'
        },
        {
          prop: 'introduce',
          label: '缩图'
        },
        {
          prop: 'local',
          label: '在线状态'
        },
        {
          prop: 'createtime',
          label: '工作状态'
        },
        {
          prop: 'create',
          label: '告警状态'
        }
      ]
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
