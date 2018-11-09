<template>
  <div>
    <image-uploader :key='1' :url='imageList[0] && imageList[0].url' @get-url='setURL(arguments,imageList[0],"url")'></image-uploader>
    <image-uploader :key='2' :url='imageList[1] && imageList[1].url' @get-url='setURL(arguments,imageList[1],"url")'></image-uploader>
    <image-uploader :key='3' :url='imageList[2] && imageList[2].url' @get-url='setURL(arguments,imageList[2],"url")'></image-uploader>
    <image-uploader :key='4' :url='imageList[3] && imageList[3].url' @get-url='setURL(arguments,imageList[3],"url")'></image-uploader>
    <image-uploader :key='5' :url='imageList[4] && imageList[4].url' @get-url='setURL(arguments,imageList[4],"url")'></image-uploader>
  </div>
</template>

<script>
/**
 * 图片上传组件,多图,可排序
 */
import { policyBase64, host, OSSAccessKeyId, signature } from './config'
import ImageUploader from './image.vue'

export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
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
      dialogImageUrl: '',
      dialogVisible: false,
      imageList: []
    }
  },
  methods: {
    setURL(argu, data, name) {
      data[name] = argu[0]
    }
  },
  components: {
    ImageUploader
  },
  watch: {
    fileList(val) {
      if (!val) return
      this.imageList = JSON.parse(JSON.stringify(val))
    }
  },
  created() {
    if (!this.fileList) return
    this.imageList = JSON.parse(JSON.stringify(this.fileList))
  }
}
</script>