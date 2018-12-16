<template>
    <el-dialog top='4vh' :close-on-click-modal=false title="修改实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
        <el-form label-width="100px" class="mb-22" :model="form">
            <el-form-item label="工程系统分类">
                <el-select v-model="form.typeId"  style="width:100%">
                    <el-option v-for='item in list' :label="item.label" :value="item.id" :key='item.isDelete'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则名称">
                <el-input placeholder="规则名称..." v-model='form.name'></el-input>
            </el-form-item>
            <el-form-item label="规则描述">
                <el-input type="textarea" :rows='3' placeholder="规则描述..." v-model='form.description'></el-input>
            </el-form-item>
            <el-form-item label="告警级别">
                <el-select v-model="form.warnLevel"  style="width:100%">
                    <el-option label="一级告警" value="1"></el-option>
                    <el-option label="二级告警" value="2"></el-option>
                    <el-option label="三级告警" value="3"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click='editRule'>确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { selectList } from '@/api/rent'
import { editRule } from '@/api/alarm'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
        type: Object
    }
  },
  data() {
    return {
      form: {},
      query: {
        limit: 100,
        page: 1,
        type: 'planning'
      },
      list: []
    }
  },
  methods: {
    selectList() {
      selectList(this.query).then(res => {
        this.list = res.data.dictRspPoList
      })
    },
    editRule() {
        if(this.form.status == '启用'){
            this.form.status = 1
          }
          if(this.form.status == '禁用'){
            this.form.status = 3
          }
      editRule(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('update-data', this.form)
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
  watch: {
    data(val) {
      this.form = val
    }
  },
  created () {
    this.selectList()
  }
}
</script>
<style lang="scss" scoped>
.el-input--medium .el-input__inner {
  width: 100%;
}
</style>

