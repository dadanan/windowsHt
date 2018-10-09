<template>
  <div>
    <el-upload class="upload-demo" :action="host" :data='attachedData' :on-success="handleSuccess" :on-remove="handleRemove" :on-progress="(event, file, fileList) => $emit('onProgress', event, file, fileList)" :on-change="(file, fileList) => $emit('onChange', file, fileList)" :file-list="fileList" :before-upload="beforeUpload" :before-remove="beforeRemove" list-type="picture" :limit="limit" :show-file-list="showFileList" :multiple="multiple">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
    </el-upload>
    <video ref="video" class="video" :src="videoSrc"></video>
    <canvas ref="imgCanves" class="imgCanves"></canvas>
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
      default: 100
    },
    limit: Number, //  最大允许上传视频的个数
    multiple: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    urls: {
      type: Array
    }
  },
  data() {
    return {
      fileList: [],
      fileUrl: [],
      videoSrc: '',
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
    onloadeddata(file) {
      const video = this.$refs.video
      const canvas = this.$refs.imgCanves
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height)

      const item = {
        name: file.name,
        url: canvas.toDataURL('image/png'),
        videoUrl: `${this.host}/${file.name}`
      }

      this.fileList.push(item)

      this.$emit('onSuccess', item, this.fileList)
    },
    handleSuccess(row, file) {
      const video = this.$refs.video
      this.videoSrc = file.url
      video.onloadeddata = () => this.onloadeddata(file)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.$emit('onRemove', file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  watch: {
    urls(val) {
      this.fileList = val.map(data => {
        return {
          videoUrl: data.video,
          url: canvas.toDataURL('image/png'),
          name: this.getName(data.video)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.imgCanves,
.video {
  position: absolute;
  z-index: -1;
}
</style>

