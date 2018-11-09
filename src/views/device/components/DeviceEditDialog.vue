<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑设备" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="管理名称" prop="manageName">
          <el-input v-model="form.manageName"></el-input>
        </el-form-item>
        <el-form-item label="二维码">
          <vue-qrcode :value="shareURL" :options="{ width: 200 }"></vue-qrcode>
        </el-form-item>
        <el-form-item label="授权管理">
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
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='updateDevice'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import VDistpicker from 'v-distpicker'
import {
  updateDevice,
  shareDeviceToken,
  clearRelation,
  updateAllRelation,
  updateRelation,
  deviceShareList
} from '@/api/device/list'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        name: '',
        manageName: '',
        location: '',
        wxDeviceId: '',
        userOpenId: '',
        customerId: '',
        id: ''
      },
      shareURL: '...',
      shareData: {
        list: []
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
    getDeviceShareList() {
      deviceShareList(this.form.id).then(res => {
        this.shareData = {
          deviceId: this.form.id,
          list: res.data
        }
        this.shareListVisible = true
      })
    },
    updateDevice() {
      const form = {
        ...this.form
      }
      updateDevice(form).then(() => {
        this.$message({
          type: 'success',
          message: '修改设备详情成功！'
        })
        this.$emit('update-data', form)
        this.$emit('update:visible', false)
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).hcocloud/)
      if (sld) {
        return sld[1]
      }
      return ''
    },
    isDev() {
      // 是开发环境？
      const sld = this.getSld()
      return sld === '' || sld === 'dev'
    },
    // 获取分享二维码
    getShareToken() {
      shareDeviceToken(this.form.wxDeviceId).then(res => {
        const form = this.form

        const url = `http://${
          this.isDev() ? 'dev' : form.sld
        }.hcocloud.com/h5/init?masterOpenId=${form.userOpenId}&deviceId=${
          form.id
        }&token=${res.data}&customerId=${form.customerId}`

        console.log('分享URL: ', url)
        this.shareURL = url
      })
    }
  },
  watch: {
    editData(val) {
      const data = JSON.parse(JSON.stringify(val))
      this.form = data
      this.getShareToken()
      this.getDeviceShareList()
    }
  },
  components: {
    VueQrcode
  }
}
</script>
<style lang="scss" scoped>
.button-group {
  padding-top: 30px;
}
.inside-image {
  width: 100%;
}
</style>