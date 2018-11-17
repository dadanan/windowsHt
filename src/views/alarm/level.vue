<template>
  <div class="dashboard-container">
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="任务名称" :value='value1'>
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
      <el-table :data="levelList" style="width: 100%" class="mb20" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="nameText" label="任务描述" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="type" label="选择关联" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="dataType" label="是否规则内" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description" label="告警级别" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description1" label="告警来源" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description2" label="到期处理日" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="description3" label="状态" show-overflow-tooltip sortable>
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
export default {
  data() {
    const levelList = []

    for (let i = 0; i < 15; i++) {
      levelList.push({
        name: '任务名称',
        nameText: 'PM 2.5 报数丢失',
        type: '不关联',
        dataType: '是',
        description: '一级',
        description1: '计划维保',
        description2: '2018-07-28 01:24:29',
        description3: '待处理'
      })
    }
    return {
      levelList,
      value1: '',
      value2: '',
      value3: ''
    }
  }
}
</script>
