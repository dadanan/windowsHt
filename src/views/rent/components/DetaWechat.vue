<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建实施阶段" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
      <el-form label-width="130px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="实施阶段名称" prop="name">
          <el-input v-model="form.name" placeholder="实施阶段名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="createUserOpenId">
          <el-input placeholder="创建者..." v-model='form.createUserOpenId' disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createUserOpenId">
          <el-input placeholder="创建时间..." v-model='form.createUserOpenId' disabled></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="createUserOpenId">
          <el-input placeholder="状态..." v-model='form.createUserOpenId' disabled></el-input>
        </el-form-item>
        <el-form-item label="实施阶段描述" prop="createUserOpenId">
          <el-input type="textarea" :rows='3' placeholder="实施阶段描述..." v-model='form.createUserOpenId' disabled></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleCancel">确定</el-button>
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
          { required: true, message: '请输入实施阶段名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        createUserOpenId: [
          { required: true, message: '请输入实施阶段描述', trigger: 'blur' }
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
        item['linkAgeStatus'] = item.linkAgeStatus ? 1 : 2
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
