<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary">创建</el-button>
          <el-button type="primary">挂起</el-button>
          <el-button type="primary">删除</el-button>
          <el-button type="primary">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%" class="mb20">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
      const tableData = []
      for (let i = 0; i < 15; i++) {
        tableData.push({
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
      return {
        tableData
      }
    }
  }
</script>
