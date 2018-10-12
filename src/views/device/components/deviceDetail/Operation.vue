<template>
  <div>
    <el-button-group>
      <el-button type="primary">集群</el-button>
      <el-button type="primary">群控</el-button>
      <el-button type="primary">分享</el-button>
      <el-button type="primary">授权管理</el-button>
    </el-button-group>
    <el-table :data="scope.row.childDeviceList" style="width: 100%" class="mb20" border>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { abilitysList, formatItemsList } from './test.js'

export default {
  created() {
    console.log(abilitysList, formatItemsList)
  }
}
</script>
