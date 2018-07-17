<template>
  <div class="dashboard-container">
    <el-card>
      <el-table
        :data="levelList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="标示名" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="nameText"
          label="显示名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="type"
          label="读写类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="dataType"
          label="数据类型" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-select v-model="scope.row.level">
              <el-option label="级别 1" value="1"></el-option>
              <el-option label="级别 2" value="2"></el-option>
              <el-option label="级别 3" value="3"></el-option>
            </el-select>
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
  </div>
</template>

<script>
  export default {
    data() {
      const levelList = []

      for (let i = 0; i < 15; i++) {
        levelList.push({
          name: 'PmLose',
          nameText: 'PM 2.5 报数丢失',
          type: '报警',
          dataType: 'bool',
          description: '滤网到期提醒',
          level: '1'
        })
      }
      return {
        levelList
      }
    }
  }
</script>
