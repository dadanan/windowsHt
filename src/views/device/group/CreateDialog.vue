<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加设备组" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="组名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserOpenId">
          <el-input placeholder="OpenID..." v-model='form.createUserOpenId'></el-input>
        </el-form-item>
        <el-form-item label="组标">
          <image-uploader :url='form.teamIcon' @get-url='setURL(arguments,form,"teamIcon")'></image-uploader>
        </el-form-item>
        <el-form-item label="封面">
          <image-uploader :url='form.teamCover' @get-url='setURL(arguments,form,"teamCover")'></image-uploader>
        </el-form-item>
        <el-form-item label="图册">
          <image-uploader :url='form.teamCover' @get-url='setURL(arguments,form,"imgOrVideoList")' :isList='true'></image-uploader>
        </el-form-item>
        <el-form-item label="视频">
          <video-uploader :limit='2' :showLileList='true' :multiple='true'></video-uploader>
        </el-form-item>
        <el-form-item label="介绍" prop="sceneDescription">
          <el-input type='textarea' :rows='3' v-model="form.sceneDescription"></el-input>
        </el-form-item>
        <d-title>组内设备</d-title>
        <el-table :data='teamDeviceCreateRequestList' style="width: 100%" class="mb20" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="mac" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-select v-model="scope.row.mac" placeholder="请选择">
              <el-option v-for="item in deviceList" :key="item.mac" :label="item.name" :value="item.mac">
              </el-option>
            </el-select> -->
              <el-input v-model='scope.row.mac' placeholder="mac"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="管理名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.manageName" placeholder="施工管理的备注名"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="联动设置" show-overflow-tooltip width='180'>
            <template slot-scope="scope">
              <el-switch @change='switchChanged(scope.row)' style="display: block" v-model="scope.row.linkAgeStatus" active-color="#13ce66" inactive-color="#ff4949" active-text="关联" inactive-text="非关联">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click='newRow'>+添加设备</el-button>
      </el-form>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='createNewTeam'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import VideoUploader from '@/components/Upload/VideoUpload'
import { createNewTeam, queryDeviceInfo } from '@/api/device/team'
import { select } from '@/api/customer'
import DTitle from '@/components/Title'

export default {
  components: {
    ImageUploader,
    VideoUploader,
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
        imgOrVideoList: [],
        createUserOpenId: '',
        teamIcon: '',
        teamCover: ''
      },
      teamDeviceCreateRequestList: [],
      query: {
        limit: 100,
        page: 1
      },
      deviceList: []
    }
  },
  methods: {
    queryDeviceInfo(id) {
      queryDeviceInfo({ customerId: id }).then(res => {
        this.deviceList = res.data
      })
    },
    setURL(argu, data, name) {
      const image = argu[0]
      data[name] = image
    },
    switchChanged(data) {
      if (this.teamDeviceCreateRequestList.length < 2) {
        data.linkAgeStatus = false
        this.$message({
          type: 'warning',
          message: '开启设备‘可关联’需要存在两个及以上的设备！'
        })
      }
    },
    newRow() {
      this.teamDeviceCreateRequestList.push({})
    },
    createNewTeam() {
      this.teamDeviceCreateRequestList.forEach(item => {
        item['linkAgeStatus'] = item.linkAgeStatus ? 1 : 0
      })

      const form = {
        ...this.form,
        teamDeviceCreateRequestList: this.teamDeviceCreateRequestList
      }
      createNewTeam(form).then(res => {
        this.$emit('update:visible', false)
        form['icon'] = form.teamIcon
        form['cover'] = form.teamCover
        this.$emit('add-data', {
          ...form,
          id: res.data
        })
      })
    },
    getImageName(url) {
      if (!url) {
        return ''
      }
      const match = url.match('aliyuncs.com/(.*)')
      return match ? match[1] : ''
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>