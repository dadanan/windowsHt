<template>
  <div class="app-container calendar-list-container">

    <div class="tipshow">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-red">
            <i class="el-icon-warning"></i>
            <div class="colBox">
              <div class="colname">当前告警设备数</div>
              <div class="colcount">1985</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-red">
            <i class="el-icon-warning"></i>
            <div class="colBox">
              <div class="colname">今日新增告警设备数</div>
              <div class="colcount">0</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-red">
            <i class="el-icon-warning"></i>
            <div class="colBox">
              <div class="colname">设备故障率</div>
              <div class="colcount">0</div>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>

    <div>
      <bar-chart></bar-chart>
    </div>


    <div class="selectBox">
      <el-select v-model="value1" placeholder="设备MAC">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>

      <el-select v-model="value2" placeholder="告警名称">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>

      <el-select v-model="value3" placeholder="告警状态">
        <el-option
          v-for="item in options3"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.mac">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 0px;">重置</el-button>
    </div>

    <div class="findBox">
      <el-button-group>
        <el-button type="primary"><i class="el-icon-d-caret"></i>导出</el-button>
        <el-button type="primary"><i class="el-icon-document"></i>自定义</el-button>
      </el-button-group>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="设备MAC">
      </el-table-column>

      <el-table-column
        prop="detail"
        label="设备序列号">
      </el-table-column>

      <el-table-column
        prop="count"
        label="设备名称">
      </el-table-column>

      <el-table-column
        label="投放点名称">
      </el-table-column>

      <el-table-column
        label="投放点负责人电话">
      </el-table-column>

      <el-table-column
        label="告警名称">
      </el-table-column>

      <el-table-column
        label="告警发生时间">
      </el-table-column>

      <el-table-column
        label="告警时长">
      </el-table-column>

      <el-table-column
        label="告警类型">
      </el-table-column>

      <el-table-column
        label="告警状态">
      </el-table-column>

      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" @click="dialogVisible = true">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="large" style="margin-top: 20px">
      <div class="dilogBox">
        <div class="leftLog">
          <div class="titleLog">工单信息</div>
          <el-form ref="form" label-width="150px">
            <el-form-item label="设备Mac">
              <span>13r444444444</span>
            </el-form-item>

            <el-form-item label="设备名称">
              <span>名称名称</span>
            </el-form-item>

            <el-form-item label="设备序列号">
              <span>dd122222222222</span>
            </el-form-item>

            <el-form-item label="故障发生时间">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>

            <el-form-item label="故障名称">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>

            <el-form-item label="投放点名称">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>

            <el-form-item label="投放点负责人">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>

            <el-form-item label="投放点负责人电话">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>
          </el-form>
        </div>

        <div class="rightLog">
          <div class="titleLog">处理记录</div>
          <el-form ref="form" label-width="150px">
            <el-form-item label="故障状态">
              <span>13r444444444</span>
            </el-form-item>

            <el-form-item label="故障时长">
              <span>222</span>
            </el-form-item>

            <el-form-item label="恢复正常时间">
              <span>2012-03-21 23:33:33</span>
            </el-form-item>
          </el-form>
        </div>

        <div class="clear"></div>

        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="设备MAC">
          </el-table-column>

          <el-table-column
            prop="detail"
            label="设备名称">
          </el-table-column>


          <el-table-column
            label="投放点名称">
          </el-table-column>

          <el-table-column
            label="故障名称">
          </el-table-column>

          <el-table-column
            label="故障发生时间">
          </el-table-column>

          <el-table-column
            label="故障时长">
          </el-table-column>

          <el-table-column
            label="故障状态">
          </el-table-column>

        </el-table>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import barChart from '@/views/device/barChart'
  import { queryDeviceList, queryDeviceCount, updateDevice } from '@/api/device'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'complexTable',
    components: { barChart },
    directives: {
      waves
    },
    data() {
      return {
        dialogVisible: false,
        currentPage: 1,
        tableData: [
          {
            detail: '系统管理员',
            name: '系统管理员',
            count: 123
          }, {
            detail: '系统管理员',
            name: '系统管理员',
            count: 123
          }, {
            detail: '系统管理员',
            name: '系统管理员',
            count: 123
          }],
        currentPage: 1,
        tableDataList: [
          {
            date: '123456',
            name: '小王'
          }],
        svalue1: false,
        svalue2: false,
        activeName: 'first',
        options1: [
          {
            value: '设备MAC',
            label: ''
          }, {
            value: '设备序列号',
            label: '设备序列号'
          }, {
            value: '设备名称',
            label: '设备名称'
          }, {
            value: '投放点',
            label: '投放点'
          }],
        value1: '',
        options2: [
          {
            value: '告警名称',
            label: ''
          }, {
            value: 'PmLose',
            label: 'PmLose'
          }, {
            value: 'Fault1',
            label: 'Fault1'
          }, {
            value: 'Fault2',
            label: 'Fault2'
          }, {
            value: '电子围栏',
            label: '电子围栏'
          }],
        value2: '',
        options3: [
          {
            value: '告警状态',
            label: ''
          }, {
            value: '未修复',
            label: '未修复'
          }, {
            value: '已修复',
            label: '已修复'
          }, {
            value: '障碍',
            label: '障碍'
          }],
        value3: '',
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 50,
          mac: undefined
        },
        temp: {
          id: undefined,
          name: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .leftLog {
    width: 45%;
    float: left;
  }

  .rightLog {
    width: 45%;
    float: right;
  }

  .clear {
    clear: both;
  }

  .block {
    margin-top: 20px;
    text-align: center;
  }

  .tipshow {
    margin-bottom: 30px;
  }

  .el-form-item .el-input {
    width: 300px;
  }

  .selectBox {
    margin-bottom: 10px;
  }

  .findBox {
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: right;
  }

  .el-button i {
    margin-right: 5px;
  }

  .grid-content {
    border-radius: 4px;
    height: 114px;
    margin-top: 20px;
    padding: 27px;
    color: white;
    display: flex;
  }

  .grid-content i {
    display: block;
    width: 60px;
    height: 60px;
    margin-right: 25px;
    font-size: 60px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .colname {
    font-size: 14px;
    margin-top: 5px;
  }

  .colcount {
    font-size: 27px;
  }
</style>
