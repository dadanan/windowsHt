<template>
  <div class="hamburger-btn" @click="toggleClick">
    <font-awesome-icon icon="bars" :class="{'is-active':isActive}"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger-btn {
  color: #606266;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all .3s ease-out;
  border-right: 1px solid #efefef;
  &:hover {
     color: #108ee9;
     background-color: rgba(16,142,233,.15);
  }
}
</style>
