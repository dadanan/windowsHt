<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="托管" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="team.name"></el-input>
      </el-form-item>
      <el-form-item label="受托人">
        <el-input placeholder="OpenID..." v-model='form.openId'></el-input>
      </el-form-item>
      <el-form-item label="托管二维码">
        <qrcode :value="url" :options="{ size: 200 }"></qrcode>
      </el-form-item>
      <el-form-item label="创建者操作">
        <el-radio-group v-model="form.deleteCreator">
          <el-radio :label="true">托管后删除</el-radio>
          <el-radio :label="false">托管后保留</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="trusteeTeam">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { trusteeTeam, createTrusteeQrCode } from '@/api/device/team'
import DTitle from '@/components/Title'
import Qrcode from '@xkeshi/vue-qrcode'

export default {
  components: {
    ImageUploader,
    DTitle,
    Qrcode
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      form: {
        deleteCreator: false
      },
      url: '',
      team: {},
      customerList: []
    }
  },
  methods: {
    trusteeTeam() {
      trusteeTeam({
        id: this.team.id,
        openId: this.form.openId,
        deleteCreator: this.form.deleteCreator
      }).then(res => {
        if (res.code === 200) {
          this.$emit('update:visible', false)
        }
      })
    },
    createTrusteeQrCode(id) {
      createTrusteeQrCode({
        teamId: id
      }).then(res => {
        this.url = res.data
      })
    }
  },
  watch: {
    data(val) {
      this.team = val[0]
      this.createTrusteeQrCode(this.team.id)
    }
  }
}
</script>