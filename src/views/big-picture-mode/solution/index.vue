<template>
  <div class="solution">
    <div class="solution__back" @click="$router.back()"></div>
  </div>
</template>

<style lang="scss" scoped>
  .solution {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 1920px;
    height: 1080px;
    background: url("./assets/bg.png");

    &__back {
      position: absolute;
      width: 105px;
      height: 33px;
      top: 0;
      left: 0;
    }
  }
</style>
