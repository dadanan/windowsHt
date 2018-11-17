<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-input v-model="value1" placeholder="规则名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" :value='value1'>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警级别" :value='value3'>
              <el-option label="未修复" value="1"></el-option>
              <el-option label="已修复" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="AddProcess = true">添加</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <add-process :visible.sync="AddProcess" ></add-process>
      <el-table :data="levelList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="规则名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="nameText" label="规则描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="type" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="dataType" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
            <el-button type="text">修改</el-button>
            <el-button type="text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import AddProcess from './components/AddProcess'

export default {
  components: {
    AddProcess
  },
  data() {
    const levelList = []
    for (let i = 0; i < 15; i++) {
      levelList.push({
        name: '采暖管道、阀门、分集水器清洗养护',
        nameText: '采暖管道、阀门、分集水器清洗养护',
        type: '一级',
        dataType: '启用',
        description: '2018-08-28 04:24:29'
      })
    }
    return {
      levelList,
      value1: '',
      value2: '',
      value3: '',
      AddProcess:false
    }
  }
}
</script>
