<template>
  <el-row class="project-samples">
    <a class="setting" @click="popupSettingDialog" size="mini">设置</a>
    <h3>工程案例</h3>
    <el-col v-for="project in data" :key="project.id" :span="6">
      <span>{{project.icon}}</span>
      <p>{{project.name}}</p>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      props: ['id', 'options'],
      data() {
        return {
          data: null
        }
      },
      created() {
        this.populateData()
      },
      methods: {
        populateData() {
          this.data = this.options.data
        },
        popupSettingDialog() {
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
  .setting{
    float: right;
  }
</style>
