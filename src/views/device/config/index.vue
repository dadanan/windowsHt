<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="handleDeviceCopy">复制型号</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="createConfigDialogVisible = true">添加
          </el-button>
        </el-button-group>
      </div>
      <el-table @selection-change="handleSelectionChange" :data="list" v-loading.body="loading" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="modelNo" label="modelNo" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="modelCode" label="型号" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="缩图">
          <template slot-scope="scope">
            <img :src="scope.row.icon" :alt="scope.row.name" class="table-img">
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="产品二维码">
          <template slot-scope="scope">
            <img :src="scope.row.productQrCode" :alt="scope.row.name" class="table-img">
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
        <!-- <el-table-column prop="createUser" label="修改人" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="修改时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime}} -->
            <!-- {{new Date(scope.row.lastUpdateTime).toLocaleString()}} -->
          <!-- </template>
        </el-table-column> -->
        <el-table-column label="操作" show-overflow-tooltip width='180'>
          <template slot-scope="scope">
            <el-button type="text" @click="createWxDeviceIds(scope.row)">增加配额</el-button>
            <el-button type="text" @click="showEditDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="listQuery.page" :page-sizes="[100,200,300,400]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <create-config-dialog :visible.sync="createConfigDialogVisible" :deviceModelData="list" @add-data='addData'></create-config-dialog>
    <edit-config-dialog :data='editingData' @update-data='updateData' :deviceModelData="list" :visible.sync="editConfigDialogVisible"></edit-config-dialog>
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
  selectCount,
  selectById,
  deleteModelById,
  createWxDeviceIds,
  createDeviceModel
} from '@/api/device/model'
import { selectById as selectFormatById } from '@/api/format'

export default {
  data() {
    return {
      loading: false,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 100,
        status: 1
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
      editingData: {},
      selectedDeviceList: [],
      copyVisible: false
    }
  },
  methods: {
    createModel(data) {
      const form = JSON.parse(JSON.stringify(data))
      // 编辑删除id
      if (form.deviceModelAbilitys) {
        form.deviceModelAbilitys.forEach(item => {
          delete item.id
        })
      }

      if (form.deviceModelFormat) {
        form.deviceModelFormat.modelFormatPages.forEach(item => {
          delete item.id
          if (!item.modelFormatItems) {
            return
          }
          item.modelFormatItems.forEach(formatItem => {
            delete formatItem.id
          })
        })
      }

      createDeviceModel(form).then(res => {
        this.addData({
          ...data,
          id: res.data
        })

        const formatId = data.deviceModelFormat.modelFormatPages[0].formatId
        if (!Number.isInteger(formatId)) {
          return
        }

        selectFormatById(formatId).then(response => {
          if (!Number.isInteger(data.customerId)) {
            return
          }

          let url = `${response.data.htmlUrl}?customerId=${data.customerId}`
          const domain = window.origin.match('://(.*).hcocloud.com')[1]
          url = url.replace('://pro', '://' + domain)

          this.$alert(
            `您已成功配置好型号数据，请先保存链接，稍后添加至微信公众号自定义菜单中: ${url}`,
            '预览地址',
            {
              confirmButtonText: '确定'
            }
          )
        })
      })
    },
    handleDeviceCopy() {
      if (this.selectedDeviceList.length === 0) {
        this.$message.warning('请选择设备后再进行操作！')
        return
      }
      if (this.selectedDeviceList.length > 1) {
        this.$message.warning('只能选择一个设备！')
        return
      }

      this.$prompt('请输入型号的ProductID', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入数字'
      })
        .then(({ value }) => {
          const number = value.trim()
          if (!number) {
            this.$message({
              type: 'error',
              message: '请输入型号的ProductID'
            })
            return
          }

          // 查询，创建新的型号
          selectById(this.selectedDeviceList[0].id).then(res => {
            const data = res.data
            data.productId = number
            delete data.id
            this.createModel(data)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    createWxDeviceIds(data) {
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
      this.list.push(data)
    },
    updateData(data) {
      this.list.map(item => {
        if (item.id === data.id) {
          Object.assign(item, data)
        }
      })
    },
    showEditDialog(data) {
      this.selectById(data.id)
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteModelById(id).then(res => {
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getList() {
      select(this.listQuery).then(res => {
        this.list = res.data
      })
    },
    selectCount() {
      selectCount(this.listQuery.status).then(res => {
        this.total = res.data
      })
    },
    selectById(id) {
      selectById(id).then(res => {
        this.editConfigDialogVisible = true
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
    this.selectCount()
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