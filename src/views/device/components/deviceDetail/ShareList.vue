<template>
  <el-dialog class='sharelist-container' :close-on-click-modal=false title="授权管理" :visible="visible" @update:visible="$emit('update:visible', $event)" append-to-body>
    <el-table :data="shareData.list" style="width: 100%" border>
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
          <!-- <template v-if='scope.$index === 0'>
            设备所属者
          </template>
          <template v-else> -->
          <el-switch @change='statusChanged(arguments,scope.row)' v-model="scope.row.status" active-text="启用" inactive-text="禁用" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
          <!-- </template> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <!-- <template v-if='scope.$index === 0'>
            设备所属者
          </template>
          <template v-else> -->
          <el-button type='danger' @click='deleteUser(scope.row.openId)'>删除</el-button>
          <!-- </template> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button-group class='button-group'>
      <el-button type="primary" @click='permitAll(1)'>全部许可</el-button>
      <el-button type="danger" @click='permitAll(2)'>全部禁用</el-button>
    </el-button-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible',false)">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  clearRelation,
  updateAllRelation,
  updateRelation
} from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    shareData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    permitAll(status) {
      updateAllRelation({
        deviceId: this.shareData.deviceId,
        status
      }).then(() => {
        this.shareData.list.forEach((item, index) => {
          // if (!index) {
          //   // 如果第一个数据，表示主用户，无操作
          //   return
          // }
          item.status = !item.status
        })
        this.$message({
          message: `全部${status === 1 ? '启用' : '禁用'}成功！`,
          type: 'success'
        })
      })
    },
    deleteUser(openId) {
      this.$confirm('此操作将解除分享, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          clearRelation({
            deviceId: this.shareData.deviceId,
            openId
          }).then(() => {
            this.$message({
              message: `解除分享成功！`,
              type: 'success'
            })
            this.shareData.list = this.shareData.list.filter(
              item => item.openId !== openId
            )
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    statusChanged(status, data) {
      // 启用禁用
      updateRelation({
        deviceId: this.shareData.deviceId,
        openId: data.openId,
        status: status[0] ? 1 : 2
      }).then(() => {
        this.$message({
          message: `${status[0] ? '启用' : '禁用'}成功！`,
          type: 'success'
        })
      })
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
