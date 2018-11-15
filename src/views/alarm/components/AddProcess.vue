<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="规则分类" prop="name">
            <el-select placeholder="其他">
              <el-option label="采暖系统" value="1"></el-option>
              <el-option label="中央空调" value="2"></el-option>
              <el-option label="净水系统" value="3"></el-option>
              <el-option label="热水系统" value="4"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="规则名称" prop="createUserOpenId">
          <el-input placeholder="规则名称..." v-model='form.createUserOpenId'></el-input>
        </el-form-item>
        <el-form-item label="规则描述" prop="createUserOpenId">
          <el-input type="textarea" :rows='3' placeholder="规则描述..." v-model='form.createUserOpenId'></el-input>
        </el-form-item>
        <el-form-item label="告警级别" prop="createUserOpenId">
          <el-input placeholder="告警级别..." v-model='form.createUserOpenId'></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='submitForm("form")'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createNewTeam, queryDeviceInfo } from '@/api/device/team'
import { selectAllCustomers as select } from '@/api/customer'
import DTitle from '@/components/Title'

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
        name:'',
        createUserOpenId: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入工程资料分类名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        createUserOpenId: [
          { required: true, message: '请输入工程资料分类描述', trigger: 'blur' }
        ]
      },
      query: {
        limit: 100,
        page: 1
      }
    }
  },
  methods: {
    submitForm(formName) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createNewTeam()
        } else {
          return false
        }
      })
    },
    createNewTeam() {
      this.teamDeviceCreateRequestList.forEach(item => {
        item['linkAgeStatus'] = item.linkAgeStatus ? 1 : 0
      })

      const form = {
        ...this.form,
        teamDeviceCreateRequestList: this.teamDeviceCreateRequestList.filter(
          item => item.mac
        ),
        createTime: new Date().valueOf()
      }
      createNewTeam(form).then(res => {
        this.$emit('update:visible', false)
        this.$emit('add-data', {
          ...form,
          id: res.data
        })
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
