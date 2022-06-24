<template>
  <div class="home-page">
    <van-sticky>
      <div class="search-head">
        <div class="nav-wrap">
          <van-tabs v-model="active" @click="onClick">
            <van-tab title="直播"></van-tab>
            <van-tab title="点播"></van-tab>
          </van-tabs>
          <van-dropdown-menu v-if="active === 0">
            <van-dropdown-item @change="setQueryTime" v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
        <div class="search-wrap">
          <van-search v-model="keyWord" @click="openSearchPage" :placeholder="`请搜索${active === 0 ? '直播' : '点播'}`" />
        </div>
      </div>
    </van-sticky>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { DropdownMenu, DropdownItem, Tab, Tabs, Search, Sticky } from 'vant'
import moment from 'moment'
export default {
  name: 'Home',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Search.name]: Search
  },
  data () {
    return {
      option: [
        { text: '今天', value: 0 },
        { text: '明天', value: 1 },
        { text: '后天', value: 2 }
      ],
      value: 0,
      active: 0,
      keyWord: ''
    }
  },
  mounted () {
    this.active = this.$route.path === '/videoList' ? 1 : 0
  },
  methods: {
    setQueryTime (value) {
      this.$store.commit('setQueryTime', moment().add(value, 'd').format('yyyy-MM-DD'))
    },
    openSearchPage () {
      this.$router.push({
        path: '/search',
        query: {
          isLive: this.active === 0
        }
      })
    },
    onClick (name) {
      if (name === 0 && this.$route.path !== '/liveList') {
        this.$router.push('/liveList')
      }
      if (name === 1 && this.$route.path !== '/videoList') {
        this.$router.push('/videoList')
      }
    }
  }
}
</script>
<style lang="scss">
.home-page {
  background-color: #F2F2F7;

  // 头部紫色区域
  .search-head {
    background-image: url(~@/assets/head_blue.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .search-wrap {
    padding: 12px;

    .van-search {
      width: 100%;
    }
  }
  // 时间下拉选择
  .van-dropdown-menu {
    width: 70px;
    height: 100%;
  }
  .van-dropdown-menu__bar {
    background-color: transparent;
  }
  .van-dropdown-menu__title {
    color: #fff;
  }

  // 直点播导航
  .nav-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 24px;

    .van-tabs {
      width: 120px;
    }
    .van-tab {
      color: rgba(255, 255, 255, 0.7);
    }
    .van-tab--active {
      color: #fff;
    }
  }
  .van-tabs__nav {
    background-color: transparent;
  }
  .van-tab__text--ellipsis {
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
