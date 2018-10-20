<template>
  <el-dialog top='4vh' :close-on-click-modal=false title="工程设置" :visible.sync="dialogVisible" width="30%" :before-close="close" :modal="false">
    <el-container>
      <el-main>
        <el-form ref="selectedProject" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="selectedProject.name"></el-input>
          </el-form-item>
          <el-form-item label="数据源">
            <el-select v-model="selectedProject.id" placeholder="请选择数据源" @change="onSelectProject">
              <el-option v-for="element in dataSource" :key="element.id" :label="element.name" :value="element.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目图册">
            <el-row>
              <el-col :span="6" v-for="img in dataSource[selectedProject.id].imgs" :key="img.id">{{img.url}}</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="工程示意">
            <el-row>
              <el-col :span="6">{{dataSource[selectedProject.id].icon}}</el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary">添加工程</el-button>
        </el-form>

      </el-main>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['id', 'options', 'visible'],
  data() {
    return {
      dataSource: null,
      dialogVisible: false,
      selectedProject: {
        id: 0,
        name: '名称',
        selectImg: null,
        selectIcon: null
      }
    }
  },
  watch: {
    visible(newVal) {
      this.dialogVisible = newVal
    },
    selectedProject() {}
  },
  created() {
    this.populateData()
  },
  methods: {
    populateData() {
      this.dataSource = this.options.data
    },
    onSelectProject() {
      this.updateProjectAttribute(this.selectedProject.id)
    },
    updateProjectAttribute(id) {
      this.selectedProject.id = id
      this.selectedProject.name = this.dataSource[id].name
    },
    close() {
      this.dialogVisible = false
      this.$emit('toggleDialog', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.project-samples {
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
}
.setting {
  float: right;
}
</style>
