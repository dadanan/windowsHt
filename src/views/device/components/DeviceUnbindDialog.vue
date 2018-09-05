<template>
  <el-dialog top='4vh' :close-on-click-modal=false  title="设备解绑" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <el-table
            :data="deviceList"
            style="width: 100%" highlight-current-row border>
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
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mb20">
          <el-form class="mb-22" label-width="100px" label-position="left">
            <el-form-item label="客户">
              <el-select v-model="allocateForm.client" style="width: 100%">
                <el-option label="测试客户 1" value="1"></el-option>
                <el-option label="测试客户 2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Open ID">
              <el-input v-model="allocateForm.appID"></el-input>
            </el-form-item>
            <el-form-item label="用户绑定组">
              <el-select v-model="allocateForm.type" style="width: 100%">
                <el-option label="用户绑定组 1" value="1"></el-option>
                <el-option label="用户绑定组 2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card>
          <div class="table-opts">
            <el-button-group>
              <el-button type="primary">移出</el-button>
            </el-button-group>
          </div>
          <el-table
            :data="deviceList"
            style="width: 100%" highlight-current-row border>
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
        </el-card>
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
      deviceList: {
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
