<template>
  <el-dialog top='4vh'
             :close-on-click-modal=false
             title="编辑客户"
             :visible="visible"
             @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll"
                  wrap-class="scrollbar-wrap"
                  view-class="scrollbar-view"
                  tag="div">
      <div>
        <el-steps :active="createStep"
                  finish-status="success"
                  class="mb20"
                  align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="设备类型设置"></el-step>
          <el-step title="H5 端 APP 设置"></el-step>
          <el-step title="安卓 APP 设置"></el-step>
          <el-step title="管理后台设置"></el-step>
        </el-steps>
        <div v-if="createStep == 1">
          <el-form label-position="left"
                   label-width="150px">
            <el-form-item label="客户名称">
              <el-input v-model="baseInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公众号名称">
              <el-input v-model="baseInfo.publicName"></el-input>
            </el-form-item>
            <el-form-item label="APP ID">
              <el-input v-model="baseInfo.appid"></el-input>
            </el-form-item>
            <el-form-item label="APP Secret">
              <el-input v-model="baseInfo.appsecret"></el-input>
            </el-form-item>
            <el-form-item label="客户类型">
              <el-select v-model="baseInfo.userType">
                <el-option label="厂家"
                           value="1"></el-option>
                <el-option label="品牌商"
                           value="2"></el-option>
                <el-option label=" 工程商"
                           value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="baseInfo.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 2">
          <el-table :data="deviceList"
                    @selection-change="handleSelectionChange"
                    style="width: 100%"
                    class="mb20"
                    border>
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="缩图">
              <template slot-scope="scope">
                <!-- <img class='table-inside-image block' :src="scope.row.icon" :alt="scope.row.name"> -->
              </template>
            </el-table-column>
            <el-table-column prop="name"
                             label="名称"
                             show-overflow-tooltip
                             sortable>
            </el-table-column>
            <el-table-column prop="typeNo"
                             label="typeNo"
                             show-overflow-tooltip
                             sortable>
            </el-table-column>
            <el-table-column prop="source"
                             label="来源"
                             show-overflow-tooltip
                             sortable>
            </el-table-column>
            <el-table-column label="功能项"
                             show-overflow-tooltip
                             sortable>
              <template slot-scope="scope">
                {{ scope.row.deviceTypeAbilitys.map(el => el.abilityName).join('、') }}
              </template>
            </el-table-column>
            <el-table-column label="码表"
                             show-overflow-tooltip
                             sortable>
              <template slot-scope="scope">
                <img class='table-inside-image'
                     :src='scope.row.stopWatch'>
              </template>
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注"
                             show-overflow-tooltip
                             sortable>
            </el-table-column>
            <el-table-column label="操作"
                             show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button type="text"
                           @click="deleteModel(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="1"
                         :page-sizes="[100, 200, 300, 400]"
                         :page-size="100"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="deviceList.length">
          </el-pagination>
        </div>
        <div v-if="createStep == 3">
          <el-form label-position="left"
                   label-width="150px">
            <el-form-item label="默认组名">
              <el-input v-model="h5Config.defaultTeamName"></el-input>
            </el-form-item>
            <el-form-item label="高级设置密码">
              <el-input type="text"
                        v-model="h5Config.password"></el-input>
            </el-form-item>
            <el-form-item label="背景图片">
              <image-uploader :url='h5Config.backgroundImg'
                              @get-url='setURL(arguments,h5Config,"backgroundImg")'></image-uploader>
            </el-form-item>
            <el-form-item label="页面版式">
              <el-select v-model="h5Config.htmlTypeId"
                         @change='pageFormatChanged'>
                <el-option v-for='item in pageFormatList'
                           :label='item.name'
                           :value='item.id'
                           :key='item.id'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面概览">
              <img class='page-preview-img'
                   :src='h5PreviewImg'>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="h5Config.themeName"></el-input>
            </el-form-item>
            <el-form-item label="Logo">
              <image-uploader :url='h5Config.logo'
                              @get-url='setURL(arguments,h5Config,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="H5 版本">
              <el-select v-model="h5Config.version">
                <el-option label="版本 1"
                           value="1"></el-option>
                <el-option label="版本 2"
                           value="2"></el-option>
                <el-option label="版本 3"
                           value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 4">
          <el-form label-position="left"
                   label-width="150px">
            <el-form-item label="APP 名称">
              <el-input v-model='androidConfig.name'></el-input>
            </el-form-item>
            <el-form-item label="APP Logo">
              <image-uploader :url='androidConfig.logo'
                              @get-url='setURL(arguments,androidConfig,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="APP 软件版本">
              <el-input v-model='androidConfig.version'></el-input>
            </el-form-item>
            <el-form-item label="设备切换密码">
              <el-input v-model='androidConfig.deviceChangePassword'></el-input>
            </el-form-item>
            <el-form-item label="安卓场景">
              <el-card class="box-card"
                       v-for='(item,index) in androidConfig.androidSceneList'
                       :key="index">
                <div class='tool'>
                  <span class='close'
                        @click='deleteScene(index)'></span>
                  <span class='add'
                        @click='addScene'></span>
                </div>
                <div>
                  <el-form-item label="场景名称">
                    <el-input v-model='item.name'></el-input>
                  </el-form-item>
                  <el-form-item label="场景描述">
                    <el-input v-model='item.description'
                              type='textarea'></el-input>
                  </el-form-item>
                  <el-form-item label="场景封面">
                    <image-uploader :url='item.imgsCover'
                                    @get-url='setURL(arguments,item,"imgsCover")'></image-uploader>
                  </el-form-item>
                  <el-form-item label="场景图册列表">
                    <el-card v-for='(list,listIndex) in item.androidSceneImgList'
                             :key="listIndex"
                             class="box-card">
                      <div class='tool'>
                        <span class='close'
                              @click='deleteSceneImg(item,listIndex)'></span>
                        <span class='add'
                              @click='addSceneImg(item)'></span>
                      </div>
                      <div>
                        <el-form-item label="名称">
                          <el-input v-model='list.name'></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                          <el-input v-model='list.description'
                                    type='textarea'></el-input>
                        </el-form-item>
                        <el-form-item label="图片/视频">
                          <image-uploader :url='list.imgVideo'
                                          @get-url='setURL(arguments,list,"imgVideo")'></image-uploader>
                        </el-form-item>
                      </div>
                    </el-card>
                  </el-form-item>
                </div>
              </el-card>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="createStep == 5">
          <el-form label-position="left"
                   label-width="150px">
            <el-form-item label="开放">
              <el-switch v-model='backendConfig.enableStatus'></el-switch>
            </el-form-item>
            <el-form-item label="Logo">
              <image-uploader :url='backendConfig.logo'
                              @get-url='setURL(arguments,backendConfig,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model='backendConfig.name'></el-input>
            </el-form-item>
            <el-form-item label="超级管理员用户名">
              <el-input v-model='baseInfo.loginName'></el-input>
            </el-form-item>
            <el-form-item label="二级域名">
              <div class='sld-inside'>
                <div class='sld-input'>
                  <el-input v-model='baseInfo.sld'></el-input>
                </div>
                <p>
                  &nbsp;&nbsp;+&nbsp;&nbsp;/hcocloud.com/
                </p>
              </div>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model='backendConfig.type'>
                <el-radio :label="0">独立</el-radio>
                <el-radio :label="1">挂靠</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-scrollbar>
    <div slot="footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type=" primary "
                 @click="backStep "
                 v-if="createStep !==1">上一步</el-button>
      <el-button type="primary "
                 @click="nextStep "
                 v-if="createStep !== 5">下一步</el-button>
      <el-button type="primary "
                 @click="updateDetail "
                 v-else>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import { fetchList } from '@/api/device/model'
import { updateDetail } from '@/api/customer'
import { select as getForamtList } from '@/api/format'

export default {
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
      baseInfo: {
        name: '',
        publicName: '',
        appid: '',
        appsecret: '',
        userType: '',
        loginName: '',
        sld: ''
      },
      h5Config: {
        backgroundImg: '',
        defaultTeamName: '',
        htmlTypeId: undefined,
        logo: '',
        password: '',
        themeName: '',
        version: ''
      },
      androidConfig: {
        androidSceneList: [
          {
            androidSceneImgList: [
              {
                description: '',
                id: 0,
                imgVideo: '',
                name: ''
              }
            ],
            description: '',
            id: 0,
            imgsCover: '',
            name: ''
          }
        ],
        deviceChangePassword: '',
        logo: '',
        name: '',
        version: ''
      },
      backendConfig: {
        enableStatus: true,
        id: 0,
        logo: '',
        name: '',
        type: 0
      },
      createStep: 1,
      // 动态功能
      dynamicTags: ['功能1', '功能2', '功能3'],
      selectedDeviceList: [],
      deviceList: [],
      listQuery: {
        limit: 1000,
        page: 1
      },
      pageFormatList: [],
      h5PreviewImg: ''
    }
  },
  methods: {
    pageFormatChanged(id) {
      this.h5PreviewImg = this.pageFormatList.filter(
        item => item.id === id
      )[0].previewImg
    },
    getForamtList() {
      getForamtList(this.listQuery).then(res => {
        this.pageFormatList = res.data
      })
    },
    backStep() {
      this.createStep--
    },
    nextStep() {
      this.createStep++

      if (this.createStep === 6) {
        this.isCreateClientDialogVisible = false
        this.createStep = 0
      }
    },
    getList() {
      fetchList(this.listQuery).then(response => {
        this.deviceList = response.data
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
    },
    setURL(argu, data, name) {
      data[name] = argu[0]
    },
    addScene() {
      this.androidConfig.androidSceneList.push({
        androidSceneImgList: [
          {
            description: '',
            id: 0,
            imgVideo: '',
            name: ''
          }
        ],
        description: '',
        id: 0,
        imgsCover: '',
        name: ''
      })
    },
    deleteScene(index) {
      if (this.androidConfig.androidSceneList.length <= 1) return

      this.androidConfig.androidSceneList.splice(index, 1)
    },
    deleteSceneImg(data, index) {
      if (data.androidSceneImgList.length <= 1) return

      data.androidSceneImgList.splice(index, 1)
    },
    addSceneImg(data) {
      data.androidSceneImgList.push({
        description: '',
        id: 0,
        imgVideo: '',
        name: ''
      })
    },
    updateDetail() {
      this.backendConfig.enableStatus = this.backendConfig.enableStatus ? 1 : 2

      const form = {
        ...this.baseInfo,
        typeIds: this.selectedDeviceList.map(item => item.id).join(','),
        h5Config: this.h5Config,
        androidConfig: this.androidConfig,
        backendConfig: this.backendConfig,
        id: this.id
      }
      updateDetail(form)
        .then(res => {
          if (res.code !== 200) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          } else {
            this.$emit('add-data', {
              ...form,
              id: res.data
            })
            this.$emit('update:visible', false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    data(val) {
      const tempForm = JSON.parse(JSON.stringify(val))
      this.id = val.id
      this.baseInfo = {
        name: val.name,
        publicName: val.publicName,
        appid: val.appid,
        appsecret: val.appsecret,
        userType: val.userType,
        loginName: val.loginName,
        sld: val.sld,
        remark: val.remark
      }
      this.h5Config = tempForm.h5Config
      this.androidConfig = val.androidConfig || {}
      this.backendConfig = val.backendConfig || {}

      if (
        !this.androidConfig.androidSceneList ||
        this.androidConfig.androidSceneList.length === 0
      ) {
        this.androidConfig.androidSceneList = [
          {
            androidSceneImgList: [
              {
                description: '',
                id: 0,
                imgVideo: '',
                name: ''
              }
            ],
            description: '',
            id: 0,
            imgsCover: '',
            name: ''
          }
        ]
      }
    },
    visible(val) {
      if (val) {
        this.createStep = 1
      }
    }
  },
  created() {
    this.getList()
    this.getForamtList()
  },
  components: {
    ImageUploader
  }
}
</script>

<style lang='scss'>
.sld-inside {
  display: flex;
  align-items: center;
  .sld-input {
    width: 50%;
  }
  p {
    font-size: 15px;
    line-height: 1;
  }
}
.page-preview-img {
  width: 100%;
}
</style>