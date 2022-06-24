<template>
  <div class="search-teacher">
    <kd-header url="/search">
      <van-search
        v-model="queryParams.userName"
        @blur="onRefresh"
        placeholder="请输入教师名称搜索"
      />
    </kd-header>
    <div class="teacher-list">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
      >
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
              :text="item.userName"
              :number="item.userCode"
              :active="item.id === radio"
              :imgName="'teacher_icon.png'"
              @click.native="setCondition(item)"
            ></option-item>
          </van-radio-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getTeacherList } from '@/api/search'
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
      // 查询api
      query: getTeacherList,
      // 数据列表
      list: [],
      // 当前页码
      pageIndex: 1,
      // 每页条数
      pageSize: 20,
      // 查询参数
      queryParams: {
        userName: ''
      },
      // 路由参数
      params: {}
    }
  },
  mounted () {
    this.params = this.$route.query
    if (this.$store.getters.teacher) {
      this.radio = this.$store.getters.teacher.id
    }
  },
  methods: {
    setCondition (item) {
      this.radio = item.id
      this.$store.commit('setQueryTeacher', {
        name: item.userName,
        userCode: item.userCode,
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
.search-teacher {
  background-color: #fff;

  .van-search {
    flex-grow: 1;
    background-color: #f2f2f7;
  }
}
</style>
