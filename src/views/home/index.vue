<template>
  <div>
    <d-title>运营数据看板</d-title>
    <datacard-grid-list class="datacard-grid-list">
      <datacard v-for="datacardData, index in datacardDataList" :key="datacardData.id"
                @edit="editDatacard($event, index)" :data="datacardData"></datacard>
    </datacard-grid-list>
    <datacard-edit @save="saveDatacard($event, editDatacardIndex)" :is-open.sync="isEditDatacard"
                   :edit-data="editDatacardData" :select-data="datacardAllDataList"></datacard-edit>
    <d-title>运营数据图表</d-title>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12">
        <el-card>
          <device-increment-chart></device-increment-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <device-position-chart></device-position-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <user-increment-chart></user-increment-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <!--<device-position-chart></device-position-chart>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DatacardGridList from './components/DatacardGridList'
  import Datacard from './components/Datacard'
  import DatacardEdit from './components/DatacardEdit'
  import DTitle from '@/components/DTitle'
  import DeviceIncrementChart from './components/DeviceIncrementChart'
  import DevicePositionChart from './components/DevicePositionChart'
  import UserIncrementChart from './components/UserIncrementChart'

  export default {
    components: {
      DatacardGridList,
      Datacard,
      DatacardEdit,
      DTitle,
      DeviceIncrementChart,
      DevicePositionChart,
      UserIncrementChart
    },
    data() {
      return {
        datacardAllDataList: [
          { id: 0, text: '当前设备总数', value: '1', color: '#ccc', icon: 'angry' },
          { id: 1, text: '在线设备总数', value: '4545', color: '#ccc', icon: 'coffee' },
          { id: 2, text: '当前设备故障数', value: '56', color: '#ccc', icon: 'coffee' },
          { id: 3, text: '当前用户有人数', value: '78', color: '#ccc', icon: 'coffee' },
          { id: 4, text: '昨日用户增长数', value: '879', color: '#ccc', icon: 'coffee' },
          { id: 5, text: '今日活跃用户数', value: '454', color: '#ccc', icon: 'coffee' },
          { id: 6, text: '本月用户增长数', value: '213', color: '#ccc', icon: 'coffee' },
          { id: 7, text: '本月活跃用户数', value: '123', color: '#ccc', icon: 'coffee' },
          { id: 8, text: '当前设备在线率', value: '987', color: '#ccc', icon: 'coffee' },
          { id: 9, text: '当前用户活跃率', value: '433', color: '#ccc', icon: 'coffee' },
          { id: 10, text: '传感器总数', value: '87', color: '#ccc', icon: 'coffee' },
          { id: 11, text: 'PM2.5 传感器总数', value: '67', color: '#ccc', icon: 'coffee' },
          { id: 12, text: '甲醛传感器总数', value: '5', color: '#ccc', icon: 'coffee' },
          { id: 13, text: 'CO2 传感器总数', value: '456', color: '#ccc', icon: 'coffee' },
          { id: 14, text: 'TVOC 传感器数据总数', value: '456', color: '#ccc', icon: 'coffee' },
          { id: 15, text: '优良环境数', value: '87', color: '#ccc', icon: 'coffee' },
          { id: 16, text: '优良环境比率', value: '12', color: '#ccc', icon: 'coffee' }
        ],
        datacardDataList: [
          { id: 0, text: '当前设备总数', value: '1', color: '#ccc', icon: 'angry' },
          { id: 1, text: '在线设备总数', value: '4545', color: '#ccc', icon: 'coffee' },
          { id: 2, text: '当前设备故障数', value: '56', color: '#ccc', icon: 'coffee' },
          { id: 3, text: '当前用户有人数', value: '78', color: '#ccc', icon: 'coffee' },
          { id: 4, text: '昨日用户增长数', value: '879', color: '#ccc', icon: 'coffee' },
          { id: 5, text: '今日活跃用户数', value: '454', color: '#ccc', icon: 'coffee' },
          { id: 6, text: '本月用户增长数', value: '213', color: '#ccc', icon: 'coffee' },
          { id: 7, text: '本月活跃用户数', value: '123', color: '#ccc', icon: 'coffee' }
        ],
        isEditDatacard: false,
        editDatacardData: null,
        editDatacardIndex: 0
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datacard-grid-list {
    margin-bottom: 20px;
  }
</style>
