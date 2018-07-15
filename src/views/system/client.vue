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
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="名称" fixed>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="wx"
          label="公众号">
        </el-table-column>
        <el-table-column
          prop="deviceTypeList"
          label="产品类别">
        </el-table-column>
        <el-table-column
          prop="groupList"
          label="组信息">
        </el-table-column>
        <el-table-column
          prop="administrator"
          label="管理员">
        </el-table-column>
        <el-table-column
          prop="intro"
          label="备注说明">
        </el-table-column>
        <el-table-column
          prop="deviceTotal"
          label="设备总数">
        </el-table-column>
        <el-table-column
          prop="orderTotal"
          label="订单总数">
        </el-table-column>
        <el-table-column
          prop="isDashboardEnabled"
          label="是否开放后台">
        </el-table-column>
        <el-table-column
          prop="isAndroidEnabled"
          label="是否开发安卓">
        </el-table-column>
        <el-table-column
          prop="use"
          label="业务方向">
        </el-table-column>
        <el-table-column
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text">详情</el-button>
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
      const tableData = []
      for (let i = 0; i < 15; i++) {
        tableData.push({
          name: '测试客户',
          type: '厂家',
          wx: '上海市普陀区金沙江路 1518 弄',
          deviceTypeList: '测试类型 1, 测试类型 2, 测试类型 3',
          groupList: '测试组 1, 测试组 2',
          administrator: 'admin',
          intro: '这是一个测试客户, 毫无用途',
          deviceTotal: 0,
          orderTotal: 0,
          isDashboardEnabled: '否',
          isAndroidEnabled: '否',
          use: '未知'
        })
      }
      return {
        tableData
      }
    }
  }
</script>
