<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="计划详情" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="120px" class="mb-22" :model="form">
        <el-form-item label="计划名称">
          <el-input placeholder="计划名称..." v-model='form.name' disabled></el-input>
        </el-form-item>
        <el-form-item label="计划描述">
          <el-input type="textarea" :rows='3' placeholder="计划描述..." v-model='form.description' disabled></el-input>
        </el-form-item>
        <el-form-item label="是否规则内">
          <el-select v-model="form.ruleId" style="width:100%" disabled>
            <el-option v-for='item in list' :label="item.name" :value="item.id" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务发布日期">
          <template>
            <el-radio-group v-model="form.cycleType">
              <el-radio :label="0" disabled>仅告警一次</el-radio>
              <el-radio :label="1" disabled>按月告警</el-radio>
              <el-radio :label="2" disabled>按年告警</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item>
          <template v-if="form.cycleType == 0">
            <el-date-picker v-model="form.nextExecuteTime" type="date" value-format="timestamp" placeholder="选择日期" :picker-options="pickerOptions0" disabled style="width:70%;margin-left:20px">
            </el-date-picker>
          </template>
           <template v-if="form.cycleType == 1">
            <span>每</span>
            <el-input type="number" v-model="form.cycleNums" style="width:10%" disabled></el-input>
            <span>月告警日期</span>
            <el-select v-model="dayData" style="width:40%;margin-right:20px" disabled>
              <el-option v-for='item in day' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <el-checkbox v-model="isRightExcute1" disabled>立即执行</el-checkbox>
          </template>
          <template v-if="form.cycleType == 2">
            <span>每</span>
            <el-input type="number" v-model="form.cycleNums" style="width:10%" disabled></el-input>
            <span>年告警日期</span>
            <el-select v-model="monthData" style="width:10%;" disabled>
              <el-option v-for='item in months' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <span style="margin:0px 20px">月</span>
            <el-select v-model="daysData" style="width:10%;margin-right:20px" disabled>
              <el-option v-for='item in day' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <span style="margin-right:20px">日</span>
            <el-checkbox v-model="isRightExcute1" disabled>立即执行</el-checkbox>
          </template>
        </el-form-item>
        <el-form-item label="任务到期时间">
          <span>任务发布日期后</span>
          <el-input type="number" v-model='form.overTimeDays' style="width:40%; margin:0px 20px" disabled></el-input>
          <span>天</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click='editPlan'>确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  editPlan,
  selectList,
  planModelList,
} from '@/api/alarm'
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
      list: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      ids: []
    }
  },
  methods: {
    planModelList(id) {
      planModelList(id).then(res => {
        this.form = res.data
      if(this.form.cycleType == 1){
        this.dayData = this.form.day 
      }else if(this.form.cycleType == 2){
        this.daysData = this.form.day 
        this.monthData  = this.form.month
      }
      })
    },
    selectList() {
      selectList(this.query).then(res => {
        this.list = res.data.ruleRspPoList
      })
    },
    editPlan() {
        this.$emit('update:visible', false)
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    handleCancel() {
      this.$emit('update:visible', false)
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
      this.planModelList(val.id)
      this.selectList() // 查询规则列表
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

