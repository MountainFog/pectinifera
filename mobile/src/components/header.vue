<template>
  <div class="kd-head-cmp">
    <go-back :beforeBack="beforeBack" :url="url" />
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    beforeBack: {
      type: Function,
      default () {
        return function () {}
      }
    },
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.kd-head-cmp {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 12px 12px 0;
  background-image: url(~@/assets/head_blue.png);
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;

  >span {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1px;
  }
}
</style>
