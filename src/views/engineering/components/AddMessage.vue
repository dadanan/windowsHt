<template>
  <div>
    <el-dialog top='4vh' :close-on-click-modal=false title="创建工程" :visible="visible"  width="800px" @update:visible="$emit('update:visible', $event)"  >
      <el-scrollbar class="main-scroll" wrap-class="scrollbar-wrap" view-class="scrollbar-view" tag="div" >
        <div>
          <el-steps :active="createStep" finish-status="success" class="mb20" align-center >
            <el-step title="基本信息"></el-step>
            <el-step title="关联项目信息"></el-step>
          </el-steps>
          <div v-if="createStep == 0">
            <el-form label-position="left" label-width="150px" >
              <el-form-item label="工程编号">
                <el-input v-model="form.projectNo" @blur="existProjectNo"  ></el-input>
              </el-form-item>
              <el-form-item label="工程名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="工程描述">
                <el-input type="textarea" :rows="2" placeholder="工程描述..." v-model="form.description"  ></el-input>
              </el-form-item>
              <el-form-item label="工程建设时间">
                <el-date-picker type="date" placeholder="工程建设时间..." v-model='form.buildTime' value-format="timestamp" ></el-date-picker>
              </el-form-item>
              <el-form-item label="选择工程建设地址">
                <a-map :gps='form && form.mapGps' @getLocation='getLocation' ></a-map>
              </el-form-item>
              <el-form-item label="工程建设地址">
                <el-input v-model="form.buildAddress" style="width:590px" placeholder="请选择上面工程地址" disabled ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="form.gps" style="width:295px" placeholder="经度" disabled ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="createStep == 1">
            <el-form label-position="left" label-width="150px" >
              <el-form-item label="关联设备项目">
                <el-button type="primary " @click="addEle = true" >添加</el-button>
              <p><span class="color">*选择该工程相关项目，从而导入该工程相关设备（指系统备案设备）</span></p>
              </el-form-item>
              <el-form-item>
                <el-tag v-if="selectedDeviceList.length >0" v-for="item in selectedDeviceList" :value="item.id" :key="item.name" closable :type="item.type" @close="handleClose(item)" style="margin:0px 10px" >
                  {{item.name}}
                </el-tag>
              </el-form-item>
              <el-form-item label="添加其他设备">
                <el-button type="primary " @click="otherDeve = true" >添加</el-button>
                <p><span class="color">*添加工程用第三方设备，如空调主机、锅炉等；</span></p>
              </el-form-item>
              <el-form-item>
                <el-table :data="form.extraDeviceList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange" >
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="name" label="设备名称" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column prop="model" label="设备型号" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column prop="factory" label="厂家" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column prop='direction' label="说明书" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                      <el-button type="text" @click="dele(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="添加材料耗材类">
                <el-button type="primary" @click="consumablesDeve = true" >添加</el-button>
                <p><span class="color">导入工程相关材料/有料，表头格式为（序号、名称、规格、数量），名称需包括单位，如:（1管路（米)PVC 10CM100）</span></p>   
              </el-form-item>
              <el-form-item>
                <el-table :data="form.materialInfoList" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange" >
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="type" label="材料类别" show-overflow-tooltip >
                    <template slot-scope="scope">
                      <div v-if="scope.row.type == 1">
                        材料类
                      </div>
                      <div v-else>
                        耗材类
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="品名规格" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column prop="nums" label="库存数量" show-overflow-tooltip >
                  </el-table-column>
                  <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                      <el-button type="text" @click="deletes(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="工程图册">
                 <image-uploader :key='3' :urls='filterBg(form.imgs)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-scrollbar>
      <div slot="footer">
        <el-button @click="$emit('update:visible', false)">取消</el-button>
        <el-button type=" primary " @click="backStep " v-if="createStep !==0" >上一步</el-button>
        <el-button type="primary " @click="nextStep " v-if="createStep !== 1" >下一步</el-button>
        <el-button type="primary" v-else @click="addProject" >确定</el-button>
      </div>
    </el-dialog>

    <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="addEle" >
      <el-table :data="projects" style="width: 100%" class="mb20" border @selection-change="handleSelectionChange" >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="项目名称" show-overflow-tooltip sortable >
        </el-table-column>
        <el-table-column prop="introduction" label="项目介绍" show-overflow-tooltip sortable >
        </el-table-column>
        <el-table-column prop="location" label="地点" show-overflow-tooltip sortable >
        </el-table-column>
        <el-table-column prop='customerName' label="客户" show-overflow-tooltip sortable >
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="addEle = false">取消</el-button>
        <el-button type="primary" @click="addEle =false " >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加其他设备" :visible.sync="otherDeve" >
      <el-form label-width="80px" label-position="left" :model="addDeve" :rules="rules" ref="addForm" >
        <el-form-item label="设备名称" prop="name" >
          <el-input v-model="addDeve.name"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="model" >
          <el-input v-model="addDeve.model"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="factory" >
          <el-input v-model="addDeve.factory"></el-input>
        </el-form-item>
        <el-form-item label="说明书">
          <file-uploader @get-url='setURL(arguments,addDeve,"direction")' :fileName='addDeve.direction'></file-uploader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="otherDeve = false">取消</el-button>
        <el-button type="primary" @click="submitForm()" >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog top='4vh' :close-on-click-modal=false title="添加耗材类" :visible.sync="consumablesDeve"  >
      <el-form label-width="80px" label-position="left" :model="consumablesList1" >
        <el-form-item label="材料类别">
          <el-radio-group v-model="consumablesList1.type">
            <el-radio :label="1">材料类</el-radio>
            <el-radio :label="2">耗材类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="品名规格">
          <el-input v-model="consumablesList1.name"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="consumablesList1.nums"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="consumablesDeve =false">取消</el-button>
        <el-button type="primary" @click="submitForm1()" >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "./AMap";
import ImageUploader from "@/components/Upload/image1";
import FileUploader from "@/components/Upload/excel";
import { queryAllGroup, addProject, existProjectNo } from "@/api/alarm";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addEle: false,
      otherDeve: false,
      consumablesDeve: false,
      materialDeve: false,
      selectedDeviceList: [],
      form: {
        extraDeviceList: [],
        materialInfoList: [],
        imgs:[]
      },
      addDeve: {},
      consumablesList1: {},
      projects: [],
      ids: [],
      status: false,
      createStep: 0,
      rules: {
        name: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择设备型号", trigger: "change" }
        ],
        mac: [
          { required: true, message: "请输入厂家信息", trigger: "blur" },
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    dele(val){
     const list = this.form.extraDeviceList.filter(function(item) {
          return item != val
      });
      this.form.extraDeviceList = list
    },
    deletes(val){
       const list = this.form.materialInfoList.filter(function(item) {
          return item != val
      });
      this.form.materialInfoList = list
    },
    setURL(argu, data, name) {
      data[name] = argu[0];
    },
    backStep() {
      this.createStep--;
    },
    nextStep() {
      this.createStep++;

      if (this.createStep === 2) {
        this.isCreateClientDialogVisible = false;
        this.createStep = 0;
      }
    },
    existProjectNo() {
      existProjectNo({ value: this.form.projectNo }).then(res => {
        // console.log(res.data);
        if (res.code === 200) {
          if (res.data) {
            this.$message({
              type: "error",
              message: "编号已存在!"
            });
            this.status = false;
          } else {
            this.$message({
              type: "success",
              message: "恭喜编号可以使用!"
            });
            this.status = true;
          }
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    filterBg(data) {},
    removeImg(file) {
      // const index = this.form.imgs.findIndex(v => v.image === file.url)
      // console.log(file)
      this.form.imgs.splice((this.form.imgs.indexOf(file.url)),1)
    },
    setImg(file) {
      // console.log(file)
      this.form.imgs = [...this.form.imgs, file.url]
    },
    submitForm() {
      this.form.extraDeviceList.push(Object.assign({}, this.addDeve));
      this.otherDeve = false;
    },
    submitForm1() {
      this.form.materialInfoList.push(Object.assign({}, this.consumablesList1));
      this.consumablesDeve = false;
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection;
      // console.log(selection);
      if (this.selectedDeviceList.length) {
        this.unassignStatus = this.selectedDeviceList[0].assignStatus;
      }
    },
    handleClose(tag) {
      this.selectedDeviceList.splice(this.selectedDeviceList.indexOf(tag), 1);
      // console.log(this.selectedDeviceList);
    },
    getLocation({ gps, location }) {
      // console.log(gps, location);ss
      this.form.buildAddress = location;
      this.form.gps = gps.toString();
      this.form = Object.assign({}, this.form, {});
    },
    //关联设备项目
    queryAllGroup() {
      queryAllGroup().then(res => {
        // console.log(res.data);
        this.projects = res.data;
      });
    },
    // 提交
    addProject() {
      for (var i = 0; i < this.selectedDeviceList.length; i++) {
        this.ids.push(this.selectedDeviceList[i].id);
      }
      this.form.groupIds = this.ids.toString();
      //   console.log(this.form);
      if (this.status) {
        addProject(this.form).then(res => {
          if (res.code === 200) {
            this.selectedDeviceList = []
            this.ids=[]
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$emit("update:visible", false);
            this.$emit("add-data", this.form);
          } else {
            this.$message({
              type: "error",
              message: res.msg
            });
          }
        });
      }else{
        this.$message({
          type: "error",
          message: "工程编号已存在!"
        });
      }
    }
  },
  created() {
    this.queryAllGroup();
  },
  components: {
    AMap,
    FileUploader,
    ImageUploader
  }
};
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
.color{
  color: #969696
}
</style>