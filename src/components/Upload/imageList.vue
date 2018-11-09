<template>
  <div>
    <el-upload :action="host" list-type="picture-card" :on-preview="handlePictureCardPreview" :data='attachedData' :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
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
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      const url = `${this.host}/${file.name}`
      console.log('url', url)
      this.dialogImageUrl = url
      this.dialogVisible = true
    }
  }
}
</script>