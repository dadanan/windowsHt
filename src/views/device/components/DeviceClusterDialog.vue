<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备集群" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
        <el-form label-position="left" label-width="80px">
          <el-form-item label="集群名">
            <el-input v-model='name' placeholder='请输入'></el-input>
          </el-form-item>
          <el-form-item label="客户">
            <el-select v-model="customerId" placeholder='请选择'>
              <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确认集群</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addNewGroupAndDevice } from '@/api/device/group'
import { select } from '@/api/customer'

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
      customerId: '',
      name: '',
      query: {
        limit: 100,
        page: 1
      },
      customerList: [],
      selectedDeviceList: []
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    addNewGroupAndDevice() {
      addNewGroupAndDevice({
        name: this.name,
        customerId: this.customerId,
        deviceQueryRequest: {
          deviceList: this.selectedDeviceList.map(item => {
            return {
              mac: item.mac,
              mame: item.name,
              typeId: item.typeId
            }
          })
        }
      }).then(() => {
        this.$message({
          message: '添加集群成功！',
          tpye: 'success'
        })
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
    },
    created() {
      this.select()
    }
  }
}
</script>
