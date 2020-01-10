<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建维保任务" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <!-- <el-form-item label="工程系统分类">
          <el-select v-model="form.typeId"  style="width:100%">
            <el-option v-for='item in list' :label="item.label" :value="item.id" ></el-option>
          </el-select>
          <span class="color">*选择本条规则适用工程系统</span>
        </el-form-item> -->
        <el-form-item label="任务名称" prop="name">
          <el-input placeholder="任务名称..." v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input type="textarea" :rows='3' placeholder="任务描述..." v-model='form.description'></el-input>
        </el-form-item>
        <el-form-item label="关联设备" prop="type">
          <el-select v-model="form.type" style="width:100%;" disabled>
            <el-option  label="不关联" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select v-model="form.customerId"  style="width:100%">
            <el-option v-for='item in list' :label="item.name" :value="item.id" :key = "item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维保项目名称">
          <el-select v-model="form.linkProjectId"  style="width:100%">
            <el-option v-for='item in alarmList' :label="item.name" :value="item.id"  :key = "item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警级别">
          <el-select v-model="form.warnLevel" style="width:100%">
            <el-option  label="一级告警" value="1"></el-option>
            <el-option  label="二级告警" value="2"></el-option>
            <el-option  label="三级告警" value="3"></el-option>
          </el-select>    
        </el-form-item>
        <el-form-item label="任务来源">
          <el-select v-model="form.sourceType" style="width:100%">
            <el-option  label="计划维保" value="1"></el-option>
            <el-option  label="微信反馈" value="2"></el-option>
            <el-option  label="设备告警" value="3"></el-option>
            <el-option  label="电话报修" value="4"></el-option>
          </el-select>    
        </el-form-item>
        <el-form-item label="告警到期日">
        <el-date-picker type="date" placeholder="告警到期日..." value-format="timestamp" v-model='form.finalTime'></el-date-picker>
      </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='addRule'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { selectList } from '@/api/rent'
import { addRule ,getEnableAbility,manageAddJob} from '@/api/alarm'
import { select } from '@/api/customer'
import {EngList} from '@/api/alarm'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        type:'0'
      },
      rules: {
        name: [
          { required: true, message: '任务名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '任务描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
      },
      query: {
        limit: 10000,
        page: 1,
        type: 'planning',
        isDelete: 0
      },
      list:[],  //所属公司
      selectLists:[],
      monitorValues:'',
      listQuery: {
        limit: 50,
        page: 1
      },
      query: {
        limit: 100,
        page: 1
      },
      alarmList:[]
    }
  },
  methods: {
    // 所属公司
    getCustomer() {
      select(this.listQuery).then(res => {
        this.list = res.data.customerVos
      })
    },
    // 维保项目名称
    EngList() {
      EngList(this.query).then(res => {
        this.alarmList = res.data.projectRspPoList
      })
    },
    selectList() {
      selectList(this.query).then(res => {
        console.log(res)
        this.list = res.data.dictRspPoList
      })
    },
    getEnableAbility() {
      getEnableAbility().then(res => {
        this.selectLists = res.data
      })
    },
    
    addRule() {
      manageAddJob(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.form = {}
          this.$emit('update:visible', false)
          this.$emit('add-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  },
  created () {
    this.getCustomer()
    this.EngList()
    // this.selectList()
    // this.getEnableAbility()
  }
}
</script>
<style lang="scss" scoped>
.el-input--medium .el-input__inner{
  width: 100%
}
.color{
  color: #969696
}
</style>

