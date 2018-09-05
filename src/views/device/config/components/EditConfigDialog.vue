<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false  title="编辑设备配置" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="100px" class="mb-22">
        <d-title>设备配置</d-title>
        <el-form-item label="TypeID">
          <el-select v-model="form.typeId" @change="handleModelChange">
            <el-option v-for="model in modelList" :key="model.typeId" :label="model.name" :value="model.typeId">
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
          <el-form-item label="备注">
            <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 4 }"></el-input>
          </el-form-item>
          <d-title>功能配置</d-title>
          <!--<pre>{{functionList}}</pre>-->
          <!--<el-form-item label="功能项">-->
          <!--<el-checkbox-group v-model="form.functionList">-->
          <!--<el-checkbox v-for="item, index in functionList" :key="index" :label="item">{{ item.name }}</el-checkbox>-->
          <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <el-table :data="functionList" class="mb20">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="functionId" label="硬件功能 ID" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column label="读写权限" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                {{ scope.row.permissionList.map(el => permissionListMap[el]).join(', ') }}
              </template>
            </el-table-column>
            <el-table-column label="配置方式" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                {{ scope.row.config === undefined ? '不可配置' : configTypeMap[scope.row.config.type] }}
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="description" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text" @click="editFunctionDialogVisible = true">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
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
    <edit-function-dialog :visible.sync="editFunctionDialogVisible"></edit-function-dialog>
  </div>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import EditFunctionDialog from './EditFunctionDialog'
import { fetchList as modelFetchList } from '@/api/device/model'
import DTitle from '@/components/Title'

export default {
  components: {
    EditFunctionDialog,
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
      functionList: [],
      permissionListMap: { r: '可读', w: '可写' },
      configTypeMap: { 1: '文本', 2: '多选', 3: '单选' },
      editFunctionDialogVisible: false
    }
  },
  created() {
    // this.getModelList().then(() => {
    //   this.handleModelChange(this.form.typeId)
    // })
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
      // const model = this.modelList.find(model => model.typeId === typeId)
      // this.form.pic = model.pic
      // this.form.name = model.name
      // this.form.source = model.source
      // this.form.functionList = model.functionList
      // this.form.codeMap = model.codeMap
      // this.form.description = model.description

      // this.functionList = model.functionList
    }
  }
}
</script>
