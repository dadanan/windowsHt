<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="编辑设备型号" :visible="visible" @update:visible="$emit('update:visible', $event)" width='60%'>
    <el-steps :active="step" finish-status="success" class="mb20" align-center>
      <el-step title="设备配置"></el-step>
      <el-step title="客户信息设置"></el-step>
      <el-step title="硬件功能项"></el-step>
      <el-step title="版式配置"></el-step>
    </el-steps>
    <el-form v-if='step === 0' label-width="100px" class="mb-22" :model="form" :rules="rules" ref="form">
      <el-form-item label="客户" prop="customerId">
        <el-select v-model="form.customerId" @change="handleCustomerChange" :disabled="!isPro()">
          <el-option v-for="model in customterList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
        <span class="color">*选择该型号所属客户</span>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-select v-model="form.typeId" @change="handleTypeChange" :disabled="!isPro()">
          <el-option v-for="model in typeList" :key="model.id" :label="model.name" :value="model.id">
          </el-option>
        </el-select>
        <span class="color">*选择该型号产品所属设备类型</span>
      </el-form-item>
      <template v-if="form.typeId">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="form.modelCode"></el-input>
        </el-form-item>
        <el-form-item label="ModelNo">
          <el-input v-model="form.modelNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="缩图">
          <!-- <image-uploader :key='form.icon' :url='form.icon' @get-url='setURL(arguments,form,"icon")'></image-uploader> -->
         <image-uploader :key='10' :urls='filterBg(form.icons)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="软件">
        <file @get-url='setURL(arguments,null,"software")' :file-name='getImageName(this.software)'></file>
        <span class="color">*上传该型号产品远程升级固件</span>
      </el-form-item>
      <el-form-item label="帮助文件">
          <!-- <image-uploader :urls='form.icon' @get-url='setURL(arguments,form,"icon")'></image-uploader> -->
         <image-uploader :key='13' :urls='filterBg1(form.helpFileUrlList)' @get-url='setImg1' @remove-url='removeImg1' :isList='true' :limit='5'></image-uploader>
      </el-form-item>

      
      <el-form-item label="适用从机型号">
        <el-checkbox-group v-model="childModelIds">
          <el-checkbox v-for="item in deviceModelData" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-form v-else-if='step === 1' label-width="100px" class="mb-22">
      <el-form-item label="ProductID">
        <el-input v-model="form.productId"></el-input>
        <span class="color">*该产品类型对应ProductID（微信）</span>
      </el-form-item>
      <el-form-item label="二维码">
        <image-uploader :url='form.productQrCode' @get-url='setURL(arguments,form,"productQrCode")'></image-uploader>
        <span class="color">*上传产品绑定二维码，格式（JPG\JPEG\PNG),尺寸（1：1，小于2M）</span>
      </el-form-item>
      <el-form-item label="DeviceID余额">
        <div class='inline-input'>
          <el-input v-model="form.devicePoolCount" disabled></el-input>
        </div>
      </el-form-item>
    </el-form>
    <el-form v-else-if='step===2' label-width="100px" class="mb-22">
      <el-table :data="deviceModelAbilitys" style="width: 100%" class="mb20" border>
        <el-table-column label="功能项名称">
          <template slot-scope="scope">
            <el-input v-model='scope.row.abilityName' disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column label="显示名称">
          <template slot-scope="scope">
            <el-input v-model='scope.row.definedName'></el-input>
          </template>
        </el-table-column>
        <el-table-column label="功能类型(标签)">
          <template slot-scope="scope">
            {{typeModel[scope.row.abilityType]}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if='scope.row.abilityType!==1' type="primary" @click='modifyAbilityItem(scope.row)'>自定义功能项</el-button>
          </template>
        </el-table-column>

        <el-table-column label="后台操作" align='center'>
          <template slot-scope="scope">
              <el-switch style="display: block" v-model="scope.row.canAdminOper" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="后台展示" show-overflow-tooltip align='center'>
          <template slot-scope="scope">
            <el-switch style="display: block" v-model="scope.row.operStatus" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否监测" show-overflow-tooltip align='center'>
          <template slot-scope="scope">
            <el-switch style="display: block" v-model="scope.row.isCheck" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-model='scope.row.remark'></el-input>
          </template>
        </el-table-column>

        <el-table-column label="是否使用" align='center'>
          <template slot-scope="scope">
            <el-switch style="display: block" v-model="scope.row.isUsed" active-color="#13ce66" inactive-color="#ff4949" :disabled="scope.row.updateStatus === 3 || scope.row.updateStatus === -1 ">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{updateStatus[scope.row.updateStatus]}}
          </template>
        </el-table-column>
        <el-table-column label="倍数">
          <template slot-scope="scope">
            <el-input v-model='scope.row.multipleAdjust'></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-form v-else-if='step===3' label-width="100px" class="mb-22">
      <el-form-item label="版式选择">
        <el-select clearable v-model="form.formatId" @change="handleFormatChange">
          <el-option v-for="format in formatSelectedList" :key="format.id" :label="format.name" :value="format.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安卓版式选择">
        <el-select clearable v-model="form.androidFormatId">
          <el-option v-for="format in androidForamtList" :key="format.id" :label="format.name" :value="format.id">
          </el-option>
        </el-select>
      </el-form-item>
      <template v-for='(item,index) in filterPageOfForamt()'>
        <el-card class='box-card' :key='item.id'>
          <div class='tool'>
            <span class='close' @click='deleteFormatConfig(index)'></span>
          </div>
          <el-form-item label='页面预览'>
            <img class='format-page-img' :src='item.showImg'>
          </el-form-item>
          <el-form-item label='页面名称'>
            {{item.showName || item.name}}
          </el-form-item>
          <el-form-item label='列表展示'>
              <el-select clearable v-model="form.listShowModelAbilityId">
                <el-option v-for="iItems in choose(deviceModelAbilitys)" :label="iItems.name" :value="iItems.id" :key='iItems.id'>
                </el-option>
              </el-select>
          </el-form-item>


          
          <d-title>配置页面功能项</d-title>
          <el-table :data="item.modelFormatItems" style="width: 100%" class="mb20" border>
            <el-table-column type="index" label='标号 ' width="50"></el-table-column>
            <el-table-column label="显示名称">
              <template slot-scope="scope">
                <el-input v-model='scope.row.showName'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="功能类型(标签)">
              <template slot-scope="scope">
                {{typeModel[scope.row.abilityType]}}
              </template>
            </el-table-column>
            <el-table-column label="微信端展示" align='center' show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.showStatus" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <!-- <el-table-column label="后台操作" align='center'>
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.canAdminOper" active-color="#13ce66" inactive-color="#ff4949" >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="后台展示" align='center' show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.operStatus" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="是否监测" align='center' show-overflow-tooltip>
              <template slot-scope="scope">
                <el-switch style="display: block" v-model="scope.row.isCheck" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-input v-model='scope.row.remark'></el-input>
              </template>
            </el-table-column> -->
            <el-table-column label="挑选功能项">
              <template slot-scope="scope">
                <el-select multiple collapse-tags clearable v-model="scope.row.abilityId">
                  <el-option v-if='iItem.definedName' v-for="iItem in useableAbility(scope.row.abilityType)" :key="iItem.id" :label="iItem.definedName" :value="iItem.abilityId">
                  </el-option>
                  <el-option v-else v-for="iItem in useableAbility(scope.row.abilityType)" :key="iItem.id" :label="iItem.abilityName" :value="iItem.abilityId">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取消</el-button>
      <el-button type="primary" v-if='step!==0 ' @click="backStep()">上一步</el-button>
      <el-button type="primary" v-if='step!==3 ' @click="nextStep()">下一步</el-button>
      <el-button type="primary" v-else @click="updateDeviceModel">确定</el-button>
    </div>
    <el-dialog top='4vh' :close-on-click-modal=false title="自定义" :visible.sync="dialogFormVisible" append-to-body>
      <el-form label-width="100px" class="mb-22">
        <el-form-item label="功能项名称">
          <el-input v-model="modifyData.abilityName" disabled></el-input>
        </el-form-item>
        <el-form-item label="功能分类">
          {{typeModel[modifyData.abilityType]}}
        </el-form-item>
        <d-title>自定义部分</d-title>
        <template v-if='modifyData.abilityType === 2 || modifyData.abilityType === 3' v-for="(option, i) in modifyData.deviceModelAbilityOptions">
          <el-form-item v-if="option.status !== 2" :key="i" :label="'选项 ' + i">
            <div class="input-group">
              <el-input v-model="option.definedName" placeholder="选项名称"></el-input>
              <el-input v-model="option.optionValue" placeholder="选项指令" v-if='option.new'></el-input>
              <el-input v-model="option.actualOptionValue" placeholder="映射指令值"></el-input>
              <el-tag type="success" v-if='option.updateStatus === 1'>新增</el-tag>
              <el-button type="success" v-if='option.status === 1' @click="disableConfigOption(option,i)">已启用</el-button>
              <el-button type="danger" v-if='option.status === 3 && option.updateStatus !==3 ' @click="ableConfigOption(option,i)">已禁用</el-button>
            </div>
          </el-form-item>
        </template>

        <el-form-item v-if='modifyData.abilityType === 4'>
          <div class="input-group">
            <el-input v-model="modifyData.minVal" placeholder="最小值"></el-input>
            <el-input v-model="modifyData.maxVal" placeholder="最大值"></el-input>
            <el-tag type="success" v-if='option.updateStatus === 1'>新增</el-tag>
            <el-button type="success" v-if='option.status === 1' @click="disableConfigOption(option,i)">已启用</el-button>
            <el-button type="danger" v-if='option.status === 3 && option.updateStatus !==3 ' @click="ableConfigOption(option,i)">已禁用</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if='modifyData.abilityType === 5' v-for="(option, i) in modifyData.deviceModelAbilityOptions" :key="i" :label="'选项 ' + i">
          <div class="input-group">
            <el-input v-model="option.definedName" placeholder="选项名称"></el-input>
            <el-input v-model="option.optionValue" placeholder="选项指令" v-if='option.new'></el-input>
            <el-input v-model="option.maxVal" placeholder="最小值"></el-input>
            <el-input v-model="option.minVal" placeholder="最大值"></el-input>
            <el-tag type="success" v-if='option.updateStatus === 1'>新增</el-tag>
            <el-button type="success" v-if='option.status === 1' @click="disableConfigOption(option,i)">已启用</el-button>
            <el-button type="danger" v-if='option.status === 3 && option.updateStatus !==3 ' @click="ableConfigOption(option,i)">已禁用</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if='modifyData.abilityType === 6' v-for="(option, i) in modifyData.deviceModelAbilityOptions" :key="i" :label="'选项 ' + i">
          <div class="input-group">
            <el-input v-model="option.definedName" placeholder="选项名称"></el-input>
            <el-input v-model="option.defaultVal" placeholder="默认值"></el-input>
            <el-input v-model="option.maxVal" placeholder="最小值"></el-input>
            <el-input v-model="option.minVal" placeholder="最大值"></el-input>
            <el-tag type="success" v-if='option.updateStatus === 1'>新增</el-tag>
            <el-button type="success" v-if='option.status === 1' @click="disableConfigOption(option,i)">已启用</el-button>
            <el-button type="danger" v-if='option.status === 3 && option.updateStatus !==3 ' @click="ableConfigOption(option,i)">已禁用</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import ImageUploader from "@/components/Upload/image1";
import File from "@/components/Upload/file";
import FileUploader from "@/components/Upload/excel";

import { fetchList as getTypeList } from "@/api/device/type";
import { selectAllCustomers as getCustomer } from "@/api/customer";
import { selectFormatsByCustomerId, select } from "@/api/format";
import { updateDeviceModel } from "@/api/device/model";
import { selectTypesBySLD } from "@/api/device/type";
import DTitle from "@/components/Title";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    deviceModelData: Array,
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        typeId: "",
        customerId: "",
        showStatus: true,
        devicePoolCount: "",
        name: "",
        modelCode: "",
        modelNo: "",
        remark: "",
        listShowModelAbilityId:'',
        icons:[],
        helpFileUrlList:[]
      },
      createFunctionDialogVisible: false,
      childModelIds: [],
      formatId: "",
      formatSelectedList: [], // 用户可选择的总版式列表
      formatSelected: [], // 用户选择的某个版式列表
      androidForamtList: [], // 安卓版式列表
      pageOfForamt: [], // 用户选择的某个版式列表的页面配置
      dialogFormVisible: false,
      typeList: [],
      deviceModelAbilitys: [], // 设备类型里的功能项数据
      rules: {
        customerId: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      abilitySelected: [
        {
          name: "功能项1",
          id: 1
        },
        {
          name: "功能项2",
          id: 2
        },
        {
          name: "功能项3",
          id: 3
        }
      ],
      step: 0,
      options: [
        {
          name: "asd",
          type: "开关类",
          remark: "备注1"
        },
        {
          name: "dfgfg",
          type: "文本类",
          remark: "备注2"
        }
      ],
      customterList: [],
      modifyData: {}, // 正在自定义的功能配置项数据
      typeModel: {
        1: "文本类",
        2: "单选类",
        3: "多选类",
        4: "阈值类",
        5: "阈值选择类",
        6: "设备传参类"
      },
      updateStatus: {
        0: "",
        1: "新增",
        "-1": "禁用"
      },
      software: ""
    };
  },
  methods: {
    filterPageOfForamt() {
      return this.pageOfForamt.filter(item => item.status === 1);
    },
    deleteFormatConfig(index) {
      this.pageOfForamt[index].status = 2;
    },
    choose(data){
      var arrs = []
      for(var i = 0; i<data.length;i++){
        if(data[i].abilityType == 1){
          arrs.push({
            id:data[i].abilityId,
            name:data[i].abilityName
          })
        }
      }
      return arrs
    },
    getSld() {
      // 获取二级域名
      const sld = location.href.match(/:\/\/(.*?).sikelai/);
      if (sld) {
        return sld[1];
      }
      return "";
    },
    isPro() {
      // 是正式环境或者开发环境？
      const sld = this.getSld();
      return sld === "pro" || sld === "" || sld === "dev";
    },
    useableAbility(key) {
      if (key === 3) {
        key = 2;
      }
      return this.deviceModelAbilitys.filter(
        item => item.isUsed && item.abilityType === key
      );
    },
    updateDeviceModel() {
      // 调整第三步「硬件功能项」的数据结构
      let newArray = this.deviceModelAbilitys;
      newArray = newArray.map(item => {
        return {
          id: item.id,
          abilityId: item.abilityId,
          definedName: item.definedName,
          maxVal: item.maxVal,
          minVal: item.minVal,
          status: item.isUsed ? 1 : 3,
          canAdminOper: item.canAdminOper? 1 : 0,
          operStatus: item.operStatus? 1 : 0,
          isCheck: item.isCheck? 1 : 0,
          remark: item.remark,
          multipleAdjust:parseFloat(item.multipleAdjust),
          deviceModelAbilityOptions:
            item.deviceModelAbilityOptions &&
            item.deviceModelAbilityOptions.map(iItem => {
              return {
                id: iItem.id,
                abilityOptionId: iItem.abilityOptionId,
                actualOptionValue: iItem.actualOptionValue,
                definedName: iItem.definedName,
                maxVal: iItem.maxVal,
                defaultVal: iItem.defaultVal,
                minVal: iItem.minVal,
                status: iItem.status,
                canAdminOper : iItem.canAdminOper,
                remark: iItem.remark,
                multipleAdjust:parseFloat(iItem.multipleAdjust),
                operStatus: iItem.operStatus? 1 : 0,
                isCheck: iItem.isCheck? 1 : 0,
                
              };
            })
        };
      });

      // 调整第四步「版式配置」的数据结构
      const modelFormatPages =
        this.pageOfForamt &&
        this.pageOfForamt.map(item => {
          return {
            id: item.id,
            pageId: item.pageId || item.id,
            showName: item.showName || item.name,
            showStatus: item.showStatus ? 1 : 0,
            // canAdminOper: item.canAdminOper ? 1 : 0,
            // operStatus: item.operStatus ? 1 : 0,
            // isCheck: item.isCheck ? 1 : 0,
            status: item.status,
            // remark: item.remark,
            modelFormatItems:
              item.modelFormatItems &&
              item.modelFormatItems.map(iItem => {
                return {
                  id: iItem.id,
                  abilityId: iItem.abilityId.join(","),
                  itemId: iItem.itemId,
                  showName: iItem.showName,
                  showStatus: iItem.showStatus ? 1 : 0,
                  // canAdminOper: iItem.canAdminOper ? 1 : 0,
                  // remark: iItem.remark,
                  // operStatus: iItem.operStatus ? 1 : 0,
                  // isCheck: iItem.isCheck ? 1 : 0,
                };
              })
          };
        });

      const form = {
        ...this.form,
        childModelIds: this.childModelIds.join(","),
        description: "",
        deviceModelAbilitys: newArray,
        deviceModelFormat: {
          modelFormatPages
        }
      };
      updateDeviceModel(form).then(res => {
        this.$emit("update:visible", false);
        this.$emit("update-data", {
          ...form,
          id: res.data
        });
        if (!this.form.formatId) {
          return;
        }
        const formatSelected = this.formatSelectedList.filter(
          item => item.id === this.form.formatId
        );

        let url = `${this.formatSelected[0].htmlUrl}?customerId=${
          this.form.customerId
        }`;
        const domain = window.origin.match("://(.*).sikelai.net")[1];
        url = url.replace("://pro", "://" + domain);

        this.$alert(
          `您已成功配置好型号数据，请先保存链接，稍后添加至微信公众号自定义菜单中: ${url}`,
          "预览地址",
          {
            confirmButtonText: "确定"
          }
        );
      });
    },
    selectFormatsByCustomerId() {
      selectFormatsByCustomerId(this.form.customerId, this.form.typeId).then(
        res => {
          this.formatSelectedList = res.data;
          // // 如果是编辑状态，详情中没有版式配置项数据的话，从原版式数据copy过来一份数据。
          // if (Number.isInteger(this.data.formatId)) {
          //   // 手动将特定版式的一些数据塞到用户当前版式数据中（因为查询型号详情的版式数据中缺少一些参数）
          //   const formatSelected = this.formatSelectedList.filter(
          //     item => item.id === this.form.formatId
          //   )
          //   const pageOfForamt =
          //     formatSelected && formatSelected[0].wxFormatPageVos
          //   if (!this.pageOfForamt) {
          //     // 上次用户没有配置版式数据，仅仅选择了版式
          //     this.pageOfForamt = pageOfForamt
          //     this.pageOfForamt.forEach(page => {
          //       page.pageId = page.pageId || page.id
          //       page.modelFormatItems = page.wxFormatItemVos
          //       delete page.pageNo
          //       delete page.wxFormatItemVos
          //     })
          //   }
          // }
        }
      );
    },
    handleTypeChange(id) {
      const theType = this.typeList.filter(item => item.id === id)[0];

      const form = this.form;
      form.name = theType.name;
      // form.icon = theType.icon;
      form.remark = theType.remark;

      theType.deviceTypeAbilitys &&
        theType.deviceTypeAbilitys.forEach(item => {
          item["definedName"] = item.abilityName;
          this.$set(item, "isUsed", true);
          // 将类型的不同名称的功能选项数据换成和型号详情里的对应
          item["deviceModelAbilityOptions"] = item.deviceAbilityOptions;
        });

      this.deviceModelAbilitys = theType.deviceTypeAbilitys;
    },
    modifyAbilityItem(data) {
      this.dialogFormVisible = true;
      this.modifyData = data;
    },
    handleCustomerChange(id) {
      const temp = this.customterList.filter(item => item.id === id);
      this.getTypeById();
      this.form.typeId = "";
    },
    getCustomer() {
      getCustomer({
        limit: 100,
        page: 1
      }).then(res => {
        this.customterList = res.data;
      });
    },
    backStep() {
      if (this.step > 0) {
        this.step--;
      }
    },
    nextStep() {
      if (this.step === 1) {
        this.selectFormatsByCustomerId();
      }
      if (this.step++ > 2) this.step = 0;
    },
    getModelList() {
      getTypeList({
        page: 1,
        limit: 100
      }).then(response => {
        this.typeList = response.data;
      });
    },
    filterBg(data) {
      // console.log(data)
      return data
    },
    filterBg1(data) {
      // console.log(data)
      return data
    },
    removeImg(file) {
      // const index = this.form.icons.findIndex(v => v.image === file.url)
      this.form.icons.splice((this.form.icons.indexOf(file.url)),1)
    },
    removeImg1(file) {
      // const index = this.form.icons.findIndex(v => v.image === file.url)
      this.form.helpFileUrlList.splice((this.form.helpFileUrlList.indexOf(file.url)),1)
    },
    setImg(file) {
      this.form.icons = [...this.form.icons, file.url]
    },
    setImg1(file) {
      this.form.helpFileUrlList = [...this.form.helpFileUrlList, file.url]
    },
    setURL1(argu, data, name) {
      data[name] = argu[0];
    },
    setURL(argu, data, name) {
      if (!data) {
        this[name] = argu[0];
        return;
      }
      data[name] = argu[0];
    },
    getImageName(url) {
      if (!url) {
        return "";
      }
      const match = url.match("aliyuncs.com/(.*)");
      return match ? match[1] : "";
    },
    handleFormatChange(id) {
      this.formatSelected = this.formatSelectedList.filter(
        item => item.id === id
      );
      this.pageOfForamt =
        this.formatSelected && this.formatSelected[0].wxFormatPageVos;

      this.pageOfForamt.forEach(page => {
        this.$set(page, "pageId", page.id);
        delete page.id;
        if (!page.wxFormatItemVos) {
          return;
        }
        // 修改原版式数据的参数名称
        // 删除版式表的id参数
        page.wxFormatItemVos.forEach(item => {
          item.showName = item.name;
          this.$set(item, "showStatus", true);
          this.$set(item, "canAdminOper", true);
          this.$set(item, "operStatus", true);
          this.$set(item, "isCheck", true);
          this.$set(item, "itemId", item.id);
          delete item.id;
        });
        page.modelFormatItems = page.wxFormatItemVos;
      });
    },
    getTypeById() {
      selectTypesBySLD().then(res => {
        this.typeList = res.data;
      });
    },
    disableConfigOption(data, i) {
      this.$set(data, "status", 3);
    },
    ableConfigOption(data, i) {
      this.$set(data, "status", 1);
    },
    getAndroidFrmatList() {
      select({ limit: 100, page: 1, type: 3 }).then(res => {
        this.androidForamtList = res.data;
      });
    }
  },
  created() {
    this.getModelList();
    this.getCustomer();
    this.getAndroidFrmatList();
  },
  watch: {
    /**
     *   总结下： status: 1 正常状态
     *   status: 2 逻辑删除
     *   status: 3 禁用
     *   updateStatus: 0 正常
     *   updateStatus: 1 新增
     *   updateStatus: -1 删除
     *   updateStatus: 3 禁用使用
     */
    data(val) {
      const newData = JSON.parse(JSON.stringify(val));
      this.childModelIds = newData.childModelIds
        ? newData.childModelIds.split(",").map(Number)
        : [];

      // 第三步：预设自定义名称
      newData.deviceModelAbilitys &&
        newData.deviceModelAbilitys.forEach(item => {
          item["abilityName"] = item.definedName;
          if (
            item.updateStatus === 1 ||
            item.updateStatus === 3 ||
            item.updateStatus === -1
          ) {
            // 新添加的功能项，默认禁用。可手动启用
            this.$set(item, "status", 3);
          }
          if (item.status === 1) {
            this.$set(item, "isUsed", true);
          } else if (item.status === 3) {
            this.$set(item, "isUsed", false);
          }
          if (item.canAdminOper == 1) {
            this.$set(item, "canAdminOper", true);
          } else if (item.canAdminOper == 0) {
            this.$set(item, "canAdminOper", false);
          }
          if (item.operStatus == 1) {
            this.$set(item, "operStatus", true);
          } else if (item.operStatus == 0) {
            this.$set(item, "operStatus", false);
          }
          if (item.isCheck == 1) {
            this.$set(item, "isCheck", true);
          } else if (item.isCheck == 0) {
            this.$set(item, "isCheck", false);
          }
          // 新增的选项默认设置为禁用状态
          item.deviceModelAbilityOptions &&
            item.deviceModelAbilityOptions.forEach(option => {
              // 如果是新增的，或者设备功能那边禁用了的选项
              if (option.updateStatus === 1 || option.updateStatus === 3) {
                option.status = 3;
              }
            });
        });

      this.deviceModelAbilitys = newData.deviceModelAbilitys;

      if (newData.deviceModelFormat) {
        this.pageOfForamt = newData.deviceModelFormat.modelFormatPages;
      }

      // 如果用户上次配置了版式数据，那么转换一些参数
      if (this.pageOfForamt) {
        console.log(this.pageOfForamt)
        this.pageOfForamt.forEach(item => {
          item.showStatus = item.showStatus ? true : false;
          item.operStatus = item.operStatus ? true : false;
          item.isCheck = item.isCheck ? true : false;
          item.canAdminOper = item.canAdminOper ? true : false;
          Array.isArray(item.modelFormatItems) &&
            item.modelFormatItems.forEach(iItem => {
              iItem.showStatus = iItem.showStatus ? true : false;
              iItem.operStatus = iItem.operStatus ? true : false;
              iItem.canAdminOper = iItem.canAdminOper ? true : false;
              iItem.isCheck = iItem.isCheck ? true : false;
              if (iItem.abilityId) {
                // 如果存在挑选的功能项数据，转化为数组元素
                this.$set(
                  iItem,
                  "abilityId",
                  iItem.abilityId.split(",").map(Number)
                );
              } else {
                this.$set(iItem, "abilityId", []);
              }
            });
        });
        // for(var i = 0;i<this.pageOfForamt[0].modelFormatItems.length;i++){
        //   if(this.pageOfForamt[0].modelFormatItems[i].abilityId == ''){
        //     this.pageOfForamt[0].modelFormatItems[i].abilityId = ''
        //   }else{
        //     this.pageOfForamt[0].modelFormatItems[i].abilityId = Number(this.pageOfForamt[0].modelFormatItems[i].abilityId)
        //   }
        // }
      } else {
        // 如果用户上次没有配置版式数据的话
      }
      if(newData.helpFileUrlList){
        this.form = newData;
      }else{
        newData.helpFileUrlList = []
         this.form = newData;
      }
      
    },
    visible(val) {
      if (val) {
        this.step = 0;
      }
    }
  },
  components: {
    ImageUploader,
    DTitle,
    FileUploader,
    File
  }
};
</script>

<style lang='scss'>
.box-card {
  margin-top: 10px;
  position: relative;
  .el-card__body {
    margin-top: 1rem;
  }
  .tool {
    position: absolute;
    top: 0.5rem;
    right: 0.7rem;
    width: fit-content;
    display: flex;
    align-items: center;
    .close {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url("~@/assets/img/close.png");
      background-size: cover;
      margin-right: 5px;
    }
  }
}
.inline-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 49%;
  }
}
.format-page-img {
  width: 300px;
}
.input-group {
  display: flex;
  align-items: center;
}
</style>