<template>
  <el-row class="project-samples">
    <a class="setting" @click="popupSettingDialog" size="mini"><font-awesome-icon icon="cog" /></a>
    <h3>工程案例</h3>

    <el-col v-for="project in data" :key="project.id" :span="6" >
      <a @click="popupDetailDialog" href="#">
      <!--
      <span>{{project.icon}}</span>
      --><img src="http://via.placeholder.com/350x150" height="80px" width="80px"/>
      <p>{{project.name}}</p>
      </a>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      props: ['id', 'detailid', 'options'],
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
        },
        popupDetailDialog() {
          this.$emit('toggleDialog', this.detailid)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .project-samples {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    text-shadow: 0px 0px 10px rgba(73, 217, 252, 1);
  }
  .setting{
    float: right;
  }
</style>
