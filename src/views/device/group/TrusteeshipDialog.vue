<template>
  <el-dialog title="托管" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="名称">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="受托人">
        <el-input placeholder="OpenID" v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="托管二维码">
        <image-uploader @get-url='getURL'></image-uploader>
      </el-form-item>
      <el-form-item label="创建者操作">
        <el-radio-group v-model="form.isRelated">
          <el-radio :label="true">托管后删除</el-radio>
          <el-radio :label="false">托管后保留</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList, createDeviceType } from '@/api/device/model'
import DTitle from '@/components/Title'

export default {
  components: {
    ImageUploader,
    DTitle
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    // this.getModelList()
  },
  methods: {
    createDeviceType() {
      createDeviceType(this.form).then(res => {
        console.log(res)
      })
    },
    getModelList() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.modelList = response.data
      })
    },
    getURL(url) {
      this.form.icon = url
    },
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    }
  }
}
</script>