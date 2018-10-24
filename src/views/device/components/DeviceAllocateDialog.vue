<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备分配" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" highlight-current-row border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="typeID" label="typeID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px" class="mb-22" label-position="left" :model="allocateForm" :rules="rules" ref="allocateForm">
          <el-form-item label="客户" prop="customerId">
            <el-select v-model="allocateForm.customerId" @change='customerChanged' style="width: 100%">
              <el-option v-for='item in clientList' :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="APP ID">
            <el-input v-model="allocateForm.appid" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="modelId">
            <el-select @change='modelChanged' v-model="allocateForm.modelId" style="width: 100%">
              <el-option v-for='item in modelList' :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品 ID">
            <el-input v-model="allocateForm.productId" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="产品型号描述">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="allocateForm.remark"></el-input>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('allocateForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('allocateForm','1')">分配选中项</el-button>
      <el-button type="primary" @click="submitForm('allocateForm','2')">分配全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { assignDeviceToCustomer } from '@/api/device/list'
import { selectAllCustomers, selectModelsByTypeIds } from '@/api/customer'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deviceList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      allocateForm: {
        appid: '',
        customerId: '',
        modelId: '',
        productId: ''
        // remark: ''
      },
      selectedDeviceList: [],
      clientList: [],
      modelList: [],
      listQuery: {
        page: 1,
        limit: 100
      },
      rules: {
        customerId: [
          { required: true, message: '请选择客户', trigger: 'change' }
        ],
        modelId: [
          { required: true, message: '请选择产品型号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    modelChanged(id) {
      const model = this.modelList.filter(item => item.id === id)[0]
      this.allocateForm.productId = model.productId
    },
    customerChanged(id) {
      const customer = this.clientList.filter(item => item.id === id)[0]
      this.allocateForm.appid = customer.appid
      this.selectModelsByTypeIds(customer.typeIds)
    },
    submitForm(formName, id) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (id == 1) {
            this.allocatePart()
          } else {
            this.allocateAll()
          }
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
    selectModelsByTypeIds(typeIds) {
      selectModelsByTypeIds(typeIds).then(res => {
        this.modelList = res.data
      })
    },
    allocatePart() {
      assignDeviceToCustomer({
        ...this.allocateForm,
        deviceQueryRequest: {
          deviceList: this.selectedDeviceList
        }
      }).then(() => {
        this.$emit('update:visible', false)
        this.$message({
          message: '分配成功！',
          type: 'success'
        })
      })
    },
    allocateAll() {
      assignDeviceToCustomer({
        ...this.allocateForm,
        deviceQueryRequest: {
          deviceList: this.deviceList
        }
      }).then(() => {
        this.$emit('update:visible', false)
        this.$message({
          message: '分配成功！',
          type: 'success'
        })
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    getCustomer() {
      selectAllCustomers(this.listQuery).then(res => {
        this.clientList = res.data
      })
    }
  },
  created() {
    this.getCustomer()
  }
}
</script>
