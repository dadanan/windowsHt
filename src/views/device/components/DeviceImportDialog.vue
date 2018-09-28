<template>
  <el-dialog top='4vh' :close-on-click-modal=false  title="设备导入" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <div class="table-opts">
      <el-form inline class="el-form--flex">
        <div style="flex: 1;"></div>
        <el-form-item>
          <el-input v-model="file" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="$refs.excelUpload.click()">导入文件</el-button>
          <input type="file" ref="excelUpload" @change="handleExcelChange" class="excelUpload">
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="importList"
      style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="name"
        label="名称" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="type"
        label="型号" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="typeID"
        label="typeID" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="mac"
        label="MAC" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="productDatetime"
        label="生产日期" show-overflow-tooltip sortable>
      </el-table-column>
      <el-table-column
        prop="version"
        label="硬件版本" show-overflow-tooltip sortable>
      </el-table-column>
    </el-table>
    <el-form>
      <el-form-item label="导入备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          v-model="description">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" @click="handleImportPart">导入选中项</el-button>
      <el-button type="primary" @click="handleImportAll">导入全部</el-button>
    </div>
  </el-dialog>
</template>

<script>
import XLSX from '@/assets/xlsx/xlsx.core.min.js'
import { createDevice } from '@/api/device/list'

const tabelProps = [
  'name',
  'type',
  'typeID',
  'mac',
  'productDatetime',
  'hardVersion'
]

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // const importList = []

    // for (let i = 0; i < 5; i++) {
    //   importList.push({
    //     name: '测试设备',
    //     type: '测试型号',
    //     typeID: '1221313',
    //     mac: 'a2131f12',
    //     productDatetime: '2016-07-01',
    //     version: 'v1.0.0'
    //   })
    // }
    return {
      file: '',
      description: '',
      importList: [],
      selections: []
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selections = selection
    },
    handleImportPart() {
      if (!this.selections.length) {
        this.$message.error('还没有选中任何设备')
        return
      }
      this.createDevice(this.selections)
    },
    handleImportAll() {
      this.createDevice(this.importList)
    },
    createDevice(data) {
      const list = [...data]
      list.forEach(item => {
        item.birthTime = +new Date()
      })
      const form = {
        deviceList: list
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
    handleExcelChange(e) {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      let data
      let workbook
      let devices = []

      fileReader.readAsBinaryString(file)

      fileReader.onload = e => {
        try {
          data = e.target.result
          workbook = XLSX.read(data, {
            type: 'binary'
          }) // 以二进制流方式读取得到整份excel表格对象
        } catch (e) {
          console.log(e)
          this.$message.error('文件类型不正确')
          return
        }

        let fromTo = ''
        // 遍历每张表读取
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workbook.Sheets[sheet]['!ref']
            devices = devices.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            )
            break // 只取第一张表
          }
        }

        if (!devices.length) return

        // 确保每个key都存在并去掉不需要的key
        // 暂不考虑必填项
        devices.map(v => {
          tabelProps.map(tp => {
            if (Object.keys(v).indexOf(tp) === -1) delete v[tp]
            if (!Object.keys(v).includes(tp)) v[tp] = ''
          })
        })

        this.importList = devices
      }

      this.file = file.name
      this.$refs.excelUpload.value = null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.excelUpload {
  position: absolute;
  z-index: -1;
}
</style>

