<template>
  <div class="modal" v-show="visible" @click.self="handleClose">
    <div class="dialog">
      <div class="dialog__close" @click.self="handleClose"></div>
      <div class="dialog__form">
        <div class="dialog__select-group">
          <label>省：</label>
          <el-select v-model="placeholder" class="omg-select">
            <el-option label="浙江省" value="1"></el-option>
            <el-option label="浙江省" value="2"></el-option>
            <el-option label="浙江省" value="3"></el-option>
            <el-option label="浙江省" value="4"></el-option>
            <el-option label="浙江省" value="5"></el-option>
          </el-select>
        </div>
        <div class="dialog__select-group">
          <label>市：</label>
          <el-select v-model="placeholder" class="omg-select">
            <el-option label="浙江省" value="1"></el-option>
            <el-option label="浙江省" value="2"></el-option>
            <el-option label="浙江省" value="3"></el-option>
            <el-option label="浙江省" value="4"></el-option>
            <el-option label="浙江省" value="5"></el-option>
          </el-select>
        </div>
        <div class="dialog__select-group">
          <label>区：</label>
          <el-select v-model="placeholder" class="omg-select">
            <el-option label="浙江省" value="1"></el-option>
            <el-option label="浙江省" value="2"></el-option>
            <el-option label="浙江省" value="3"></el-option>
            <el-option label="浙江省" value="4"></el-option>
            <el-option label="浙江省" value="5"></el-option>
          </el-select>
        </div>
      </div>
      <div class="dialog__done"></div>
      <div class="dialog__cancel" @click.self="handleClose"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .omg-select {
    flex: 1;
    .el-input__inner {
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid rgba(2, 177, 252, 0.26) !important;
      background-color: rgba(0, 0, 0, 0.24);
      font-size: 18px;
      color: #fff;
      height: unset;
      line-height: unset;
      border-radius: unset;
    }
  }
</style>

<style lang="scss" scoped>
  .modal {
    font-family: "Microsoft YaHei",serif;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-items: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .7);

    * {
      font-family: "Microsoft YaHei",serif;
    }
  }

  .dialog {
    width: 778px;
    height: 518px;
    background: url("./assets/bg.png");
    margin: auto;
    position: relative;

    &__select-group {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      label {
        color: #fff;
        font-size: 18px;
        font-weight: normal;
      }
    }

    &__form {
      position: absolute;
      top: 125px;
      left: 0;
      right: 0;
      margin: auto;
      width: 430px;
    }

    &__close {
      cursor: pointer;
      position: absolute;
      width: 22px;
      height: 22px;
      top: 19px;
      right: 30px;
    }

    &__cancel {
      cursor: pointer;
      position: absolute;
      top: 373px;
      left: 158px;
      width: 204px;
      height: 48px;
    }

    &__done {
      cursor: pointer;
      position: absolute;
      top: 373px;
      left: 415px;
      width: 204px;
      height: 48px;
    }
  }
</style>

<script>
  export default {
    props: ['visible'],
    data() {
      return {
        placeholder: '1'
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>
