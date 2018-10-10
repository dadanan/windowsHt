<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="deviceImportDialogVisible = true">导入</el-button>
          <el-button type="primary" @click="deviceAddDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="deleteOneDeviceHandler">删除</el-button>
          <el-button type="primary" @click='handleDeviceRecover'>恢复</el-button>
          <el-button type="primary" @click="handleDeviceAllocate">分配</el-button>
          <el-button type="primary" @click="handleDeviceFree">召回</el-button>
          <el-button type="primary" @click="handleDeviceDisable">禁用</el-button>
          <el-button type="primary" @click="handleDeviceAble">启用</el-button>
          <el-button type="primary" @click="handleDeviceCluster">集群</el-button>
          <!-- <el-button type="primary" @click="deviceClusterControlDialogVisible = true">群控</el-button> -->
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
              <el-table-column label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.workStatus">
                <template slot-scope="scope">
                  {{scope.row.workStatus === 1 ? '开机/租赁中' : '关机/空闲'}}
                </template>
              </el-table-column>
              <el-table-column label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.onlineStatus">
                <template slot-scope="scope">
                  {{scope.row.onlineStatus === 1 ? '在线' : '离线'}}
                </template>
              </el-table-column>
              <el-table-column label="分配状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.assignStatus">
                <template slot-scope="scope">
                  {{scope.row.assignStatus === 1 ? '分配' : '非分配'}}
                </template>
              </el-table-column>
              <el-table-column prop="typeId" label="设备类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.typeId">
              </el-table-column>
              <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
              </el-table-column>
              <el-table-column prop="createTime" label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.createTime">
              </el-table-column>
              <el-table-column prop="lastUpdateTime" label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastUpdateTime">
              </el-table-column>
              <el-table-column prop="location" label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.location">
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
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable v-if="deviceColumnVisible.mac">
        </el-table-column>
        <el-table-column prop="customerName" label="归属" show-overflow-tooltip sortable v-if="deviceColumnVisible.customerName">
        </el-table-column>
        <el-table-column prop="type" label="型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.type">
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
        <el-table-column prop="groupName" label="集群名" show-overflow-tooltip sortable v-if="deviceColumnVisible.groupName">
        </el-table-column>
        <el-table-column label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.workStatus">
          <template slot-scope="scope">
            {{scope.row.workStatus === 1 ? '开机/租赁中' : '关机/空闲'}}
          </template>
        </el-table-column>
        <el-table-column label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.onlineStatus">
          <template slot-scope="scope">
            {{scope.row.onlineStatus === 1 ? '在线' : '离线'}}
          </template>
        </el-table-column>
         <el-table-column label="分配状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.assignStatus">
          <template slot-scope="scope">
            {{scope.row.assignStatus === 1 ? '分配' : '非分配'}}
          </template>
        </el-table-column>
        <el-table-column prop="typeId" label="设备类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.typeId">
        </el-table-column>
        <el-table-column prop="modelId" label="设备型号ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelId">
        </el-table-column>
        <el-table-column prop="modelName" label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.createTime">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastUpdateTime">
        </el-table-column>
        <el-table-column prop="location" label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.location">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
     <el-pagination :current-page="query.page" :page-sizes="[10,20,30,40]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
    <device-import-dialog :visible.sync="deviceImportDialogVisible" @add-data='addData'></device-import-dialog>
    <device-add-dialog @add-data='addData' :visible.sync="deviceAddDialogVisible"></device-add-dialog>
    <device-allocate-dialog :visible.sync="deviceAllocateDialogVisible" :device-list="selectedDeviceList"></device-allocate-dialog>
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
          <el-checkbox v-model="deviceColumnVisible.clusterName">集群名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.workStatus">工作状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.onlineStatus">在线状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.assignStatus">分配状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelId">设备型号ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelName">设备型号名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.createTime">注册时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.lastUpdateTime">最后上线时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.location">地理位置</el-checkbox>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" label-location="left">
        <el-form-item label="已删除设备">
          <el-radio-group v-model='showDeviceDeleted' @change="showDeviceDeletedChange">
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已召回设备">
          <el-radio-group v-model='showDeviceCallBack'>
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已解绑设备">
          <el-radio-group v-model='showDeviceBind'>
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="未分配设备">
          <el-radio-group v-model='showDeviceAllocate'>
            <el-radio :label="true">显示</el-radio>
            <el-radio :label="false">不显示</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="deviceColumnControlDialogVisible = false">取消</el-button>
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
  queryCount
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
        bindStatus: true,
        enableStatus: true,
        groupId: true,
        groupName: true,
        workStatus: true,
        onlineStatus: true,
        typeId: false,
        modelId: false,
        modelName: false,
        createTime: false,
        lastUpdateTime: false,
        bindCustomer: false,
        location: false,
        assignStatus: true
      },
      deviceColumnControlDialogVisible: false,
      query: {
        limit: 10,
        page: 1,
        status: 1,
      },
      total: 1,
      detailData: {},
      showDeviceDeleted: false,
      showDeviceCallBack: false,
      showDeviceBind: false,
      showDeviceAllocate: false,
      unassignStatus: ''
    }
  },
  computed: {
    computeDeviceList() {
      let list = this.deviceList
      if (!this.showDeviceAllocate) {
        // 如果不显示分配设备，返回状态不等于 1 的
        list = list.filter(item => item.assignStatus !== 1)
      }
      return list
    }
  },
  methods: {
    expandChanged(data) {
      if (
        data.childCount === 0 ||
        (data.childDeviceList && data.childDeviceList.length > 0)
      ) {
        return
      }
      console.log(data.id)
      this.queryChildDevice(data.id, data)
    },
    queryChildDevice(id, data) {
      queryChildDevice(id).then(res => {
        // 把获取到的从设备数据添加到主设备数据中
        data.childDeviceList = res.data
      })
    },
    showDeviceDeletedChange(data){
      if (!this.showDeviceDeleted) {
        this.query.status = 1
      }else{
        this.query.status = 2
      }
      this.getList()
      this.queryCount()
    },
    showDetail(data) {
      this.deviceDetailDialogVisible = true
      this.detailData = data
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      if (this.selectedDeviceList.length) {
        this.unassignStatus = this.selectedDeviceList[0].assignStatus
      }
    },
    getList() {
      getList(this.query)
        .then( res => {
          this.deviceList = res.data
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    queryCount() {
      queryCount(this.query.status).then(res => {
        this.total = res.data
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
        item.bindStatus = 0
        item.enableStatus = 0
        item.groupId = -1
        item.workStatus = 0
        item.groupName = '无集群'
        item.onlineStatus = 0
      })
      this.deviceList.unshift(...list)
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
            })
              .then(res => {
                this.deviceList.forEach(item => {
                  // 如果在用户选择的删除列表中
                  if (
                    this.selectedDeviceList.some(obj => obj.mac === item.mac)
                  ) {
                    item.status = 2
                  }
                })
                this.selectedDeviceList = []
                this.$message({
                  type: 'success',
                  message: `设备删除成功: ${form[0].name}`
                })
              })
              .catch(err => {
                console.log(err)
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
    // 集群
    handleDeviceCluster() {
      this.isOperable().then(_ => {
        // 判断集群id是否一致，不一致不可集群
        const groupids = this.selectedDeviceList.filter(v => v.groupId !== -1)
        if (
          groupids.length &&
          groupids.some(v => v.groupId !== groupids[0].groupId)
        ) {
          this.$message.warning(
            '请确保所有选中设备的集群名称一致（无集群除外）'
          )
          return
        }
        this.deviceClusterDialogVisible = true
      })
    },
    // 绑定
    // handleDeviceBind() {
    //   this.isOperable().then(_ => {
    //     this.deviceBindDialogVisible = true
    //   })
    // },
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
    assignStatusList(){
      if (this.selectedDeviceList.length) {
        const ass = []
        for(let i = 0;i<this.selectedDeviceList.length;i++){
          ass.push(this.selectedDeviceList[i].assignStatus)
        }
        if(ass.indexOf("0")){
          return true
        }else{
          return false
        }
      }
    },
    assignStatus() {
      return new Promise(resolve => {
       if(!this.assignStatusList()){
          resolve()
        } else {
          this.$message.warning('选中的设备中有未分配设备，请重新操作')
        }
      })
    }
  },
  created() {
    this.getList()
    this.queryCount()
  }
}
</script>
