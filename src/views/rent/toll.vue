<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addToll = true">添加</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-toll :visible.sync="addToll" ></add-toll>
      <edit-toll :visible.sync="editToll" ></edit-toll>
      <deta-toll :visible.sync="detaToll" ></deta-toll>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="mac" label="工程资料分类名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="sn" label="工程资料分类描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="创建时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="pos" label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editToll = true">修改</el-button>
            <el-button type="text" @click="detaToll = true">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddToll from './components/AddToll'
import EditToll from './components/EditToll'
import DetaToll from './components/DetaToll'

export default {
  components: {
    AddToll,
    EditToll,
    DetaToll
  },
  data() {
    const alarmList = []

    for (let i = 0; i < 15; i++) {
      alarmList.push({
        mac: '勘察资料',
        sn: '勘察资料',
        name: '2018-10-21',
        pos: 'wkk',
        tel: '13166666007',
        createDatetime: '2018-03-28 01:24:29',
        state: '启用'
      })
    }
    return {
      alarmList,
      addToll:false,
      editToll:false,
      detaToll:false
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
