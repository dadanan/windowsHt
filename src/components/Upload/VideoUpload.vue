<template>
  <div>
    <el-upload :action='host' :data='attachedData' :on-remove='handleRemove' :on-success='handleSuccess' multiple :limit='limit' :on-change='(file, fileList) => $emit("onChange", file, fileList)' :on-exceed='handleExceed' :file-list='fileList' :before-upload='beforeUpload' :on-progress='progressHandle'>
      <el-button size='small' type='primary'>点击上传</el-button>
      <div slot='tip' class='el-upload__tip'>只能上传{{limit}}个 mp4/ogg/flv/avi/wmv/rmvb 文件，且单个不超过{{maxSize}}MB</div>
    </el-upload>
  </div>
</template>

<script>
import { policyBase64, host, OSSAccessKeyId, signature } from './config'

export default {
  props: {
    accept: {
      // 可接受的格式
      type: Array,
      default: () => {
        return [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb'
        ]
      }
    },
    maxSize: {
      // 视频可接受的大小（MB）
      type: Number,
      default: 10
    },
    limit: {
      type: Number,
      default: 5
    },
    multiple: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      fileList: [],
      host: host,
      attachedData: {
        key: '${filename}',
        policy: policyBase64,
        OSSAccessKeyId,
        success_action_status: 200,
        signature
      }
    }
  },
  methods: {
    getName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    },
    beforeUpload(file) {
      this.$emit('before-upload', file)

      const isLimit = file.size / 1024 / 1024 < this.maxSize
      if (this.accept.indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLimit) {
        this.$message.error(`上传视频大小不能超过${this.maxSize}MB哦!`)
        return false
      }
    },
    handleSuccess(row, file) {
      const url = `${this.host}/${file.name}`
      const item = {
        name: file.name,
        url
      }

      this.fileList.push(item)
      this.$emit('onSuccess', item, this.fileList)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('onRemove', file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，目前选择了 ${files.length +
          fileList.length} 个文件`
      )
    },
    translateFormat(val) {
      // 转换传入的数据格式为上传组件适用的格式
      this.fileList = val.map(data => {
        return {
          url: data.video,
          name: this.getName(data.video)
        }
      })
    },
    progressHandle(event, file, fileList) {
      console.log(event, file, fileList)
    }
  },
  watch: {
    list(val) {
      if (val) {
        this.translateFormat(val)
      }
    }
  },
  created() {
    if (this.list) {
      this.translateFormat(this.list)
    }
  }
}
</script>

<style lang='scss' scoped>
.imgCanves,
.video {
  position: absolute;
  z-index: -1;
}
</style>

