<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="修改实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="120px" class="mb-22" :model="form">
        <el-form-item label="计划名称">
          <el-input placeholder="计划名称..." v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label="计划描述">
          <el-input type="textarea" :rows='3' placeholder="计划描述..." v-model='form.description'></el-input>
        </el-form-item>
        <el-form-item label="是否规则内">
          <el-select v-model="form.ruleId" style="width:100%">
            <el-option v-for='item in list' :label="item.name" :value="item.id" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择关联">
          <template>
            <el-radio-group v-model="form.linkType">
              <el-radio :label="0">不关联</el-radio>
              <el-radio :label="1">关联设备</el-radio>
              <el-radio :label="2">关联工程</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item>
          <template v-if="form.linkType == 0"></template>
          <template v-if="form.linkType == 1">
            <el-select v-model="form.linkDeviceModelId" style="width:40%" @change="selectByModelId">
              <el-option v-for='item in devList' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <el-select v-model="form.linkDeviceId" style="width:40%">
              <el-option v-for='item in devilist' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
          </template>
          <template v-if="form.linkType == 2">
            <el-select v-model="form.linkProjectId" style="width:100%">
              <el-option v-for='item in selectLists' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="任务发布日期">
          <template>
            <el-radio-group v-model="form.cycleType">
              <el-radio :label="0">仅告警一次</el-radio>
              <el-radio :label="1">按月告警</el-radio>
              <el-radio :label="2">按年告警</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item>
          <template v-if="form.cycleType == 0">
            <el-date-picker v-model="form.nextExecuteTime" type="date" value-format="timestamp" placeholder="选择日期" :picker-options="pickerOptions0" style="width:70%;margin-left:20px">
            </el-date-picker>
          </template>
          <template v-if="form.cycleType == 1">
            <span>每</span>
            <el-input type="number" v-model="form.cycleNums" style="width:10%"></el-input>
            <span>月告警日期</span>
            <el-select v-model="dayData" style="width:40%;margin-right:20px">
              <el-option v-for='item in day' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <el-checkbox v-model="isRightExcute1">立即执行</el-checkbox>
          </template>
          <template v-if="form.cycleType == 2">
            <span>每</span>
            <el-input type="number" v-model="form.cycleNums" style="width:10%"></el-input>
            <span>年告警日期</span>
            <el-select v-model="monthData" style="width:10%;">
              <el-option v-for='item in months' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <span style="margin:0px 20px">月</span>
            <el-select v-model="daysData" style="width:10%;margin-right:20px">
              <el-option v-for='item in day' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <span style="margin-right:20px">日</span>
            <el-checkbox v-model="isRightExcute1">立即执行</el-checkbox>
          </template>
        </el-form-item>
        <el-form-item label="任务到期时间">
          <span>任务发布日期后</span>
          <el-input type="number" v-model='form.overTimeDays' style="width:40%; margin:0px 20px"></el-input>
          <span>天</span>
        </el-form-item>
        <el-form-item label="指定任务负责人">
          <el-button type="primary " @click="toggleSelection">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-tag v-for="item in selectedDeviceList" :key="item.id" :type="item.realName" style="margin:0px 10px">
            {{item.userName}}
          </el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click='editPlan'>确定</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="addEle" title="添加人数">
      <el-table :data="projects" ref="multipleTable" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="userName" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="id" label="id" show-overflow-tooltip sortable>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEle = false">取消</el-button>
        <el-button type="primary" @click="addEle =false ">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  editPlan,
  selectList,
  selectModelDict,
  selectByModelId,
  select,
  selectProjectDict
} from '@/api/alarm'
import { getUserList } from '@/api/user'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    }
  },
  data() {
    const paymentList = []
    for (let i = 1; i < 31; i++) {
      paymentList.push({
        id: i,
        name: i,
      })
    }
    const payment = []
    for (let i = 1; i < 13; i++) {
      payment.push({
        id: i,
        name: i,
      })
    }
    return {
      day:paymentList, //天数
      months:payment,  //月
      monthData:0,
      dayData:0,
      daysData:0,
      addEle: false,
      selectedDeviceList: [],
      selectedDeviceList1:[],
      isRule: '',
      form: {
        status: 1
      },
      isRightExcute1: false,
      query: {
        limit: 1000,
        page: 1
      },
      projects: [],
      devList: [],
      devilist: [],
      list: [],
      selectLists: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      ids: []
    }
  },
  methods: {
    select(id) {
      select(id).then(res => {
        // this.selectedDeviceList = res.data.enableUserList
        this.form = res.data
        if (this.form.linkType == 1) {
        this.selectModelDict() // 查客户下模型
        this.selectByModelId() // 根据id
      } else if (this.form.linkType == 2) {
        this.selectProjectDict() //工程查询
      }
      if(this.form.cycleType == 1){
        this.dayData = this.form.day 
      }else if(this.form.cycleType == 2){
        this.daysData = this.form.day 
        this.monthData  = this.form.month
      }
      })
    },
    // 查客户下模型
    selectModelDict() {
      selectModelDict().then(res => {
        this.devList = res.data
      })
    },
    selectProjectDict() {
      selectProjectDict().then(res => {
        this.selectLists = res.data
      })
    },
    selectList() {
      selectList(this.query).then(res => {
        this.list = res.data.ruleRspPoList
      })
    },
    // 根据id
    selectByModelId() {
      selectByModelId(this.form.linkDeviceModelId).then(res => {
        this.devilist = res.data
      })
    },
    editPlan() {
      console.log(this.selectedDeviceList)
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      if (this.form.ruleId) {
        this.form.isRule = 1
      }
      if (this.form.isRightExcute1) {
        this.form.isRightExcute = 1
      } else {
        this.form.isRightExcute = 0
      }
      if(this.form.cycleType == 1){
        this.form.day = this.dayData
      }else if(this.form.cycleType == 2){
        this.form.day = this.daysData
        this.form.month = this.monthData
      }
      console.log(this.ids)
      this.form.enableUserList = this.ids
      editPlan(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('updata-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    getUserList(val) {
      getUserList().then(res => {
        if (res.code === 200) {
          this.projects = res.data
          const list1 = []
          this.selectedDeviceList1 = val
          console.log(val)
          if (this.selectedDeviceList1.length > 0) {
            for (var i = 0; i < this.selectedDeviceList1.length; i++) {
              for (var j = 0; j < this.projects.length; j++) {
                if (this.selectedDeviceList1[i] == this.projects[j].id) {
                  list1.push(this.projects[j])
                }
              }
            }
          }
          this.selectedDeviceList = Object.assign([], list1, []);
          console.log(this.selectedDeviceList)
        }
      })
    },
    toggleSelection() {
      this.addEle = true
      this.$nextTick(function() {
        if (this.selectedDeviceList) {
          this.selectedDeviceList.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        }
      })
    },
    init(val) {
      this.select(val.id)
      this.selectList() // 查询规则列表
      this.getUserList(val.enableUserList) //客户列表
      if (val.linkType == 1) {
        this.selectModelDict() // 查客户下模型
      } else if (val.linkType == 2) {
        this.selectProjectDict() //工程查询
      }
    }
  },
  watch: {
    data(val) {
      this.init(val)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

