<template>
  <div class="dashboard-container">
    <el-card>
      <el-scrollbar class="main-scroll" tag="div">
        <div v-if="step == 1">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="用户LOGO">
              <image-uploader @get-url='setURL(arguments,addForm,"previewImg")'></image-uploader>
            </el-form-item>
             <el-form-item label="用户名称">
              <el-input v-model='addForm.name' class="ipt" ></el-input>
            </el-form-item>
            <el-button type="primary" @click='submitForm'>确定</el-button>
          </el-form>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
import ImageUploader from '@/components/Upload/image'
import DTitle from '@/components/Title'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      step: 1,
      addForm: {
        typeIds: []
      }
    }
  },
  methods: {
    submitForm() {
    }
  },
  watch: {

  },
  created() {
 
 },
  components: {
    ImageUploader
  }
}
</script>

<style lang='scss'>
.box-card {
  margin-top: 15px;
  position: relative;
  .el-card__body {
    margin-top: 1rem;
  }

  .tool {
    position: absolute;
    top: 0.5rem;
    right: 0.7rem;
    width: fit-content;
    display: flex;
    align-items: center;
    .ipt{
        width:300px
    }
    .close-icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url('~@/assets/img/close.png');
      background-size: cover;
      margin-right: 5px;
    }
    .add-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url('~@/assets/img/add.png');
      background-size: cover;
    }
  }
}
</style>