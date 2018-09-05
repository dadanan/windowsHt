<template>
  <div>
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="trusteeshipDialogVisible = true">托管</el-button>
          <el-button type="primary" @click="createDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="isClientColumnVisibleDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table :data="data" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="ablityName" label="组ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="组名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="组标" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="OpenID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="创建时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="归属" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="封面" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="图册" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="视频" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="介绍" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="ablityName" label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[10, 20, 40]" :page-size="data.length" layout="total, sizes, prev, pager, next, jumper" :total="data.length">
      </el-pagination>
      <create-dialog :visible.sync="createDialogVisible" @add-data='addData'></create-dialog>
      <edit-dialog :visible.sync="editDialogVisible" @update-data='updateData' :data='editingData'></edit-dialog>
      <trusteeship-dialog :visible.sync="trusteeshipDialogVisible" @update-data='updateData' :data='editingData'></trusteeship-dialog>
    </el-card>
    <el-dialog top='4vh' :close-on-click-modal=false  title="自定义显示列" :visible.sync="isClientColumnVisibleDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.name">名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.type">类别</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.publicName">公众号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.deviceTypeList">产品类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.groupList">组信息</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.administrator">管理员</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.intro">备注说明</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.deviceTotal">客户设备数</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.orderTotal">客户订单数</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.isDashboardEnabled">后台开放与否</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.isAndroidEnabled">安卓开放与否</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="clientColumnVisible.use">业务方向</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isClientColumnVisibleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isClientColumnVisibleDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CreateDialog from './CreateDialog'
import EditDialog from './EditDialog'
import TrusteeshipDialog from './TrusteeshipDialog'

export default {
  data() {
    return {
      data: [],
      loading: false,
      createDialogVisible: false,
      editDialogVisible: false,
      trusteeshipDialogVisible: false,
      isClientColumnVisibleDialogVisible: false,
      editingData: {},
      clientColumnVisible: {}
    }
  },
  methods: {
    showEditRoleDialog(data) {
      this.editDialogVisible = true
      this.editingData = data
    },
    addData() {},
    updateData() {},
    deleteRow() {}
  },
  components: {
    CreateDialog,
    EditDialog,
    TrusteeshipDialog
  }
}
</script>