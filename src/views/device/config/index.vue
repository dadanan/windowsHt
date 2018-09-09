<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <!-- <el-button type="primary" @click="isClientColumnVisibleDialogVisible = true">自定义</el-button> -->
          <el-button type="primary" icon="el-icon-plus" @click="createConfigDialogVisible = true">添加
          </el-button>
        </el-button-group>
      </div>
      <el-table :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="缩图">
          <template slot-scope="scope">
            <img :src="scope.row.icon" :alt="scope.row.name" class="table-img">
          </template>
        </el-table-column>
        <el-table-column prop="modelNo" label="型号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="typeName" label="类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="功能项" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            ...
            <!-- {{ scope.row.functionList.map(el => el.name).join(', ') }} -->
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="归属(客户)" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="productId" label="productID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="devicePoolCount" label="配额" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width='180'>
          <template slot-scope="scope">
            <el-button type="text" @click="createWxDeviceIds(scope.row)">增加配额</el-button>
            <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[10, 20, 40]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-config-dialog :visible.sync="createConfigDialogVisible" @add-data='addData'></create-config-dialog>
    <edit-config-dialog :data='editingData' :visible.sync="editConfigDialogVisible"></edit-config-dialog>
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
import CreateConfigDialog from './components/CreateConfigDialog'
import EditConfigDialog from './components/EditConfigDialog'
import {
  select,
  selectById,
  deleteModelById,
  createWxDeviceIds
} from '@/api/device/config'

export default {
  data() {
    return {
      loading: false,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 100
      },
      createConfigDialogVisible: false,
      editConfigDialogVisible: false,
      isClientColumnVisibleDialogVisible: false,
      clientColumnVisible: {
        name: true,
        type: true,
        publicName: true,
        deviceTypeList: true,
        groupList: true,
        administrator: true,
        intro: true,
        deviceTotal: false,
        orderTotal: false,
        isDashboardEnabled: false,
        isAndroidEnabled: false,
        use: false
      },
      editingData: {}
    }
  },
  methods: {
    createWxDeviceIds(data) {
      console.log('da', data)
      this.$prompt('请输入数字', 'DeviceID 配额', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\d/,
        inputErrorMessage: '请输入数字！'
      })
        .then(({ value }) => {
          createWxDeviceIds({
            customerId: data.customerId,
            productId: data.productId,
            addCount: value
          }).then(() => {
            this.$message({
              message: `增加配额数量成功：${value}`,
              type: 'success'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    addData(data) {
      this.list.unshift(data)
    },
    showEditDialog(data) {
      this.editConfigDialogVisible = true
      this.selectById(data.id)
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteModelById(id)
            .then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                // 从表格中移除此条数据
                this.list = this.list.filter(item => item.id !== id)
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              console.log('err', err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getList() {
      this.loading = true
      select(this.listQuery).then(res => {
        this.list = res.data
        this.loading = false
      })
    },
    selectById(id) {
      selectById(id).then(res => {
        this.editingData = res.data
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    deleteFunction() {
      this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
    this.getList()
  },
  components: {
    CreateConfigDialog,
    EditConfigDialog
  }
}
</script>

<style>
.table-img {
  width: 100%;
}
</style>