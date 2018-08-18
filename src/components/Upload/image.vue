<template>
  <div class="file-container">
    <el-upload class="avatar-uploader" :action="host" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" :data='attachedData'>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
/**
 * 图片上传组件
 */
import '@/assets/crypto1/crypto/crypto.js'
import '@/assets/crypto1/hmac/hmac.js'
import '@/assets/crypto1/sha1/sha1.js'

const accesskey = 'ApTxE4aAwdlN1FC4k7TZ08WTgJcoh0'
const policyText = {
  expiration: '2020-01-01T12:00:00.000Z',
  conditions: [['content-length-range', 0, 2048000]]
}
const policyBase64 = btoa(JSON.stringify(policyText))
const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
  asBytes: true
})
const signature = Crypto.util.bytesToBase64(bytes)

export default {
  data() {
    return {
      host: 'http://mybucket42.oss-cn-beijing.aliyuncs.com',
      attachedData: {
        key: '${filename}',
        policy: policyBase64,
        OSSAccessKeyId: 'LTAI8ZpYvAKhPdRK',
        success_action_status: 200,
        signature: signature
      },
      imageUrl: ''
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.imageUrl = `${this.host}/${file.name}`
    },
    beforeAvatarUpload(file) {
      const isValid =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isValid) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isValid && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
