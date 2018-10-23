<template>
  <div class="file-container">
    <el-upload class="avatar-uploader" :action="host" :show-file-list="isList" :on-success="handleSuccess" :on-remove="handleRemove" :before-upload="beforeAvatarUpload" :data='attachedData' :file-list="fileList" list-type="picture" :class='{"is-list": isList}'>
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
  computed: {
    imageList: {
      get() {
        return this.fileList
      },
      set(newValue) {
        this.fileList = newValue
      }
    },
    getName() {
      return this.name || this.imageName
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
    }
  },
  methods: {
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
  },
  watch: {
    urls(val) {
      console.log('图册', val, this.urls)
      this.fileList = val.map(data => {
        return {
          url: data.image,
          name: this.getImageName(data.image)
        }
      })
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