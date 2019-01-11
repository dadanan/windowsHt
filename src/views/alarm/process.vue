<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input placeholder="输入名称" v-model="query.name"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select placeholder="选择关联" v-model="search.linkType">
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
            <el-select placeholder="状态" v-model="query.status">
              <el-option label="禁用" value="3"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="selectList">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddProcess = true">添加</el-button>
          <el-button type="primary" @click="forbitRule">禁用</el-button>
          <el-button type="primary" @click="reverseRule">启用</el-button>
          <el-button type="primary" @click="deleteRule">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-process :visible.sync="AddProcess" @add-data='addData'></add-process>
      <editor-process :visible.sync="EditorProcess" :data='editingData' @update-data='updateData'></editor-process>

      <el-table :data="levelList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="保养项目名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="typeName" label="工程系统分类" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="保养内容" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="warnLevel" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createName" label="创建者" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createTime" label="时间" show-overflow-tooltip sortable>
          <template slot-scope="scope">
            <template>
              {{new Date(scope.row.createTime).toLocaleString()}}
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editorProcess(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="query.page" :page-sizes="[100, 200, 300, 400]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddProcess from './components/AddProcess'
import EditorProcess from './components/EditorProcess'

import { selectList, deleteRule, forbitRule, reverseRule } from '@/api/alarm'

export default {
  components: {
    AddProcess,
    EditorProcess
  },
  data() {
    return {
      levelList: [],
      value1: '',
      value2: '',
      value3: '',
      AddProcess: false,
      EditorProcess: false,
      query: {
        limit: 100,
        page: 1,
        type: ''
      },
      total: 0,
      editingData: {},
      ids: [],
      selectedDeviceList: []
    }
  },
  methods: {
    addData(data) {
      this.selectList()
      this.levelList.push(data)
    },
    updateData(data) {
      this.selectList()
    },
    reset(){
      this.query.name = ''
      this.query.status = ''
      this.query.warnLevel = ''
      this.selectList()
    },
    selectList() {
      selectList(this.query).then(res => {
        const list = res.data.ruleRspPoList
        const mapList = {
          '1': '一级告警',
          '2': '二级告警',
          '3': '三级告警'
        }
        for (var i = 0; i < list.length; i++) {
          list[i].warnLevel = mapList[list[i].warnLevel]
          if (list[i].status == 1) {
            list[i].status = '启用'
          }
          if (list[i].status == 3) {
            list[i].status = '禁用'
          }
        }
        this.levelList = list
        // console.log(this.levelList)
        this.total = res.data.totalCount
      })
    },
    deleteRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      deleteRule({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.selectedDeviceList = []
          this.ids = []
          this.selectList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    reverseRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      reverseRule({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.selectedDeviceList = []
          this.ids = []          
          this.selectList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    forbitRule() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      forbitRule({ valueList: this.ids }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.selectedDeviceList = []
          this.ids = []
          this.selectList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSizeChange(val) {
      this.query.limit = val
      this.selectList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.selectList()
    },
    editorProcess(data) {
      this.editingData = data
      this.EditorProcess = true
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      // console.log(selection)
    }
  },
  created() {
    this.selectList()
  }
}
</script>
