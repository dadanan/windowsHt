<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" v-if='isPro()' @click="deviceImportDialogVisible = true">导入</el-button>
          <el-button type="primary" v-if='isPro()' @click="deviceAddDialogVisible = true">添加</el-button>
          <el-button type="primary" v-if='isPro()' @click="deleteOneDeviceHandler">删除</el-button>
          <el-button type="primary" v-if='isPro()' @click='handleDeviceRecover'>恢复</el-button>
          <el-button type="primary" @click="handleDeviceAllocate">分配</el-button>
          <el-button type="primary" @click="handleDeviceFree">召回</el-button>
          <el-button type="primary" @click="handleDeviceDisable">禁用</el-button>
          <el-button type="primary" @click="handleDeviceAble">启用</el-button>
          <el-button type="primary" @click="handleDeviceCluster">项目</el-button>
          <el-button type="primary" @click="handleDeviceBind">绑定</el-button>
          <el-button type="primary" @click="handleDeviceUnbind">解绑</el-button>
          <el-button type="primary" @click="deviceExportDialogVisible = true">导出</el-button>
          <el-button type="primary" @click="deviceColumnControlDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table @expand-change="expandChanged" :data="computeDeviceList" style="width: 100%" @selection-change="handleSelectionChange" class="mb20" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table v-if='scope.row.childCount!==0' :data="scope.row.childDeviceList" style="width: 100%" class="mb20" border>
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="name" label="从设备名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
              </el-table-column>
              <el-table-column prop="childId" label="从设备ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.mac">
              </el-table-column>
              <el-table-column prop="type" label="型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.type">
              </el-table-column>
              <el-table-column label="分配状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.assignStatus">
                <template slot-scope="scope">
                  {{scope.row.assignStatus === 1 ? '已分配' : '未分配'}}
                </template>
              </el-table-column>
              <el-table-column label="绑定状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.bindStatus">
                <template slot-scope="scope">
                  {{scope.row.bindStatus === 1 ? '已绑定' : '未绑定'}}
                </template>
              </el-table-column>
              <el-table-column label="启用状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.enableStatus">
                <template slot-scope="scope">
                  {{scope.row.enableStatus === 1 ? '启用' : '禁用'}}
                </template>
              </el-table-column>
              <el-table-column label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.onlineStatus">
                <template slot-scope="scope">
                  {{scope.row.onlineStatus === 1 ? '在线' : '离线'}}
                </template>
              </el-table-column>
              <el-table-column label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.powerStatus">
                <template slot-scope="scope">
                  <template v-if='scope.row.onlineStatus'>
                    {{scope.row.powerStatus === 1 ? '开机' : '关机'}}
                  </template>
                  <template v-else>
                    - -
                  </template>
                </template>
              </el-table-column>
              <el-table-column prop="typeId" label="设备类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.typeId">
              </el-table-column>
              <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
              </el-table-column>
              <el-table-column prop="modelId" label="设备型号ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelId">
              </el-table-column>
              <el-table-column label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.birthTime">
                <template slot-scope="scope">
                  {{new Date(scope.row.birthTime).toLocaleString()}}
                </template>
              </el-table-column>
              <el-table-column label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastUpdateTime">
                <template slot-scope="scope">
                  {{new Date(scope.row.lastUpdateTime).toLocaleString()}}
                </template>
              </el-table-column>
              <el-table-column prop="location" label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.location">
              </el-table-column>
              <el-table-column prop="manageName" label="管理名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.manageName">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-alert v-else title="该主设备下没有对应从设备！" type="info" center show-icon :closable="false"></el-alert>
          </template>
        </el-table-column>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="设备ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.id">
        </el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable v-if="deviceColumnVisible.mac">
        </el-table-column>
        <el-table-column prop="customerName" label="归属" show-overflow-tooltip sortable v-if="deviceColumnVisible.customerName">
        </el-table-column>
        <el-table-column prop="type" label="型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.type">
        </el-table-column>
        <el-table-column label="分配状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.assignStatus">
          <template slot-scope="scope">
            {{scope.row.assignStatus === 1 ? '已分配' : '未分配'}}
          </template>
        </el-table-column>
        <el-table-column label="绑定状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.bindStatus">
          <template slot-scope="scope">
            {{scope.row.bindStatus === 1 ? '已绑定' : '未绑定'}}
          </template>
        </el-table-column>
        <el-table-column label="启用状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.enableStatus">
          <template slot-scope="scope">
            {{scope.row.enableStatus === 1 ? '启用' : '禁用'}}
          </template>
        </el-table-column>
        <el-table-column prop="groupName" label="项目名" show-overflow-tooltip sortable v-if="deviceColumnVisible.groupName">
        </el-table-column>
        <el-table-column label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.onlineStatus">
          <template slot-scope="scope">
            {{scope.row.onlineStatus === 1 ? '在线' : '离线'}}
          </template>
        </el-table-column>
        <el-table-column label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.powerStatus">
          <template slot-scope="scope">
            <template v-if='scope.row.onlineStatus'>
              {{scope.row.powerStatus === 1 ? '开机' : '关机'}}
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="typeId" label="设备类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.typeId">
        </el-table-column>
        <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
        </el-table-column>
        <el-table-column label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.birthTime">
          <template slot-scope="scope">
            {{new Date(scope.row.birthTime).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastUpdateTime">
          <template slot-scope="scope">
            {{new Date(scope.row.lastUpdateTime).toLocaleString()}}
          </template>
        </el-table-column>
        <el-table-column prop="location" label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.location">
        </el-table-column>
        <el-table-column prop="manageName" label="管理名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.manageName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
            <el-button v-if='isPro()' type="danger" icon="el-icon-delete" @click="deleteCompletely(scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[50,100,200,300]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <device-import-dialog :visible.sync="deviceImportDialogVisible" @add-data='addData'></device-import-dialog>
    <device-add-dialog @add-data='addData' :visible.sync="deviceAddDialogVisible"></device-add-dialog>
    <device-allocate-dialog @onAllocate='onAllocate' :visible.sync="deviceAllocateDialogVisible" :device-list="selectedDeviceList"></device-allocate-dialog>
    <device-delete-dialog :visible.sync="deviceDeleteDialogVisible" :device-list="selectedDeviceList"></device-delete-dialog>
    <device-recover-dialog :visible.sync="deviceRecoverDialogVisible" :device-list="selectedDeviceList"></device-recover-dialog>
    <device-free-dialog :visible.sync="deviceFreeDialogVisible" :device-list="selectedDeviceList"></device-free-dialog>
    <device-disable-dialog :visible.sync="deviceDisableDialogVisible" :device-list="selectedDeviceList"></device-disable-dialog>
    <device-able-dialog :visible.sync="deviceAbleDialogVisible" :device-list="selectedDeviceList"></device-able-dialog>
    <device-cluster-dialog :visible.sync="deviceClusterDialogVisible" :device-list="selectedDeviceList"></device-cluster-dialog>
    <device-cluster-control-dialog :visible.sync="deviceClusterControlDialogVisible"></device-cluster-control-dialog>
    <device-bind-dialog :visible.sync="deviceBindDialogVisible" :device-list="selectedDeviceList"></device-bind-dialog>
    <device-unbind-dialog :visible.sync="deviceUnbindDialogVisible" :device-list="selectedDeviceList"></device-unbind-dialog>
    <device-detail-dialog :visible.sync="deviceDetailDialogVisible" :detail-data='detailData'></device-detail-dialog>
    <device-export-dialog :visible.sync="deviceExportDialogVisible" :total="total" :query="query" :deviceColumnVisible="deviceColumnVisible"></device-export-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义显示列" :visible.sync="deviceColumnControlDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.name">名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.mac">MAC</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.customerName">归属</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.typeId">类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.bindStatus">绑定状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.enableStatus">启用状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.clusterName">项目名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.powerStatus">工作状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.onlineStatus">在线状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.assignStatus">分配状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.id">设备ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelId">设备型号ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.deviceNo">设备ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelName">设备型号名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.birthTime">注册时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.lastUpdateTime">最后上线时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.location">地理位置</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.manageName">管理名称</el-checkbox>
        </el-form-item>
      </el-form>
      <div>
        <h3>筛选设备</h3>
        <el-form label-width="100px" label-location="left">
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceDeleted' @change="showDeviceDeletedChange">
              <el-radio :label="true">已删除设备</el-radio>
              <el-radio :label="false">正常设备</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceBind' @change="showDeviceBindedChange">
              <el-radio :label="true">已绑定</el-radio>
              <el-radio :label="false">未绑定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceAllocate' @change="showDeviceAllocatedChange">
              <el-radio :label="true">已分配</el-radio>
              <el-radio :label="false">未分配</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceEnable' @change="showDeviceEnabledChange">
              <el-radio :label="true">已启用</el-radio>
              <el-radio :label="false">已禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceOnline' @change="showDeviceOnlineChange">
              <el-radio :label="true">在线</el-radio>
              <el-radio :label="false">离线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width='0'>
            <el-radio-group v-model='showDeviceWork' @change="showDeviceWorkedChange">
              <el-radio :label="true">工作/租赁中</el-radio>
              <el-radio :label="false">关机/空闲</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="deviceColumnControlDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DeviceImportDialog from './components/DeviceImportDialog'
import DeviceAddDialog from './components/DeviceAddDialog'
import DeviceAllocateDialog from './components/DeviceAllocateDialog'
import DeviceDeleteDialog from './components/DeviceDeleteDialog'
import DeviceRecoverDialog from './components/DeviceRecoverDialog'
import DeviceFreeDialog from './components/DeviceFreeDialog'
import DeviceDisableDialog from './components/DeviceDisableDialog'
import DeviceAbleDialog from './components/DeviceAbleDialog'
import DeviceClusterDialog from './components/DeviceClusterDialog'
import DeviceClusterControlDialog from './components/DeviceClusterControlDialog'
import DeviceBindDialog from './components/DeviceBindDialog'
import DeviceUnbindDialog from './components/DeviceUnbindDialog'
import DeviceDetailDialog from './components/DeviceDetailDialog'
import DeviceExportDialog from './components/DeviceExportDialog'
import {
  getList,
  deleteOneDevice,
  queryChildDevice,
  deleteDevice,
  queryDeviceById
} from '@/api/device/list'

export default {
  components: {
    DeviceImportDialog,
    DeviceAddDialog,
    DeviceAllocateDialog,
    DeviceDeleteDialog,
    DeviceRecoverDialog,
    DeviceFreeDialog,
    DeviceDisableDialog,
    DeviceAbleDialog,
    DeviceClusterDialog,
    DeviceClusterControlDialog,
    DeviceBindDialog,
    DeviceUnbindDialog,
    DeviceDetailDialog,
    DeviceExportDialog
  },
  data() {
    return {
      deviceList: [],
      deviceImportDialogVisible: false,
      deviceAddDialogVisible: false,
      deviceAllocateDialogVisible: false,
      deviceDeleteDialogVisible: false,
      deviceRecoverDialogVisible: false,
      deviceFreeDialogVisible: false,
      deviceDisableDialogVisible: false,
      deviceAbleDialogVisible: false,
      deviceClusterDialogVisible: false,
      deviceClusterControlDialogVisible: false,
      deviceBindDialogVisible: false,
      deviceUnbindDialogVisible: false,
      deviceDetailDialogVisible: false,
      deviceExportDialogVisible: false,
      selectedDeviceList: [],
      deviceColumnVisible: {
        name: true,
        mac: true,
        customerName: true,
        deviceType: true,
        assignStatus: true,
        bindStatus: true,
        enableStatus: true,
        groupId: true,
        id: true,
        modelId: true,
        groupName: true,
        powerStatus: true,
        onlineStatus: true,
        typeId: false,
        modelName: false,
        birthTime: false,
        lastUpdateTime: false,
        bindCustomer: false,
        location: false,
        manageName: true
      },
      deviceColumnControlDialogVisible: false,
      query: {
        limit: 10,
        page: 1
      },
      total: 1,
      detailData: {},
      showDeviceDeleted: false,
      showDeviceBind: false,
      showDeviceAllocate: false,
      showDeviceEnable: false,
      showDeviceOnline: false,
      showDeviceWork: false,
      unassignStatus: ''
    }
  },
  computed: {
    computeDeviceList() {
      let list = this.deviceList
      // if (!this.showDeviceAllocate) {
      //   // 如果不显示分配设备，返回状态不等于 1 的
      //   list = list.filter(item => item.assignStatus == 1)
      // }
      return list
    }
  },
  methods: {
    onAllocate(list) {
      const hasInclude = (device, data) => {
        // 当前设备包含在data数据里
        return data.filter(item => item.id === device.id).length !== 0
      }
      // 分配成功，修改列表设备分配状态
      this.deviceList.forEach(device => {
        if (hasInclude(device, list)) {
          device.assignStatus = 1
        }
      })
    },
    expandChanged(data) {
      if (
        data.childCount === 0 ||
        (data.childDeviceList && data.childDeviceList.length > 0)
      ) {
        return
      }
      this.queryChildDevice(data.id, data)
    },
    showDeviceEnabledChange() {
      if (!this.showDeviceEnable) {
        this.query.enableStatus = 0
      } else {
        this.query.enableStatus = 1
      }
      this.getList()
    },
    showDeviceOnlineChange() {
      if (!this.showDeviceOnline) {
        this.query.onlineStatus = 0
      } else {
        this.query.onlineStatus = 1
      }
      this.getList()
    },
    showDeviceWorkedChange() {
      if (!this.showDeviceWork) {
        this.query.powerStatus = 0
      } else {
        this.query.powerStatus = 1
      }
      this.getList()
    },
    queryChildDevice(id, data) {
      queryChildDevice(id).then(res => {
        // 把获取到的从设备数据添加到主设备数据中
        data.childDeviceList = res.data
      })
    },
    showDeviceDeletedChange() {
      if (!this.showDeviceDeleted) {
        this.query.status = 1
      } else {
        this.query.status = 2
      }
      this.getList()
    },
    showDeviceBindedChange() {
      if (!this.showDeviceBind) {
        this.query.bindStatus = 0
      } else {
        this.query.bindStatus = 1
      }
      this.getList()
    },
    showDeviceAllocatedChange() {
      if (!this.showDeviceAllocate) {
        this.query.allocateStatus = 0
      } else {
        this.query.allocateStatus = 1
      }
      this.getList()
    },
    showDetail(data) {
      queryDeviceById(data.id).then(res => {
        this.deviceDetailDialogVisible = true
        this.detailData = res.data
      })
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).hcocloud/)
      if (sld) {
        return sld[1]
      }
      return ''
    },
    isPro() {
      // 是正式环境或者开发环境？
      const sld = this.getSld()
      return sld === 'pro' || sld === '' || sld === 'dev'
    },
    deleteCompletely(data) {
      // 彻底删除设备
      this.$confirm('此操作将永久删除设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteDevice({
            mac: data.mac,
            deviceId: data.id
          }).then(() => {
            this.deviceList = this.deviceList.filter(
              item => item.id !== data.id
            )
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      if (this.selectedDeviceList.length) {
        this.unassignStatus = this.selectedDeviceList[0].assignStatus
      }
    },
    getList(query) {
      // 可以根据参数查询某个 或者 根据分页参数查询多个
      getList(query ? query : this.query).then(res => {
        const data = res.data
        this.deviceList = data.dataList
        this.total = data.totalCount
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.getList()
    },
    addData(data) {
      const list = data.deviceList
      list.forEach(item => {
        item.assignStatus = 0
        item.bindStatus = 0
        item.enableStatus = 0
        item.groupId = -1
        item.powerStatus = 0
        item.groupName = '无项目'
        item.onlineStatus = 0
      })
      this.deviceList.push(...list)
    },
    deleteOneDeviceHandler() {
      this.isOperable().then(_ => {
        this.$confirm('将执行删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const form = this.selectedDeviceList
            deleteOneDevice({
              deviceId: form[0].id,
              mac: form[0].mac
            }).then(() => {
              this.deviceList.forEach(item => {
                // 如果在用户选择的删除列表中
                if (this.selectedDeviceList.some(obj => obj.mac === item.mac)) {
                  item.status = 2
                }
              })
              this.selectedDeviceList = []
              this.$message({
                type: 'success',
                message: `设备删除成功: ${form[0].name}`
              })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    // 恢复
    handleDeviceRecover() {
      this.isOperable().then(_ => {
        this.deviceRecoverDialogVisible = true
      })
    },
    // 分配
    handleDeviceAllocate() {
      this.isOperable().then(_ => {
        this.deviceAllocateDialogVisible = true
      })
    },
    // 召回
    handleDeviceFree() {
      this.isOperable().then(_ => {
        this.deviceFreeDialogVisible = true
      })
    },
    // 禁用
    handleDeviceDisable() {
      this.isOperable().then(_ => {
        this.deviceDisableDialogVisible = true
      })
    },
    // 启用
    handleDeviceAble() {
      this.isOperable().then(_ => {
        this.deviceAbleDialogVisible = true
      })
    },
    // 项目
    handleDeviceCluster() {
      this.isOperable().then(_ => {
        // 判断项目id是否一致，不一致不可项目
        const groupids = this.selectedDeviceList.filter(v => v.groupId !== -1)
        if (
          groupids.length &&
          groupids.some(v => v.groupId !== groupids[0].groupId)
        ) {
          this.$message.warning(
            '请确保所有选中设备的项目名称一致（无项目除外）'
          )
          return
        }
        this.deviceClusterDialogVisible = true
      })
    },
    handleDeviceBind() {
      this.isOperable().then(_ => {
        this.assignStatus().then(_ => {
          this.deviceBindDialogVisible = true
        })
      })
    },
    // 解绑
    handleDeviceUnbind() {
      this.isOperable().then(_ => {
        this.deviceUnbindDialogVisible = true
      })
    },
    isOperable() {
      return new Promise(resolve => {
        if (this.selectedDeviceList.length) {
          resolve()
        } else {
          this.$message.warning('请选择设备后再进行操作')
        }
      })
    },
    assignStatusList() {
      // 如果不包含0，即不包含未分配设备
      return !this.selectedDeviceList.map(item => item.assignStatus).includes(0)
    },
    assignStatus() {
      return new Promise(resolve => {
        if (this.assignStatusList()) {
          resolve()
        } else {
          this.$message.warning('选中的设备中有未分配设备，请重新操作')
        }
      })
    }
  },
  created() {
    const query = this.$route.query
    if (query) {
      this.getList(query)
    } else {
      this.getList()
    }
  }
}
</script>
