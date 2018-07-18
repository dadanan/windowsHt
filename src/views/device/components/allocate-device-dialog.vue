<template>
  <el-dialog title="设备分配" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form label-width="100px" class="mb-22" label-position="left">
          <el-form-item label="客户">
            <el-select v-model="allocateForm.client" style="width: 100%">
              <el-option label="测试客户 1" value="1"></el-option>
              <el-option label="测试客户 2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="APP ID">
            <el-input v-model="allocateForm.appID"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-select v-model="allocateForm.type" style="width: 100%">
              <el-option label="测试类型 1" value="1"></el-option>
              <el-option label="测试类型 2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品 ID">
            <el-input v-model="allocateForm.productID"></el-input>
          </el-form-item>
          <el-form-item label="产品类型描述">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="allocateForm.productDescription"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14">
        <el-table
          :data="allocateList"
          style="width: 100%" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="name"
            label="名称" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="typeID"
            label="typeID" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column
            prop="mac"
            label="MAC" show-overflow-tooltip sortable>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">分配选中项</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">分配全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      allocateList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        allocateForm: {
          client: '',
          appID: '',
          type: '',
          productID: '',
          productDescription: ''
        }
      }
    }
  }
</script>
