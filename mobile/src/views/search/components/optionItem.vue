<template>
  <div :class="['option-item', {'option-item_active': active}]">
    <van-radio
      :name="id"
      checked-color="#1D2089"
    ></van-radio>
    <div class="option-item-wrap">
      <div class="option-item-img">
        <img :src="imgUrl" alt="">
      </div>
      <span class="option-item-text">
        {{text}}
        <span v-if="number" class="option-item-number">({{number}})</span>
      </span>
      <slot name="after-icon"></slot>
    </div>
  </div>
</template>
<script>
import { Radio } from 'vant'
export default {
  components: {
    [Radio.name]: Radio
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    },
    number: {
      type: String,
      default: ''
    },
    imgName: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgUrl () {
      return require(`@/assets/${this.imgName}`)
    }
  }
}
</script>
<style lang="scss">
// 列表选项
.option-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 14px;

  .van-radio {
    flex-shrink: 0;
  }

  &-img {
    flex-shrink: 0;
    display: inline-block;
    width: 36px;
    height: 36px;
    margin: 0 14px;
    vertical-align: middle;

    >img {
      width: 100%;
      height: 100%;
    }
  }

  &-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    padding: 14px 0;
    font-size: 15px;
    border-bottom: 1px solid #e6e6e6;
    white-space: nowrap;

  }

  &-text {
    flex-grow: 1;
    color: #222222;
    white-space: normal;
    vertical-align: middle;
  }

  &-number {
    color: #999999;
    vertical-align: middle;
  }

}
.option-item_active {
  background-color: #F8F9FF;
}
</style>
