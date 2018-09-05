<template>
  <el-dialog top='4vh' :close-on-click-modal=false  title="设备分配" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
        <el-form label-width="100px" class="mb-22" label-position="left">
          <el-form-item label="客户">
            <el-select v-model="allocateForm.customerId" style="width: 100%">
              <el-option v-for='item in clientList' :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="APP ID">
            <el-input v-model="allocateForm.appid"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-select v-model="allocateForm.modelId" style="width: 100%">
              <el-option label="测试类型 1" value="1"></el-option>
              <el-option label="测试类型 2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品 ID">
            <el-input v-model="allocateForm.productId"></el-input>
          </el-form-item>
          <!-- <el-form-item label="产品型号描述">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="allocateForm.remark"></el-input>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="allocatePart">分配选中项</el-button>
      <el-button type="primary" @click="allocateAll">分配全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { assignDeviceToCustomer } from '@/api/device/list'
import { select } from '@/api/customer'

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
      listQuery: {
        page: 1,
        limit: 100
      }
    }
  },
  methods: {
    allocatePart() {
      console.log(
        JSON.stringify({
          ...this.allocateForm,
          deviceQueryRequest: {
            deviceList: this.selectedDeviceList
          }
        })
      )
      assignDeviceToCustomer({
        appid: 'ceshiid',
        customerId: 111,
        deviceQueryRequest: {
          deviceList: [
            {
              mac: '3',
              name: '3',
              typeId: 1
            }
          ]
        },
        modelId: 111,
        productId: 111
      })
        .then(res => {
          console.log('1', res)
          // this.$emit('update:visible', false)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    allocateAll() {
      console.log(
        JSON.stringify({
          ...this.allocateForm,
          deviceQueryRequest: {
            deviceList: this.deviceList
          }
        })
      )
      assignDeviceToCustomer({
        ...this.allocateForm,
        deviceQueryRequest: {
          deviceList: this.deviceList
        }
      })
        .then(res => {
          console.log('1', res)
          // this.$emit('update:visible', false)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    getCustomer() {
      select(this.listQuery)
        .then(res => {
          this.clientList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCustomer()
  }
}
</script>
