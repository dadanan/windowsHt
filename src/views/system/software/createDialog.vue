<template>
  <el-dialog title="创建版式" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-steps :active="step" finish-status="success" class="mb20" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="版式内容设置"></el-step>
    </el-steps>
    <div v-if="step == 1">
      <el-form label-position="left" label-width="150px">
        <el-form-item label="名称">
          <el-input v-model='addForm.name'></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model='addForm.version'></el-input>
        </el-form-item>
        <el-form-item label="首页缩图">
          <image-uploader @get-url='setURL(arguments,addForm,"previewImg")'></image-uploader>
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="addForm.customerIds" placeholder="请选择">
            <el-option v-for="item in customers" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model='addForm.description'></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="addForm.owerType" placeholder="请选择">
            <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="step == 2">
      <el-card v-for='(item,index) in pages' class='box-card'>
        <div class='tool'>
          <span class='close-icon' @click='deleteCard(index)'></span>
          <span class='add-icon' @click='addCard'></span>
        </div>
        <el-form label-position="left" label-width="150px">
          <el-form-item label="页面图片" prop='roleName'>
            <image-uploader @get-url='setURL(arguments,item,"showImg")'></image-uploader>
          </el-form-item>
          <el-form-item label="页序">
            {{index + 1}}
          </el-form-item>
          <el-form-item label="页面名称">
            <el-input v-model='item.name'></el-input>
          </el-form-item>
          <d-title>页面功能项</d-title>
          <el-table :data="item.wxFormatItemVos" style="width: 100%" class="mb20" border>
            <el-table-column type="index" label='标号' width="50"></el-table-column>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input v-model='scope.row.name'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="功能类型(标签)">
              <template slot-scope="scope">
                <el-input v-model='scope.row.ablityType'></el-input>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click='addMoreLine(item.wxFormatItemVos)'>+增加功能项</el-button>
          <!-- <div v-for='(option,oIndex) in options'>
            <el-form-item label="标号">
              {{oIndex}}
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model='addForm.name'></el-input>
            </el-form-item>
            <el-form-item label="格式">
              <el-select v-model="addForm.format" placeholder="请选择">
                <el-option v-for="iItem in format" :key="iItem.value" :label="iItem.label" :value="iItem.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="值">
              <template v-if='addForm.format === 1'>
                <el-switch style="display: block" v-model="addForm.switch" active-color="#13ce66" inactive-color="#ff4949" active-text="有" inactive-text="无">
                </el-switch>
              </template>
              <template v-if='addForm.format === 2'>
                <el-input v-model='addForm.name'></el-input>
              </template>
            </el-form-item>
            <el-form-item label="图片">
              <image-uploader @get-url='setURL(arguments,h5Config,"img")'></image-uploader>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model='addForm.remark'></el-input>
            </el-form-item>
          </div> -->
        </el-form>
      </el-card>
    </div>
    <div slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="backStep" v-if="step === 2">上一步</el-button>
      <el-button type="primary" @click="nextStep" v-if="step === 1">下一步</el-button>
      <el-button type="primary" v-if='step===2' @click='submitForm'>确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ImageUploader from '@/components/Upload/image'
import DTitle from '@/components/Title'
import { createWxFormat } from '@/api/format'
import { select } from '@/api/customer'

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
      addForm: {},
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
      customers: []
    }
  },
  methods: {
    submitForm() {
      this.pages.forEach((item, index) => {
        item.pageNo = index + 1
      })
      const form = {
        ...this.addForm,
        wxFormatPageVos: this.pages
      }
      createWxFormat(form).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        console.log(res)
        this.$emit('add-data', form)
        this.$emit('update:visible', false)
      })
      console.log(form)
    },
    deleteCard(index) {
      if (this.pages.length <= 1) return

      this.pages.splice(index, 1)
    },
    addCard() {
      this.pages.push({
        wxFormatItemVos: [{}]
      })
    },
    addMoreLine(data) {
      data.push({})
    },
    setURL(argu, data, name) {
      data[name] = argu[0]
    },
    backStep() {
      this.step--
    },
    nextStep() {
      if (this.step === 2) {
        this.step = 1
        return
      }
      this.step++
    },
    getCustomer() {
      select({
        limit: 100,
        page: 1
      }).then(res => {
        this.customers = res.data
      })
    }
  },
  created() {
    this.getCustomer()
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