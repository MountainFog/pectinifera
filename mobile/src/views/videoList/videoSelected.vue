<template>
  <div class="video-selected">
    <kd-header url="/videoList">
      <span>点播选集</span>
    </kd-header>
    <div class="video-selected-infos">
      <div class="infos-title">
        <span class="infos-title_text">{{courseData.subjName}}</span>
      </div>
      <p>{{courseData.tetiBeginYear}}-{{courseData.tetiEndYear}}学年第{{courseData.tetiTerm}}学期</p>
      <div class="infos-teacher">
        <span class="infos-teacher_title">主讲老师：</span><span>{{username}}</span>
      </div>
    </div>
    <div class="video-selected-list">
      <div class="list-title">课程选择</div>
      <div class="list-wrap">
        <div v-for="item in courseList" :key="item.id" @click="openPlayDetails(item)" class="list-item">{{item.courTimes}}.{{item.courBeginTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { vodDetailListApi } from '@/api/course'
export default {
  name: 'VideoSelected',
  data () {
    return {
      courseData: {},
      courseList: [],
      username: '',
      subjectId: null,
      teclId: null
    }
  },
  mounted () {
    this.subjectId = this.$route.query.subjectId
    this.teclId = this.$route.query.teclId
    vodDetailListApi({
      subjectId: this.subjectId,
      teclId: this.teclId
    }).then(res => {
      if (res.list && res.list[0]) {
        this.courseData = res.list[0]
        this.courseList = res.list[0].responseDtoList
        this.username = this.courseList[0].userName
      }
    })
  },
  methods: {
    openPlayDetails (item) {
      this.$router.push({
        path: '/playDetails',
        query: {
          subjectId: this.subjectId,
          teclId: this.teclId,
          model: 'recorded',
          id: item.courId,
          acadYearTerm: `${this.courseData.tetiBeginYear}-${this.courseData.tetiEndYear}学年第${this.courseData.tetiTerm}学期`
        }
      })
    }
  }
}
</script>
<style lang="scss">
.video-selected {

  // 上半部课程信息
  &-infos {
    padding: 24px;
    border-bottom: 1px #e6e6e6 solid;
    .infos-title_text {
      font-size: 22px;
      font-weight: bold;
      line-height: 30px;
      color: #222222;
      vertical-align: middle;
      word-break: break-all;
      word-wrap:break-word;
    }

    // 学年学期
    >p {
      margin: 6px 0;
      font-size: 16px;
      color: #888888;
    }

    // 主讲教师
    .infos-teacher {
      margin-top: 16px;

      >span {
        display: inline-block;
        font-size: 16px;
        vertical-align: middle;
      }

      &_title {
        margin-left: 6px;
        color: #888888;
      }

      // 主讲教师图标
      &::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-size: 14px;
        background-image: url(~@/assets/course_teacher.png);
        vertical-align: middle;
      }
    }
  }

  // 节次列表
  &-list {
    margin-left: 12px;
    .list-title {
      text-indent: 18px;
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
      color: #222222;
    }
    .list-wrap {
      margin-right: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .list-item {
      // width: 36px;
      height: 36px;
      margin: 12px 0 0 12px;
      background: #F2F4F7;
      border-radius: 2px;
      font-size: 13px;
      line-height: 36px;
      text-align: center;
    }
  }
}
</style>
