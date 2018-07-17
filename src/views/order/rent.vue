<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="类型">
              <el-option label="订单号" value="1"></el-option>
              <el-option label="用户昵称" value="2"></el-option>
              <el-option label="设备 MAC" value="3"></el-option>
              <el-option label="投放点" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="范围">
              <el-option label="今天" value="1"></el-option>
              <el-option label="七天" value="2"></el-option>
              <el-option label="30天" value="3"></el-option>
              <el-option label="全部" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态">
              <el-option label="全部" value="1"></el-option>
              <el-option label="租凭中" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
            </el-select>
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
          <el-button type="primary" @click="orderListColumnDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="orderList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="id"
          label="订单号" show-overflow-tooltip sortable v-if="orderListColumnVisible.id">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称" show-overflow-tooltip sortable v-if="orderListColumnVisible.nickname">
        </el-table-column>
        <el-table-column
          prop="pos"
          label="投放点" show-overflow-tooltip sortable v-if="orderListColumnVisible.pos">
        </el-table-column>
        <el-table-column
          prop="deviceMAC"
          label="设备MAC" show-overflow-tooltip sortable v-if="orderListColumnVisible.deviceMAC">
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称" show-overflow-tooltip sortable v-if="orderListColumnVisible.deviceName">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="支付费用" show-overflow-tooltip sortable v-if="orderListColumnVisible.cost">
        </el-table-column>
        <el-table-column
          prop="paymentDatetime"
          label="支付时间" show-overflow-tooltip sortable v-if="orderListColumnVisible.paymentDatetime">
        </el-table-column>
        <el-table-column
          prop="paymentType"
          label="支付类型" show-overflow-tooltip sortable v-if="orderListColumnVisible.paymentType">
        </el-table-column>
        <el-table-column
          prop="paymentName"
          label="收费名称" show-overflow-tooltip sortable v-if="orderListColumnVisible.paymentName">
        </el-table-column>
        <el-table-column
          prop="state"
          label="订单状态" show-overflow-tooltip sortable v-if="orderListColumnVisible.state">
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
    <el-dialog title="自定义显示列" :visible.sync="orderListColumnDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.id">订单号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.nickname">用户昵称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.pos">投放点</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.deviceMAC">设备MAC</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.deviceName">设备名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.cost">支付费用</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.paymentDatetime">支付时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.paymentType">支付类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.paymentName">收费名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="orderListColumnVisible.state">订单状态</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="orderListColumnDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderListColumnDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      const orderList = []
      for (let i = 0; i < 15; i++) {
        orderList.push({
          id: '1015317745706317400',
          nickname: '测试用户',
          pos: '测试投放点',
          deviceMAC: '866854037369637',
          deviceName: '测试设备',
          cost: '￥0.01',
          paymentDatetime: '2018-07-17 04:56:21',
          paymentType: '微信公众号',
          paymentName: '1分钱4H',
          state: '使用中'
        })
      }
      return {
        orderList,
        orderListColumnVisible: {
          id: true,
          nickname: true,
          pos: true,
          deviceMAC: true,
          deviceName: true,
          cost: true,
          paymentDatetime: true,
          paymentType: true,
          paymentName: true,
          state: true
        },
        orderListColumnDialogVisible: false
      }
    }
  }
</script>
