<template>
  <div class="search-goback" @click="goto">
    <van-icon name="arrow-left" />
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
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
    }
  },
  data () {
    return {
      params: {}
    }
  },
  mounted () {
    this.params = this.$route.query
  },
  methods: {
    goto () {
      if (this.beforeBack) {
        this.beforeBack()
      }
      if (this.url) {
        this.$router.push({
          path: this.url,
          query: this.params
        })
      } else {
        this.$router.back(-1)
      }
    }
  }
}
</script>
<style lang="scss">
  // 返回按钮
  .search-goback {
    width: 36px;
    text-align: center;

    i {
      line-height: 36px;
      font-size: 24px;
    }
  }
</style>
