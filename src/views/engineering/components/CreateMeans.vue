<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="添加实施" :visible="visible" :before-close="handleCancel" @update:visible="$emit('update:visible', $event)">
    <el-form label-width="130px" class="mb-22" :model="form">
      <el-form-item label="实施阶段">
        <el-select v-model="form.typeId" style="width:100%">
          <el-option v-for='item in list' :label="item.label" :value="item.id" :key='item.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工程实施描述">
        <el-input type="textarea" :rows='3' placeholder="工程实施描述..." v-model='form.description'></el-input>
      </el-form-item>
      <el-form-item label="实施时间">
        <el-date-picker type="date" placeholder="实施时间..." value-format="timestamp" v-model='form.implTime' :picker-options="pickerOptions0"></el-date-picker>
      </el-form-item>
      <el-form-item label="上传图册">
        <image-uploader :key='1' :urls='filterBg(form.imgList)' @get-url='setImg' @remove-url='removeImg' :isList='true' :limit='5'></image-uploader>
      </el-form-item>
      <el-form-item label="上传文件">
        <file-uploader @get-url='setURL(arguments,form)'></file-uploader>
      </el-form-item>
      <el-form-item>
        <el-table :data="sub" style="width: 100%" class="mb20" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="name" label="url" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="选择" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select v-model="scope.row.value">
                <el-option v-for='item in enginList' :label="item.label" :value="item.label" :key='item.id'></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button @click="dele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click='submitForm'>确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ImageUploader from '@/components/Upload/image1'
// import { selectList } from '@/api/alarm'
import { selectList } from '@/api/rent'
import { addImpl } from '@/api/alarm'
import FileUploader from '@/components/Upload/excel1'

export default {
  components: {
    ImageUploader,
    FileUploader
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data:{
      type:Object
    }
  },
  data() {
    return {
      form: {
        imgList: [],
        fileMap: {}
      },
      sub: [],
      list: [],
      enginList: [],

      files: {
        appUrl: ''
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      query: {
        limit: 10000,
        page: 1,
        type: 'implementation',
        isDelete:0
      },
      query1: {
        limit: 100,
        page: 1,
        type: 'engineering',
        isDelete:0
      }
    }
  },
  methods: {
    dele(val){
      for(var i = 0;i<this.sub.length;i++){
        if(val.name == this.sub[i].name){
         this.sub.splice(i,1)
        }
      }
    },
    setURL(argu, data) {
      // data[name] = argu[0]
      var index = argu[0].lastIndexOf('/')
      var urlName = argu[0].substring(index + 1, argu[0].length)
      this.sub.push({ url: argu[0], name: urlName })
    },
    filterBg(data) {
      return data
    },
    removeImg(file) {
      const index = this.form.imgList.findIndex(v => v.image === file.url)
    },
    setImg(file) {
      this.form.imgList = [...this.form.imgList, file.url]
    },
    selectList() {
      selectList(this.query).then(res => {
        this.list = res.data.dictRspPoList
      })
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    submitForm() {
      var arr = []
      for (var i = 0; i < this.sub.length; i++) {
        var val = (this.sub[i].value).toString()
        if(this.form.fileMap[val] == null){
          var list = [];
          list.push(this.sub[i].url)
          this.form.fileMap[val]=list
        }else{
          list = this.form.fileMap[val];
          list.push(this.sub[i].url)
          this.form.fileMap[val]=list
        }
      }
      addImpl(this.form).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '添加实施成功!'
          })
          this.$emit('update:visible', false)
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    selectList1() {
      selectList(this.query1).then(res => {
        this.enginList = res.data.dictRspPoList
      })
    }
  },
  created() {
    this.selectList()
    this.selectList1()
  },
  watch: {
    data(val){
      this.form.projectId = val.id
      this.form = val
    }
  }
}
</script>
<style lang='scss' scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

