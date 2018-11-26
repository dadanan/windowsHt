<template>
    <div>
        <el-dialog top='4vh' :close-on-click-modal=false title="创建工程" :visible="visible" width="800px" @update:visible="$emit('update:visible', $event)">
            <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div">
                <div>
                    <el-steps :active="createStep" finish-status="success" class="mb20" align-center>
                        <el-step title="基本信息"></el-step>
                        <el-step title="关联项目信息"></el-step>
                    </el-steps>
                    <div v-if="createStep == 0">
                        <el-form label-position="left" label-width="150px">
                            <el-form-item label="客户名称">
                                <el-input v-model="baseInfo.name"></el-input>
                            </el-form-item>
                            <el-form-item label="工程名称">
                                <el-input v-model="baseInfo.publicName"></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="baseInfo.remark"></el-input>
                            </el-form-item>
                            <el-form-item label="工程建设时间">
                                <el-date-picker type="date" placeholder="实施时间..." v-model='baseInfo.times'></el-date-picker>
                            </el-form-item>
                            <el-form-item label="工程建设地址">
                                <el-input v-model="baseInfo.publicName" style="width:100px" placeholder="请填写省"></el-input>
                                <el-input v-model="baseInfo.publicName" style="width:100px" placeholder="请填写市"></el-input>
                                <el-input v-model="baseInfo.publicName" style="width:100px" placeholder="请填写区"></el-input>
                                <el-input v-model="baseInfo.publicName" style="width:280px" placeholder="请输入详细地址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="baseInfo.publicName" style="width:295px" placeholder="请输入详细地址"></el-input>
                                <el-input v-model="baseInfo.publicName" style="width:295px" placeholder="请输入详细地址"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="createStep == 1">
                        <el-form label-position="left" label-width="150px">
                            <el-form-item label="关联设备项目">
                                <el-button type="primary " @click="addEle = true">添加</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-tag v-if="selectedDeviceList.length >0" v-for="item in selectedDeviceList" :key="item.name" closable :type="item.type" @close="handleClose(item)" style="margin:0px 10px">
                                    {{item.name}}
                                </el-tag>
                            </el-form-item>
                            <el-form-item label="添加其他设备">
                                <el-button type="primary " @click="otherDeve = true">添加</el-button>
                            </el-form-item>
                            <el-form-item v-if="dataList.length>0">
                                <el-table :data="dataList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
                                    <el-table-column type="index"></el-table-column>
                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip sortable>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="设备型号" show-overflow-tooltip sortable>
                                    </el-table-column>
                                    <el-table-column prop="mac" label="厂家" show-overflow-tooltip sortable>
                                    </el-table-column>
                                    <el-table-column prop='hardVersion' label="说明书" show-overflow-tooltip sortable>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item label="添加材料类">
                                <el-button type="primary " @click="consumablesDeve = true">添加</el-button>
                            </el-form-item>
                            <el-form-item v-if="consumablesList.length>0">
                                <el-table :data="consumablesList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
                                    <el-table-column type="index"></el-table-column>
                                    <el-table-column prop="name" label="品名规格" show-overflow-tooltip sortable>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item label="添加耗材类">
                                <el-button type="primary " @click="materialDeve = true">添加</el-button>
                            </el-form-item>
                            <el-form-item v-if="materialList.length>0">
                                <el-table :data="materialList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
                                    <el-table-column type="index"></el-table-column>
                                    <el-table-column prop="name" label="品名规格" show-overflow-tooltip sortable>
                                    </el-table-column>
                                    <el-table-column prop="typeId" label="库存数量" show-overflow-tooltip sortable>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-scrollbar>
            <div slot="footer">
                <el-button @click="$emit('update:visible', false)">取消</el-button>
                <el-button type=" primary " @click="backStep " v-if="createStep !==0">上一步</el-button>
                <el-button type="primary " @click="nextStep " v-if="createStep !== 1">下一步</el-button>
                <el-button type="primary " v-else>确定</el-button>
            </div>
        </el-dialog>

        <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="addEle">
            <el-table :data="projects" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="项目名称" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="introduce" label="项目介绍" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="address" label="地点" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop='customer' label="客户" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEle = false">取消</el-button>
                <el-button type="primary" @click="addEle =false ">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="添加其他设备" :visible.sync="otherDeve">
            <el-form label-width="80px" label-position="left" :model="addDeve" :rules="rules" ref="addForm">
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="addDeve.name"></el-input>
                </el-form-item>
                <el-form-item label="设备型号" prop="typeId">
                    <el-input v-model="addDeve.typeId"></el-input>
                </el-form-item>
                <el-form-item label="厂家" prop="mac">
                    <el-input v-model="addDeve.mac"></el-input>
                </el-form-item>
                <el-form-item label="说明书">
                    <el-button type="primary">上传</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="otherDeve = false">取消</el-button>
                <el-button type="primary" @click="submitForm()">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="添加耗材类" :visible.sync="consumablesDeve">
            <el-form label-width="80px" label-position="left" :model="consumablesList1">
                <el-form-item label="品名规格">
                    <el-input v-model="consumablesList1.name"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="consumablesList1.typeId"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="consumablesDeve =false">取消</el-button>
                <el-button type="primary" @click="submitForm1()">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false title="添加耗材类" :visible.sync="materialDeve">
            <el-form label-width="80px" label-position="left" :model="materialList1">
                <el-form-item label="品名规格">
                    <el-input v-model="materialList1.name"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="materialList1.typeId"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="materialDeve =false">取消</el-button>
                <el-button type="primary" @click="submitForm2()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
    const list = []

    for (let i = 0; i < 15; i++) {
      list.push({
        name: 'W3RF4ERT4',
        introduce: '设备定期年检',
        address: '设备定期年检设备定期年检',
        customer: '2018-10-13'
      })
    }
    return {
      addEle: false,
      otherDeve: false,
      consumablesDeve:false,
      materialDeve:false,
      selectedDeviceList: [],
      consumablesList:[],
      materialList:[],
      dataList:[],
      baseInfo: {
        name: '',
        publicName: '',
        appid: '',
        times: '',
        appsecret: '',
        userType: '',
        loginName: '',
        sld: '',
        isDashboardEnabled: false,
        use: ''
      },
      addDeve: {
        name: '',
        typeId: '',
        mac: '',
        hardVersion: ''
      },
      consumablesList1: {
        name: '',
        typeId: ''
      },
      materialList1: {
        name: '',
        typeId: ''
      },
      //   projects:{
      //       name:'',
      //       introduce:'',
      //       address:'',
      //       customer:''
      //   },
      projects: [
        {
          name: 'W3RF4ERT4',
          introduce: '设备定期年检',
          address: '设备定期年检设备定期年检',
          customer: '2018-10-13'
        },
        {
          name: 'W312',
          introduce: '设备定期年检',
          address: '设备定期年检设备定期年检',
          customer: '2018-10-13'
        }
      ],
      createStep: 0,
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        mac: [
          { required: true, message: '请输入厂家信息', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backStep() {
      this.createStep--
    },
    nextStep() {
      this.createStep++

      if (this.createStep === 2) {
        this.isCreateClientDialogVisible = false
        this.createStep = 0
      }
    },
    submitForm() {
       this.dataList.push(Object.assign({}, this.addDeve))
       this.otherDeve = false
    },
     submitForm1() {
       this.consumablesList.push(Object.assign({}, this.consumablesList1))
       this.consumablesDeve = false
    },
    submitForm2() {
       this.materialList.push(Object.assign({}, this.materialList1))
       this.materialDeve = false
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      console.log(selection)
      if (this.selectedDeviceList.length) {
        this.unassignStatus = this.selectedDeviceList[0].assignStatus
      }
    },
    handleClose(tag) {
      this.selectedDeviceList.splice(this.selectedDeviceList.indexOf(tag), 1)
      console.log(this.selectedDeviceList)
    }
  },
  watch: {},
  created() {},
  components: {}
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>