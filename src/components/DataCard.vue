<template>
  <div class="data-card">
    <div class="data-card__body">
      <font-awesome-icon v-if="icon" :icon="icon" class="data-card__icon"></font-awesome-icon>
      <span class="data-card__content">
        <span class="data-card__title">{{ name }}</span>
        <count-to class="data-card__data" :startVal="0" :endVal="value" :duration="3000" :suffix='unit' ></count-to>
      </span>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: 0.00
    },
    unit: {
      type: String
    }
  },
  created() {
    Object.assign({}, this.options, {})
  }
}
</script>

<style lang="scss" scoped>
.data-card {
  padding: 30px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #d3dce6;
  color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &__body {
    display: flex;
  }
  &__icon {
    height: 60px;
    width: 60px;
    margin-right: 20px;
  }
  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__title {
    font-size: 18px;
    margin-bottom: 5px;
    white-space: nowrap;
  }
  &__data {
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
