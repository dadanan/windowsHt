<template>
  <div>
    <el-button-group>
      <el-popover placement="right" trigger="click">
        <vue-qrcode value="Hello, World!" :options="{ width: 200 }"></vue-qrcode>
        <el-button type="primary" slot="reference">分享</el-button>
      </el-popover>
      <el-button type="primary">授权管理</el-button>
    </el-button-group>
    <!-- <el-table :data="abilitysList" style="width: 100%" class="mb20" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="从设备名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="childId" label="从设备ID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column prop="type" label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column label="绑定状态" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          {{scope.row.bindStatus === 1 ? '已绑定' : '未绑定'}}
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import { abilitysList, formatItemsList } from './test.js'
import { selectById } from '@/api/device/model'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  data() {
    return {
      abilitysList: [],
      formatItemsList: [],
      pageName: '',
      setInter: undefined
    }
  },
  methods: {
    selectById(id) {
      selectById(id).then(res => {
        const data = res.data
        // 修改字段名称，和H5代码保持一致
        data.abilitysList = data.deviceModelAbilitys
        // data.formatItemsList =
        //   data.deviceModelFormat.deviceModelFormat[0].modelFormatItems

        this.pageName = data.pageName
        this.formatItemsList = data.formatItemsList

        data.abilitysList.forEach(item => {
          item['currValue'] = ''
          item.abilityOptionList &&
            item.abilityOptionList.forEach(iItem => {
              iItem.isChecked = false
            })
        })
        this.abilitysList = data.abilitysList
        // 定时请求接口数据，更新页面数据
        this.setInter = setInterval(() => {
          // this.getIndexFormatData(res.data)
        }, 1000)
      })
    },
    getIndexFormatData(list) {
      // 获取H5控制页面功能项数据，带isSelect参数
      // 根据功能项id筛选功能项
      const findTheAbility = (data, id) => {
        return data.filter(item => item.id === id)[0]
      }
      return
      newQueryDetailByDeviceId({
        deviceId: this.deviceId,
        abilityIds: list.formatItemsList
          .filter(item => item.abilityId)
          .map(item => item.abilityId)
      }).then(res => {
        const data = res.data
        // 将res.data中的isSelect和dirValue赋值过去
        this.abilitysList.forEach((item, index) => {
          // 如果有值，说明是温度功能项，讲数值拿过来
          if (data[index] && data[index].currValue) {
            // 找到对应的温度功能项对象
            const temp = this.abilitysList.filter(
              itemA => itemA.abilityId === data[index].id
            )[0]

            try {
              temp['currValue'] = data[index].currValue
            } catch (e) {}
          }
          if (!item.abilityOptionList || item.abilityOptionList.length === 0) {
            return
          }
          item.abilityType !== 1 &&
            item.abilityOptionList.forEach((option, oIndex) => {
              const result = findTheAbility(data, item.abilityId)
              if (result) {
                const temp = Object.assign(
                  option,
                  result.abilityOptionList[oIndex]
                )
              }
            })
        })

        this.switchHandler()
        this.setPopDialogData()
      })
    }
  },
  components: {
    VueQrcode
  }
}
</script>
