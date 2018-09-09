<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备详情" :visible="visible" @update:visible="$emit('update:visible', $event)" fullscreen>
    <div class="flex mb20">
      <div class="flex-item flex-item--full">
        <el-card class="el-card--solid">
          <el-form label-width="100px" label-position="left">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="名称">
                  <el-input v-model="placeholder"></el-input>
                </el-form-item>
                <el-form-item label="型号">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="typeID">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="对应名">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备归属">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="MAC">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="绑定状态">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="绑定人">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="启用状态">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="托管状态">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="集群">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="在线状态">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="工作状态">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="最后上线时间">
                  <el-input v-model="placeholder" disabled></el-input>
                </el-form-item>
                <el-form-item label="设备业务">
                  <el-input v-model="placeholder"></el-input>
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
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="设备操作" name="1">
        <el-button-group>
          <el-button type="primary">集群</el-button>
          <el-button type="primary">群控</el-button>
          <el-button type="primary">分享</el-button>
          <el-button type="primary">授权管理</el-button>
        </el-button-group>
      </el-tab-pane>
      <el-tab-pane label="设备数据" name="2">
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
      <el-tab-pane label="设备订单" name="6">
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
      <el-tab-pane label="设备设置" name="7">
        <el-button-group>
          <el-button type="primary">绑定</el-button>
          <el-button type="primary">解绑</el-button>
          <el-button type="primary">禁用/启用</el-button>
        </el-button-group>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
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
      deviceList: []
    }
  },
  watch: {
    detailData(val) {
      console.log('asd', val)
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
