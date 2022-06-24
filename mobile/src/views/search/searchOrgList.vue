<template>
  <div class="search-org-list">
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
            :text="item.organizationName"
            :active="radio === item.id"
            :imgName="'org_icon.png'"
            @click.native="setCondition(item)"
          >
          </option-item>
        </van-radio-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getOrganizationList } from '@/api/search'
import { Icon, PullRefresh, List, RadioGroup } from 'vant'
import OptionItem from './components/optionItem.vue'
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
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [RadioGroup.name]: RadioGroup,
    [Icon.name]: Icon,
    OptionItem
  },
  data () {
    return {
      radio: null,
      // 查询关键字
      keyWord: '',
      // 查询api
      query: getOrganizationList,
      // 数据列表
      list: [],
      // 当前页码
      pageIndex: 1,
      // 每页条数
      pageSize: 20,
      // 路由参数
      params: {}
    }
  },
  mounted () {
    this.params = this.$route.query
    if (this.$store.getters.organization) {
      this.radio = this.$store.getters.organization.id
    }
  },
  methods: {
    setCondition (item) {
      this.radio = item.id
      this.$store.commit('setQueryOrg', item)
      this.$router.push({
        path: '/search',
        query: this.params
      })
    }
  }
}
</script>
