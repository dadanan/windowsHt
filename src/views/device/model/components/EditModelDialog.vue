<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑设备类型" :visible="visible" @update:visible="$emit('update:visible', $event)">
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
      deviceTypeAbilitys: [], // API获取所有数据
      typeModel: {
        1: '文本类',
        2: '单选类',
        3: '多选类',
        4: '阈值类',
        5: '阈值选择类'
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
      // /**
      //  * 该id对应的功能项存在与此次用户选择的功能项数据列表中
      //  * @return true / false
      //  */
      // const isStillChecked = id => {
      //   return this.userDeviceTypeAbilitys.findIndex(item => item === id) !== -1
      // }

      // /**
      //  * 该id对应的功能项不在“用户上次选择的功能项数据中”
      //  * @return true / false
      //  */
      // const isNotCheckedBefore = id => {
      //   return (
      //     this.data.deviceTypeAbilitys.findIndex(
      //       item => item.abilityId === id
      //     ) === -1
      //   )
      // }

      // // 遍历用户 上次选择的功能项数据， 然后判断加不加status:2
      // const newDeviceTypeAbilitys = this.data.deviceTypeAbilitys.map(item => {
      //   if (isStillChecked(item.abilityId)) {
      //     return {
      //       abilityId: item.abilityId,
      //       id: item.id
      //     }
      //   } else {
      //     return {
      //       abilityId: item.abilityId,
      //       id: item.id,
      //       status: 2
      //     }
      //   }
      // })

      // // 遍历用户当前选择的功能项，如果不在“用户上次选择的功能项数据中”，id设置为0
      // let tempArray = this.userDeviceTypeAbilitys.map(id => {
      //   console.log(isNotCheckedBefore(id))
      //   if (isNotCheckedBefore(id)) {
      //     return {
      //       abilityId: id
      //     }
      //   }
      // })

      // // 去掉 undefined 元素项
      // tempArray = tempArray.filter(item => item)

      const userDeviceTypeAbilitys = this.deviceTypeAbilitys.filter(
        item => item.isChecked
      )

      const newDeviceTypeAbilitys = userDeviceTypeAbilitys.map(item => {
        return {
          abilityId: item.id
        }
      })

      const form = {
        ...this.data,
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
      this.data.icon = url
    },
    getURL2(url) {
      this.data.stopWatch = url
    },
    getdeviceTypeAbilitys() {
      fetchList({
        page: 1,
        limit: 1000
      }).then(res => {
        res.data.forEach(item => {
          item.isChecked = ''
        })
        this.deviceTypeAbilitys = res.data
      })
    }
  },
  created() {
    this.getdeviceTypeAbilitys()
  },
  watch: {
    data(val) {
      // 判断当前id的功能项是否在用户传入的编辑数据中（即，是否已经被选择）
      // 如果用户添加完直接编辑，那么数据中将没有abilityId,而应该是id
      const isCheckedBefore = id => {
        return (
          val.deviceTypeAbilitys.findIndex(
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
    }
  }
}
</script>
