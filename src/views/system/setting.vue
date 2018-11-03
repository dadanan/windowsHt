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
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="baseInfo.use"></el-input>
            </el-form-item>
            <el-button type="primary">确认修改</el-button>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="微信App设置" name="2">
        <el-form label-position="left" label-width="150px" :model='h5Config'  ref='h5Config' style="width:600px">
          <el-form-item label="默认组名">
            <el-input v-model="h5Config.defaultTeamName"></el-input>
          </el-form-item>
          <el-form-item label="高级设置密码">
            <el-input type="text" v-model="h5Config.password"></el-input>
          </el-form-item>
          <el-form-item label="客服">
            <el-input type="text" v-model="h5Config.serviceUser"></el-input>
          </el-form-item>
          <el-form-item label="背景图片">
            <image-uploader :key='1' :url='h5Config.backgroundImg' @get-url='setURL(arguments,h5Config,"backgroundImg")'></image-uploader>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="h5Config.themeName"></el-input>
          </el-form-item>
          <el-form-item label="Logo">
            <image-uploader :key='2' :url='h5Config.logo' @get-url='setURL(arguments,h5Config,"logo")'></image-uploader>
          </el-form-item>
          <el-button type="primary">确认修改</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="安卓app设置" name="3">
        <el-form label-position="left" label-width="150px" :model='androidConfig' ref='androidConfig' style="width:600px">
            <el-form-item label="APP 名称" >
              <el-input v-model='androidConfig.name'></el-input>
            </el-form-item>
            <el-form-item label="APP Logo">
              <image-uploader :key='3' :url='androidConfig.logo' @get-url='setURL(arguments,androidConfig,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="公众号二维码">
              <image-uploader :key='4' :url='androidConfig.qrcode' @get-url='setURL(arguments,androidConfig,"qrcode")'></image-uploader>
            </el-form-item>
            <el-form-item label="APP 软件版本">
              <el-input v-model='androidConfig.version'></el-input>
            </el-form-item>
            <el-form-item label="APP安装包">
              <file-uploader @get-url='setURL(arguments,androidConfig,"appUrl")' :fileName='androidConfig.appUrl' format='apk'></file-uploader>
            </el-form-item>
            <el-form-item label="设备切换密码">
              <el-input v-model='androidConfig.deviceChangePassword'></el-input>
            </el-form-item>
            <el-button type="primary">确认修改</el-button>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="后台设置" name="4">
         <el-form label-position="left" label-width="150px" :model='backendConfig' ref='backendConfig'>
            <el-form-item label="Logo">
              <image-uploader :key='5' :url='backendConfig.logo' @get-url='setURL(arguments,backendConfig,"logo")'></image-uploader>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model='backendConfig.name'></el-input>
            </el-form-item>
            <!-- 用户名和二级域名传参数时 放在baseInfo里 -->
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
            <el-button type="primary">确认修改</el-button>
          </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ImageUploader from '@/components/Upload/image'
import FileUploader from '@/components/Upload/file'
import { updateWebsiteInfo } from '@/api/customer'
import { getCurrentUser } from '@/api/user'
import { selectByUserId } from '@/api/customer'


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
        backgroundImg: '',
        defaultTeamName: '',
        htmlTypeIds: [],
        logo: '',
        qrcode: '',
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
        enableStatus: true,
        id: 0,
        logo: '',
        name: '',
        type: 0
      },
      userId:0
    }
  },
  methods: {
    // 获取当前的用户
    getCurrentUser() {
      getCurrentUser().then(res => {
        console.log(res)
        this.userId = res.data.id
        this.selectByUserId()
      })
    },
    selectByUserId() {
      selectByUserId(this.userId).then(res => {
        console.log(res)
      })
    }
   }, 
  components: {
    ImageUploader,
    FileUploader
  },
  created() {
    this.getCurrentUser()
  }
}
</script>

<style lang='scss'>
.set {
  padding: 30px 30px 30px 50px;
  background: #fff;
}
</style>