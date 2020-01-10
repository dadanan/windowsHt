<template>
    <div>
        <el-dialog top='4vh' class='device-detail-container' title="任务详情" :close-on-click-modal=false :visible="visible" width='95%' @update:visible="$emit('update:visible', $event)">
            <div class="flex mb20">
                <div class="flex-item flex-item--full">
                    <el-card class="el-card--solid">
                        <el-form label-width="130px" class="mb-22" :model="form">
                            <el-form-item label="任务名称">
                                <el-input v-model='form.name'></el-input>
                            </el-form-item>
                            <el-form-item label="任务描述">
                                <el-input type="textarea" :rows='3' v-model='form.description'></el-input>
                            </el-form-item>
                            <el-form-item label="任务状态">
                                <el-input v-model='form.flowStatus'></el-input>
                            </el-form-item>
                            <el-form-item label="告警级别">
                                <el-input v-model='form.warnLevel'></el-input>
                            </el-form-item>
                            <el-form-item label="告警来源">
                                <el-input v-model='form.sourceType'></el-input>
                            </el-form-item>
                            <el-form-item label="到期日期">
                                <el-input v-model='form.finalTime'></el-input>
                            </el-form-item>
                            <el-form-item label="是否关联">
                                <el-input v-model='form.type'></el-input>
                            </el-form-item>
                            <el-form-item v-if="form.type == '关联设备'">
                                <el-table :data="consumablesList1" style="width: 100%" class="mb20" border>
                                    <el-table-column prop="mac" label="MAC地址" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="name" label="设备名称" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item v-if="form.type == '关联工程'">
                                <el-form>
                                    <el-form-item label=工程ID>
                                        <el-input v-model="form.linkProjectId" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label=工程名称>
                                        <el-input v-model="form.linkProjectName" disabled></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                            <el-form-item label="是否规则内">
                                <el-input v-model='form.isRule'></el-input>
                            </el-form-item>
                            <el-form-item v-if="form.isRule == '是'">
                                <el-form>
                                    <el-form-item label=规则名称>
                                        <el-input v-model="form.ruleName" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label=规则描述>
                                        <el-input v-model="form.ruleDescription" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label=规则级别>
                                        <el-input v-model="form.warnLevel" disabled></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <div class="flex-item">
                    <el-card class="el-card--solid map-container">
                        <div style="border-bottom:1px solid #969696">
                            <h3>处理</h3>
                            <el-form label-width="130px" class="mb-22" :model="circulation">
                                <el-form-item label="材料类别" v-if="ifExist">
                                    <el-button type="primary " @click="IfExist = true">添加</el-button>
                                    <p><span class="color"> *录入任务执行中对材料/耗材的使用情况</span></p>
                                </el-form-item>
                                <el-form-item v-if="ifExist">
                                    <el-table :data="showConsumables" style="width: 100%" class="mb20" border>
                                        <!-- <el-table-column prop="type" label="材料类别" show-overflow-tooltip>
                                        </el-table-column> -->
                                        <el-table-column prop="id" label="材料名称" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="handerNums" label="材料数量" show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </el-form-item>
                                <el-form-item label="指定任务审核人">
                                    <el-button type="primary " @click="addEle = true">添加</el-button>
                                    <span class="color"> *指定该任务审核人，任务结果由审核人审查 </span>
                                </el-form-item>
                                <el-form-item>
                                    <el-tag v-if="selectedDeviceList.length >0" v-for="item in selectedDeviceList" :key="item.roleName" :type="item.type" @close="handleClose(item)" style="margin:0px 10px">
                                        {{item.userName}}
                                    </el-tag>
                                </el-form-item>
                                <el-form-item label="客户确认单">
                                    <file-uploader @get-url='setURL(arguments,circulation,"name")' :fileName='circulation.name'></file-uploader>
                                    <span class="color">*上传任务执行过程中的客户确认单，格式（JPG\JPEG\PDF)单文件小于2M；</span>
                                </el-form-item>
                                <el-form-item label="备注（可选）">
                                    <el-input type="textarea" :rows='3' v-model='circulation.description'></el-input>
                                    <span class="color"> *描述任务执行情况和结果</span>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer" style="padding-bottom:30px;">
                                <el-button @click="handleCancel">取消</el-button>
                                <el-button type="primary" @click="jobFlow">确定</el-button>
                            </div>
                        </div>
                        <div>
                            <h3>历史数据</h3>
                            <el-table :data="historyDataList" style="width: 100%" class="mb20" border>
                                <el-table-column prop="name" label="操作时间" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <template v-if='scope.row.createTime'>
                                            {{new Date(scope.row.createTime).toLocaleString()}}
                                        </template>
                                        <template v-else>
                                            --
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="userName" label="操作者" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="operateType" label="操作环节" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="description" label="操作说明" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="imgList" label="其他" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <template v-if='(scope.row.imgList)[0]'>
                                            <a :href="scope.row.imgList[0]">客户单</a>
                                        </template>
                                        <template v-else>
                                            --
                                        </template>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-dialog>
        <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="addEle">
            <el-table :data="projects" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="userName" label="名称" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="id" label="id" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEle = false">取消</el-button>
                <el-button type="primary" @click="addEle =false ">确定</el-button>
            </div>
        </el-dialog>
        <!-- 材料耗材类 -->
        <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="IfExist">
            <el-form label-width="130px" class="mb-22" :model="categorys">
                <el-form-item label="材料耗材类别">
                    <el-select v-model="categorys.type" style="width:100%" @change = "categoryData">
                        <el-option label="材料" value="1"></el-option>
                        <el-option label="耗材" value="2"></el-option>
                    </el-select>
                </el-form-item>
               <el-form-item label="材料名称">
                    <el-select v-model="categorys.id" style="width:100%">
                        <el-option v-for='item in list' :label="item.name" :value="item.id" :key='item.id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input placeholder="请输入数量"  v-model="categorys.handerNums"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="IfExist = false">取消</el-button>
                <el-button type="primary" @click="addDatas">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { subselect, jobFlow , ifExistMateria} from '@/api/alarm'
import { getUserList } from '@/api/user'
import FileUploader from '@/components/Upload/excel'

export default {
  components: {
    FileUploader
  },
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
      addEle: false,
      IfExist:false,
      form: {},
      consumablesList1: [],
      consumables:[],
      historyDataList: [],
      projects: [],
      selectedDeviceList: [],
      ifExist:false,
      category:[],
      categorys:{},
      showConsumables:[],
      list:[],
      circulation: {
        imgList: [],
        name: ''
      },
      ids: [],
      userl:{}
    }
  },
  methods: {
    subselect(id) {
      subselect(id).then(res => {
        const list = res.data
        const mapList = {
          '1': '一级告警',
          '2': '二级告警',
          '3': '三级告警'
        }
        const linkList = {
          '0': '不关联',
          '1': '关联设备',
          '2': '关联工程'
        }
        const sourceType = {
          '1': '计划维保',
          '2': '微信端反馈',
          '3': '设备告警'
        }
        const flowStatus = {
          '1': '待处理',
          '2': '处理中',
          '3': '待审核',
          '4': '已完成',
          '6': '已忽略'
        }
        const isRule = {
          '0': '否',
          '1': '是'
        }
        list.warnLevel = mapList[list.warnLevel]
        list.type = linkList[list.type]
        list.sourceType = sourceType[list.sourceType]
        list.flowStatus = flowStatus[list.flowStatus]
        list.isRule = isRule[list.isRule]
        list.finalTime = new Date(list.finalTime).toLocaleString()
        this.form = list
        this.consumablesList1 = this.form.deviceList
        const historyList = {
          '1': '生成',
          '2': '分配',
          '3': '同意生成',
          '4': '不同意生成',
          '5': '提交审核',
          '6': '通过归档',
          '7': '不通过归档',
          '8': '已忽略',
        }
        const historyDataList = this.form.historyDataList
        for (var i = 0; i < historyDataList.length; i++) {
          historyDataList[i].operateType =
            historyList[historyDataList[i].operateType]
        }
        this.historyDataList = historyDataList
      })
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      this.selectedDeviceList.push({id:this.userl.userId,userName:this.userl.userName})
    },
    getUserList() {
      getUserList().then(res => {
        if (res.code === 200) {
          this.projects = res.data
        }
      })
    },
    ifExistMateria(id){
        ifExistMateria(id).then(res=>{
            this.ifExist = res.data.ifExist
            this.category = res.data.jobMateriaList
        })
    },
    setURL(argu, data, name) {
      data[name] = argu[0]
    },
    categoryData(val){
        this.list = []
        for(var i = 0;i<this.category.length;i++){
            if( val == this.category[i].type){
                this.list.push(this.category[i])
            }
        }
    },
    addDatas(){
        this.IfExist = false
        this.consumables.push(this.categorys)
        this.showConsumables.push(this.categorys)
        this.categorys = {}
        for(var i = 0;i<this.showConsumables.length;i++){
            for(var j = 0 ;j<this.category.length;j++){
                if(this.showConsumables[i].id == this.category[j].id){
                    this.showConsumables[i].id = this.category[j].name
                }
            }
        }
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    jobFlow() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id)
      }
      this.circulation.targetUsers = this.ids
      this.circulation.jobId = this.form.id
      this.circulation.operateType = 5
      this.circulation.imgList.push(this.circulation.name)
      delete this.circulation.name
      for(var i = 0;i<this.showConsumables.length;i++){
            for(var j = 0 ;j<this.category.length;j++){
                if(this.showConsumables[i].id == this.category[j].name){
                    this.showConsumables[i].id = this.category[j].id
                }
            }
            this.showConsumables[i].type =5
        }
      this.circulation.materiaUpdateRequestList = this.consumables
      jobFlow(this.circulation).then(res => {
        if (res.code === 200) {
           this.selectedDeviceList = []
           this.ids = []
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', this.circulation)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  },
  watch: {
    data(val) {
      this.userl = val.historyDataList[0]
      this.subselect(val.id)
      this.getUserList()
      this.ifExistMateria(val.id)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.device-detail-container {
  margin-bottom: 2rem;
}
.flex {
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
}

.map-container {
  width: 860px;
  height: auto;
}
.map-container1 {
  width: 760px;
  min-height: 414px;
}
.map-container2 {
  width: 760px;
  height: 290px;
  overflow: auto;
}
.flex-item {
  margin: 0 10px;
  &--full {
    flex: 1;
  }
}
.btn {
  text-align: center;
  color: #646464;
  h2 {
    font-size: 36px;
    margin: 0px;
    margin: 10px 0px;
  }
}
.table-img {
  width: 100%;
}
.color{
    color: #969696
}
</style>

