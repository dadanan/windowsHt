<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="类型">
              <el-option label="充值单号" value="1"></el-option>
              <el-option label="用户昵称" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="关键词"></el-input>
          </el-form-item>
          <div style="flex: 1;"></div>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="paymentListColumnDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="paymentList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="id"
          label="充值单号" show-overflow-tooltip sortable v-if="paymentListColumnVisible.id">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称" show-overflow-tooltip sortable v-if="paymentListColumnVisible.nickname">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="充值金额" show-overflow-tooltip sortable v-if="paymentListColumnVisible.cost">
        </el-table-column>
        <el-table-column
          prop="datetime"
          label="充值时间" show-overflow-tooltip sortable v-if="paymentListColumnVisible.datetime">
        </el-table-column>
        <el-table-column
          prop="type"
          label="充值方式" show-overflow-tooltip sortable v-if="paymentListColumnVisible.type">
        </el-table-column>
        <el-table-column
          prop="state"
          label="充值状态" show-overflow-tooltip sortable v-if="paymentListColumnVisible.state">
        </el-table-column>
        <el-table-column
          label="操作">
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
    <el-dialog title="自定义显示列" :visible.sync="paymentListColumnDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.id">充值单号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.nickname">用户昵称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.cost">充值金额</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.datetime">充值时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.type">充值方式</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="paymentListColumnVisible.state">充值状态</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="paymentListColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="paymentListColumnDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      const paymentList = []
      for (let i = 0; i < 15; i++) {
        paymentList.push({
          id: '1015317745706317400',
          nickname: '测试用户',
          cost: '￥0.01',
          datetime: '2018-07-17 04:56:21',
          type: '微信公众号',
          state: '使用中'
        })
      }
      return {
        paymentList,
        paymentListColumnVisible: {
          id: true,
          nickname: true,
          cost: true,
          datetime: true,
          type: true,
          state: true
        },
        paymentListColumnDialogVisible: false
      }
    }
  }
</script>
