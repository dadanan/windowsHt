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
            <image-uploader :key='1' :urls='filterBg(h5Config.h5BgImgList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
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
            <el-form-item label="场景名称">
              <el-input v-model='androidConfig.androidScene.name'></el-input>
            </el-form-item>
            <el-form-item label="场景描述">
              <el-input v-model='androidConfig.androidScene.description' type='textarea'></el-input>
            </el-form-item>
            <el-form-item label="场景封面">
              <image-uploader :url='androidConfig.androidScene.imgsCover' @get-url='setURL(arguments,item,"imgsCover")'></image-uploader>
            </el-form-item>
            <el-form-item label="场景图册">
              <image-uploader :urls='filterBg(androidConfig.androidScene.androidSceneImgList)' @get-url='setImgForScene' @remove-url='removeImgForScene' :isList='true' :limit='5'></image-uploader>
            </el-form-item>
            <el-form-item label="场景视频">
              <video-uploader :maxSize='50' :list='filterBg(androidConfig.androidScene.androidSceneVideoList)' :multiple='true' @onSuccess="handleVideoSuccess" @onRemove="handleVideoRemove"></video-uploader>
            </el-form-item>
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
import VideoUploader from '@/components/Upload/VideoUpload'
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
        androidScene: {
          androidSceneImgList: [],
          androidSceneVideoList: [],
          description: '',
          imgsCover: '',
          name: '',
          status: 0
        }
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
    filterBg(data) {
      return data.filter(item => item.status !== 2)
    },
    removeImg(file) {
      const index = this.h5Config.h5BgImgList.findIndex(
        v => v.image === file.url
      )
      this.h5Config.h5BgImgList[index].status = 2
    },
    setImg(file) {
      this.h5Config.h5BgImgList = [
        ...this.h5Config.h5BgImgList,
        { image: file.url }
      ]
    },
    removeImgForScene(file) {
      const data = this.androidConfig.androidScene
      const index = data.androidSceneImgList.findIndex(
        v => v.image === file.url
      )
      data.androidSceneImgList[index].status = 2
    },
    setImgForScene(file) {
      let data = this.androidConfig.androidScene
      data.androidSceneImgList = [
        ...data.androidSceneImgList,
        { image: file.url }
      ]
    },
    handleVideoSuccess(file, fileList) {
      let data = this.androidConfig.androidScene
      data.androidSceneVideoList = [
        ...data.androidSceneVideoList,
        { video: file.url }
      ]
    },
    handleVideoRemove(file) {
      let data = this.androidConfig.androidScene
      const index = data.androidSceneVideoList.findIndex(
        v => v.video === file.url
      )
      data.androidSceneVideoList[index].status = 2
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
          // 如果存在背景图册，修改数据格式
          if (h5Config.h5BgImgList) {
            h5Config.h5BgImgList = h5Config.h5BgImgList.map(item => {
              return {
                image: item.bgImg,
                id: item.id
              }
            })
          } else {
            h5Config.h5BgImgList = []
          }
          this.h5Config = h5Config
        }
        this.androidConfig = tempForm.androidConfig || {}
        this.backendConfig = tempForm.backendConfig || {}

        this.backendConfig.enableStatus =
          Boolean(this.backendConfig.enableStatus) || false

        const androidScene = this.androidConfig.androidScene
        if (!androidScene) {
          this.androidConfig = {
            androidScene: {
              androidSceneImgList: [],
              androidSceneVideoList: [],
              description: '',
              imgsCover: '',
              name: ''
            },
            deviceChangePassword: '',
            logo: '',
            name: '',
            version: '',
            appUrl: ''
          }
        } else {
          // 规范图册/视频数据格式，来适应组件所需格式
          androidScene.androidSceneImgList = androidScene.androidSceneImgList.map(
            item => {
              return {
                image: item.imgVideo,
                id: item.id,
                status: item.status
              }
            }
          )

          androidScene.androidSceneVideoList = androidScene.androidSceneVideoList.map(
            item => {
              return {
                video: item.imgVideo,
                id: item.id,
                status: item.status
              }
            }
          )
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
      // 转换背景图册数据格式
      if (h5Config.h5BgImgList) {
        h5Config.h5BgImgList = h5Config.h5BgImgList.map(item => {
          return {
            bgImg: item.image,
            id: item.id ? item.id : null,
            status: item.status
          }
        })
      }

      updateOwnerH5Info(h5Config).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      })
    },
    updateOwnerAndroidInfo() {
      // 转换场景图册/视频格式
      const androidScene = this.androidConfig.androidScene
      const androidConfig = {
        ...this.androidConfig,
        androidScene: {
          ...androidScene,
          androidSceneImgList: androidScene.androidSceneImgList.map(item => {
            return {
              imgVideo: item.image,
              id: item.id,
              status: item.image ? item.status : 2
            }
          }),
          androidSceneVideoList: androidScene.androidSceneVideoList.map(
            item => {
              return {
                imgVideo: item.video,
                id: item.id,
                status: item.video ? item.status : 2
              }
            }
          )
        }
      }

      updateOwnerAndroidInfo(androidConfig).then(res => {
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
    FileUploader,
    VideoUploader
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
          message: `须上传五张背景图片，供H5端APP使用。“依次”为：关机，白天-晴天，白天-阴天，夜晚-晴天，夜晚-阴天`
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