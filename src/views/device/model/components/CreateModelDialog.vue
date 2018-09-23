<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备类型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="100px" class="mb-22">
      <el-form-item label="typeNo">
        <el-input v-model="form.typeNo"></el-input>
      </el-form-item>
      <el-form-item label="缩图">
        <image-uploader @get-url='getURL'></image-uploader>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="来源">
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
              <el-switch style="display: block" v-model="scope.row.isChecked" active-color="#13ce66" inactive-color="#ff4949" active-text="选择" inactive-text="不选择">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="码表">
        <image-uploader excel @get-url='getURL2'></image-uploader>
      </el-form-item>
      <el-form-item label="JSON串">
        <el-input v-model="form.json" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="createForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList } from '@/api/device/function'
import { createDeviceType } from '@/api/device/model'

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
        typeNo: '',
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
        5: '阈值选择类'
      }
    }
  },
  created() {
    this.getdeviceTypeAbilitys()
  },
  methods: {
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

      createDeviceType(form)
        .then(res => {
          this.$emit('update:visible', false)
          this.$emit('add-data', {
            ...form,
            deviceTypeAbilitys: userDeviceTypeAbilitys,
            id: res.data
          })
          console.log({
            ...form,
            deviceTypeAbilitys: userDeviceTypeAbilitys,
            id: res.data
          })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    getURL(url) {
      this.form.icon = url
    },
    getURL2(url) {
      this.form.stopWatch = url
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
