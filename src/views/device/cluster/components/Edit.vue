<template>
  <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
    <el-form label-position="left" label-width="80px" :model="form" :rules="rules" ref="form">
      <el-form-item label="项目名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目内设备">
        <div class="addForm">
          <el-input v-model="querys.name" placeholder="请输入组名"></el-input>
          <el-input v-model="querys.createName" placeholder="请输入创建人"></el-input>
          <el-button type="primary" class="add" @click="queryTeamList">添加</el-button>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="归属" prop="customerId">
        <el-select v-model="form.customerId" placeholder='请选择'>
          <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
        </el-select>
        <span class="color">*选择该项目的归属方（与微信公众号归属方一致）</span>
      </el-form-item>
      <el-form-item label="图册">
        <image-uploader :urls='form.imagesList' @get-url='setImg' @remove-url='removeImg' :isList='true'></image-uploader>
        <span class="color">*上传多张项目图片，格式（JPG\JPEG\PNG)，尺寸（单张小于2M）</span>
      </el-form-item>
      <el-form-item label="视频">
        <video-uploader :maxSize='50' :list='form.videosList' :multiple='true' @onSuccess="handleVideoSuccess" @onRemove="handleVideoRemove"></video-uploader>
        <span class="color">*只能上传5段视频 ，格式（MP4\avi\wmv\rmvb)，尺寸单段小于50MB</span>
      </el-form-item>
      <el-form-item label="项目介绍" prop="introduction">
        <el-input v-model="form.introduction"></el-input>
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
import {
  queryTeamList
} from '@/api/device/team'
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
      querys: {
        limit: 50,
        page: 1,
        status: 1,
        createName:'',
        name:''
      },
      list:[],
      rules: {
        customerId: [
          { required: true, message: '请选择归属', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入项目介绍', trigger: 'blur' }
        ],
        location: [
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
    queryTeamList() {
      queryTeamList(this.querys).then(res => {
        this.list = res.data.filter(item => item.status === 1)
        if(this.list.length == 0){
          this.$message({
              type: 'success',
              message: `请输入正确的组名或者创建人`
          })
        }
        var datas = this.list[0].teamDeviceCreateRequestList
        for(var i=0;i < datas.length;i++){
          this.deviceList.push({
            mac:datas[i].mac,
            name:datas[i].name
          })
        }
      })
    },
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
        if (data.location) {
          const location = data.location.split(',')
          this.selectArea.province = location[0]
          this.selectArea.city = location[1]
          this.selectArea.area = location[2]
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
        deviceList: this.deviceList
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
.color{
  color: #969696
}
</style>
