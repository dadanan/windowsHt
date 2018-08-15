<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="deviceImportDialogVisible = true">导入</el-button>
          <el-button type="primary" @click="deviceAddDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="deviceAllocateDialogVisible = true">分配</el-button>
          <el-button type="primary" @click="deviceFreeDialogVisible = true">召回</el-button>
          <el-button type="primary" @click="deviceDeleteDialogVisible = true">删除</el-button>
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
      <el-table
        :data="deviceList"
        style="width: 100%" @selection-change="handleSelectionChange" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="名称" show-overflow-tooltip sortable v-if="deviceColumnVisible.name">
        </el-table-column>
        <el-table-column
          prop="mac"
          label="MAC" show-overflow-tooltip sortable v-if="deviceColumnVisible.mac">
        </el-table-column>
        <el-table-column
          prop="owner"
          label="归属" show-overflow-tooltip sortable v-if="deviceColumnVisible.owner">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型" show-overflow-tooltip sortable v-if="deviceColumnVisible.type">
        </el-table-column>
        <el-table-column
          prop="isBound"
          label="绑定状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.isBound">
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          label="启用状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.isEnabled">
        </el-table-column>
        <el-table-column
          prop="clusterID"
          label="集群 ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.clusterID">
        </el-table-column>
        <el-table-column
          prop="clusterName"
          label="集群名" show-overflow-tooltip sortable v-if="deviceColumnVisible.clusterName">
        </el-table-column>
        <el-table-column
          prop="isBoot"
          label="工作状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.isBoot">
        </el-table-column>
        <el-table-column
          prop="isOnline"
          label="在线状态" show-overflow-tooltip sortable v-if="deviceColumnVisible.isOnline">
        </el-table-column>
        <el-table-column
          prop="deviceID"
          label="设备 ID" show-overflow-tooltip sortable v-if="deviceColumnVisible.deviceID">
        </el-table-column>
        <el-table-column
          prop="deviceModel"
          label="设备型号" show-overflow-tooltip sortable v-if="deviceColumnVisible.deviceModel">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="对应名" show-overflow-tooltip sortable v-if="deviceColumnVisible.deviceName">
        </el-table-column>
        <el-table-column
          prop="regDatetime"
          label="注册时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.regDatetime">
        </el-table-column>
        <el-table-column
          prop="lastOnlineDatetime"
          label="最后上线时间" show-overflow-tooltip sortable v-if="deviceColumnVisible.lastOnlineDatetime">
        </el-table-column>
        <el-table-column
          prop="bindUser"
          label="绑定人" show-overflow-tooltip sortable v-if="deviceColumnVisible.bindUser">
        </el-table-column>
        <el-table-column
          prop="position"
          label="地理位置" show-overflow-tooltip sortable v-if="deviceColumnVisible.position">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deviceDetailDialogVisible = true">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
    <device-import-dialog :visible.sync="deviceImportDialogVisible"></device-import-dialog>
    <device-add-dialog :visible.sync="deviceAddDialogVisible"></device-add-dialog>
    <device-allocate-dialog :visible.sync="deviceAllocateDialogVisible"
                            :device-list="selectedDeviceList"></device-allocate-dialog>
    <device-delete-dialog :visible.sync="deviceDeleteDialogVisible"
                          :device-list="selectedDeviceList"></device-delete-dialog>
    <device-free-dialog :visible.sync="deviceFreeDialogVisible" :device-list="selectedDeviceList"></device-free-dialog>
    <device-disable-dialog :visible.sync="deviceDisableDialogVisible"
                           :device-list="selectedDeviceList"></device-disable-dialog>
    <device-cluster-dialog :visible.sync="deviceClusterDialogVisible"
                           :device-list="selectedDeviceList"></device-cluster-dialog>
    <device-cluster-control-dialog :visible.sync="deviceClusterControlDialogVisible"></device-cluster-control-dialog>
    <device-bind-dialog :visible.sync="deviceBindDialogVisible" :device-list="selectedDeviceList"></device-bind-dialog>
    <device-unbind-dialog :visible.sync="deviceUnbindDialogVisible"
                          :device-list="selectedDeviceList"></device-unbind-dialog>
    <device-detail-dialog :visible.sync="deviceDetailDialogVisible"></device-detail-dialog>
    <el-dialog title="自定义显示列" :visible.sync="deviceColumnControlDialogVisible">
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
          <el-checkbox v-model="deviceColumnVisible.isBound">绑定状态</el-checkbox>
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
          <el-checkbox v-model="deviceColumnVisible.deviceID">设备 ID</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.deviceModel">设备型号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.deviceName">对应名</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.regDatetime">注册时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.lastOnlineDatetime">最后上线时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.bindUser">绑定人</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="deviceColumnVisible.position">地理位置</el-checkbox>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" label-position="left">
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
      const deviceList = []

      for (let i = 0; i < 15; i++) {
        deviceList.push({
          name: '测试设备',
          mac: '25-14-B1-75-49-EB',
          owner: '测试用户',
          type: '测试类型',
          isBound: '绑定',
          isEnabled: '禁用',
          clusterID: '2564',
          clusterName: '测试集群',
          isBoot: '关机',
          isOnline: '离线',
          // 以下非默认显示
          deviceID: '',
          deviceModel: '',
          deviceName: '',
          regDatetime: '',
          lastOnlineDatetime: '',
          bindUser: '',
          position: ''
        })
      }
      return {
        deviceList,
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
          type: true,
          isBound: true,
          isEnabled: true,
          clusterID: true,
          clusterName: true,
          isBoot: true,
          isOnline: true,
          deviceID: false,
          deviceModel: false,
          deviceName: false,
          regDatetime: false,
          lastOnlineDatetime: false,
          bindUser: false,
          position: false
        },
        deviceColumnControlDialogVisible: false
      }
    },
    methods: {
      handleSelectionChange(selection) {
        this.selectedDeviceList = selection
      }
    }
  }
</script>
