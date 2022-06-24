<template>
  <div class="search-page">
    <kd-header
      :beforeBack="resetQueryParams"
      :url="isLive ? '/liveList' : '/videoList'"
    >
      <span>{{`搜索${isLive ? '直' : '点'}播课程`}}</span>
    </kd-header>
    <div class="search-item">
      <div class="search-title">课程</div>
      <div class="search-cmp">
        <van-field
          v-model="courseName"
          right-icon="search"
          placeholder="请输入课程名称"
          @blur="setCourseName"
        />
      </div>
    </div>
    <div
      v-for="item in conditions"
      :key="item.path"
      v-show="!(item.title === '学年学期' && isLive)"
      class="search-item"
    >
      <div class="search-title">{{item.title}}</div>
      <div class="search-cmp">
        <van-field
          v-model="item.value"
          @click="toPath(item.path)"
          right-icon="arrow"
          :placeholder="`请选择${item.title}`"
        />
      </div>
    </div>
    <div class="search-btn">
      <van-button type="primary" @click="toResultsPage">搜索课程</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Button, Sticky } from 'vant'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    [Field.name]: Field,
    [Sticky.name]: Sticky,
    [Button.name]: Button
  },
  data () {
    return {
      isLive: true,
      conditions: [
        {
          title: '教师',
          path: '/searchTeacher',
          value: ''
        },
        {
          title: '教室',
          path: '/searchClassroom',
          value: ''
        },
        {
          title: '院系',
          path: '/searchOrg',
          value: ''
        },
        {
          title: '学年学期',
          path: '/searchSemester',
          value: ''
        }
      ],
      courseName: ''
    }
  },
  computed: {
    ...mapGetters(['teacher', 'classroom', 'semester', 'organization'])
  },
  mounted () {
    this.isLive = this.$route.query.isLive === 'true'
    this.courseName = this.$store.getters.courseName
    this.conditions[0].value = this.teacher ? this.teacher.name : ''
    this.conditions[1].value = this.classroom ? this.classroom.name : ''
    this.conditions[2].value = this.organization ? this.organization.organizationName : ''
    this.conditions[3].value = this.semester ? this.semester.name : ''
  },
  methods: {
    // 设置课程名称
    setCourseName () {
      this.$store.commit('setQueryCourseName', this.courseName)
    },
    resetQueryParams () {
      this.$store.commit('setQueryCourseName', '')
      this.$store.commit('setQueryTeacher', null)
      this.$store.commit('setQueryClassroom', null)
      this.$store.commit('setQueryOrg', null)
      this.$store.commit('setQuerySemester', null)
    },
    toPath (path) {
      this.$router.push({
        path,
        query: {
          isLive: this.isLive
        }
      })
    },
    toResultsPage () {
      if (this.isLive) {
        this.$router.push('/liveResult')
      } else {
        this.$router.push('/vodResult')
      }
    }
  }
}
</script>
<style lang="scss">
.search-page {
  height: 100%;
  background-color: #ffffff;

  .search-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0;
    background-color: #ffffff;

    >span {
      font-size: 17px;
      font-weight: bold;
    }
  }

  .search-item {
    padding: 16px 24px;

    .search-title {
      font-size: 17px;
      line-height: 24px;
      color: #222222;
      font-weight: bold;
    }

    .search-cmp {
      width: 100%;
      height: 40px;
      margin-top: 8px;
      background: #F2F2F7;
      border-radius: 5px;
    }
    .van-cell {
      font-size: 15px;
      background-color: transparent;
    }
  }

  .search-btn {
    padding: 24px;

  }

  .van-button {
    width: 100%;
    font-size: 17px;
    border-radius: 4px;
    background-image: linear-gradient(to right , #1d2089 ,#2c2f91, #343795);
    border-color: #2c2f91;
    .van-button__text {
      letter-spacing: 2px;
    }
  }
}
</style>
