<template>
  <el-dialog class='sharelist-container' :close-on-click-modal=false title="授权管理" :visible="visible" @update:visible="$emit('update:visible', $event)" append-to-body>
    <el-table :data="shareData" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="nickname" label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column label="头像" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <img class='inside-image' :src='scope.row.headImg'>
        </template>
      </el-table-column>
      <el-table-column label="绑定时间" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          {{new Date(scope.row.joinTime).toLocaleString()}}
        </template>
      </el-table-column>
      <el-table-column label="管理" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <template v-if='scope.$index === 0'>
            设备所属者
          </template>
          <template v-else>
            <el-switch @change='statusChanged(arguments,scope.row)' v-model="scope.row.status" active-text="启用" inactive-text="禁用">
            </el-switch>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <template v-if='scope.$index === 0'>
            设备所属者
          </template>
          <template v-else>
            <el-button type='danger' @click='deleteUser'>删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-button-group class='button-group'>
      <el-button type="primary" @click='allowAll'>全部许可</el-button>
      <el-button type="danger" @click='banAll'>全部禁用</el-button>
    </el-button-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible',false)">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  updateDeivceEnable,
  untieDeviceToUser,
  updateDeivceDisble
} from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    shareData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedDeviceList: []
    }
  },
  methods: {
    allowAll() {
      return
      updateDeivceEnable(
        this.shareData.map(item => {
          return {
            mac: item.mac,
            deviceId: item.id
          }
        })
      ).then(() => {})
    },
    banAll() {
      return
      updateDeivceEnable(
        this.shareData.map(item => {
          return {
            mac: item.mac,
            deviceId: item.id
          }
        })
      ).then(() => {})
    },
    deleteUser() {
      return
      updateDeivceEnable(
        this.shareData.map(item => {
          return {
            mac: item.mac,
            deviceId: item.id
          }
        })
      ).then(() => {})
    },
    statusChanged(status, data) {
      return
      if (status[0]) {
        updateDeivceEnable({
          mac: data.mac
        }).then(() => {})
      } else {
        updateDeivceDisble().then(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sharelist-container {
  .inside-image {
    width: 100%;
  }
  .button-group {
    margin-top: 30px;
  }
}
</style>
