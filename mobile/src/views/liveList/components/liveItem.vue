<template>
  <div
    :class="['live-item', {'live-item__is_live': isLive}]"
    @click="toLiveDetails"
  >
    <div class="live-item-title">
      <span>{{data.subjName}}</span>
      <span class="live-item-status">{{isLive ? '直播中' : '即将直播'}}</span>
    </div>
    <table>
      <tr>
        <td class="live-item-th th-teacher"><span>直播教室：</span></td>
        <td>{{ data.clroName }}</td>
      </tr>
      <tr>
        <td class="live-item-th th-teacher"><span>主讲老师：</span></td>
        <td>{{ data.userName }}</td>
      </tr>
      <tr>
        <td class="live-item-th th-times"><span>直播时间：</span></td>
        <td>{{ data.courBeginTime}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  props: {
    isLive: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    toLiveDetails () {
      if (!this.isLive) {
        Toast.fail('直播未开始')
        return
      }
      this.$router.push({
        path: '/playDetails',
        query: {
          model: 'live',
          id: this.data.id,
          endTime: this.data.courEndTime
        }
      })
    }
  }
}
</script>
<style lang="scss">
.live-item {
  width: aclc(100 - 24px);
  height: 120px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 4px;
  border-left: 4px solid #d0d5e9;

  &-title {
    font-size: 18px;
    font-weight: bold;

    > :first-child {
      display: inline-block;
      width: calc(100% - 72px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &-status {
    float: right;
    display: block;
    width: 72px;
    padding: 2px 0;
    background-image: url(~@/assets/about_live.png);
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 15px;
    color: #ffffff;
    font-weight: normal;
    text-align: center;
  }

  &.live-item__is_live {
    border-color: #ff914f;
  }
  &.live-item__is_live .live-item-status {
    text-indent: 20px;
    background-image: url(~@/assets/is_live.png);
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

  .th-course::before {
    background-image: url(~@/assets/course_name.png);
  }
  .th-teacher::before {
    background-image: url(~@/assets/course_teacher.png);
  }
  .th-times::before {
    background-image: url(~@/assets/course_time.png);
  }
}
</style>
