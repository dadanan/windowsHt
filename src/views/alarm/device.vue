<template>
  <div class="dashboard-container">
    <!-- <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanCardList" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit" :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
    </el-row> -->
    <!-- <el-card class="mb20">
      <chart :options="kanbanChart" class="chart" auto-resize></chart>
    </el-card> -->
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="计划名称" :value='value1'>
              <el-option label="设备 MAC" value="1"></el-option>
              <el-option label="设备序列号" value="2"></el-option>
              <el-option label="设备名称" value="3"></el-option>
              <el-option label="投放点" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="选择关联"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警级别" :value='value2'>
              <el-option label="预留布尔值故障" value="1"></el-option>
              <el-option label="滤网到期提醒" value="2"></el-option>
              <el-option label="PM 2.5 数值丢失报警" value="3"></el-option>
              <el-option label="设备移开 1000 米报警" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="状态" :value='value3'>
              <el-option label="未修复" value="1"></el-option>
              <el-option label="已修复" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="范围" :value='value3'>
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
          <el-button type="primary">添加</el-button>
          <el-button type="primary">禁用</el-button>
          <el-button type="primary">启用</el-button>
          <el-button type="primary">删除</el-button>
          <!-- <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button> -->
        </el-button-group>
      </div>
      <el-table :data="alarmList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="mac" label="计划名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="sn" label="计划描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="name" label="选择关联" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="pos" label="是否规则内" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="tel" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="state" label="状态" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="createDatetime" label="创建时间" show-overflow-tooltip sortable>
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
import DataCard from '@/components/DataCard'

export default {
  components: {
    DataCard
  },
  data() {
    const alarmList = []

    for (let i = 0; i < 15; i++) {
      alarmList.push({
        mac: '862151034187433',
        sn: '10063679114543329199',
        name: '金敦煌C910',
        pos: '金敦煌 KTV',
        tel: '13166666007',
        createDatetime: '2018-03-28 01:24:29',
        state: '已修复'
      })
    }
    return {
      value1: '',
      value2: '',
      value3: '',
      alarmList,
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
