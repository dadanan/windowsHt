<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="deviceImportDialogVisible = true">导入</el-button>
          <el-button type="primary" @click="deviceAddDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="deleteDeviceHandler">删除</el-button>
          <el-button type="primary" @click="deviceAllocateDialogVisible = true">分配</el-button>
          <el-button type="primary" @click="deviceFreeDialogVisible = true">召回</el-button>
          <el-button type="primary">恢复</el-button>
          <el-button type="primary" @click="deviceDisableDialogVisible = true">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary" @click="deviceClusterDialogVisible = true">集群</el-button>
          <el-button type="primary" @click="deviceClusterControlDialogVisible = true">群控</el-button>
          <el-button type="primary" @click="deviceBindDialogVisible = true">绑定</el-button>
          <el-button type="primary" @click="deviceUnbindDialogVisible = true">解绑</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="deviceColumnControlDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table :data="deviceList" style="width: 100%" @selection-change="handleSelectionChange" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable v-if="deviceColumnVisible.mac">
        </el-table-column>
        <el-table-column prop="owner" label="归属" show-overflow-tooltip sortable v-if="deviceColumnVisible.owner">
        </el-table-column>
        <el-table-column prop="type" label="型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.type">
        </el-table-column>
        <el-table-column prop="bindStatus" label="绑定状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.bindStatus">
        </el-table-column>
        <el-table-column prop="enableStatus" label="启用状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.enableStatus">
        </el-table-column>
        <el-table-column prop="groupId" label="集群 ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.groupId">
        </el-table-column>
        <el-table-column prop="groupName" label="集群名" show-overflow-tooltip sortable v-if="deviceColumnVisible.groupName">
        </el-table-column>
        <el-table-column prop="workStatus" label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.workStatus">
        </el-table-column>
        <el-table-column prop="onlineStatus" label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.onlineStatus">
        </el-table-column>
        <el-table-column prop="deviceId" label="设备类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.deviceId">
        </el-table-column>
        <el-table-column prop="modelId" label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelId">
        </el-table-column>
        <el-table-column prop="modelName" label="对应名" show-overflow-tooltip sortable v-if="deviceColumnVisible.modelName">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.createTime">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastUpdateTime">
        </el-table-column>
        <el-table-column prop="bindCustomer" label="绑定人" show-overflow-tooltip sortable v-if="deviceColumnVisible.bindCustomer">
        </el-table-column>
        <el-table-column prop="location" label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.location">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deviceDetailDialogVisible = true">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>
    <device-import-dialog :visible.sync="deviceImportDialogVisible"></device-import-dialog>
    <device-add-dialog @add-data='addData' :visible.sync="deviceAddDialogVisible"></device-add-dialog>
    <device-allocate-dialog :visible.sync="deviceAllocateDialogVisible" :device-list="deviceList"></device-allocate-dialog>
    <device-delete-dialog :visible.sync="deviceDeleteDialogVisible" :device-list="selectedDeviceList"></device-delete-dialog>
    <device-free-dialog :visible.sync="deviceFreeDialogVisible" :device-list="selectedDeviceList"></device-free-dialog>
    <device-disable-dialog :visible.sync="deviceDisableDialogVisible" :device-list="selectedDeviceList"></device-disable-dialog>
    <device-cluster-dialog :visible.sync="deviceClusterDialogVisible" :device-list="selectedDeviceList"></device-cluster-dialog>
    <device-cluster-control-dialog :visible.sync="deviceClusterControlDialogVisible"></device-cluster-control-dialog>
    <device-bind-dialog :visible.sync="deviceBindDialogVisible" :device-list="selectedDeviceList"></device-bind-dialog>
    <device-unbind-dialog :visible.sync="deviceUnbindDialogVisible" :device-list="selectedDeviceList"></device-unbind-dialog>
    <device-detail-dialog :visible.sync="deviceDetailDialogVisible"></device-detail-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false  title="自定义显示列" :visible.sync="deviceColumnControlDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.name">名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.mac">MAC</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.owner">归属</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.type">类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.bindStatus">绑定状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.isEnabled">启用状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.clusterID">集群 ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.clusterName">集群名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.isBoot">工作状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.isOnline">在线状态</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.deviceId">设备 ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelId">设备型号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.modelName">对应名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.createTime">注册时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.lastUpdateTime">最后上线时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.bindCustomer">绑定人</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.location">地理位置</el-checkbox>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" label-location="left">
        <el-form-item label="已删除设备">
          <el-radio-group>
            <el-radio label="显示"></el-radio>
            <el-radio label="不显示"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已召回设备">
          <el-radio-group>
            <el-radio label="显示"></el-radio>
            <el-radio label="不显示"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已解绑设备">
          <el-radio-group>
            <el-radio label="显示"></el-radio>
            <el-radio label="不显示"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="未分配设备">
          <el-radio-group>
            <el-radio label="显示"></el-radio>
            <el-radio label="不显示"></el-radio>
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
import DeviceFreeDialog from './components/DeviceFreeDialog'
import DeviceDisableDialog from './components/DeviceDisableDialog'
import DeviceClusterDialog from './components/DeviceClusterDialog'
import DeviceClusterControlDialog from './components/DeviceClusterControlDialog'
import DeviceBindDialog from './components/DeviceBindDialog'
import DeviceUnbindDialog from './components/DeviceUnbindDialog'
import DeviceDetailDialog from './components/DeviceDetailDialog'
import { getList, deleteDevice } from '@/api/device/list'

export default {
  components: {
    DeviceImportDialog,
    DeviceAddDialog,
    DeviceAllocateDialog,
    DeviceDeleteDialog,
    DeviceFreeDialog,
    DeviceDisableDialog,
    DeviceClusterDialog,
    DeviceClusterControlDialog,
    DeviceBindDialog,
    DeviceUnbindDialog,
    DeviceDetailDialog
  },
  data() {
    return {
      deviceList: [],
      deviceImportDialogVisible: false,
      deviceAddDialogVisible: false,
      deviceAllocateDialogVisible: false,
      deviceDeleteDialogVisible: false,
      deviceFreeDialogVisible: false,
      deviceDisableDialogVisible: false,
      deviceClusterDialogVisible: false,
      deviceClusterControlDialogVisible: false,
      deviceBindDialogVisible: false,
      deviceUnbindDialogVisible: false,
      deviceDetailDialogVisible: false,
      selectedDeviceList: [],
      deviceColumnVisible: {
        name: true,
        mac: true,
        owner: true,
        deviceType: true,
        bindStatus: true,
        enableStatus: true,
        groupId: true,
        groupName: true,
        workStatus: true,
        onlineStatus: true,
        deviceId: false,
        modelId: false,
        modelName: false,
        createTime: false,
        lastUpdateTime: false,
        bindCustomer: false,
        location: false
      },
      deviceColumnControlDialogVisible: false,
      query: {
        limit: 30,
        page: 1
      }
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    getList() {
      getList(this.query)
        .then(res => {
          this.deviceList = res.data
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    addData(data) {
      this.deviceList.unshift(data)
    },
    deleteDeviceHandler() {
      const form = this.selectedDeviceList
      deleteDevice({
        deviceList: form
      })
        .then(res => {
          console.log('res', res)
          this.selectedDeviceList = []
          console.log(this.selectedDeviceList)
          this.deviceList = this.deviceList.filter(
            item => !this.selectedDeviceList.some(obj => obj.mac === item.mac)
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getList()
  }
}
</script>
