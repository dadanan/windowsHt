<template>
  <div>
    <d-title>用户数据看板</d-title>
    <datacard-grid-list class="datacard-grid-list">
      <datacard v-for="datacardData, index in datacardDataList" :key="datacardData.id"
                @edit="editDatacard($event, index)" :data="datacardData"></datacard>
    </datacard-grid-list>
    <datacard-edit @save="saveDatacard($event, editDatacardIndex)" :is-open.sync="isEditDatacard"
                   :edit-data="editDatacardData" :select-data="datacardAllDataList"></datacard-edit>
    <d-title>用户数据图表</d-title>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12">
        <el-card>
          <new-user-chart></new-user-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <active-user-chart></active-user-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12">
        <el-card>
          <total-user-chart></total-user-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <user-position-rank-chart></user-position-rank-chart>
        </el-card>
      </el-col>
    </el-row>
    <d-title>用户数据表</d-title>
    <!--筛选-->
    <div class="filter-bar">
      <el-form :inline="true" :model="filter">
        <el-form-item>
          <el-select v-model="filter.category" placeholder="筛选条件">
            <el-option label="类型" value="1"></el-option>
            <el-option label="用户" value="2"></el-option>
            <el-option label="运营者" value="3"></el-option>
            <el-option label="区域" value="4"></el-option>
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
    <!--表格-->
    <el-table
      :data="userTableData"
      style="width: 100%; margin-bottom: 20px">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="type"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="最后操作时间">
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pagination-bar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-button type="primary">导出 Excel</el-button>
    </div>
  </div>
</template>

<script>
  import DatacardGridList from '@/components/DatacardGridList'
  import Datacard from '@/components/Datacard'
  import DatacardEdit from '@/components/DatacardEdit'
  import DTitle from '@/components/DTitle'
  import NewUserChart from './components/NewUserChart'
  import ActiveUserChart from './components/ActiveUserChart'
  import TotalUserChart from './components/TotalUserChart'
  import UserPositionRankChart from './components/UserPositionRankChart'

  export default {
    components: {
      DatacardGridList,
      Datacard,
      DatacardEdit,
      DTitle,
      NewUserChart,
      ActiveUserChart,
      TotalUserChart,
      UserPositionRankChart
    },
    data() {
      return {
        datacardAllDataList: [
          { id: 0, text: '当前用户总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '昨日新增用户', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '今日活跃用户', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '昨日用户活跃率', value: '0', color: '#909399', icon: 'angry' },
          { id: 4, text: '总用户活跃率', value: '0', color: '#909399', icon: 'angry' },
          { id: 5, text: '当月新增用户', value: '0', color: '#909399', icon: 'angry' },
          { id: 6, text: '本月用户增长率', value: '0', color: '#909399', icon: 'angry' }
        ],
        datacardDataList: [
          { id: 0, text: '当前用户总数', value: '1', color: '#67C23A', icon: 'angry' },
          { id: 1, text: '昨日新增用户', value: '2', color: '#E6A23C', icon: 'angry' },
          { id: 2, text: '今日活跃用户', value: '3', color: '#F56C6C', icon: 'angry' },
          { id: 3, text: '昨日用户活跃率', value: '0', color: '#909399', icon: 'angry' }
        ],
        isEditDatacard: false,
        editDatacardData: null,
        editDatacardIndex: 0,
        userTableData: [
          {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }, {
            id: '1',
            name: '测试用户',
            address: '湖北省',
            type: '测试类型',
            updatedAt: '2016-05-04'
          }
        ],
        filter: {
          category: '',
          keyword: '',
          range: ''
        }
      }
    },
    methods: {
      editDatacard(data, index) {
        this.editDatacardIndex = index
        this.editDatacardData = data
        this.isEditDatacard = true
      },
      saveDatacard(data, index) {
        this.datacardDataList[index] = data
        this.isEditDatacard = false
      },
      search() {
      },
      reset() {
        this.filter.category = ''
        this.filter.keyword = ''
        this.filter.range = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datacard-grid-list {
    margin-bottom: 20px;
  }

  .pagination-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filter-bar {
    &::before {
      content: '';
    }
    display: flex;
    justify-content: space-between;
  }
</style>
