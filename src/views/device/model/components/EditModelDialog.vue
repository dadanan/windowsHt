<template>
  <el-dialog title="编辑备案机型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="typeNo">
        <el-input v-model="data.typeNo"></el-input>
      </el-form-item>
      <el-form-item label="缩图">
        <image-uploader :url='data.icon' @get-url='getURL' :imageName='getImageName(data.icon)'></image-uploader>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="data.source"></el-input>
      </el-form-item>
      <el-form-item label="功能项">
        <el-checkbox-group v-model="userDeviceTypeAblitys">
          <el-checkbox v-for="(item, index) in deviceTypeAblitys" :key="index" :label="item.id">
            {{ item.ablityName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="码表">
        <image-uploader :url='data.stopWatch' @get-url='getURL2' :imageName='getImageName(data.stopWatch)' excel></image-uploader>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="data.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="updateForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList } from '@/api/device/function'
import { updateDeviceType } from '@/api/device/model'

export default {
  components: {
    ImageUploader
  },
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
      deviceTypeAblitys: [], // API获取所有数据
      userDeviceTypeAblitys: [] // 传入的用户选择数据，例：[1,2]
    }
  },
  methods: {
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    },
    updateForm() {
      const newDeviceTypeAblitys = this.deviceTypeAblitys.map(item => {
        return {
          ablityId: item
        }
      })

      const form = {
        ...this.data,
        deviceTypeAblitys: newDeviceTypeAblitys
      }

      updateDeviceType(form)
        .then(res => {
          if (res.code === 200) {
            const tempArray = this.deviceTypeAblitys.filter(item => {
              return this.userDeviceTypeAblitys.indexOf(item.id) !== -1
            })
            this.$emit('update:visible', false)
            this.$emit('update-data', {
              ...form,
              deviceTypeAblitys: tempArray
            })

            this.$message({
              type: 'success',
              message: '更新成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getURL(url) {
      this.data.icon = url
    },
    getURL2(url) {
      this.data.stopWatch = url
    },
    getdeviceTypeAblitys() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(response => {
        this.deviceTypeAblitys = response.data
      })
    }
  },
  created() {
    this.getdeviceTypeAblitys()
  },
  watch: {
    data(val) {
      this.userDeviceTypeAblitys = val.deviceTypeAblitys.map(
        // 这块加个或判断是因为，刚添加的数据和刷新后获取到的数据参数名字不一样
        item => item.ablityId || item.id
      )
    }
  }
}
</script>
