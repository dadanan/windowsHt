<template>
    <div class="file-container">
        <el-upload class="upload-demo" :action="host" :on-success="handleSuccess" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :data='attachedData'>
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>


<script>
/**
 * 任意文件上传组件
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
      fileList: [],
      host: 'http://mybucket42.oss-cn-beijing.aliyuncs.com',
      attachedData: {
        key: '${filename}',
        policy: policyBase64,
        OSSAccessKeyId: 'LTAI8ZpYvAKhPdRK',
        success_action_status: 200,
        signature: signature
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(res, file) {
      console.log(res, '__', file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
