<template>
  <div class="set dashboard-container">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="基本信息" name="1">
        <div class="mb10" style="width:600px">
          <el-form label-position="left" label-width="150px" :model='baseInfo' ref='baseInfo'>
            <el-form-item label="名称">
              <el-input v-model="baseInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公众号名称">
              <el-input v-model="baseInfo.publicName"></el-input>
            </el-form-item>
            <el-form-item label="业务方向">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="baseInfo.busDirection"></el-input>
            </el-form-item>
            <el-button type="primary" @click="basic">确认修改</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信App设置" name="2">
        <el-form label-position="left" label-width="150px" :model='h5Config' ref='h5Config' style="width:600px">
          <el-form-item label="默认组名">
            <el-input v-model="h5Config.defaultTeamName"></el-input>
          </el-form-item>
          <el-form-item label="高级设置密码">
            <el-input type="text" v-model="h5Config.password"></el-input>
          </el-form-item>
          <el-form-item label="客服">
            <el-input type="text" v-model="h5Config.serviceUser"></el-input>
          </el-form-item>
          <el-form-item label="背景图册">
            <image-uploader :key='1' :urls='h5Config.h5BgImgList' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="h5Config.themeName"></el-input>
          </el-form-item>
          <el-form-item label="Logo">
            <image-uploader :key='21' :url='h5Config.logo' @get-url='setURL(arguments,h5Config,"logo")'></image-uploader>
          </el-form-item>
          <el-form-item label="H5 版本" prop="version">
            <el-select v-model="h5Config.version">
              <el-option label="版本 1" value="1"></el-option>
              <el-option label="版本 2" value="2"></el-option>
              <el-option label="版本 3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="updateOwnerH5Info">确认修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安卓app设置" name="3">
        <el-form label-position="left" label-width="150px" :model='androidConfig' ref='androidConfig' style="width:900px">
          <el-form-item label="APP 名称">
            <el-input v-model='androidConfig.name'></el-input>
          </el-form-item>
          <el-form-item label="APP Logo">
            <image-uploader :key='22' :url='androidConfig.logo' @get-url='setURL(arguments,androidConfig,"logo")'></image-uploader>
          </el-form-item>
          <el-form-item label="公众号二维码">
            <image-uploader :key='23' :url='androidConfig.qrcode' @get-url='setURL(arguments,androidConfig,"qrcode")'></image-uploader>
          </el-form-item>
          <el-form-item label="APP 软件版本">
            <el-input v-model='androidConfig.version'></el-input>
          </el-form-item>
          <el-form-item label="上传安装包">
            <file-uploader @get-url='setURL(arguments,androidConfig,"appUrl")' :fileName='androidConfig.appUrl' format='apk'></file-uploader>
          </el-form-item>
          <el-form-item label="设备切换密码">
            <el-input v-model='androidConfig.deviceChangePassword'></el-input>
          </el-form-item>
          <el-form-item label="安卓场景">
            <el-card class="box-card" v-for='(item,index) in androidConfig.androidSceneList' :key="index">
              <div class='tool'>
                <span class='close' @click='deleteScene(index)'>x</span>
                <span class='add' @click='addScene'>+</span>
              </div>
              <div>
                <el-form-item label="场景名称">
                  <el-input v-model='item.name'></el-input>
                </el-form-item>
                <el-form-item label="场景描述">
                  <el-input v-model='item.description' type='textarea'></el-input>
                </el-form-item>
                <el-form-item label="场景封面">
                  <image-uploader :url='item.imgsCover' @get-url='setURL(arguments,item,"imgsCover")'></image-uploader>
                </el-form-item>
                <el-form-item label="场景图册列表" class="pictureList">
                  <transition-group name="fade">
                    <el-card v-for='(list,listIndex) in item.androidSceneImgList' :key="list.id" class="box-card">
                      <div class='tool'>
                        <!-- <i class="el-icon-back up" @click="handleUp(item, listIndex)" v-if="listIndex"></i>
                        <i class="el-icon-back down" @click="handleDown(item, listIndex)" v-if="item.androidSceneImgList.length - listIndex !== 1"></i> -->
                        <span class='close-icon' @click='deleteSceneImg(item, listIndex)'>x</span>
                        <span class='add-icon' @click='addSceneImg(item)'>+</span>
                      </div>
                      <div>
                        <el-form-item label="名称">
                          <el-input v-model='list.name'></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                          <el-input v-model='list.description' type='textarea'></el-input>
                        </el-form-item>
                        <el-form-item label="图片/视频">
                          <image-uploader :url='list.imgVideo' @get-url='setURL(arguments,list,"imgVideo")'></image-uploader>
                        </el-form-item>
                      </div>
                    </el-card>
                  </transition-group>
                </el-form-item>
              </div>
            </el-card>
          </el-form-item>
          <el-button type="primary" @click="updateOwnerAndroidInfo">确认修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="后台设置" name="4">
        <el-form label-position="left" label-width="150px" :model='backendConfig' ref='backendConfig' style="width:600px">
          <el-form-item label="Logo">
            <image-uploader :key='24' :url='backendConfig.logo' @get-url='setURL(arguments,backendConfig,"logo")'></image-uploader>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model='backendConfig.name'></el-input>
          </el-form-item>
          <!-- 用户名和二级域名传参数时 放在baseInfo里 -->
          <el-form-item label="超级管理员用户名">
            <el-input v-model='baseInfo.loginName' disabled></el-input>
          </el-form-item>
          <el-form-item label="二级域名">
            <div class='sld-inside'>
              <div class='sld-input'>
                <el-input v-model='baseInfo.sld' disabled></el-input>
              </div>
              <p>
                &nbsp;&nbsp;+&nbsp;&nbsp;/hcocloud.com/
              </p>
            </div>
          </el-form-item>
          <el-button type="primary" @click="updateOwnerBackendInfo">确认修改</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ImageUploader from '@/components/Upload/image'
import FileUploader from '@/components/Upload/file'
import {
  updateWebsiteInfo,
  selectByUserId,
  updateOwnerBaseInfo,
  updateOwnerH5Info,
  updateOwnerAndroidInfo,
  updateOwnerBackendInfo
} from '@/api/customer'
import { getCurrentUser } from '@/api/user'

export default {
  data() {
    return {
      activeTab: '1',
      baseInfo: {
        name: '',
        publicName: '',
        appid: '',
        appsecret: '',
        userType: '',
        loginName: '',
        sld: '',
        isDashboardEnabled: false,
        use: ''
      },
      h5Config: {
        h5BgImgList: [],
        defaultTeamName: '',
        logo: '',
        password: '',
        themeName: '',
        serviceUser: '',
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
        qrcode: '',
        name: '',
        version: '',
        appUrl: ''
      },
      backendConfig: {
        enableStatus: 1,
        id: 0,
        logo: '',
        name: '',
        type: 0
      },
      userId: 0
    }
  },
  methods: {
    removeImg(file) {
      const index = this.h5Config.h5BgImgList.findIndex(
        v => v.image === file.url
      )
      this.h5Config.h5BgImgList.splice(index, 1)
    },
    setImg(file) {
      this.h5Config.h5BgImgList = [
        ...this.h5Config.h5BgImgList,
        { image: file.url }
      ]
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
      // transition-group动画必须提供唯一id且id不能为循环出来的index值
      data.androidSceneImgList.push({
        description: '',
        id: this.$options.filters.GUID(),
        imgVideo: '',
        name: ''
      })
    },
    // 获取当前的用户
    getCurrentUser() {
      getCurrentUser().then(res => {
        this.userId = res.data.id
        this.selectByUserId()
      })
    },
    selectByUserId() {
      selectByUserId(this.userId).then(res => {
        const tempForm = JSON.parse(JSON.stringify(res.data))
        this.id = tempForm.id
        this.baseInfo = tempForm
        const h5Config = tempForm.h5Config
        if (h5Config) {
          this.h5Config = h5Config
        }
        this.androidConfig = tempForm.androidConfig || {}
        this.backendConfig = tempForm.backendConfig || {}

        this.backendConfig.enableStatus =
          Boolean(this.backendConfig.enableStatus) || false

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
      })
    },
    setURL(argu, data, name) {
      data[name] = argu[0]
    },
    basic() {
      const backendConfig = Object.assign({}, this.backendConfig)
      backendConfig.enableStatus = backendConfig.enableStatus ? 1 : 2
      const h5Config = JSON.parse(JSON.stringify(this.h5Config))
      // 拼接成一个字符串
      const form = {
        ...this.baseInfo,
        h5Config,
        androidConfig: this.androidConfig,
        backendConfig: backendConfig,
        id: this.id
      }
      updateOwnerBaseInfo(form).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },
    updateOwnerH5Info() {
      const h5Config = JSON.parse(JSON.stringify(this.h5Config))

      updateOwnerH5Info(h5Config).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },
    updateOwnerAndroidInfo() {
      updateOwnerAndroidInfo(this.androidConfig).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },
    updateOwnerBackendInfo() {
      const backendConfig = Object.assign({}, this.backendConfig)
      backendConfig.enableStatus = backendConfig.enableStatus ? 1 : 2
      updateOwnerBackendInfo(backendConfig).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    }
  },
  components: {
    ImageUploader,
    FileUploader
  },
  created() {
    this.getCurrentUser()
  },
  watch: {
    activeTab(tab) {
      if (tab === '2') {
        this.$notify.info({
          title: '注意事项',
          duration: 5000,
          message: `须上传五张背景图片，供H5端APP使用。“依次”为：关机，白天-晴天，白天-阴天，页面-晴天，夜晚-阴天`
        })
      }
    }
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
.set {
  padding: 30px 30px 30px 50px;
  background: #fff;
}
.tool {
  text-align: right;
  font-size: 24px;
  color: #646464;
}
</style>