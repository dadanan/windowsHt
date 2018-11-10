<template>
  <div>
    <el-table :data="getFormatItemsList()" style="width: 100%" class="mb20" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="showName" label="功能名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <template v-if='scope.row.abilityType == 2'>
            <template v-if='isDoubleMachine(scope.row.abilityId) && windOneData'>
              <!-- 双风机 -->
              <el-select v-model="windOneSelectedId" @change='optionChangedHandler(arguments,windOneData.abilityId)'>
                <el-option v-for='item in windOneData.deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
              </el-select>
              <el-select v-model="windTwoSelectedId" @change='optionChangedHandler(arguments,windTwoData.abilityId)' :disabled="isCircleSwitchOff()">
                <el-option v-for='item in windTwoData.deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
              </el-select>
            </template>
            <template v-else>
              <!-- 单风机或者其他普通单选型 -->
              <el-select v-model="scope.row.selectedOptionId" @change='optionChangedHandler(arguments,scope.row.abilityId)'>
                <el-option v-for='item in getAbilityOption(scope.row.abilityId)' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
              </el-select>
            </template>
          </template>
          <template v-else-if='scope.row.abilityType == 3'>
            <el-select multiple collapse-tags v-model="scope.row.selectedOptionId" @change='optionChangedHandler(arguments,scope.row.abilityId)'>
              <el-option v-for='item in getAbilityOption(scope.row.abilityId)' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/**
 * 智慧新风-双风机
 */
import { selectById } from '@/api/device/model'
import { newQueryDetailByDeviceId, sendFunc } from '@/api/device/list'

export default {
  props: ['detailData'],
  data() {
    return {
      abilitysList: [],
      formatItemsList: [],
      pageName: '',
      setInter: undefined,
      selection: [], // 同步保存的多选型功能项用户选择数据,选项id
      windOneData: {
        deviceModelAbilityOptions: []
      }, // 风机1的数据
      windTwoData: {
        deviceModelAbilityOptions: []
      },
      windOneSelectedId: undefined, // 风机1被选择的档位的id
      windTwoSelectedId: undefined
    }
  },
  methods: {
    /**
     * 循环阀已经打开
     */
    isCircleSwitchOff() {
      const circleSwitch = this.getAbilityOption(
        this.formatItemsList[3].abilityId
      ).filter(item => item.dirValue == '290')[0]
      return circleSwitch && circleSwitch.isSelect == 0
    },
    /**
     * 当前版式是双风机型
     * @param abilityId 版式配置项选择的功能项id
     */
    isDoubleMachine(abilityId) {
      const data = this.getAbilityData(abilityId)
      if (!data) {
        return false
      }

      const option = data.deviceModelAbilityOptions
      return option[0].optionValue == '280' || option[1].optionValue == '280'
    },
    /**
     * 下拉选择框数据变化监听器，然后发送对应指令
     * @param argu 用户选择的功能选项的id
     * @param abilityId 用户选择的功能项id
     */
    optionChangedHandler(argu, abilityId) {
      argu = argu[0]
      const ability = this.getAbilityData(abilityId)
      if (ability.abilityType == 2) {
        // 如果是单选型
        if (ability.dirValue == '281') {
          // 如果是送风风机，判断循环阀是否打开
          const circleSwitch = this.getAbilityOption(
            this.formatItemsList[3].abilityId
          ).filter(item => item.dirValue == '290')[0]
          if (circleSwitch.isSelect == 0) {
            this.$message({
              message: '循环阀未打开，禁止操作送风风机！',
              type: 'warning'
            })
            return
          }
        }
        const option = ability.deviceModelAbilityOptions.filter(
          item => item.id == argu
        )[0]
        this.sendFunc(ability.dirValue, option.dirValue)
      } else {
        // 如果是多选型
        // 新增选择的id
        const newChecked = argu.filter(id => !this.selection.includes(id))
        // 新增取消选择的id
        const newCanceled = this.selection.filter(id => !argu.includes(id))
        // 多个发送指令接口的参数变量
        const tempArguments = []

        ability.deviceModelAbilityOptions.forEach(item => {
          if (newChecked.includes(item.id)) {
            tempArguments.push({
              funcId: item.dirValue,
              value: 1
            })
          } else if (newCanceled.includes(item.id)) {
            tempArguments.push({
              funcId: item.dirValue,
              value: 0
            })
          }
        })

        const promistList = tempArguments.map(item => {
          return sendFunc({
            deviceId: this.detailData.id,
            funcId: item.funcId,
            value: item.value
          })
        })

        Promise.all(promistList).then(() => {
          this.$message({
            message: '指令发送成功！',
            type: 'success'
          })
          // 始终保持改变量数据和用户选择的数据一致
          this.selection = argu
        })
      }
    },
    sendFunc(funcId, value, cb) {
      console.log(`开始发送指令：${funcId}-${value}`)
      return sendFunc({
        deviceId: this.detailData.id,
        funcId,
        value
      }).then(() => {
        this.$message({
          message: '指令发送成功！',
          type: 'success'
        })
        if (cb) cb()
      })
    },
    getFormatItemsList() {
      if (!this.formatItemsList) {
        return []
      }
      return this.formatItemsList.filter(
        item =>
          item.showStatus == 1 &&
          (item.abilityType == 2 || item.abilityType == 3)
      )
    },
    getAbilityData(id) {
      const result = this.abilitysList.filter(item => item.abilityId == id)
      return result && result[0]
    },
    /**
     * 根据指令查询功能项数据
     */
    getAbilityByDirValue(dirValue) {
      const result = this.abilitysList.filter(item => item.dirValue == dirValue)
      return result && result[0]
    },
    getAbilityOption(id) {
      const data = this.getAbilityData(id)

      if (!data) {
        return []
      }

      return data.deviceModelAbilityOptions
    },
    selectById(id) {
      selectById(id).then(res => {
        const data = res.data
        // 修改字段名称，和H5代码保持一致
        data.abilitysList = data.deviceModelAbilitys

        this.pageName = data.pageName

        data.abilitysList.forEach(item => {
          item['currValue'] = ''
          if (!item.deviceModelAbilityOptions) {
            return
          }

          item.deviceModelAbilityOptions = item.deviceModelAbilityOptions.filter(
            item =>
              item.updateStatus !== 3 ||
              item.updateStatus !== -1 ||
              item.status !== 2 ||
              item.status !== 3
          )

          item.deviceModelAbilityOptions.forEach(iItem => {
            iItem.isChecked = false
          })
        })

        // 筛选功能项数据，去掉updateStatus:3或者-1的还有status:3、2的
        this.abilitysList = data.abilitysList.filter(
          item =>
            item.updateStatus !== 3 ||
            item.updateStatus !== -1 ||
            item.status !== 2 ||
            item.status !== 3
        )

        let list = data.deviceModelFormat.modelFormatPages
        if (list[0]) {
          list = list[0].modelFormatItems

          // 如果是双风机，单独将送/回风机的功能项加进来
          const tempList = []
          if (this.isDoubleMachine(list[2].abilityId)) {
            tempList.push({
              abilityId: this.getAbilityByDirValue('280').abilityId
            })
            tempList.push({
              abilityId: this.getAbilityByDirValue('281').abilityId
            })
          }

          // 新增属性，表示用户选择的选项的id
          list.forEach(item => {
            if (item.abilityType == 2) {
              item['selectedOptionId'] = undefined
            } else if (item.abilityType == 3) {
              item['selectedOptionId'] = []
            }
          })
          this.formatItemsList = list
          // 定时请求接口数据，更新页面数据
          this.setInter = setInterval(() => {
            this.getIndexFormatData(list.concat(tempList))
          }, 3000)
        }
      })
    },
    getIndexFormatData(list) {
      // 获取H5控制页面功能项数据，带isSelect参数
      // 根据功能项id筛选功能项
      const findTheAbility = (data, id) => {
        const result = data.filter(item => item.id == id)
        return result && result[0]
      }

      const tempIds = list
        .filter(item => item.abilityId)
        .map(item => item.abilityId)

      // const ids = []
      // // 将可能存在的多个ids拆分成单独的id
      // tempIds.forEach(item => {
      //   if (!item) {
      //     return
      //   }
      //   const temp = item.split(',')
      //   ids.push(...temp)
      // })

      newQueryDetailByDeviceId({
        deviceId: this.detailData.id,
        abilityIds: tempIds
      }).then(res => {
        const data = res.data
        // 将res.data中的isSelect和dirValue赋值过去
        this.abilitysList.forEach((item, index) => {
          const realAbilityData = findTheAbility(data, item.abilityId)
          if (!realAbilityData) {
            return
          }
          // 如果有值，说明是传感器型功能项，讲数值拿过来
          if (realAbilityData.currValue) {
            item['currValue'] = realAbilityData.currValue
          }
          if (
            !item.deviceModelAbilityOptions ||
            item.deviceModelAbilityOptions.length == 0 ||
            item.abilityType == 1
          ) {
            return
          }
          item.deviceModelAbilityOptions.forEach((option, oIndex) => {
            if (!realAbilityData.abilityOptionList) {
              return
            }
            Object.assign(option, realAbilityData.abilityOptionList[oIndex])
          })
        })

        this.init()
      })
    },
    /**
     * 初始化模式、风速、功能、开关、童锁这样的数据
     */
    init() {
      const formatItemsList = this.getFormatItemsList()
      formatItemsList.forEach(item => {
        const optionList = this.getAbilityOption(item.abilityId)

        if (this.isDoubleMachine(item.abilityId)) {
          // 双风机初始化
          this.windOneData = this.getAbilityByDirValue(optionList[0].dirValue)
          this.windTwoData = this.getAbilityByDirValue(optionList[1].dirValue)
          if (!this.windOneData) {
            return
          }
          // 找到用户选择的档位，初始化
          this.windOneData.deviceModelAbilityOptions.forEach(option => {
            if (option.isSelect == 1) {
              this.windOneSelectedId = option.id
            }
          })
          this.windTwoData.deviceModelAbilityOptions.forEach(option => {
            if (option.isSelect == 1) {
              this.windTwoSelectedId = option.id
            }
          })
          return
        }

        if (item.abilityType == 2) {
          // 单选
          // 找到被选择的选项，将id赋值到初始化变量上
          optionList.forEach(option => {
            if (option.isSelect == 1) {
              console.log(123, option.id)
              this.$set(item, 'selectedOptionId', option.id)
            }
          })
          return
        }

        if (item.abilityType == 3) {
          // 多选
          let selection = []
          optionList.forEach(option => {
            if (option.isSelect == 1) {
              selection.push(option.id)
            }
          })
          item.selectedOptionId = selection
          // 同时将多选的数据另外保存一份，保持同步
          this.selection = selection
        }
      })
    }
  },
  created() {
    this.selectById(this.detailData.modelId)
  },
  watch: {
    detailData(val) {
      if (!val) {
        return
      }
      this.selectById(val.modelId)
    }
  },
  destroyed() {
    clearInterval(this.setInter)
  }
}
</script>
