<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="计划编辑" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
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
          <span class="color">*规则内的计划，可按规则自动判断任务告警等级</span>
        </el-form-item>
        <el-form-item label="任务发布日期">
          <template>
            <el-radio-group v-model="form.cycleType">
              <el-radio :label="0">仅发布一次</el-radio>
              <el-radio :label="1">按月生成</el-radio>
              <el-radio :label="2">按年生成</el-radio>
            </el-radio-group>
            <p><span class="color">*任务发布日期   *仅发布一次    *按月生成    *按年生成
  * 选择计划执行的起始时间，发布任务视为计划预警，任务到期未完成产生告警；
  * 系统发布任务即视为计划预警，任务发布日至任务截止日之间为任务实际筹备及执行期限；</span></p>
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
            <span>月生成日期</span>
            <el-select v-model="dayData" style="width:40%;margin-right:20px">
              <el-option v-for='item in day' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
            <el-checkbox v-model="isRightExcute1">立即执行</el-checkbox>
          </template>
          <template v-if="form.cycleType == 2">
            <span>每</span>
            <el-input type="number" v-model="form.cycleNums" style="width:10%"></el-input>
            <span>年生成日期</span>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click='editPlanModel'>确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  editPlanModel,
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
    editPlanModel() {
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
      editPlanModel(this.form).then(res => {
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
.color{
  color: #969696
}
</style>

