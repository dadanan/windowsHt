<template>
  <el-dialog title="添加备案机型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="typeNo">
        <el-input v-model="form.typeNo"></el-input>
      </el-form-item>
      <el-form-item label="缩图">
        <image-uploader @get-url='getURL'></image-uploader>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="功能项">
        <el-checkbox-group v-model="form.deviceTypeAblitys">
          <el-checkbox v-for="(item, index) in deviceTypeAblitys" :key="index" :label="item.id">
            {{ item.ablityName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="码表">
        <image-uploader excel @get-url='getURL2'></image-uploader>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="createForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList } from '@/api/device/function'
import { createDeviceType } from '@/api/device/model'

export default {
  components: {
    ImageUploader
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        typeNo: '',
        name: '',
        icon: '',
        source: '',
        deviceTypeAblitys: [],
        stopWatch: '',
        remark: ''
      },
      deviceTypeAblitys: []
    }
  },
  created() {
    this.getdeviceTypeAblitys()
  },
  methods: {
    createForm() {
      const newDeviceTypeAblitys = this.form.deviceTypeAblitys.map(item => {
        return {
          ablityId: item
        }
      })

      const form = {
        ...this.form,
        deviceTypeAblitys: newDeviceTypeAblitys
      }

      createDeviceType(form)
        .then(res => {
          const tempArray = this.deviceTypeAblitys.filter(item => {
            return this.form.deviceTypeAblitys.indexOf(item.id) !== -1
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', {
            ...form,
            deviceTypeAblitys: tempArray,
            id: res.data
          })
          console.log({
            ...form,
            deviceTypeAblitys: tempArray,
            id: res.data
          })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    getURL(url) {
      this.form.icon = url
    },
    getURL2(url) {
      this.form.stopWatch = url
    },
    getdeviceTypeAblitys() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.deviceTypeAblitys = response.data
      })
    }
  }
}
</script>
