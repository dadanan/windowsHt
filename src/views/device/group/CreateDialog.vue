<template>
  <el-dialog title="添加设备组" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="组名">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="组标">
        <image-uploader @get-url='getURL'></image-uploader>
      </el-form-item>
      <el-form-item label="封面">
        <image-uploader @get-url='getURL'></image-uploader>
      </el-form-item>
      <el-form-item label="图册">
        <image-uploader @get-url='getURL' :isList='true'></image-uploader>
      </el-form-item>
      <el-form-item label="视频">
        <image-uploader @get-url='getURL' :isList='true'></image-uploader>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type='textarea' :rows='3' v-model="form.source"></el-input>
      </el-form-item>
      <d-title>组内设备</d-title>
      <el-table :data='options' style="width: 100%" class="mb20" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.quantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="mac" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.quantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="管理名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.quantity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="联动设置" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch @change='switchChanged(scope.row)' style="display: block" v-model="scope.row.switch" active-color="#13ce66" inactive-color="#ff4949" active-text="关联" inactive-text="非关联">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click='newRow'>+添加设备</el-button>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList, createDeviceType } from '@/api/device/model'
import DTitle from '@/components/Title'

export default {
  components: {
    ImageUploader,
    DTitle
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
        switch: true
      },
      options: [{}]
    }
  },
  created() {
    // this.getModelList()
  },
  methods: {
    switchChanged(data) {
      if (this.options.length < 2) {
        data.switch = false
        this.$message({
          type: 'warning',
          message: '开启设备‘可关联’需要存在两个及以上的设备！'
        })
      }
    },
    newRow() {
      this.options.push({})
    },
    createDeviceType() {
      createDeviceType(this.form).then(res => {
        console.log(res)
      })
    },
    getModelList() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.modelList = response.data
      })
    },
    getURL(url) {
      this.form.icon = url
    },
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    }
  }
}
</script>