<template>
  <el-row class="project-samples">
    <el-col v-for="project in data" :key="project.id" :span="6">
      <span>{{project.icon}}</span>
      <p>{{project.name}}</p>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      props: ['options'],
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
        }
      }
    }
</script>

<style lang="scss" scoped>
  .project-samples {
    text-align: center;
  }
</style>
