<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备群" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="table-opts">
            <el-form inline class="el-form--flex">
              <el-form-item style="flex: 1;">
                <el-input v-model="addForm.mac" placeholder="设备 MAC"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addDevice">添加</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border highlight-current-row class="mb20">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="typeID" label="typeID" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" label-width="80px" :model="devList" :rules="rules" ref="devList">
            <el-form-item label="项目名" prop="name">
              <el-input v-model='devList.name' placeholder='请输入'></el-input>
            </el-form-item>
            <el-form-item label="客户" prop="customerId">
              <el-select v-model="devList.customerId" placeholder='请选择'>
                <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('devList')">取消</el-button>
      <el-button type="primary" @click="submitForm('devList')">确认项目</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addOrUpdateGroupAndDevice } from '@/api/device/group'
import { selectAllCustomers as select } from '@/api/customer'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deviceList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      addForm: {
        mac: ''
      },
      devList: {
        customerId: '',
        name: ''
      },
      query: {
        limit: 100,
        page: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ]
      },
      customerList: [],
      selectedDeviceList: []
    }
  },
  created() {
    this.select()
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    submitForm(formName) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addOrUpdateGroupAndDevice()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      //清空表单里面的数据
      this.$emit('update:visible', false)
      this.$refs[formName].resetFields()
    },
    addOrUpdateGroupAndDevice() {
      addOrUpdateGroupAndDevice({
        name: this.devList.name,
        customerId: this.devList.customerId,
        deviceList: this.selectedDeviceList.map(item => {
          return {
            mac: item.mac,
            mame: item.name,
            typeId: item.typeId
          }
        })
      }).then(() => {
        this.$message({
          message: '添加项目成功！',
          type: 'success'
        })
        this.$emit('update:visible', false)
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
    select() {
      select(this.query).then(res => {
        this.customerList = res.data || []
      })
    }
  }
}
</script>
