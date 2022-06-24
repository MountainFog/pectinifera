<template>
  <div class="search-semester">
    <kd-header url="/search">
      <span>学年学期</span>
    </kd-header>
    <div class="teacher-list">
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
              :text="jointSemester(item)"
              :active="item.id === radio"
              :imgName="'semester_icon.png'"
              @click.native="setCondition(item)"
            ></option-item>
          </van-radio-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getTermTimeList } from '@/api/search'
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
      query: getTermTimeList,
      // 数据列表
      list: [],
      // 当前页码
      pageIndex: 1,
      // 每页条数
      pageSize: 20,
      params: {}
    }
  },
  mounted () {
    this.params = this.$route.query
    if (this.$store.getters.semester) {
      this.radio = this.$store.getters.semester.id
    }
  },
  methods: {
    setCondition (item) {
      this.radio = item.id
      this.$store.commit('setQuerySemester', {
        name: this.jointSemester(item),
        id: item.id
      })
      this.$router.push({
        path: '/search',
        query: this.params
      })
    },
    jointSemester (item) {
      return `${item.termTimeBeginYear}-${item.termTimeEndYear}学年第${item.termTimeTerm}学期`
    }
  }
}
</script>
<style lang="scss">
.search-semester {
  .van-search {
    flex-grow: 1;
    background-color: #F2F2F7;
  }
}
</style>
