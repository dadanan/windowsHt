<template>
  <div class="file-container">
    <el-upload class="avatar-uploader" :action="host" :show-file-list="isList" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" :data='attachedData' :file-list="fileList" list-type="picture" :class='{"is-list": isList}'>
      <el-button v-if='isList' size="small" type="primary">点击上传</el-button>
      <template v-else>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </template>
    </el-upload>
    <div v-if='!isList'>{{getName}}</div>
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
  name: 'imageUploader',
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
      name: '',
      imageUrl: '',
      fileList: []
    }
  },
  props: {
    imageName: {
      // 图片名称？
      type: String,
      default: ''
    },
    url: {
      // 图片链接
      type: String
    },
    excel: {
      // 是否只支持上传Excel格式
      type: Boolean,
      default: false
    },
    isList: {
      // 是否支持多图？
      type: Boolean,
      default: false
    }
  },
  computed: {
    getName() {
      return this.name || this.imageName
    }
  },
  methods: {
    handleSuccess(res, file) {
      const url = `${this.host}/${file.name}`
      if (!this.isList) {
        // 如果单图模式
        this.$emit('get-url', url)
        this.imageUrl = url
        this.name = file.name
        return
      }

      this.fileList.push({
        name: file.name,
        url
      })
      this.$emit('get-url', this.fileList)
    },
    beforeAvatarUpload(file) {
      let isValid = false
      // 如果设置限制了excel
      if (this.excel) {
        isValid =
          file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel'
      } else {
        isValid =
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png'
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isValid) {
        this.$message.error(
          `上传头像图片只能是 ${this.excel ? 'excel' : 'JPG、PNG'} 格式!`
        )
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isValid && isLt2M
    }
  },
  created() {
    this.imageUrl = this.url
  }
}
</script>


<style lang='scss'>
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

.is-list-button {
  border: none;
}
.is-list.avatar-uploader .el-upload {
  border: none;
  overflow: inherit;
}
</style>