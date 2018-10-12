<template>
  <div>
    <el-button-group>
      <el-button type="primary">集群</el-button>
      <el-button type="primary">群控</el-button>
      <el-button type="primary">分享</el-button>
      <el-button type="primary">授权管理</el-button>
    </el-button-group>
    <el-table :data="abilitysList" style="width: 100%" class="mb20" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="从设备名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="childId" label="从设备ID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="type" label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column label="绑定状态" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          {{scope.row.bindStatus === 1 ? '已绑定' : '未绑定'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { abilitysList, formatItemsList } from './test.js'

export default {
  data() {
    return {
      abilitysList
    }
  },
  created() {
    console.log(abilitysList, formatItemsList)
  }
}
</script>
