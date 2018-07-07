<template>
  <el-col :span="6">
    <div class="datacard" :style="{ backgroundColor: data.color }">
      <div class="datacard__body">
        <font-awesome-icon class="datacard__icon" :icon="data.icon"></font-awesome-icon>
        <div class="datacard__title-group">
          <div class="datacard__title">{{ data.text }}</div>
          <div class="datacard__subtitle">{{ data.value }}</div>
        </div>
      </div>
      <el-button class="datacard__edit" type="primary" size="mini" @click="edit" icon="edit"></el-button>
    </div>
  </el-col>
</template>

<script>
  export default {
    props: ['data'],
    methods: {
      edit() {
        this.$emit('edit', this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .datacard {
    position: relative;
    border-radius: 4px;
    background: #0096d4;
    padding: 30px;
    color: #fff;
    &__body {
      display: flex;
    }
    &__icon {
      display: block;
      font-size: 60px;
      height: 60px;
      width: 60px;
    }
    &__title-group {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    &__title {
      font-size: 16px;
    }
    &__subtitle {
      font-size: 24px;
      font-weight: bold;
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
