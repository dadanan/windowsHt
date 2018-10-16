<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="设备添加" :visible="visible" @update:visible="$emit('update:visible', $event)">
      <div class="table-opts">
        <el-button-group>
          <el-button type="primary" @click="addDeviceDialogVisible = true">添加</el-button>
        </el-button-group>
      </div>
      <el-table :data="deviceList" style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="typeId" label="typeId" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="mac" label="MAC" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop='birthTime' label="注册时间" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column prop="hardVersion" label="硬件版本" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteDeviceHandler(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-form>
        <el-form-item label="添加备注">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="description">
          </el-input>
        </el-form-item>
      </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type="primary" @click="createDevice">确认添加</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="录入设备信息" :visible.sync="addDeviceDialogVisible">
      <el-form label-width="80px" label-position="left" :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="typeId">
          <el-select v-model="addForm.typeId">
            <el-option v-for='item in list' :label="item.name" :value="item.id" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="addForm.mac"></el-input>
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-input v-model="addForm.hardVersion"></el-input>
        </el-form-item>
        <el-form-item label="录入时间">
          <el-input v-model="addForm.birthTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/device/type'
import { createDevice } from '@/api/device/list'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      file: '/usr/device.xsl',
      // description: '',
      addForm: {
        name: '',
        typeId: '',
        mac: '',
        birthTime: new Date().toLocaleString(),
        hardVersion: ''
      },
      addDeviceDialogVisible: false,
      list: [],
      listQuery: {
        limit: 100,
        page: 1
      },
      deviceList: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        mac: [
          { required: true, message: '请输入Mac', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    createDevice() {
      const tempDeviceList = JSON.parse(JSON.stringify(this.deviceList))
      
      tempDeviceList.forEach(item => {
        item.birthTime = new Date().valueOf()
      })
      const form = {
        deviceList: tempDeviceList
      }
      createDevice(form)
        .then(res => {
          form.deviceList.forEach((item, index) => {
            item.id = res.data[index].deviceId
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', form)
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm(formName) {  //判断表单数据是否为空
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDevice()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) { //清空表单里面的数据
      this.$refs[formName].resetFields();
      this.addDeviceDialogVisible = false
    },
    addDevice() {
        this.deviceList.push(Object.assign({}, this.addForm))
        this.addDeviceDialogVisible = false
    },
    deleteDeviceHandler(index) {
      this.deviceList.splice(index, 1)
    },
    getDeviceTypeList() {
      fetchList(this.listQuery).then(res => {
        if (res.data || res.data.length === 0) {
          // #TODO 增加个不可关闭的弹框，让用户必须先去设备类型那里添加至少一个设备类型
        }
        this.list = res.data
      })
    }
  },
  created() {
    this.getDeviceTypeList()
  }
}
</script>
