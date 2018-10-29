<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="isCreateClientDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="isClientColumnVisibleDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table :data="clientList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip v-if="clientColumnVisible.name" sortable>
        </el-table-column>
        <el-table-column prop="userType" label="类别" show-overflow-tooltip v-if="clientColumnVisible.type" sortable>
        </el-table-column>
        <el-table-column prop="publicName" label="公众号" show-overflow-tooltip v-if="clientColumnVisible.publicName" sortable>
        </el-table-column>
        <el-table-column prop="deviceTypeList" label="产品类别" show-overflow-tooltip v-if="clientColumnVisible.deviceTypeList" sortable>
        </el-table-column>
        <el-table-column prop="groupList" label="组信息" show-overflow-tooltip v-if="clientColumnVisible.groupList" sortable>
        </el-table-column>
        <el-table-column prop="loginName" label="管理员" show-overflow-tooltip v-if="clientColumnVisible.administrator" sortable>
        </el-table-column>
        <el-table-column prop="remark" label="备注说明" show-overflow-tooltip v-if="clientColumnVisible.remark" sortable>
        </el-table-column>
        <el-table-column prop="deviceTotal" label="设备总数" v-if="clientColumnVisible.deviceTotal" sortable>
        </el-table-column>
        <el-table-column prop="orderTotal" label="订单总数" v-if="clientColumnVisible.orderTotal" sortable>
        </el-table-column>
        <el-table-column prop="isDashboardEnabled" label="是否开放后台" v-if="clientColumnVisible.isDashboardEnabled" sortable>
        </el-table-column>
        <el-table-column prop="isAndroidEnabled" label="是否开发安卓" v-if="clientColumnVisible.isAndroidEnabled" sortable>
        </el-table-column>
        <el-table-column prop="use" label="业务方向" show-overflow-tooltip v-if="clientColumnVisible.use" sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="showEditRoleDialog(scope.row)">详情</el-button> -->
            <el-button type="text" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteClient(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[50,100,200,300]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-model-dialog @add-data='addData' :visible.sync="isCreateClientDialogVisible"></create-model-dialog>
    <edit-model-dialog @update-data='updateData' :visible.sync="isEditClientDialogVisible" :data='editingData'></edit-model-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义显示列" :visible.sync="isClientColumnVisibleDialogVisible">
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
          <el-checkbox v-model="clientColumnVisible.remark">备注说明</el-checkbox>
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
import DTitle from '@/components/Title'
import { select, deleteCustomerById, selectById } from '@/api/customer'
import ImageUploader from '@/components/Upload/image'
import CreateModelDialog from './client/createDialog'
import EditModelDialog from './client/editDialog'

export default {
  data() {
    return {
      clientList: [],
      total: 0,
      clientColumnVisible: {
        name: true,
        type: true,
        publicName: true,
        deviceTypeList: true,
        groupList: true,
        administrator: true,
        remark: true,
        deviceTotal: false,
        orderTotal: false,
        isDashboardEnabled: false,
        isAndroidEnabled: false,
        use: false
      },
      isCreateClientDialogVisible: false,
      isEditClientDialogVisible: false,
      createClientTab: 'basic',
      createClientDeviceForm: {
        name: '',
        type: '',
        typeNo: '',
        productID: ''
      },
      isClientColumnVisibleDialogVisible: false,
      // 动态功能
      dynamicTags: ['功能1', '功能2', '功能3'],
      inputVisible: false,
      inputValue: '',
      listQuery: {
        limit: 5,
        page: 1
      },
      editingData: {}
    }
  },
  methods: {
    addData(data) {
      this.clientList.push(data)
    },
    showEditRoleDialog(data) {
      this.isEditClientDialogVisible = true
      this.getDetail(data.id)
    },
    getDetail(id) {
      selectById(id).then(res => {
        this.editingData = res.data
      })
    },
    updateData(data) {
      this.clientList.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    getCustomer() {
      select(this.listQuery).then(res => {
        const data = res.data
        this.clientList = data.customerVos
        this.total = data.totalCount
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getCustomer()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getCustomer()
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    deleteClient(id) {
      this.$confirm('此操作将永久解除客户管理权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteCustomerById(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 从表格中移除此条数据
              this.clientList = this.clientList.filter(item => item.id !== id)
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getCustomer()
  },
  components: {
    DTitle,
    ImageUploader,
    CreateModelDialog,
    EditModelDialog
  }
}
</script>

<style lang='scss'>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.table-inside-image {
  width: 100%;
}

.box-card {
  margin-top: 15px;
  position: relative;
  .el-card__body {
    margin-top: 1rem;
  }
  .tool {
    position: absolute;
    top: 0.5rem;
    right: 0.7rem;
    width: fit-content;
    display: flex;
    align-items: center;
    .close-icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url('~@/assets/img/close.png');
      background-size: cover;
      margin-right: 5px;
    }
    .add-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url('~@/assets/img/add.png');
      background-size: cover;
    }
  }
}
</style>
