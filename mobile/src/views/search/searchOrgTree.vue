<template>
  <div class="search-org">
    <!-- 顶部退出组织选择 -->
    <kd-header v-show="showSearchInput" url="/search">
      <van-search
        v-model.trim="keyWord"
        placeholder="请输入组织名称搜索"
        @blur="fuzzySearch"
      />
    </kd-header>
    <!-- 顶部返回上层操作 -->
    <div class="kd-head-org" v-show="!showSearchInput">
      <van-icon name="arrow-left" @click="backParentOrg" />
      <span>{{parentOrg}}</span>
      <van-button
        plain
        hairline
        type="info"
        size="small"
        @click="cancle"
      >取消</van-button>
    </div>
    <!-- 组织树 -->
    <div v-show="isTree">
      <van-radio-group v-model="radio">
        <option-item
          v-for="item in list"
          :key="item.id"
          :id="item.id"
          :text="item.organizationName"
          :active="radio === item.id"
          :imgName="'org_icon.png'"
          @click.native="handleRadioClick(item)"
        >
        <template v-slot:after-icon v-if="item.orgaChildCount > 0">
          <van-icon @click.stop="openChildOrg(item)" name="arrow" />
        </template>
        </option-item>
      </van-radio-group>
    </div>
    <!-- 组织列表 -->
    <org-list
      v-show="!isTree"
      ref="orgList"
      :queryParams="{name: keyWord}"
    ></org-list>
    <!-- loading遮罩层 -->
    <van-overlay :show="loading">
      <van-loading />
    </van-overlay>
  </div>
</template>
<script>
import { getOrganizationList } from '@/api/search'
import { Search, Button, PullRefresh, List, RadioGroup, Icon, Loading, Overlay } from 'vant'
import OptionItem from './components/optionItem.vue'
import OrgList from './searchOrgList.vue'
import { mixin } from '@/mixins'
export default {
  mixins: [mixin],
  components: {
    [List.name]: List,
    [Search.name]: Search,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [RadioGroup.name]: RadioGroup,
    [Icon.name]: Icon,
    OptionItem,
    OrgList
  },
  data () {
    return {
      isTree: true,
      loading: true,
      // 顶部搜索框
      showSearchInput: true,
      // 组织选项
      radio: null,
      // 查询关键字
      keyWord: '',
      // 数据列表
      list: [],
      // 组织树的层级历史记录
      orgTreeHistory: [],
      // 路由参数
      params: {}
    }
  },
  computed: {
    // 上级组织名称
    parentOrg () {
      const len = this.orgTreeHistory.length
      if (len) {
        return this.orgTreeHistory[len - 1].organizationName
      }
      return ''
    }
  },
  mounted () {
    this.params = this.$route.query
    if (this.$store.getters.organization) {
      this.radio = this.$store.getters.organization.id
    }
    this.getOrganizationList()
  },
  watch: {
    // 当没有历史记录时，说明处于根组织节点，则显示搜索框
    orgTreeHistory (nv) {
      this.showSearchInput = nv.length < 1
    }
  },
  methods: {
    // 模糊搜索
    fuzzySearch () {
      if (this.keyWord === '') {
        this.isTree = true
        this.getOrganizationList()
      } else {
        this.isTree = false
        this.$refs.orgList.onRefresh()
      }
    },
    // 获取组织列表
    getOrganizationList (parentId) {
      this.loading = true
      return new Promise((resolve, reject) => {
        getOrganizationList({ parentId }).then(res => {
          this.loading = false
          this.list = res.list
          resolve(res)
        }).catch(_ => {
          this.loading = false
          reject(_)
        })
      })
    },
    // 单项框点击事件
    handleRadioClick (data) {
      this.radio = data.id
      this.$store.commit('setQueryOrg', data)
      this.$router.push({
        path: '/search',
        query: this.params
      })
    },
    // 打开子组织
    openChildOrg (item) {
      if (item.orgaChildCount < 1) return
      this.getOrganizationList(item.id).then(_ => {
        // 添加组织的访问历史记录
        this.orgTreeHistory.push(item)
      })
    },
    // 取消
    cancle () {
      this.$router.push({
        path: '/search',
        query: this.params
      })
    },
    // 返回上级组织
    backParentOrg () {
      const len = this.orgTreeHistory.length
      if (len > 0) {
        const parentOrg = this.orgTreeHistory[len - 1]
        this.getOrganizationList(parentOrg.organizationParentId).then(_ => {
          // 删除最后一条历史记录
          this.orgTreeHistory.pop()
        })
      }
    }
  }
}
</script>
<style lang="scss">
.search-org {
  // 头部搜索栏
  .van-search {
    flex-grow: 1;
    background-color: #F2F2F7;
  }

  // 头部返回操作栏
  .kd-head-org {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px;
    background-image: url(~@/assets/head_blue.png);
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;

    // 返回箭头
    i {
      line-height: 36px;
      font-size: 24px;
    }

    // 上级组织名称
    >span {
      flex-grow: 1;
      margin-left: 12px;
      font-weight: 600;
      font-size: 18px;
      letter-spacing: 1px;
    }

    // 取消
    button {
      flex-shrink: 0;
      color: #1D2089;
      border-color: #1D2089;
      font-size: 15px;
    }
  }

  // 列表 》 箭头
  .van-icon-arrow {
    float: right;
    vertical-align: middle;
    font-size: 18px;
    color: #BCBCBB;
  }

  .van-loading {
    top: 50%;
    left: 50%;
    transform: translate(-15px);
  }
}
</style>
