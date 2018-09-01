<template>
  <el-dialog title="添加设备型号" :visible="visible" @update:visible="$emit('update:visible', $event)" width='60%'>
    <el-steps :active="step" finish-status="success" class="mb20" align-center>
      <el-step title="设备配置"></el-step>
      <el-step title="客户信息设置"></el-step>
      <el-step title="硬件功能项"></el-step>
      <el-step title="版式配置"></el-step>
    </el-steps>
    <el-form v-if='step === 1' label-width="100px" class="mb-22">
      <el-form-item label="客户">
        <el-select v-model="form.customerId" @change="handleCustomerChange">
          <el-option v-for="model in customterList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.typeId" @change="handleTypeChange">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="theType.source"></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="theType.typeNo"></el-input>
      </el-form-item>
      <template v-if="form.typeId">
        <el-form-item label="对应名(类型名)">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="缩图">
          <image-uploader :url='theType.icon' @get-url='getURL' :imageName='getImageName(theType.icon)'></image-uploader>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="theType.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <el-form v-else-if='step === 2' label-width="100px" class="mb-22">
      <el-form-item label="ProductID">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="二维码">
        <image-uploader @get-url='getURL' :imageName='getImageName(form.icon)'></image-uploader>
      </el-form-item>
    </el-form>
    <el-form v-else-if='step === 3' label-width="100px" class="mb-22">
      <el-table :data="temp" style="width: 100%" class="mb20" border>
        <el-table-column type="selection" label='是否启用' width="80"></el-table-column>
        <el-table-column label="功能项名称">
          <template slot-scope="scope">
            <el-input v-model='scope.row.ablityName' disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column label="显示名称">
          <template slot-scope="scope">
            <el-input v-model='scope.row.name'></el-input>
          </template>
        </el-table-column>
        <el-table-column label="功能类型(标签)">
          <template slot-scope="scope">
            <el-input v-model='scope.row.ablityType' disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click='modifyAbilityItem(scope.row)'>自定义功能项</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-form v-else-if='step === 4' label-width="100px" class="mb-22">
      <el-form-item label="版式选择">
        <el-select v-model="form.typeId" @change="handleModelChange">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-for='item in software'>
        <el-card class='box-card' :key='item.index'>
          <el-form-item label='页面预览'>
            <img :src='item.index'>
          </el-form-item>
          <el-form-item :label='"页序：" + item.index'>
            <el-radio-group v-model="form.isRelated">
              <el-radio :label="true">显示</el-radio>
              <el-radio :label="false">不显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='页面名称'>
            {{item.name}}
          </el-form-item>
          <d-title>配置页面功能项</d-title>
          <el-table :data="options" style="width: 100%" class="mb20" border>
            <el-table-column type="index" label='标号' width="50"></el-table-column>
            <el-table-column label="功能类型(标签)">
              <template slot-scope="scope">
                <el-input v-model='scope.row.type'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope">
                <el-input v-model='scope.row.remark'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="挑选功能项">
              <template slot-scope="scope">
                <el-select v-model="form.asd">
                  <el-option v-for="iItem in ablityLists" :key="iItem.id" :label="iItem.name" :value="iItem.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" v-if='step!==1' @click="backStep()">上一步</el-button>
      <el-button type="primary" v-if='step!==4' @click="nextStep()">下一步</el-button>
      <el-button type="primary" v-else @click="$emit('update:visible', false)">确定</el-button>
    </div>
    <el-dialog title="自定义" :visible.sync="dialogFormVisible" append-to-body>
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="功能项名称">
          <el-input v-model="modifyData.ablityName" disabled></el-input>
        </el-form-item>
        <el-form-item label="功能分类">
          <el-input v-model="modifyData.ablityType" disabled></el-input>
        </el-form-item>
        <d-title>自定义功能项</d-title>
        <el-form-item label="输入文本" v-if='modifyData.configType === 1'>
          <el-input v-model="modifyData.text"></el-input>
        </el-form-item>
        <template v-if="modifyData.configType === 2 || modifyData.configType === 3">
          <el-form-item v-for="(option, i) in modifyData.deviceAblityOptions" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.optionName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="选项值"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList as getTypeList, createDeviceType } from '@/api/device/model'
import { select as getCustomer } from '@/api/customer'
import { selectFormatsByCustomerId } from '@/api/format'
import { selectListByTypeIds } from '@/api/device/model'
import DTitle from '@/components/Title'

export default {
  components: {
    ImageUploader,
    DTitle
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
        typeId: '',
        customerId: ''
      },
      dialogFormVisible: false,
      typeList: [],
      theType: {}, //用户选择的类型数据
      ablityLists: [
        {
          name: '功能项1',
          id: 1
        },
        {
          name: '功能项2',
          id: 2
        },
        {
          name: '功能项3',
          id: 3
        }
      ],
      deviceTypeAblitys: [],
      step: 1,
      software: [
        {
          img: '',
          index: 1,
          name: '页面名称A'
        },
        {
          img: '',
          index: 2,
          name: '页面名称B'
        }
      ],
      options: [
        {
          name: 'asd',
          type: '开关类',
          remark: '备注1'
        },
        {
          name: 'dfgfg',
          type: '文本类',
          remark: '备注2'
        }
      ],
      customterList: [],
      temp: [
        {
          ablityName: '风速',
          dirValue: '0x0x0x',
          remark: '备注',
          ablityType: '文本',
          permissions: ['r', 'w'],
          writeStatus: 1,
          readStatus: 1,
          configType: 1,
          text: '显示文本字符串',
          runStatus: '1',
          id: 1
        },
        {
          ablityName: '风速2',
          dirValue: '0x0x02x',
          remark: '备注2',
          ablityType: '选择框',
          permissions: ['r', 'w'],
          writeStatus: 1,
          readStatus: 1,
          configType: 2,
          deviceAblityOptions: [
            { optionName: '一档2', optionValue: '10' },
            { optionName: '二档2', optionValue: '20' },
            { optionName: '三档2', optionValue: '30' }
          ],
          runStatus: '1',
          id: 2
        }
      ],
      modifyData: {} //正在自定义的功能配置项数据
    }
  },
  methods: {
    selectFormatsByCustomerId() {
      selectFormatsByCustomerId().then(res => {
        console.log('res', res)
      })
    },
    handleTypeChange(id) {
      this.theType = this.typeList.filter(item => item.id === id)[0]
    },
    modifyAbilityItem(data) {
      this.dialogFormVisible = true
      this.modifyData = data
    },
    handleCustomerChange(id) {
      const temp = this.customterList.filter(item => item.id === id)
      this.getTypeById(temp[0].typeIds)
    },
    getCustomer() {
      getCustomer({
        limit: 100,
        page: 1
      }).then(res => {
        this.customterList = res.data
      })
    },
    backStep() {
      if (this.step > 1) {
        this.step--
      }
    },
    nextStep() {
      if (this.step++ > 3) this.step = 0
    },
    createDeviceType() {
      createDeviceType(this.form).then(res => {
        console.log(res)
      })
    },
    getModelList() {
      getTypeList({
        page: 1,
        limit: 100
      }).then(response => {
        this.typeList = response.data
      })
    },
    getURL(url) {
      this.form.icon = url
    },
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    },
    handleModelChange(id) {
      const model = this.typeList.find(model => model.id === id)
      this.form.icon = model.icon
      this.form.name = model.name
      this.form.source = model.source
      this.form.deviceTypeAblitys = model.deviceTypeAblitys.map(fun => fun.id)
      this.form.stopWatch = model.stopWatch
      this.form.remark = model.remark

      this.deviceTypeAblitys = model.deviceTypeAblitys
    },
    getTypeById(ids) {
      selectListByTypeIds(ids).then(res => {
        this.typeList = res.data
      })
    }
  },
  created() {
    this.getModelList()
    this.getCustomer()
  }
}
</script>

<style lang='scss'>
.box-card {
  margin-top: 10px;
}
.inline-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 49%;
  }
}
</style>