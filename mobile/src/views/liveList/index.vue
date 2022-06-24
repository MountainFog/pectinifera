<template>
  <div class="live-list">
    <div v-if="!list.length" class="not-data"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="upScroll"
      >
        <live-item
          v-for="item in list"
          :key="item.id"
          :data="item"
          :isLive="getLiveState(item)"
        ></live-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { liveListApi } from '@/api/course.js'
import liveItem from './components/liveItem.vue'
import { List, PullRefresh } from 'vant'
import axios from 'axios'
import moment from 'moment'
import { mixin } from '@/mixins'
export default {
  mixins: [mixin],
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    liveItem,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  data () {
    return {
      // 查询api
      query: liveListApi,
      // 当前服务器时间
      currentTime: '',
      // 直播课程列表
      list: [],
      // 页码
      pageIndex: 1,
      // 每页条数
      pageSize: 8
    }
  },
  computed: {
    queryParams () {
      const params = {
        time: this.$store.getters.time,
        status: 1
      }
      // 合并对象
      for (const key in this.params) {
        if (Object.hasOwnProperty.call(this.params, key)) {
          params[key] = this.params[key]
        }
      }
      return params
    }
  },
  watch: {
    '$store.getters.time' (nv, ov) {
      if (nv !== ov) {
        this.getServiceTime()
        this.onRefresh()
      }
    },
    params: {
      deep: true,
      handler () {
        this.getServiceTime()
        this.onRefresh()
      }
    }
  },
  mounted () {
    this.getServiceTime()
  },
  methods: {
    // 获取服务器时间
    getServiceTime () {
      axios.get('/jy-application-vod-he/app/restApi/getServerDateTime').then(res => {
        this.currentTime = moment(res.headers.date).utcOffset(8).format('yyyy-MM-DD HH:mm:ss')
      })
    },
    getLiveState (data) {
      const { courBeginTime, courEndTime } = data
      return moment(this.currentTime).isBetween(courBeginTime, courEndTime)
    }
  }
}
</script>
<style lang="scss">
.live-list {
  .not-data {
    width: 245px;
    height: 147px;
    margin: 120px auto;
    background: url(~@/assets/not_data.png) no-repeat;
  }

  .live-item {
    margin: 12px;
  }
}
</style>
