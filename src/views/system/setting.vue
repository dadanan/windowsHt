<template>
  <div class="dashboard-container">
    <el-card>
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
        <div v-if="step == 1">
          <el-form label-position="left" label-width="150px">
            <el-form-item label="logo">
              <image-uploader @get-url='setURL(arguments,addForm,"previewImg")'></image-uploader>
            </el-form-item>
             <el-form-item label="客户名称">
              <el-input v-model='addForm.name' class="ipt"></el-input>
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
import { createWxFormat } from '@/api/format'
import { select } from '@/api/customer'
import { selectAllTypes } from '@/api/device/type'

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
      },
      level: [
        {
          label: '私有',
          value: 1
        },
        {
          label: '公用',
          value: 2
        },
        {
          label: '专用',
          value: 3
        }
      ],
      pages: [{ wxFormatItemVos: [{}] }],
      customers: [],
      abilityList: [], // 设备类型的功能项交集
      typeList: [
        {
          label: '文本类',
          value: 1
        },
        {
          label: '单选类',
          value: 2
        },
        {
          label: '多选类',
          value: 3
        },
        {
          label: '阈值类',
          value: 4
        },
        {
          label: '阈值选择类',
          value: 5
        }
      ],
      types: [] // 所有设备类型数据
    }
  },
  methods: {
    deleteOption(data, scope) {
      data.splice(scope.$index, 1)
    },
    submitForm() {
    }
  },
  watch: {

  },
  created() {
 
 },
  components: {
    ImageUploader,
    DTitle
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