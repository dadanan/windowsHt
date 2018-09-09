<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="设备绑定" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" highlight-current-row border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="typeId" label="typeId" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mb20">
          <el-form class="mb-22" label-width="100px" label-position="left">
            <!-- <el-form-item label="用户">
              <el-select v-model="userId" style="width: 100%">
                <el-option label="测试客户 1" value="1"></el-option>
                <el-option label="测试客户 2" value="2"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="Open ID">
              <!-- <el-select v-model="openId" placeholder="请选择">
                <el-option v-for="item in customerList" :key="item.id" :label="item.name" :value="item.appid">
                </el-option>
              </el-select> -->
              <el-input v-model='openId' placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户绑定组">
              <el-select v-model="teamId" style="width: 100%">
                <el-option v-for='item in teamList' :key='item.id' :label="item.name" :value="item.id"></el-option>
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
          <el-table :data="deviceList" style="width: 100%" highlight-current-row border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="typeId" label="typeId" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="bindDeviceToUserPart">绑定选中项</el-button>
      <el-button type="primary" @click="bindDeviceToUserAll">绑定全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { bindDeviceToUser } from '@/api/device/list'
import { queryUsers } from '@/api/device/list'
import { queryTeamList } from '@/api/device/team'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deviceList: {
      type: Array
    }
  },
  data() {
    return {
      openId: '',
      teamId: 1,
      userId: 1,
      selectedDeviceList: [],
      customerList: [],
      query: {
        limit: 100,
        page: 1
      },
      teamList: []
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    bindDeviceToUserPart() {
      bindDeviceToUser({
        deviceQueryRequest: {
          deviceList: this.selectedDeviceList
        },
        openId: this.openId,
        teamId: this.teamId,
        userId: this.userId
      }).then(() => {
        this.$message({
          message: '绑定成功！',
          type: 'success'
        })
        this.$emit('update:visible', false)
      })
    },
    bindDeviceToUserAll() {
      bindDeviceToUser({
        deviceQueryRequest: {
          deviceList: this.deviceList
        },
        openId: this.openId,
        teamId: this.teamId,
        userId: this.userId
      }).then(() => {
        this.$message({
          message: '绑定成功！',
          type: 'success'
        })
        this.$emit('update:visible', false)
      })
    },
    getCustomerList() {
      const user = this.$store.getters.user.user
      queryUsers({
        customerId: user.id
      }).then(res => {
        this.customerList = res.data
      })
    },
    queryTeamList() {
      queryTeamList(this.query).then(res => {
        this.teamList = res.data
      })
    }
  },
  created() {
    // this.getCustomerList()
    this.queryTeamList()
  }
}
</script>
