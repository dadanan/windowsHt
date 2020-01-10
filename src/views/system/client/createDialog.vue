<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="创建客户" width="800px" :visible="visible" @update:visible="$emit('update:visible', $event)">
    <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
      <div>
        <el-steps :active="createStep" finish-status="success" class="mb20" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="设备类型设置"></el-step>
          <el-step title="H5 端 APP 设置"></el-step>
          <el-step title="安卓 APP 设置"></el-step>
          <el-step title="管理后台设置"></el-step>
        </el-steps>
        <div v-if="createStep == 0">
          <el-form label-position="left" label-width="150px" :model='baseInfo' :rules='rules' ref='baseInfo'>
            <el-form-item label="客户名称" prop='name'>
              <el-input v-model="baseInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公众号名称" prop='publicName'>
              <el-input v-model="baseInfo.publicName"></el-input>
            </el-form-item>
            <el-form-item label="APP ID" prop='appid'>
              <el-input v-model="baseInfo.appid"></el-input>
            </el-form-item>
            <el-form-item label="APP Secret" prop='appsecret'>
              <el-input v-model="baseInfo.appsecret"></el-input>
            </el-form-item>
            <el-form-item label="客户类型" prop="userType">
              <el-select v-model="baseInfo.userType">
                <el-option label="厂家" value="1"></el-option>
                <el-option label="品牌商" value="2"></el-option>
                <el-option label="工程商" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否开放安卓">
              <el-radio-group v-model="baseInfo.isDashboardEnabled">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="业务方向">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="baseInfo.use"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="baseInfo.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-else-if="createStep == 1">
          <el-table ref='typeTree' :data="deviceList" @selection-change="handleSelectionChange" style="width: 100%" class="mb20" border>
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="缩图">
              <template slot-scope="scope">
                <img class='table-inside-image block' :src="scope.row.icon" :alt="scope.row.name">
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="typeNo" label="typeNo" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="source" label="来源" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column label="功能项" show-overflow-tooltip sortable>
              <template slot-scope="scope">
                {{ scope.row.deviceTypeAbilitys.map(el => el.abilityName).join('、') }}
              </template>
            </el-table-column>
            <el-table-column prop="stopWatch" label="码表" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip sortable>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="deviceList.length">
          </el-pagination>
        </div>
        <div v-else-if="createStep == 2">
          <el-form label-position="left" label-width="150px" :model='h5Config' :rules='rules' ref='h5Config'>
            <el-form-item label="默认组名" prop='defaultTeamName'>
              <el-input v-model="h5Config.defaultTeamName"></el-input>
            </el-form-item>
            <el-form-item label="高级设置密码" prop='password'>
              <el-input type="text" v-model="h5Config.password"></el-input>
            </el-form-item>
            <el-form-item label="客服" prop='serviceUser'>
              <el-input type="text" v-model="h5Config.serviceUser"></el-input>
            </el-form-item>
            <el-form-item label="背景图册">
              <image-uploader :key='1' :urls='filterBg(h5Config.h5BgImgList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
              <span class="color">*可上传5张图片，格式（JPG\JPEG\PNG），尺寸（单张小于2M）,图册图片作为微信APP的背景，默认使用公版背景图,上传顺序：关机、白天晴、白天阴、夜晚晴、夜晚阴</span>
              
            </el-form-item>
            <el-form-item label="页面版式" prop="htmlTypeIds">
              <el-checkbox-group v-model="h5Config.htmlTypeIds">
                <el-checkbox v-for='item in pageFormatList' :label='item.id' :key='item.id'>{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="名称" prop='themeName'>
              <el-input v-model="h5Config.themeName"></el-input>
            </el-form-item>
            <el-form-item label="Logo">
              <image-uploader :key='2' :url='h5Config.logo' @get-url='setURL(arguments,h5Config,"logo")'></image-uploader>
              <span class="color">*上传客户LOGO图片，格式PNG ，尺寸（ 自定义单张小于2M）</span>

            </el-form-item>
            <el-form-item label="H5 版本" prop="version">
              <el-select v-model="h5Config.version">
                <el-option label="版本 1" value="1"></el-option>
                <el-option label="版本 2" value="2"></el-option>
                <el-option label="版本 3" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="createStep == 3">
          <el-form label-position="left" label-width="150px" :model='androidConfig' :rules='rules' ref='androidConfig'>
            <!-- 第一个安装宝 -->
            <el-form-item label="APP 名称1">              
              <el-input v-model='androidConfig.appInfos[0].name'></el-input>
            </el-form-item>
            <el-form-item label="APP Logo1">
              <image-uploader :key='3' :url='androidConfig.appInfos[0].logo' @get-url='setURL(arguments,androidConfig.appInfos[0],"logo")'></image-uploader>
              <span class="color">*上传客户LOGO图片，格式PNG ，尺寸（ 自定义单张小于2M),APPLOGO，用于PAD/电视APP独立封装用</span>
            </el-form-item>
            <el-form-item label="APP 软件版本1" prop="version">
              <el-input v-model='androidConfig.appInfos[0].version'></el-input>
            </el-form-item>
            <el-form-item label="上传安装包1">
              <file-uploader @get-url='setURL(arguments,androidConfig.appInfos[0],"appUrl")' :fileName='androidConfig.appInfos[0].appUrl' format='apk'></file-uploader>
            </el-form-item>
            <!-- 第二个 -->
            <el-form-item label="APP 名称2">
              <el-input v-model='androidConfig.appInfos[1].name'></el-input>
            </el-form-item>
            <el-form-item label="APP Logo2">
              <image-uploader :key='111' :url='androidConfig.appInfos[1].logo' @get-url='setURL(arguments,androidConfig.appInfos[1],"logo")'></image-uploader>
              <span class="color">*上传客户LOGO图片，格式PNG ，尺寸（ 自定义单张小于2M),APPLOGO，用于PAD/电视APP独立封装用</span>
            </el-form-item>
            <el-form-item label="APP 软件版本2" prop="version">
              <el-input v-model='androidConfig.appInfos[1].version'></el-input>
            </el-form-item>
            <el-form-item label="上传安装包2">
              <file-uploader @get-url='setURL(arguments,androidConfig.appInfos[1],"appUrl")' :fileName='androidConfig.appInfos[1].appUrl' format='apk'></file-uploader>
            </el-form-item>
            <!-- 截止 -->
            <el-form-item label="公众号二维码">
              <image-uploader :key='4' :url='androidConfig.qrcode' @get-url='setURL(arguments,androidConfig,"qrcode")'></image-uploader>
              <span class="color">*上传客户公众号二维码，格式(JPE\JPEG\PNG)，尺寸（ 自定义单张小于2M),用于APP上相应位置呈现</span>
            </el-form-item>
            <el-form-item label="设备切换密码" prop="deviceChangePassword">
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
                <image-uploader :url='androidConfig.androidScene.imgsCover' @get-url='setURL(arguments,androidConfig.androidScene,"imgsCover")'></image-uploader>
              </el-form-item>
              <el-form-item label="场景图册">
                <image-uploader :urls='filterBg(androidConfig.androidScene.androidSceneImgList)' @get-url='setImgForScene' @remove-url='removeImgForScene' :isList='true' :limit='5'></image-uploader>
              </el-form-item>
              <el-form-item label="场景视频">
                <video-uploader :maxSize='50' :list='filterBg(androidConfig.androidScene.androidSceneVideoList)' :multiple='true' @onSuccess="handleVideoSuccess" @onRemove="handleVideoRemove"></video-uploader>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <el-form label-position="left" label-width="150px" :model='backendConfig' :rules='rules' ref='backendConfig'>
            <el-form-item label="开放">
              <el-switch v-model='backendConfig.enableStatus'></el-switch>
            </el-form-item>
            <el-form-item label="Logo">
              <image-uploader :key='5' :url='backendConfig.logo' @get-url='setURL(arguments,backendConfig,"logo")'></image-uploader>
              <span class="color">*可上传图片，格式（JPG\JPEG\PNG），尺寸（单张小于2M）</span>

            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model='backendConfig.name'></el-input>
            </el-form-item>
            <!-- 用户名和二级域名传参数时 放在baseInfo里 -->
            <el-form-item label="超级管理员用户名" prop="loginName">
              <el-input v-model='baseInfo.loginName'></el-input>
            </el-form-item>
            <el-form-item label="二级域名" prop="sld">
              <div class='sld-inside'>
                <div class='sld-input'>
                  <el-input v-model='baseInfo.sld'></el-input>
                </div>
                <p>
                  &nbsp;&nbsp;+&nbsp;&nbsp;/hcocloud.com/
                </p>
              </div>
              <span class="color">*上传客户公众号二维码，格式(JPE\JPEG\PNG)，尺寸（ 自定义单张小于2M),用于APP上相应位置呈现</span>
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
      <el-button type="primary" @click="backStep" v-if="createStep !== 0">上一步</el-button>
      <el-button type="primary" @click="nextStep" v-if="createStep < 4">下一步</el-button>
      <el-button type="primary" @click="saveDetail" v-else>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image'
import FileUploader from '@/components/Upload/file'
import { selectTypesBySLD } from '@/api/device/type'
import { saveDetail } from '@/api/customer'
import { select as getForamtList } from '@/api/format'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rules: {
        name: [
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name1: [
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        publicName: [
          { max: 15, message: '最大长度为15个字符', trigger: 'blur' },
          { required: true, message: '请输入公众号名称', trigger: 'blur' }
        ],
        appid: [
          { min: 1, max: 20, message: '最长为20个字符', trigger: 'blur' },
          { required: true, message: '请输入appid', trigger: 'blur' }
        ],
        appsecret: [
          { min: 1, max: 33, message: '最长为50个字符', trigger: 'blur' },
          { required: true, message: '请输入appsecret', trigger: 'blur' }
        ],
        userType: [
          { min: 1, max: 33, message: '最长为50个字符', trigger: 'change' },
          { required: true, message: '请选择客户类型', trigger: 'change' }
        ],
        defaultTeamName: [
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' },
          { required: true, message: '请输入默认组名', trigger: 'blur' }
        ],
        password: [
          { max: 40, message: '最长为40个字符', trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        themeName: [
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' },
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        htmlTypeIds: [
          { required: true, message: '请选择页面版式', trigger: 'change' }
        ],
        version: [
          { required: false, message: '请选择H5版本', trigger: 'change' }
        ],
        deviceChangePassword: [
          { max: 50, message: '最大长度为50个字符', trigger: 'blur' },
          { required: true, message: '请输入设备切换密码', trigger: 'blur' }
        ]
      },
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
        androidScene: {
          androidSceneImgList: [],
          androidSceneVideoList: [],
          description: '',
          imgsCover: '',
          name: '',
          status: 0
        },
        appInfos:[{
          appUrl:'',
          logo:'',
          name:'',
          version:'',
          appNo:''
        },{
          appUrl:'',
          logo:'',
          name:'',
          version:'',
          appNo:''
        }],
        // appUrl: '',
        deviceChangePassword: '',
        // logo: '',
        // name: '',
        qrcode: '',
        status: 0,
        // version: ''
      },
      backendConfig: {
        enableStatus: true,
        id: 0,
        logo: '',
        name: '',
        type: 0
      },
      createStep: 0,
      // 动态功能
      selectedDeviceList: [],
      deviceList: [],
      listQuery: {
        limit: 1000,
        page: 1
      },
      pageFormatList: []
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
    getForamtList() {
      getForamtList(this.listQuery).then(res => {
        this.pageFormatList = res.data
      })
    },
    backStep() {
      this.createStep--
    },
    nextStep() {
      if (this.createStep == 0) {
        this.submitForm('baseInfo')
      } else if (this.createStep == 1) {
        if (this.selectedDeviceList.length > 0) {
          this.createStep++
        } else {
          this.$message.warning('请选择设备类型后再进行操作')
        }
      } else if (this.createStep == 2) {
        this.submitForm('h5Config')
      } else if (this.createStep == 3) {
        this.submitForm('androidConfig')
      }
      if (this.createStep === 5) {
        this.isCreateClientDialogVisible = false
        this.createStep = 0
      }
    },
    submitForm(formName) {
      //判断表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createStep++
        } else {
          return false
        }
      })
    },
    subForm(formName) {
      //判断表单验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createStep++
        } else {
          return false
        }
      })
    },
    getList() {
      selectTypesBySLD(this.listQuery).then(response => {
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
      // transition-group动画必须提供唯一id且id不能为循环出来的index值
      data.androidSceneImgList.push({
        description: '',
        id: this.$options.filters.GUID(),
        imgVideo: '',
        name: ''
      })
    },

    saveDetail() {
      this.backendConfig.enableStatus = this.backendConfig.enableStatus ? 1 : 2

      // 这样 htmlTypeIds 就不会影响到页面源数据了
      const h5Config = Object.assign({}, this.h5Config)
      // 拼接成一个字符串
      h5Config.htmlTypeIds = h5Config.htmlTypeIds.join(',')
      // 转换背景图册数据格式
      if (h5Config.h5BgImgList) {
        h5Config.h5BgImgList = h5Config.h5BgImgList.map(item => {
          return {
            bgImg: item.image
          }
        })
      }

      // 转换场景图册/视频格式
      const androidScene = this.androidConfig.androidScene
      const androidConfig = {
        ...this.androidConfig,
        androidScene: {
          ...androidScene,
          androidSceneImgList: androidScene.androidSceneImgList.map(item => {
            return {
              imgVideo: item.image,
              status: item.image ? item.status : 2
            }
          }),
          androidSceneVideoList: androidScene.androidSceneVideoList.map(
            item => {
              return {
                imgVideo: item.video,
                status: item.video ? item.status : 2
              }
            }
          )
        }
      }

      const form = {
        ...this.baseInfo,
        typeIds: this.selectedDeviceList.map(item => item.id).join(','),
        h5Config,
        androidConfig,
        backendConfig: this.backendConfig
      }

      saveDetail(form).then(res => {
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
    },
    handleUp(data, index) {
      data.androidSceneImgList[index] = data.androidSceneImgList.splice(
        index - 1,
        1,
        data.androidSceneImgList[index]
      )[0]
    },
    handleDown(data, index) {
      data.androidSceneImgList[index] = data.androidSceneImgList.splice(
        index + 1,
        1,
        data.androidSceneImgList[index]
      )[0]
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.createStep = 0
      }
    },
    createStep(step) {
      if (step === 1) {
        this.$nextTick(() => {
          this.selectedDeviceList.forEach(item => {
            this.$refs.typeTree.toggleRowSelection(item)
          })
        })
      }

      if (step === 2) {
        this.$notify.info({
          title: '注意事项',
          duration: 5000,
          message: `须上传五张背景图片，供H5端APP使用。“依次”为：关机，白天-晴天，白天-阴天，夜晚-晴天，夜晚-阴天`
        })
      }
    }
  },
  created() {
    this.getList()
    this.getForamtList()
  },
  components: {
    ImageUploader,
    FileUploader
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
.pictureList {
  .tool > * {
    cursor: pointer;
    & + * {
      margin-left: 12px;
    }
  }
  .up,
  .down {
    color: #ccc;
  }
  .up {
    transform: rotate(90deg);
  }
  .down {
    transform: rotate(-90deg);
  }
}
.color{
  color: #969696
}
</style>