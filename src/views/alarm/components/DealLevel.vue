<template>
    <div>
        <el-dialog top='4vh' :close-on-click-modal=false title="标记处理中" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
            <el-form label-width="120px" class="mb-22" :model="form">
                <el-form-item label="分配指定人">
                    
                    <span class="color"> *已安排人处理任务时，将任务标志为处理中</span>
                </el-form-item>
                <el-form-item label="处理说明">
                    <el-input type="textarea" :rows='3' placeholder="请输入处理说明..." v-model='form.description'></el-input>
                    <span class="color"> *已安排人处理任务时，将任务标志为处理中</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click='jobFlow'>确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { jobFlow , queryAdmins } from '@/api/alarm'
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
    return {
      form: {
          operateType:2
      },
      list:{}
    }
  },
  methods: {
    queryAdmins(val){
      queryAdmins(val).then(res=>{
        console.log(res.data)
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    jobFlow() {
        this.form.jobId = this.list.id
      jobFlow(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '标记成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', this.form)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  },
  watch: {
    data(val) {
        this.list = val
        // this.queryAdmins(val.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.color{
  color: #969696
}
</style>