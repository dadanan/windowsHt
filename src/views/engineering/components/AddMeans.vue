<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="实施阶段" prop="name">
            <el-select placeholder="其他" style="width:100%" v-model="form.value">
              <el-option label="采暖系统" value="1"></el-option>
              <el-option label="中央空调" value="2"></el-option>
              <el-option label="净水系统" value="3"></el-option>
              <el-option label="热水系统" value="4"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="工程实施描述" prop="createUserOpenId">
          <el-input type="textarea" :rows='3' placeholder="工程实施描述..." v-model='form.massage'></el-input>
        </el-form-item>
        <el-form-item label="实施时间">
          <el-date-picker type="date" placeholder="实施时间..." v-model='form.createUserOpenId'></el-date-picker>
        </el-form-item>
        <el-form-item label="上传图册" >
          <image-uploader :key='1' :urls='filterBg(form.h5BgImgList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
        </el-form-item>
        <el-form-item label="上传文件" >
          <upload-excel @get-url='setURL(arguments,files,"appUrl")' :fileName='files.appUrl' format='xlsx'></upload-excel>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='submitForm("form")'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import FileUploader from '@/components/Upload/file'
import UploadExcel from '@/components/Upload/excel'
import { createNewTeam, queryDeviceInfo } from '@/api/device/team'
import { selectAllCustomers as select } from '@/api/customer'

export default {
  components: {
    ImageUploader,
    FileUploader,
    UploadExcel
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name:'',
        value:"",
        massage:'',
        createUserOpenId: '',
        h5BgImgList: [],
      },
      files:{
        appUrl:''
      },
      rules: {
        name: [
          { required: true, message: '请输入工程资料分类名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        createUserOpenId: [
          { required: true, message: '请输入工程资料分类描述', trigger: 'blur' }
        ]
      },
      query: {
        limit: 100,
        page: 1
      }
    }
  },
  methods: {
    setURL(argu, data, name) {
      data[name] = argu[0]
    },
     filterBg(data) {
      return data.filter(item => item.status !== 2)
    },
    removeImg(file) {
      const index = this.form.h5BgImgList.findIndex(
        v => v.image === file.url
      )
      this.form.h5BgImgList[index].status = 2
    },
    setImg(file) {
      this.form.h5BgImgList = [
        ...this.form.h5BgImgList,
        { image: file.url }
      ]
    },
     filterBg1(data) {
      return data.filter(item => item.status !== 2)
    },
    removeImg1(file) {
      const index = this.form.h5BgImgList.findIndex(
        v => v.image === file.url
      )
      this.form.h5BgImgList[index].status = 2
    },
    setImg1(file) {
      this.form.h5BgImgList = [
        ...this.form.h5BgImgList,
        { image: file.url }
      ]
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%
}
</style>

