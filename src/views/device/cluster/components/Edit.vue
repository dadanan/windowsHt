<template>
  <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
    <el-form label-position="left" label-width="80px" :model="form" :rules="rules" ref="form">
      <el-form-item label="集群名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="群内设备">
        <div class="addForm">
          <el-input v-model="addForm.mac" placeholder="设备 MAC"></el-input>
          <el-button type="primary" class="add" @click="addDevice">添加</el-button>
        </div>
        <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border highlight-current-row class="mb20">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="名称" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <el-input v-model='scope.row.name'></el-input>
            </template>
          </el-table-column>
          <el-table-column label="MAC" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <el-input v-model='scope.row.mac'></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column label="型号" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <el-input v-model='scope.row.model'></el-input>
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="客户" prop="customerId">
        <el-select v-model="form.customerId" placeholder='请选择'>
          <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图册">
        <image-uploader :urls='form.imagesList' @get-url='setImg' @remove-url='removeImg' :isList='true'></image-uploader>
      </el-form-item>
      <el-form-item label="视频">
        <video-uploader :list='form.videosList' :multiple='true' @onSuccess="handleVideoSuccess" @onRemove="handleVideoRemove"></video-uploader>
      </el-form-item>
      <el-form-item label="群介绍" prop="introduction">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="地点" prop="createLocation">
        <el-input v-model="form.createLocation"></el-input>
      </el-form-item>
      <el-form-item label="添加备注" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="table-opts">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button type="primary" @click='submitForm("form")'>确定</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import VideoUploader from '@/components/Upload/VideoUpload'
import { selectAllCustomers as select } from '@/api/customer'
import { queryGroupById } from '@/api/device/cluster'
import { addOrUpdateGroupAndDevice } from '@/api/device/cluster'

export default {
  components: { ImageUploader, VideoUploader },
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        customerId: '',
        imagesList: [],
        videosList: [],
        introduction: ''
      },
      deviceList: [],
      addForm: {
        mac: ''
      },
      query: {
        limit: 100,
        page: 1
      },
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入群介绍', trigger: 'blur' }
        ],
        createLocation: [
          { required: true, message: '请输入地点', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请添加备注', trigger: 'blur' },
          {
            min: 0,
            max: 100,
            message: '长度在 0 到 100 个字符',
            trigger: 'blur'
          }
        ]
      },
      selectedDeviceList: [],
      customerList: []
    }
  },
  methods: {
    handleVideoSuccess(file, fileList) {
      this.form.videosList = [...this.form.videosList, { video: file.url }]
    },
    handleVideoRemove(file) {
      const index = this.form.videosList.findIndex(v => v.video === file.url)
      this.form.videosList.splice(index, 1)
    },
    setImg(file) {
      if (!this.form.imagesList) {
        this.form.imagesList = []
      }
      this.form.imagesList = [...this.form.imagesList, { image: file.url }]
    },
    removeImg(file) {
      const index = this.form.imagesList.findIndex(v => v.image === file.url)
      this.form.imagesList.splice(index, 1)
    },
    queryGroupById() {
      queryGroupById(this.datas.id).then(res => {
        const data = res.data
        this.form = data
        if (data.deviceList) {
          this.deviceList = data.deviceList
        }
      })
    },
    addDevice() {
      this.deviceList.push({
        mac: this.addForm.mac
      })
    },
    deleteDevice(index) {
      this.deviceList.splice(index, 1)
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    select() {
      select(this.query).then(res => {
        this.customerList = res.data || []
      })
    },
    submitForm(formName) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createCluster()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      //清空表单里面的数据
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    createCluster() {
      const form = {
        ...this.form,
        deviceQueryRequest: {
          deviceList: this.deviceList
        }
      }
      addOrUpdateGroupAndDevice(form).then(res => {
        const data = res.data
        form.id = data.id
        this.$emit('update', form)
        this.$message.success('更新成功')
      })
    }
  },
  created() {
    this.select()
    this.queryGroupById()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.addForm {
  display: flex;
  margin-bottom: 15px;

  .add {
    margin-left: 20px;
  }
}
.mb20 {
  padding: 0 2px;
}
.table-opts {
  margin-top: 30px;
}
</style>
