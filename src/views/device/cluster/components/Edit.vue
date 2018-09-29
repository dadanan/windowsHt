<template>
  <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="集群名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="群内设备">
        <div class="addForm">
          <el-input v-model="addForm.mac" placeholder="设备 MAC"></el-input>
          <el-button type="primary" class="add" @click="addDevice">添加</el-button>
        </div>
        <el-table :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" border highlight-current-row class="mb20">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column v-for="data in deviceData" :key="data.prop" :prop="data.prop" :label="data.label" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteDevice(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="客户">
        <el-select v-model="form.customerId" placeholder='请选择'>
          <el-option v-for='item in customerList' :label="item.name" :value="item.id" :key='item.key'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图册">
        <image-uploader :urls='form.imageVideoList' @get-url='setImg' @remove-url='removeImg' :isList='true'></image-uploader>
      </el-form-item>
      <el-form-item label="群介绍">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="地点">
        <el-input v-model="form.createLocation"></el-input>
      </el-form-item>
      <el-form-item label="添加备注">
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="table-opts">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='createCluster'>确定</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { select } from '@/api/customer'
import { queryGroupById } from '@/api/device/cluster'
import { addOrUpdateGroupAndDevice } from '@/api/device/cluster'

export default {
  components: { ImageUploader },
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        customerId: '',
        teamCover: '',
        imageVideoList: [],
        introduction: ''
      },
      deviceList: [],
      addForm: {
        mac: ''
      },
      query: {
        limit: 100,
        page: 1
      },
      selectedDeviceList: [],
      customerList: [],
      deviceData: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'typeID',
          label: 'typeID'
        },
        {
          prop: 'mac',
          label: 'MAC'
        }
      ]
    }
  },
  created() {
    this.select()
    this.queryGroupById()
  },
  methods: {
    setImg(file) {
      this.form.imageVideoList = [
        ...this.form.imageVideoList,
        { imgVideo: file.url }
      ]
    },
    removeImg(file) {
      const index = this.form.imageVideoList.findIndex(
        v => v.imgVideo === file.url
      )
      this.form.imageVideoList.splice(index, 1)
    },
    queryGroupById() {
      queryGroupById(this.datas.id).then(res => {
        if (res.code === 200) {
          this.form = {
            ...res.data,
            imageVideoList: res.data.imageVideoList || []
          }
        }
      })
    },
    addDevice() {
      this.deviceList.push({
        mac: this.addForm.mac
      })
    },
    deleteDevice(index) {
      this.deviceList.splice(index, 1)
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    select() {
      select(this.query).then(res => {
        this.customerList = res.data || []
      })
    },
    createCluster() {
      const data = {
        ...this.form,
        deviceQueryRequest: {
          deviceList: this.deviceList
        }
      }
      addOrUpdateGroupAndDevice(data).then(res => {
        if (res.code === 200 && res.data) {
          data.id = res.data.id
          this.$emit('update', data)
          this.$message.success('更新成功')
        } else {
          this.$message.error(msg)
        }
      })
    },
    handleCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.addForm {
  display: flex;
  margin-bottom: 15px;

  .add {
    margin-left: 20px;
  }
}
.mb20 {
  padding: 0 2px;
}
.table-opts {
  margin-top: 30px;
}
</style>
