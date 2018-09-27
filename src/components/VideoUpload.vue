<template>
  <div>
    <el-upload class="upload-demo"
               :action="host"
               :on-success="handleSuccess"
               :on-preview="file => $emit('on-preview', file)"
               :on-remove="(file, fileList) => $emit('on-remove', file, fileList)"
               :on-progress="(event, file, fileList) => $emit('on-progress', event, file, fileList)"
               :on-change="(file, fileList) => $emit('on-change', file, fileList)"
               :file-list="fileList"
               :before-upload="beforeUpload"
               :before-remove="beforeRemove"
               list-type="picture"
               :limit="limit"
               :show-file-list="showLileList">
      <el-button size="small"
                 type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
    </el-upload>
    <video ref="video"
            class="video"
           :src="videoSrc"></video>
    <canvas ref="imgCanves"></canvas>
  </div>
</template>

<script>
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
    disabled: Boolean, // 是否禁用
    showLileList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      host: 'http://2018-9-16-image.oss-cn-beijing.aliyuncs.com',
      fileList: [],
      videoSrc: ''
    }
  },
  methods: {
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

      this.fileList.push({
        name: file.name,
        url: canvas.toDataURL('image/png')
      })

      this.$emit('on-success', file, this.fileList)
    },
    handleSuccess(row, file) {
      const video = this.$refs.video

      this.videoSrc = file.url
      video.onloadeddata = () => this.onloadeddata(file)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
