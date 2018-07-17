<template>
  <el-row class="solution-panel">
    <h3>解决方案</h3>
    <el-col v-for="element in data" :key="element.id" :span="6">
      <img src="http://via.placeholder.com/350x150" height="30px" width="30px"/>
      <p @click="selectItem(element.id)"><a href="#">{{element.name}}</a></p>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      props: ['options'],
      data() {
        return {
          data: []
        }
      },
      created() {
        this.populateData()
      },
      methods: {
        populateData() {
          this.data = this.options.data
        },
        selectItem(id) {
          console.log('选中 id = ' + id)
          this.$emit('itemSelected', id)
        }
      }
    }
</script>

<style scoped>
  .solution-panel{
    text-align: center;
    text-shadow: 0px 0px 10px rgba(73, 217, 252, 1);
  }
</style>
