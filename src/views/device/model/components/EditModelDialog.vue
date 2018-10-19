<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑设备类型" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="typeNo">
          <el-input v-model="form.typeNo"></el-input>
        </el-form-item>
        <el-form-item label="缩图">
          <image-uploader :url='form.icon' @get-url='getURL' :imageName='getImageName(form.icon)'></image-uploader>
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
          <el-input v-model="form.stopWatch" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="updateForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { updateDeviceType, selectById } from '@/api/device/type'

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
    },
    abilityList: {
      type: Array
    }
  },
  data() {
    return {
      deviceTypeAbilitys: [], // API获取所有数据
      typeModel: {
        1: '文本类',
        2: '单选类',
        3: '多选类',
        4: '阈值类',
        5: '阈值选择类'
      },
      form: {
        typeNo: '',
        icon: '',
        source: '',
        name: '',
        stopWatch: '',
        remark: ''
      }
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

      updateDeviceType(form)
        .then(res => {
          if (res.code === 200) {
            this.$emit('update:visible', false)
            this.$emit('update-data', {
              ...form,
              deviceTypeAbilitys: userDeviceTypeAbilitys
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
      this.form.icon = url
    }
  },
  watch: {
    data(val) {
      const form = JSON.parse(JSON.stringify(val))
      this.deviceTypeAbilitys = JSON.parse(JSON.stringify(this.abilityList))

      // 判断当前id的功能项是否在用户传入的编辑数据中（即，是否已经被选择）
      // 如果用户添加完直接编辑，那么数据中将没有abilityId,而应该是id
      const isCheckedBefore = id => {
        return (
          form.deviceTypeAbilitys.findIndex(
            item => (item.abilityId || item.id) === id
          ) !== -1
        )
      }

      // 根据用户“已选择”的功能项数据，初始化开关框
      this.deviceTypeAbilitys.forEach(item => {
        if (isCheckedBefore(item.id)) {
          item.isChecked = true
        }
      })

      this.form = form
    }
  }
}
</script>
