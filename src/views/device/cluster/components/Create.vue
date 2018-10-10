<template>
  <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
    <el-form label-position="left" label-width="80px" :model="form" :rules="rules" ref="form">
      <el-form-item label="集群名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="群内设备">
        <div class="addForm">
          <el-input v-model="addForm.mac" placeholder="设备 MAC"></el-input>
          <el-button type="primary" class="add" @click="addDevice">添加</el-button>
        </div>
        <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border highlight-current-row class="mb20">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column v-for="data in deviceData" :key="data.prop" :prop="data.prop" :label="data.label" show-overflow-tooltip sortable>
          </el-table-column>
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
        <image-uploader :urls='form.imageVideoList' @get-url='setImg' @remove-url='removeImg' :isList='true'></image-uploader>
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
import { select } from '@/api/customer'
import { addOrUpdateGroupAndDevice } from '@/api/device/cluster'

export default {
  components: { ImageUploader },
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        customerId: '',
        teamCover: '',
        imageVideoList: [],
        introduction: ''
      },
      addForm: {
        mac: ''
      },
      query: {
        limit: 100,
        page: 1
      },
      deviceList: [],
      selectedDeviceList: [],
      customerList: [],
      deviceData: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'typeID',
          label: 'typeID'
        },
        {
          prop: 'mac',
          label: 'MAC'
        }
      ],
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入群介绍', trigger: 'blur' },
        ],
        createLocation: [
          { required: true, message: '请输入地点', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请添加备注', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.select()
  },
  methods: {
    setImg(file) {
      this.form.imageVideoList = [
        ...this.form.imageVideoList,
        { imgVideo: file.url }
      ]
    },
    removeImg(file) {
      const index = this.form.imageVideoList.findIndex(
        v => v.imgVideo === file.url
      )
      this.form.imageVideoList.splice(index, 1)
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
    submitForm(formName) {  //判断表单数据是否为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCluster()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) { //清空表单里面的数据
      this.$refs[formName].resetFields();
      this.$emit('close')
    },
    createCluster() {
      const data = {
        ...this.form,
        deviceQueryRequest: {
          deviceList: this.deviceList
        }
      }
      addOrUpdateGroupAndDevice(data).then(res => {
        if (res.code === 200 && res.data) {
          data.id = res.data.id
          this.$emit('update', data)
          this.$message.success('添加成功')
        } else {
          res.msg && this.$message.error(res.msg)
        }
      })
    }
    // handleCancel() {
    //   this.$emit('close')
    // }
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
