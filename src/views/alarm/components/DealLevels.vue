<template>
    <div>
        <el-dialog top='4vh' :close-on-click-modal=false title="标记处理中" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
            <el-form label-width="120px" class="mb-22" :model="form">
                <el-form-item label="指定任务人">
                  <el-button type="primary " @click="addEle = true">添加</el-button>
                      <span class="color"> *指定该任务人 </span>
                  </el-form-item>
                  <el-form-item>
                      <el-tag v-if="selectedDeviceList.length >0" v-for="item in selectedDeviceList" :key="item.roleName" :type="item.type" @close="handleClose(item)" style="margin:0px 10px">
                          {{item.userName}}
                      </el-tag>
                  </el-form-item>
                  <el-form-item label="指定审核人">
                  <el-button type="primary " @click="addEles = true">添加</el-button>
                      <span class="color"> *指定该审核人 </span>
                  </el-form-item>
                  <el-form-item>
                      <el-tag v-if="selectedDeviceLists.length >0" v-for="item in selectedDeviceLists" :key="item.roleName" :type="item.type" @close="handleClose(item)" style="margin:0px 10px">
                          {{item.userName}}
                      </el-tag>
                  </el-form-item>
                <el-form-item label="处理说明">
                    <el-input type="textarea" :rows='3' placeholder="请输入处理说明..." v-model='form.description'></el-input>
                    <span class="color"> *已安排人处理任务时，将任务标志为处理中</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click='jobFlow'>确定</el-button>
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
        <el-dialog top='4vh' :close-on-click-modal=false :visible.sync="addEles">
            <el-table :data="projects" style="width: 100%" class="mb20" border @selection-change="handleSelectionChanges">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="userName" label="名称" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="id" label="id" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEles= false">取消</el-button>
                <el-button type="primary" @click="addEles =false ">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { jobFlow , queryAdmins } from '@/api/alarm'
import { getUserList } from '@/api/user'
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
      form: {
          operateType:2
      },
      list:{},
      addEle:false,
      addEles:false,
      selectedDeviceList:[],
      selectedDeviceLists:[],
      projects: [],
      ids:[],
      workids:[]
    }
  },
  methods: {
    queryAdmins(val){
      queryAdmins(val).then(res=>{
        console.log(res.data)
      })
    },
    getUserList() {
      getUserList().then(res => {
        if (res.code === 200) {
          this.projects = res.data
        }
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleSelectionChange(selection) {
      this.selectedDeviceList = selection
      this.selectedDeviceList.push({id:this.userl.userId,userName:this.userl.userName})
    },
    handleSelectionChanges(selection) {
      this.selectedDeviceLists = selection
      this.selectedDeviceLists.push({id:this.userl.userId,userName:this.userl.userName})
    },
    jobFlow() {
        for (var i = 0; i < this.selectedDeviceList.length; i++) {
          this.ids.push(this.selectedDeviceList[i].id)
        }
        for (var i = 0; i < this.selectedDeviceLists.length; i++) {
          this.workids.push(this.selectedDeviceLists[i].id)
        }
        this.form.workUsers = this.ids
        this.form.targetUsers = this.workids
        this.form.jobId = this.list.id
      jobFlow(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '标记成功!'
          })
          this.$emit('update:visible', false)
          this.$emit('add-data', this.form)
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
        this.list = val
        this.getUserList()
    }
  }
}
</script>
<style lang="scss" scoped>
.color{
  color: #969696
}
</style>