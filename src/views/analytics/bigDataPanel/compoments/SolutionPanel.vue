<template>
  <el-row class="solution-panel">
    <el-col v-for="element in data" :key="element.id" :span="6">
      <h3 @click="selectItem(element.id)"><a href="#">{{element.name}}</a></h3>
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
  }
</style>
