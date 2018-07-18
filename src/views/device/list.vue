<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="importDeviceDialogVisible = true">导入</el-button>
          <el-button type="primary" @click="addDeviceDialogVisible = true">添加</el-button>
          <el-button type="primary" @click="allocateDeviceDialogVisible = true">分配</el-button>
          <el-button type="primary" @click="freeDeviceDialogVisible = true">召回</el-button>
          <el-button type="primary" @click="deleteDeviceDialogVisible = true">删除</el-button>
          <el-button type="primary">恢复</el-button>
          <el-button type="primary" @click="disableDeviceDialogVisible = true">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">集群</el-button>
          <el-button type="primary">群控</el-button>
          <el-button type="primary">绑定</el-button>
          <el-button type="primary">解绑</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="deviceList"
        style="width: 100%" @selection-change="handleSelectionChange" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="mac"
          label="MAC" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="owner"
          label="归属" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="isBound"
          label="绑定状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="isEnabled"
          label="启用状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="clusterID"
          label="集群 ID" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="clusterName"
          label="集群名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="isBoot"
          label="工作状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="isOnline"
          label="在线状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
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
    <import-device-dialog :visible.sync="importDeviceDialogVisible"></import-device-dialog>
    <add-device-dialog :visible.sync="addDeviceDialogVisible"></add-device-dialog>
    <allocate-device-dialog :visible.sync="allocateDeviceDialogVisible" :allocate-list="selectedDeviceList"></allocate-device-dialog>
    <delete-device-dialog :visible.sync="deleteDeviceDialogVisible" :delete-list="selectedDeviceList"></delete-device-dialog>
    <free-device-dialog :visible.sync="freeDeviceDialogVisible" :free-list="selectedDeviceList"></free-device-dialog>
    <disable-device-dialog :visible.sync="disableDeviceDialogVisible" :disable-list="selectedDeviceList"></disable-device-dialog>
  </div>
</template>

<script>
  import ImportDeviceDialog from './components/import-device-dialog'
  import AddDeviceDialog from './components/add-device-dialog'
  import AllocateDeviceDialog from './components/allocate-device-dialog'
  import DeleteDeviceDialog from './components/delete-device-dialog'
  import FreeDeviceDialog from './components/free-device-dialog'
  import DisableDeviceDialog from './components/disable-device-dialog'

  export default {
    components: {
      ImportDeviceDialog,
      AddDeviceDialog,
      AllocateDeviceDialog,
      DeleteDeviceDialog,
      FreeDeviceDialog,
      DisableDeviceDialog
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
        importDeviceDialogVisible: false,
        addDeviceDialogVisible: false,
        allocateDeviceDialogVisible: false,
        deleteDeviceDialogVisible: false,
        freeDeviceDialogVisible: false,
        disableDeviceDialogVisible: false,
        selectedDeviceList: []
      }
    },
    methods: {
      handleSelectionChange(selection) {
        this.selectedDeviceList = selection
      }
    }
  }
</script>
