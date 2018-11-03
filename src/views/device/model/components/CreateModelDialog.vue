<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备类型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-form label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
        <el-form-item label="缩图">
          <image-uploader @get-url='getURL'></image-uploader>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-input v-model="form.source"></el-input>
        </el-form-item>
        <el-form-item label="功能项">
          <el-table :data="deviceTypeAbilitys" style="width: 100%" class="mb20" border>
            <el-table-column label="功能项名称">
              <template slot-scope="scope">
                {{scope.row.abilityName}}
              </template>
            </el-table-column>
            <el-table-column label="功能项类型">
              <template slot-scope="scope">
                {{typeModel[scope.row.abilityType]}}
              </template>
            </el-table-column>
            <el-table-column label="是否选择">
              <template slot-scope="scope">
                <el-switch style="display: block;" v-model="scope.row.isChecked" active-color="#13ce66" inactive-color="#ff4949" active-text="选择" inactive-text="不选择">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="码表" prop="stopWatch">
          <el-input v-model="form.stopWatch" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList } from '@/api/device/function'
import { createDeviceType } from '@/api/device/type'

export default {
  components: {
    ImageUploader
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        icon: '',
        source: '',
        deviceTypeAbilitys: [],
        stopWatch: '',
        remark: ''
      },
      deviceTypeAbilitys: [],
      typeModel: {
        1: '文本类',
        2: '单选类',
        3: '多选类',
        4: '阈值类',
        5: '阈值选择类',
        6: '设备传参类'
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '请添加备注', trigger: 'blur' },
          {
            min: 0,
            max: 100,
            message: '长度在 0 到 100 个字符',
            trigger: 'blur'
          }
        ],
        stopWatch: [
          { required: true, message: '请添加码表', trigger: 'blur' },
          {
            min: 0,
            max: 100,
            message: '长度在 0 到 100 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getdeviceTypeAbilitys()
  },
  methods: {
    submitForm(formName) {
      //判断表单数据是否为空
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createForm()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      //清空表单里面的数据
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    createForm() {
      const userDeviceTypeAbilitys = this.deviceTypeAbilitys.filter(
        item => item.isChecked
      )
      const newDeviceTypeAbilitys = userDeviceTypeAbilitys.map(item => {
        return {
          abilityId: item.id
        }
      })
      const form = {
        ...this.form,
        deviceTypeAbilitys: newDeviceTypeAbilitys
      }
      createDeviceType(form).then(res => {
        this.$emit('update:visible', false)
        this.$emit('add-data', {
          ...form,
          deviceTypeAbilitys: userDeviceTypeAbilitys,
          id: res.data
        })
      })
    },
    getURL(url) {
      this.form.icon = url
    },
    getdeviceTypeAbilitys() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.deviceTypeAbilitys = response.data
      })
    }
  }
}
</script>

