<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="复制型号" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
          <el-form-item label="新ProductID">
            <el-input v-model="newProductID"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="createDeviceModel">复制</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createDeviceModel } from '@/api/device/model'

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
      newProductID: '',
      selectedDeviceList: [],
      listQuery: {
        page: 1,
        limit: 100
      }
    }
  },
  methods: {
    selectModelsByTypeIds(typeIds) {
      selectModelsByTypeIds(typeIds).then(res => {
        this.modelList = res.data
      })
    },
    createDeviceModel() {
      createDeviceModel(form).then(res => {
        this.$emit('update:visible', false)
        this.$emit('add-data', {
          ...form,
          id: res.data
        })
        if (!this.formatSelected[0]) {
          return
        }
        this.$alert(
          `您已成功配置好型号数据，请先保存链接，稍后微信内打开即可查看效果: ${
            this.formatSelected[0].htmlUrl
          }?customerId=${this.form.customerId}`,
          '预览地址',
          {
            confirmButtonText: '确定'
          }
        )
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    }
  }
}
</script>
