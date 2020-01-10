<template>
  <div class="file-container">
    <el-upload ref='uploader' class="avatar-uploader" :action="host" :show-file-list="isList" :on-success="handleSuccess" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :on-exceed='handleExceed' :data='attachedData' :file-list="fileList" list-type="picture" :class='{"is-list": isList}' :limit='limit'>
      <el-button v-if='isList' size="small" type="primary">点击上传</el-button>
      <template v-else>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </template>
    </el-upload>
    <el-button v-if='!isList' type="text" @click='deleteImage'>删除图片</el-button>
  </div>
</template>

<script>
/**
 * 图片上传组件
 */
import { policyBase64, host, OSSAccessKeyId, signature } from './config'

export default {
  name: 'imageUploader',
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
      type: String
    },
    urls: {
      type: Array
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
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  methods: {
    deleteImage() {
      if (!this.imageUrl) {
        return
      }
      // 删除图片，单图模式时出现
      this.$confirm('确定移除移除图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$refs.uploader.clearFiles()
        this.imageUrl = ''
        this.$emit('get-url', '')
      })
    },
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    },
    handleSuccess(res, file) {
      const url = `${this.host}/${file.name}`
      if (!this.isList) {
        // 如果单图模式
        this.$emit('get-url', url)
        this.imageUrl = url
        this.name = file.name
        return
      }

      const item = {
        name: file.name,
        url
      }

      this.fileList.push(item)
      this.$emit('get-url', item, this.fileList)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('remove-url', file, fileList)
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
          `上传头像图片只能是 ${this.excel ? 'excel' : 'JPG、PNG、pdf'} 格式!`
        )
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isValid && isLt2M
    },
    handleExceed(a, b) {

      this.$message.warning(
        `上传图片数量超出限制，最多可上传 ${this.limit} 张图片！`
      )
    },
    initFileList(val) {
      this.fileList = val.map(data => {
        return {
          url: data.image,
          name: this.getImageName(data.image)
        }
      })
    }
  },
  created() {
    if (this.url) {
      this.imageUrl = this.url
    }
    // console.log(this.urls)
    if (this.urls) {
      this.initFileList(this.urls)
    }
  },
  watch: {
    urls(val) {
      if (!val) {
        return
      }
      this.initFileList(val)
    },
    url(val) {
      this.imageUrl = val
    }
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