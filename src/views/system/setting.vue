<template>
  <div class="setting-container">
    <el-card>
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <div class='inside'>
          <el-form label-position="left" label-width="150px" :rules="rules" :model="form" ref='form'>
            <el-form-item label="logo">
              <image-uploader @get-url='setURL(arguments,form,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="网站名称" prop="title">
              <el-input v-model='form.title' class="ipt"></el-input>
            </el-form-item>
            <div class="table-opts">
              <el-button type="primary" @click='submitForm("form")'>确定</el-button>
            </div>
          </el-form>
        </div>

      </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
import ImageUploader from '@/components/Upload/image'
import { updateWebsiteInfo } from '@/api/customer'

export default {
  data() {
    return {
      form: {
        logo: this.$store.getters.logo,
        title: ''
      },
      rules: {
        title: [{ required: true, message: '请输入网站名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.update()
        } else {
          return false
        }
      })
    },
    update() {
      updateWebsiteInfo(this.form).then(res => {
        this.$message({
          type: 'success',
          msg: '更换成功！'
        })
      })
    },
    setURL(argu, data, name) {
      const image = argu[0]
      data[name] = image
    }
  },
  components: {
    ImageUploader
  }
}
</script>

<style lang='scss'>
.setting-container {
  padding: 20px;
  .inside {
    width: 30%;
  }
}
</style>