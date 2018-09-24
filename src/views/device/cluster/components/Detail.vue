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
    <!-- <el-card class="el-card--solid">
      <div>集群相册</div>
    </el-card> -->
  </div>
</template>

<script>
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
</style>
