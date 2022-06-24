<template>
  <div class="condition-tag">
    <div class="tag-content">
      <slot></slot>
    </div>
    <van-icon @click="close" name="cross" />
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  methods: {
    close () {
      this.$emit('close-tag')
    }
  }
}
</script>
<style lang="scss">
.condition-tag {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  margin-right: 8px;
  padding: 0 12px;
  background-color: #BAE3F9;
  border-radius: 16px;
  color: #222222;
  font-size: 15px;

  .tag-content {
    margin-right: 16px;
  }

  .van-icon {
    font-size: 12px;
    padding: 2px;
    border-radius: 50%;
    color: #ffffff;
    background-color: #7373C4;
  }
}
</style>
