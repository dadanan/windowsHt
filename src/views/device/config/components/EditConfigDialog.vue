<template>
  <el-dialog title="编辑设备配置" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <d-title>设备配置</d-title>
      <el-form-item label="TypeID">
        <el-select v-model="form.typeId" @change="handleModelChange">
          <el-option
            v-for="model in modelList"
            :key="model.typeId"
            :label="model.name"
            :value="model.typeId">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="form.typeId">
        <el-form-item label="缩图">
          <image-uploader v-model="form.pic"></image-uploader>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="form.source"></el-input>
        </el-form-item>
        <el-form-item label="功能项">
          <el-checkbox-group v-model="form.functionList">
            <el-checkbox v-for="item, index in functionList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
        <d-title>微信客户端配置</d-title>
        <el-form-item label="关联设置">
          <el-radio-group v-model="form.isRelated">
            <el-radio :label="true">关联</el-radio>
            <el-radio :label="false">非关联</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="软件更新">
          <el-radio-group v-model="form.isUpdateable">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="恢复出厂设置">
          <el-radio-group v-model="form.isResettable">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="码表">-->
          <!--<el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>-->
        <!--</el-form-item>-->
        <el-form-item label="说明书">
          <el-button type="primary" icon="el-icon-upload" size="mini">上传</el-button>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import ImageUploader from '@/components/ImageUploader'
  import { fetchList as modelFetchList } from '@/api/device/model'
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
          typeId: 'fen-03',
          name: '',
          source: '',
          functionList: [],
          codeMap: '',
          description: '',
          isRelated: false,
          isUpdateable: false,
          isResettable: false,
          manual: ''
        },
        modelList: [],
        functionList: []
      }
    },
    created() {
      this.getModelList().then(() => {
        this.handleModelChange(this.form.typeId)
      })
    },
    methods: {
      getModelList() {
        return modelFetchList({
          page: 1,
          limit: 1000
        }).then(response => {
          this.modelList = response.data.items
        })
      },
      handleModelChange(typeId) {
        const model = this.modelList.find(model => model.typeId === typeId)
        this.form.pic = model.pic
        this.form.name = model.name
        this.form.source = model.source
        this.form.functionList = model.functionList.map(fun => fun.id)
        this.form.codeMap = model.codeMap
        this.form.description = model.description

        this.functionList = model.functionList
      }
    }
  }
</script>
