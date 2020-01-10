<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建规则" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="工程系统分类">
          <el-select v-model="form.typeId"  style="width:100%">
            <el-option v-for='item in list' :label="item.label" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <span class="color">*选择本条规则适用工程系统</span>
        </el-form-item>
        <el-form-item label="规则名称" prop="name">
          <el-input placeholder="规则名称..." v-model='form.name'></el-input>
          <span class="color">*填写规则名称，如滤网清洁、传感器校准；</span>

        </el-form-item>
        <el-form-item label="规则描述" prop="description">
          <el-input type="textarea" :rows='3' placeholder="规则描述..." v-model='form.description'></el-input>
        </el-form-item>
        <el-form-item label="告警级别">
          <el-select v-model="form.warnLevel" style="width:100%">
            <el-option  label="一级告警" value="1"></el-option>
            <el-option  label="二级告警" value="2"></el-option>
            <el-option  label="三级告警" value="3"></el-option>
          </el-select>
          <span class="color">*本系统内嵌三级告警，一级最高需立即人工售后干预，二级次之需客服干预，三级再次之，需客服沟通回访；</span>          
        </el-form-item>
        <el-form-item label="规则用途">
          <template>
            <el-radio-group v-model="form.useType">
              <el-radio :label="1">计划</el-radio>
              <el-radio :label="2">用户报修反馈</el-radio>
              <el-radio :label="3">设备告警</el-radio>
            </el-radio-group> 
          </template>
        </el-form-item>
        <el-form-item>
          <template v-if="form.useType == 3">
            <el-select v-model="monitorValues" style="width:100%">
              <el-option v-for='item in selectLists' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
          </template>
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
import { addRule ,getEnableAbility} from '@/api/alarm'

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
        useType:1,
        monitorValues:[]
      },
      rules: {
        name: [
          { required: true, message: '规则名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '规则描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
      },
      query: {
        limit: 10000,
        page: 1,
        type: 'planning',
        isDelete: 0
      },
      list:[],
      selectLists:[],
      monitorValues:''
    }
  },
  methods: {
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
      if(this.monitorValues){
          this.form.monitorValues.push(this.monitorValues)
      }
      addRule(this.form).then(res => {
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
    this.selectList()
    this.getEnableAbility()
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

