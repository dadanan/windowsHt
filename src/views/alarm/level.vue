<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select placeholder="选择关联" v-model="query.linkType">
              <el-option label="不关联" value="1"></el-option>
              <el-option label="关联设备" value="2"></el-option>
              <el-option label="关联工程" value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-select placeholder="告警级别" v-model="query.warnLevel">
              <el-option label="一级告警" value="1"></el-option>
              <el-option label="二级告警" value="2"></el-option>
              <el-option label="三级告警" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" v-model="query.flowStatus">
              <el-option label="待处理" value="1"></el-option>
              <el-option label="处理中" value="2"></el-option>
              <el-option label="审核中" value="3"></el-option>
              <el-option label="已完成" value="4"></el-option>
              <el-option label="已忽略" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="selectList2">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- CreateLevel -->
      <create-level :visible.sync="CreateLevel" :data='editingDataCre' @add-data='addData'></create-level>
      <ignore-level :visible.sync="IgnoreLevel" :data='editingData' @add-data='addData'></ignore-level>
      <deal-level :visible.sync="DealLevel" :data='editingData'></deal-level>
      <sub-deal-level :visible.sync="SubDealLevel" :data='editingDatas' @add-data='addData'></sub-deal-level>
      <audit-deal-level :visible.sync="AuditDealLevel" :data='editingDataD' @add-data='addData'></audit-deal-level>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="任务描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="type" label="选择关联" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="isRule" label="是否规则内" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template v-if='scope.row.isRule == 1'>
              是
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="warnLevel" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="sourceType" label="告警来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="finalTime" label="到期处理日" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.finalTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="flowStatus" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.flowStatus == '待处理'">
              <el-button type="text" @click="ignoreLevel(scope.row)">忽略</el-button>
              <el-button type="text" @click="dealLevel(scope.row)">标记处理中</el-button>
              <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
            </template>
            <template v-else-if="scope.row.flowStatus == '处理中'">
              <el-button type="text" @click="subDealLevel(scope.row)">提交审核</el-button>
              <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
            </template>
            <template v-else-if="scope.row.flowStatus == '待审核'">
              <el-button type="text" @click="auditDealLevel(scope.row)">审核</el-button>
              <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
            </template>
            <template v-else-if="scope.row.flowStatus == '已完成'">
              <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="createLevel(scope.row)">详情</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import CreateLevel from './components/CreateLevel'
import IgnoreLevel from './components/IgnoreLevel'
import DealLevel from './components/DealLevel'
import SubDealLevel from './components/SubDealLevel'
import AuditDealLevel from './components/AuditDealLevel'

import { selectList2,subselect, deletePlan, forbitPlan } from '@/api/alarm'
export default {
  components: {
    CreateLevel,
    IgnoreLevel,
    DealLevel,
    SubDealLevel,
    AuditDealLevel
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      query: {
        limit: 100,
        currentPage: 1
      },
      total: 0,
      selectedDeviceList: [],
      ids: [],
      CreateLevel: false,
      IgnoreLevel: false,
      DealLevel: false,
      SubDealLevel: false,
      AuditDealLevel: false,
      editingData: {},
      editingDatas:{},
      editingDataD:{},
      editingDataCre:{}
    }
  },
  methods: {
    addData(data) {
      this.selectList2()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      this.query.linkType =''
      this.selectList2()
    },
    selectList2() {
      selectList2(this.query).then(res => {
        // console.log(res)
        const list = res.data.jobRspPoList
        const mapList = {
          '1': '一级告警',
          '2': '二级告警',
          '3': '三级告警'
        }
        const linkList = {
          '0': '不关联',
          '1': '关联设备',
          '2': '关联工程'
        }
        const sourceType = {
          '1': '计划维保',
          '2': 'H5端反馈',
          '3': '设备告警'
        }
        const flowStatus = {
          '1': '待处理',
          '2': '处理中',
          '3': '待审核',
          '4': '已完成',
          '5': '已忽略'
        }
        for (var i = 0; i < list.length; i++) {
          list[i].warnLevel = mapList[list[i].warnLevel]
          list[i].type = linkList[list[i].type]
          list[i].sourceType = sourceType[list[i].sourceType]
          list[i].flowStatus = flowStatus[list[i].flowStatus]
        }
        this.levelList = list
        this.total = res.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectList2()
    },
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.selectList2()
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    createLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataCre = res.data
        this.CreateLevel = true
      })
    },
    ignoreLevel(val) {
      this.editingData = val
      this.IgnoreLevel = true
    },
    dealLevel(val) {
      this.editingData = val
      this.DealLevel = true
    },
    subDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDatas = res.data
        this.SubDealLevel = true
      })
    },
    auditDealLevel(val) {
      subselect(val.id).then(res=>{
        this.editingDataD = res.data
        this.AuditDealLevel = true
      })
    }
  },
  created() {
    this.selectList2()
  }
}
</script>
