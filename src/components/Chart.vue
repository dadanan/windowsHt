<template>
  <el-col :span="12">
    <el-card class="chart-card">
      <e-charts class="chart-card__chart" :options="option.option"></e-charts>
      <el-button class="chart-card__edit" type="primary" size="mini" @click="edit" icon="edit"></el-button>
    </el-card>
  </el-col>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'

  export default {
    components: {
      ECharts
    },
    props: ['option'],
    methods: {
      edit() {
        this.$emit('edit', this.option)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-card {
    position: relative;
    border: none;
    &__chart {
      width: 100%;
      height: 400px;
    }
    &__edit {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
    }
    &:hover &__edit {
      display: block;
    }
  }
</style>
