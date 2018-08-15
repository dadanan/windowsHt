<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in kanbanCardList" :key="item.id" v-if="item.isVisible">
        <data-card :icon="item.icon" :name="item.name" :value="item.value" :unit="item.unit"
                   :style="{ backgroundColor: '#EC7063' }"></data-card>
      </el-col>
    </el-row>
    <el-card class="mb20">
      <chart :options="kanbanChart" class="chart" auto-resize></chart>
    </el-card>
    <el-card>
      <div class="table-opts">
        <el-form :inline="true" class="el-form--flex">
          <el-form-item>
            <el-select placeholder="条件">
              <el-option label="设备 MAC" value="1"></el-option>
              <el-option label="设备序列号" value="2"></el-option>
              <el-option label="设备名称" value="3"></el-option>
              <el-option label="投放点" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="关键词"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警类型">
              <el-option label="预留布尔值故障" value="1"></el-option>
              <el-option label="滤网到期提醒" value="2"></el-option>
              <el-option label="PM 2.5 数值丢失报警" value="3"></el-option>
              <el-option label="设备移开 1000 米报警" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="告警状态">
              <el-option label="未修复" value="1"></el-option>
              <el-option label="已修复" value="2"></el-option>
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
          <el-button type="primary" @click="isColumnDialogVisible = true">自定义</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="alarmList"
        style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="mac"
          label="设备 MAC" show-overflow-tooltip sortable v-if="alarmListColumnVisible.mac">
        </el-table-column>
        <el-table-column
          prop="sn"
          label="设备序列号" show-overflow-tooltip sortable v-if="alarmListColumnVisible.sn">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称" show-overflow-tooltip sortable v-if="alarmListColumnVisible.name">
        </el-table-column>
        <el-table-column
          prop="pos"
          label="投放点名称" show-overflow-tooltip sortable v-if="alarmListColumnVisible.pos">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="投放点负责人电话" show-overflow-tooltip sortable v-if="alarmListColumnVisible.tel">
        </el-table-column>
        <el-table-column
          prop="alarmName"
          label="告警名称" show-overflow-tooltip sortable v-if="alarmListColumnVisible.alarmName">
        </el-table-column>
        <el-table-column
          prop="createDatetime"
          label="告警发生时间" show-overflow-tooltip sortable v-if="alarmListColumnVisible.createDatetime">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="告警时长" show-overflow-tooltip sortable v-if="alarmListColumnVisible.duration">
        </el-table-column>
        <el-table-column
          prop="type"
          label="告警类型" show-overflow-tooltip sortable v-if="alarmListColumnVisible.type">
        </el-table-column>
        <el-table-column
          prop="state"
          label="告警状态" show-overflow-tooltip sortable v-if="alarmListColumnVisible.state">
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
    <el-dialog title="自定义显示列" :visible.sync="isColumnDialogVisible">
      <el-form inline>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.mac">设备 MAC</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.sn">设备序列号</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.name">设备名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.pos">投放点名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.tel">投放点负责人电话</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.alarmName">告警名称</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.createDatetime">告警发生时间</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.duration">告警时长</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.type">告警类型</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="alarmListColumnVisible.state">告警状态</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isColumnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="isColumnDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
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
          alarmName: 'PM Lose',
          createDatetime: '2018-03-28 01:24:29',
          duration: '111天4时34分24秒',
          type: '故障',
          state: '已修复'
        })
      }
      return {
        kanbanCardList: [
          {
            id: 0,
            icon: 'hdd',
            name: '当前告警设备数 (台)',
            value: 0,
            isVisible: true
          },
          {
            id: 1,
            icon: 'hdd',
            name: '今日新增告警记录',
            value: 0,
            isVisible: true
          },
          {
            id: 2,
            icon: 'hdd',
            name: '设备故障率',
            value: 0,
            isVisible: true,
            unit: '%'
          }
        ],
        kanbanChart: {
          title: {
            text: '售后类型'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['预留布尔值故障', '预留布尔值故障', '滤网到期提醒', 'PM 2.5 数值丢失报警', '设备移开 1000 米报警'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '占比',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390]
            }
          ]
        },
        alarmList,
        alarmListColumnVisible: {
          mac: true,
          sn: true,
          name: true,
          pos: true,
          tel: true,
          alarmName: true,
          createDatetime: true,
          duration: true,
          type: true,
          state: true
        },
        isColumnDialogVisible: false
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
