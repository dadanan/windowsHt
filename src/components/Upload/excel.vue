<template>
  <div class="file-container">
    <el-upload class="avatar-uploader" :action="host" :show-file-list="false"  :on-success="handleSuccess" :before-upload="beforeAvatarUpload" :data='attachedData'>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div>{{getName}}</div>
  </div>
</template>

<script>
/**
 * 文件上传组件
 */
import { policyBase64, host, OSSAccessKeyId, signature } from './config'

export default {
  data() {
    return {
      host: host,
      attachedData: {
        key: '${filename}',
        policy: policyBase64,
        OSSAccessKeyId,
        success_action_status: 200,
        signature
      },
      name: ''
    }
  },
  props: {
    fileName: {
      type: String,
      default: ''
    },
    // format: {
    //   type: String,
    //   default: ''
    // }
  },
  computed: {
    getName() {
      return this.name || this.fileName
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.$emit('get-url', `${this.host}/${file.name}`)
      this.name = file.name
    },
    beforeAvatarUpload(file) {
      let isValid = true
      // if (this.format === 'apk') {
      //   isValid = file.type === 'application/vnd.android.package-archive'
      // }

      const isLt2M = file.size / 1024 / 1024 < 200
      if (!isValid) {
        this.$message.error(`上传文件只能是 ${this.format} 格式!`)
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 200MB!')
      }
      return isValid && isLt2M
    }
  }
}
</script>
