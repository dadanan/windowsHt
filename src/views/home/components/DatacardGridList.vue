<template>
  <el-row class="datacard-grid-list" :gutter="20">
    <slot></slot>
  </el-row>
</template>

<script>
  export default {
    mounted() {
      this.fix()
    },
    updated() {
      this.fix()
    },
    methods: {
      fix() {
        if (this.$el.hasChildNodes()) {
          const childNodes = this.$el.childNodes
          for (let i = childNodes.length % 4 ? childNodes.length % 4 : 4; i > 0; i--) {
            childNodes[childNodes.length - i].style.marginBottom = 0
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .datacard-grid-list {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
      margin-bottom: 20px;
    }
  }
</style>
