<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建版式" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
        <el-form-item label="设备类型">
          <el-checkbox-group v-model="addForm.typeIds">
            <el-checkbox v-for="item in types" :key="item.id" :label="item.id">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
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
        <el-form-item label="预览地址">
          <el-input v-model='addForm.htmlUrl'></el-input>
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
                <el-select v-model='scope.row.ablityType' placeholder="请选择">
                  <el-option v-for='item in typeList' :key='item.value' :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="danger" @click="deleteOption(item.wxFormatItemVos,scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click='addMoreLine(item.wxFormatItemVos)'>+增加功能项</el-button>
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
import { selectAllTypes } from '@/api/device/model'

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
      types: []
    }
  },
  methods: {
    deleteOption(data, scope) {
      data.splice(scope.$index, 1)
    },
    submitForm() {
      this.pages.forEach((item, index) => {
        item.pageNo = index + 1
      })

      this.addForm.typeIds = this.addForm.typeIds.join(',')

      const form = {
        ...this.addForm,
        wxFormatPageVos: this.pages
      }
      createWxFormat(form).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$emit('add-data', form)
        this.$emit('update:visible', false)
      })
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
    },
    selectAllTypes() {
      selectAllTypes({
        limit: 100,
        page: 1
      }).then(res => {
        this.types = res.data
      })
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.step = 1
      }
    }
  },
  created() {
    this.getCustomer()
    this.selectAllTypes()
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