<template>
  <div>
    <!--筛选-->
    <div class="filter-bar">
      <el-button-group>
        <el-button type="primary">分配</el-button>
        <el-button type="primary">解绑</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary" @click="isOpenCustom = true">自定义</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">集群</el-button>
        <el-button type="primary">禁运</el-button>
        <el-button type="primary">授权</el-button>
      </el-button-group>
      <el-form :inline="true" :model="filter" style="margin-bottom: -22px">
        <el-form-item>
          <el-select v-model="filter.category" placeholder="筛选条件">
            <el-option label="设备名称" value="1"></el-option>
            <el-option label="序列号" value="2"></el-option>
            <el-option label="mac" value="3"></el-option>
            <el-option label="类型" value="4"></el-option>
            <el-option label="组名" value="5"></el-option>
            <el-option label="集群" value="6"></el-option>
            <el-option label="用户" value="7"></el-option>
            <el-option label="运营者" value="8"></el-option>
            <el-option label="区域" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.keyword" placeholder="筛选内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filter.range" placeholder="时间范围">
            <el-option label="7 天" value="1"></el-option>
            <el-option label="30 天" value="2"></el-option>
            <el-option label="全部" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item style="margin-right: 0">
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--操作-->
    <div>

    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="sc"
        label="序号" v-if="has.sc">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID" v-if="has.id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备名称" v-if="has.name">
      </el-table-column>
      <el-table-column
        prop="bindState"
        label="绑定状态" v-if="has.bindState">
      </el-table-column>
      <el-table-column
        prop="onlineState"
        label="在线状态" v-if="has.onlineState">
      </el-table-column>
      <el-table-column
        prop="workState"
        label="工作状态" v-if="has.workState">
      </el-table-column>
      <el-table-column
        prop="group"
        label="组信息" v-if="has.group">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户" v-if="has.user">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备型号" v-if="has.type">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="设备归属" v-if="has.owner">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-bar">
      <el-pagination
        :current-page="2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <!--自定义弹窗-->
    <el-dialog
      title="自定义展示列"
      :visible.sync="isOpenCustom">
      <el-form :inline="true" label-width="80px">
        <el-form-item label="序号">
          <el-switch on-text="" off-text="" v-model="has.sc"></el-switch>
        </el-form-item>
        <el-form-item label="ID">
          <el-switch on-text="" off-text="" v-model="has.id"></el-switch>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-switch on-text="" off-text="" v-model="has.name"></el-switch>
        </el-form-item>
        <el-form-item label="绑定状态">
          <el-switch on-text="" off-text="" v-model="has.bindState"></el-switch>
        </el-form-item>
        <el-form-item label="在线状态">
          <el-switch on-text="" off-text="" v-model="has.onlineState"></el-switch>
        </el-form-item>
        <el-form-item label="工作状态">
          <el-switch on-text="" off-text="" v-model="has.workState"></el-switch>
        </el-form-item>
        <el-form-item label="组信息">
          <el-switch on-text="" off-text="" v-model="has.group"></el-switch>
        </el-form-item>
        <el-form-item label="用户">
          <el-switch on-text="" off-text="" v-model="has.user"></el-switch>
        </el-form-item>
        <el-form-item label="设备型号">
          <el-switch on-text="" off-text="" v-model="has.type"></el-switch>
        </el-form-item>
        <el-form-item label="设备归属">
          <el-switch on-text="" off-text="" v-model="has.owner"></el-switch>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      const tableData = []
      for (let i = 0; i < 15; i++) {
        tableData.push({
          sc: i,
          id: 998,
          name: '测试设备',
          bindState: '未知',
          onlineState: '未知',
          workState: '未知',
          group: '组信息',
          user: '用户',
          type: '测试类型',
          owner: '测试拥有者'
        })
      }
      return {
        has: {
          sc: true,
          id: true,
          name: true,
          bindState: false,
          onlineState: false,
          workState: false,
          group: false,
          user: false,
          type: false,
          owner: false
        },
        tableData: [
          ...tableData
        ],
        filter: {
          category: '',
          keyword: '',
          range: ''
        },
        isOpenCustom: false
      }
    },
    methods: {
      reset() {
        this.filter.category = ''
        this.filter.keyword = ''
        this.filter.range = ''
      },
      search() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .pagination-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
