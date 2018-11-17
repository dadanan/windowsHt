<template>
  <div class="dashboard-container">
    <el-card>
      <el-table :data="messageList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userName" label="用户名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="location" label="设备区域" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="feedbackInfo" label="反馈内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createTime" label="反馈时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.createTime'>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
            <template v-else>
              - -
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">详情</el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard'
import { selectUserFeedbackInfo } from '@/api/message'
export default {
  components: {
    DataCard
  },
  data() {
    return {
      messageList: [],
      activeTab: '1',
      query: {
        limit: 100,
        page: 1
      },
      total: 0
    }
  },
  methods: {
    selectUserFeedbackInfo(query) {
      selectUserFeedbackInfo(this.query).then(res => {
        this.total = res.data.count
        this.messageList = res.data.data
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectUserFeedbackInfo()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectUserFeedbackInfo()
    }
  },
  created() {
    this.selectUserFeedbackInfo()
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 230px;
  width: 100%;
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    padding-top: 20px;
    font-size: 50px;
  }
}
</style>
