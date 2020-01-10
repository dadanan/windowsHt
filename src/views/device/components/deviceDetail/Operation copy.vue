<template>
  <div>
    <el-table :data="getFormatItemsList()" style="width: 100%" class="mb20" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="showName" label="功能名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <template v-if='scope.row.abilityType == 2 '>
            <template v-if='hasMultipleId(scope.row.abilityId) && windData'>
              <!-- 双风机 -->
              <el-select v-if='windData[0]' v-model="windOneSelectedId" @change='optionChangedHandler(arguments,windData[0].abilityId)'>
                <el-option v-for='item in windData[0].deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
              </el-select>
              <el-select v-if='windData[1]' v-model="windTwoSelectedId" @change='optionChangedHandler(arguments,windData[1].abilityId)' :disabled="isCircleSwitchOff()">
                <el-option v-for='item in windData[1].deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
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
          <template v-else-if='scope.row.abilityType == 1'>
              <template v-if="scope.row.abilityId">
                <el-input style="width:200px" v-model='(getAbilityDatas(scope.row.abilityId)).currValue ' @change="changes($event,scope.row)"></el-input>
                {{(getAbilityDatas(scope.row.abilityId)).unit }}
              </template>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip sortable>
        <template slot-scope="scope">
          <template>
            <template v-if='scope.row.abilityType == 2 '>
              <template v-if='hasMultipleId(scope.row.abilityId) && windData'>
                <!-- 双风机 -->
                <el-select disabled v-if='windData[0]' v-model="windOneSelectedId" @change='optionChangedHandler(arguments,windData[0].abilityId)'>
                  <el-option v-for='item in windData[0].deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
                </el-select>
                <el-select disabled v-if='windData[1]' v-model="windTwoSelectedId" @change='optionChangedHandler(arguments,windData[1].abilityId)' :disabled="isCircleSwitchOff()">
                  <el-option v-for='item in windData[1].deviceModelAbilityOptions' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
                </el-select>
              </template>
              <template v-else>
                <!-- 单风机或者其他普通单选型 -->
                <el-select disabled v-model="scope.row.selectedOptionId" @change='optionChangedHandler(arguments,scope.row.abilityId)'>
                  <el-option v-for='item in getAbilityOption(scope.row.abilityId)' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
                </el-select>
              </template>
            </template>
            <template v-else-if='scope.row.abilityType == 3'>
              <el-select disabled multiple collapse-tags v-model="scope.row.selectedOptionId" @change='optionChangedHandler(arguments,scope.row.abilityId)'>
                <el-option v-for='item in getAbilityOption(scope.row.abilityId)' :key='item.id' :label="item.definedName" :value="item.id"></el-option>
              </el-select>
            </template>
            <template v-else-if='scope.row.abilityType == 1'>
                <template v-if="scope.row.abilityId">
                  {{getAbilityDatas(scope.row.abilityId).currValue}}
                  {{(getAbilityDatas(scope.row.abilityId)).unit}}
                </template>
            </template>
          </template>          
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/**
 * 智慧新风-双风机
 */
import { selectById ,queryDeviceOperation} from '@/api/device/model'
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
      windData: null, // 双风机数据
      windOneSelectedId: undefined, // 风机1被选择的档位的id
      windTwoSelectedId: undefined
    }
  },
  methods: {
    queryDeviceOperation(id) {
      queryDeviceOperation(id).then(res => {
        console.log(res.data)
      })
    },  
    changes(value,vals){
      const datas = this.getAbilityDatas(vals.abilityId)
      const funcId = datas.dirValue
      sendFunc({
        deviceId: this.detailData.id,
        funcId,
        value
      }).then(() => {
        this.$message({
          message: '指令发送成功！',
          type: 'success'
        })
      })
    },
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
     * abilityId参数有多个id？
     * 如果调用时this.formatItemsList还没有赋值时，从data参数里取
     * @param abilityId 版式配置项选择的功能项id
     * @param data 型号版式数据
     */
    hasMultipleId(abilityId, data) {
      if (data) {
        return data[2].abilityId.split(',').length !== 1
      }

      return abilityId.split(',').length !== 1
    },
    /**
     * 下拉选择框数据变化监听器，然后发送对应指令
     * @param argu 用户选择的功能选项的id
     * @param abilityId 用户选择的功能项id
     */
    optionChangedHandler(argu, abilityId) {
      argu = argu[0]

      const ability = this.getAbilityData(abilityId)
      // console.log('ability', ability)

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

        ability.forEach(item => {
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
      // console.log(this.formatItemsList)
      for(var i = 0 ;i<this.abilitysList.length;i++){
        if(this.formatItemsList[i].abilityId == this.abilitysList[i].abilityId){
          this.formatItemsList[i].showName == this.abilitysList[i].definedName
        }
      }
      return this.formatItemsList.filter(
        item =>
          item.showStatus == 1 &&
          (item.abilityType == 2 || item.abilityType == 3 || item.abilityType == 1)
      )
      
    },
    getAbilityData(id) {
      const ids = String(id).split(',')
      if (ids.length === 1) {
        const result = this.abilitysList.filter(item => item.abilityId == id)
        return result && result[0]
      }

      return this.abilitysList.filter(ability =>
        ids.includes(String(ability.abilityId))
      )
    },
    /**
     * 根据指令查询功能项数据
     */
    getAbilityByDirValue(dirValue) {
      const result = this.abilitysList.filter(item => item.dirValue == dirValue)
      return result && result[0]
    },
    getAbilityOption(id) {
      if (!id) {
        return []
      }
      const ids = String(id).split(',')
      // 非选择多功能项id时
      if (ids.length === 1) {
        const data = this.getAbilityData(id)
        if (!data) {
          return []
        }

        return data.deviceModelAbilityOptions
      }

      let filterData = []
      this.abilitysList.forEach(item => {
        if (ids.includes(String(item.abilityId))) {
          filterData.push(item)
        }
      })
      return filterData
    },
    getAbilityDatas (abilityId) {
      const result = this.abilitysList.filter(
        item => item.abilityId == abilityId
      )[0];
      if((result.definedName).indexOf('温度')>=0){
        // result.currValue = result.currValue/10
        result.unit = '°C'
      }
      if((result.definedName).indexOf('湿度')>=0){
        // result.currValue = result.currValue/10
        result.unit = '%'
      }
      return result;
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
            item => item.updateStatus == 0 && item.status == 1
          )

          item.deviceModelAbilityOptions.forEach(iItem => {
            iItem.isChecked = false
          })
        })

        // 筛选功能项数据
        this.abilitysList = data.abilitysList.filter(
          item => item.updateStatus == 0 && item.status == 1
        )

        let list = data.deviceModelFormat.modelFormatPages
        if (list[0]) {
          list = list[0].modelFormatItems
          if (!list) {
            return
          }

          // 如果是双风机，单独将送/回风机的功能项加进来
          const windData = []
          if (this.hasMultipleId(list[2].abilityId, list)) {
            // 将功能集里的内外风机的数据加到版式集合中。为了后面持续刷新两个风机的数据
            let ids = list[2].abilityId.split(',')
            data.abilitysList.forEach(item => {
              if (ids.includes(String(item.dirValue))) {
                windData.push({
                  ...item,
                  showStatus: 1
                })
              }
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
            this.getIndexFormatData(list.concat(windData))
          }, 10000)
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

      let ids = this.formatItemsList
        .filter(item => item.showStatus == 1 && item.abilityId)
        .map(item => item.abilityId)
      let tempIds = []
      ids.forEach(id => {
        tempIds.push(...String(id).split(','))
      })

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
            item.deviceModelAbilityOptions.length == 0
            // item.abilityType == 1
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

        if (
          this.formatItemsList[2].abilityId === item.abilityId &&
          this.hasMultipleId(item.abilityId)
        ) {
          // 双风机初始化
          this.windData = this.getAbilityOption(item.abilityId)

          if (!this.windData) {
            return []
          }
          // 找到用户选择的档位，初始化
          // 回风风机
          const tempLeft = this.windData[0].deviceModelAbilityOptions
          if (!tempLeft) {
            return
          }
          tempLeft.forEach(tempList => {
            if (tempList.isSelect == 1) {
              this.windOneSelectedId = tempList.id
            }
          })

          // 送风风机
          const tempRight = this.windData[1].deviceModelAbilityOptions
          if (!tempRight) {
            return
          }
          tempRight.forEach(tempList => {
            if (tempList.isSelect == 1) {
              this.windTwoSelectedId = tempList.id
            }
          })
        }

        if (item.abilityType == 2) {
          // 单选
          // 找到被选择的选项，将id赋值到初始化变量上
          optionList.forEach(option => {
            if (option.isSelect == 1) {
              this.$set(item, 'selectedOptionId', option.id)
            }
          })
          return
        }

        if (item.abilityType == 3) {
          // 多选
          let selection = []
          optionList.forEach(option => {
            // 获取功能项的选项
            const tempList = option.deviceModelAbilityOptions
            if (!tempList) {
              return
            }

            // 判断功能项选项中开指令是否被选择
            const isChecked = tempList.some(temp => {
              return temp.dirValue == '1' && temp.isSelect == 1
            })

            if (isChecked) {
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
    this.queryDeviceOperation(this.detailData.modelId)
  },
  watch: {
    detailData(val) {
      if (!val) {
        return
      }
      this.selectById(val.modelId)
      this.queryDeviceOperation(val.modelId)
    }
  },
  destroyed() {
    clearInterval(this.setInter)
  }
}
</script>
