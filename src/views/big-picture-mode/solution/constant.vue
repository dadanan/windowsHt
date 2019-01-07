<template>
  <div class="solution">
    <div class="solution__back" @click="$router.back()"></div>
    <img :src="img" class="img">
  </div>
</template>
<script>
import img1 from "./assets/jz.png"; 

export default {
  data() {
    return {
      img:img1
    }
  }
}
</script>  
<style lang="scss" scoped>
  .solution {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 1920px;
    height: 1080px;
     background: url("./assets/bg.jpg");
    background-size:100% 100%; 
    &__back {
      position: absolute;
      width: 105px;
      height: 33px;
      top: 12px;
      left: 30px;
      cursor: pointer;
    }
    .img{
      width: 1740px;
      margin: 120px 90px 0px 90px;
    }
  }
</style>
