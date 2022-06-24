<template>
  <div class="vod-item" @click="toCourseList">
    <div class="vod-item-title">{{data.subjectName}}</div>
    <table>
      <tr>
        <td class="live-item-th th-teacher"><span>主讲教师：</span></td>
        <td>{{teacherName}}</td>
      </tr>
      <tr>
        <td class="live-item-th th-semeste"><span>学年学期：</span></td>
        <td>{{data.beginYear}}-{{data.endYear}}学年第{{data.termTime}}学期</td>
      </tr>
    </table>
    <div class="updated-tips">已录制<span style="margin: 0 4px;color: #E70111;">{{data.courTimes}}</span>课次</div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    teacherName () {
      const userList = this.data.userList
      if (userList) {
        return userList[0].userName
      }
      return '未知'
    }
  },
  methods: {
    toCourseList () {
      const params = {
        subjectId: this.data.subjectId,
        teclId: this.data.teclId
      }
      this.$router.push({
        path: '/videoSelected',
        query: params
      })
    }
  }
}
</script>
<style lang="scss">
  .vod-item {
    width: aclc(100 - 24px);
    height: 120px;
    padding: 16px;
    background-color: #ffffff;
    border-radius: 4px;
    border-left: 4px solid #FF914F;

    &-title {
      font-size: 18px;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    table {
      table-layout: fixed;
      width: 100%;
      margin-top: 8px;
      font-size: 15px;
    }

    td {
      height: 24px;
      line-height: 24px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-th {
      width: 98px;
      color: #888888;

      &::before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-size: 14px;
        background-position: 1px 1px;
        vertical-align: middle;
      }

      span {
        margin-left: 6px;
        vertical-align: middle;
      }
    }

    .th-teacher::before {
      background-image: url(~@/assets/course_teacher.png);
    }
    .th-semeste::before {
      background-image: url(~@/assets/semeste_vod.png);
    }

    .updated-tips {
      padding: 6px 2px;
      color: #222222;
      font-size: 15px;
    }
  }
</style>
