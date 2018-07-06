<template>
  <div class="dtitle"><slot></slot></div>
</template>

<script>
  export default {
    props: ['content']
  }
</script>

<style lang="scss" scoped>
  .dtitle {
    color: #48576a;
    font-size: 18px;
    margin-bottom: 20px;
  }
</style>
