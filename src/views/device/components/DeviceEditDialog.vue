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
        <el-form-item label="设置地区">
          <v-distpicker @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
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
import { updateDevice } from '@/api/device/list'

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
        location: ''
      },
      select: { province: '', city: '', area: '' }
    }
  },
  methods: {
    onSelected(data) {
      this.form.location = `${data.province.value},${data.city.value},${
        data.area.value
      }`
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
    }
  },
  watch: {
    editData(val) {
      const data = JSON.parse(JSON.stringify(val))
      if (data.location) {
        const location = data.location.split(',')
        this.select.province = location[0]
        this.select.city = location[1]
        this.select.area = location[2]
      }

      this.form = data
    }
  },
  components: {
    VDistpicker
  }
}
</script>