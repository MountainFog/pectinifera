<template>
  <div class="search-classroom">
    <kd-header url="/search">
      <van-search
        v-model="queryParams.name"
        placeholder="请输入教室名称搜索"
        @blur="onRefresh"
      />
    </kd-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="upScroll"
        >
        <van-radio-group v-model="radio">
          <option-item
            v-for="item in list"
            :key="item.id"
            :id="item.id"
            :text="item.name"
            :active="radio === item.id"
            :imgName="'classroom_icon.png'"
            @click.native="setCondition(item)"
          ></option-item>
        </van-radio-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getClassroomList } from '@/api/search'
import { Search, PullRefresh, List, RadioGroup } from 'vant'
import OptionItem from './components/optionItem.vue'
import { mixin } from '@/mixins'
export default {
  mixins: [mixin],
  components: {
    [List.name]: List,
    [Search.name]: Search,
    [PullRefresh.name]: PullRefresh,
    [RadioGroup.name]: RadioGroup,
    OptionItem
  },
  data () {
    return {
      radio: null,
      // 查询关键字
      keyWord: '',
      // 查询api
      query: getClassroomList,
      // 数据列表
      list: [],
      // 当前页码
      pageIndex: 1,
      // 每页条数
      pageSize: 20,
      // 查询参数
      queryParams: {
        name: ''
      },
      // 路由参数
      params: {}
    }
  },
  created () {
    this.params = this.$route.query
    if (this.$store.getters.classroom) {
      this.radio = this.$store.getters.classroom.id
    }
  },
  methods: {
    setCondition (item) {
      this.radio = item.id
      this.$store.commit('setQueryClassroom', {
        name: item.name,
        id: item.id
      })
      this.$router.push({
        path: '/search',
        query: this.params
      })
    }
  }
}
</script>
<style lang="scss">
.search-classroom {
  .van-search {
    flex-grow: 1;
    background-color: #F2F2F7;
  }
}
</style>
