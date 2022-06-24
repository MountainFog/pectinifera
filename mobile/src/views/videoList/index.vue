<template>
  <div class="video-list">
    <div v-if="!list.length" class="not-data"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="upScroll"
      >
        <vod-item v-for="item in list" :key="item.id" :data="item"></vod-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { vodListApi } from '@/api/course'
import vodItem from './vodItem.vue'
import { List, PullRefresh } from 'vant'
import { mixin } from '@/mixins'
export default {
  mixins: [mixin],
  props: {
    queryParams: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    vodItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      // 查询api
      query: vodListApi,
      // 直播课程列表
      list: [],
      // 查询页码
      pageIndex: 1,
      // 查询条数
      pageSize: 8
    }
  },
  watch: {
    queryParams: {
      deep: true,
      handler (nv) {
        this.onRefresh()
      }
    }
  }
}
</script>
<style lang="scss">
.video-list {
  background-color: #F2F2F7;
  .not-data {
    width: 245px;
    height: 147px;
    margin: 120px auto;
    background: url(~@/assets/not_data.png) no-repeat;
  }
  .vod-item {
    margin: 12px;
  }
}
</style>
