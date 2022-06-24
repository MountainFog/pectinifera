<template>
  <div class="play-details">
    <kd-header :url="isLive ? '/liveList' : '/videoSelected'">
      <span>{{`课程${isLive ? '直' : '点'}播`}}</span>
    </kd-header>
    <!-- 播放器 -->
    <!-- 播放器 -->
    <div id="xgPlayer" class="player-wrap">
      <div v-if="notSource" class="not-resource">
        {{ isLive ? '直播已结束' : '无播放资源'}}
      </div>
    </div>
    <!-- 视角切换 -->
    <div
      class="views-wrap"
      v-if="resource.length > 1"
    >
      <span>当前视角：</span>
      <div class="views-switch">
        <div
          v-for="item in resource"
          :key="item.view"
          :class="['views-item', {'views-active': active === item.view}]"
          @click="switchView(item)"
        >{{getViewsNum(item.view)}}</div>
      </div>
    </div>
    <!-- 课程信息 -->
    <div class="infos-title">
      <span class="infos-title_text">{{courseInfo.subjName}}</span>
    </div>
    <table>
      <tr v-show="false">
        <td class="infos-item-th th-course"><span>课程讲次：</span></td>
        <td>第{{ courseInfo.courTimes }}讲</td>
      </tr>
      <tr>
        <td class="infos-item-th th-teacher"><span>主讲老师：</span></td>
        <td>{{ courseInfo.userName }}</td>
      </tr>
      <tr>
        <td class="infos-item-th th-addr"><span>课程地点：</span></td>
        <td>{{ courseInfo.clroName}}</td>
      </tr>
    </table>
    <table class="border-none">
      <tr v-if="!isLive">
        <td class="infos-item-th th-semeste"><span>学年学期：</span></td>
        <td>{{ acadYearTerm }}</td>
      </tr>
      <tr>
        <td class="infos-item-th th-times"><span>课程时间：</span></td>
        <td>{{ courseInfo.videBeginTime }}</td>
      </tr>
      <tr>
        <td class="infos-item-th"></td>
        <td>{{ courseInfo.videEndTime }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { liveInfoApi, vodDetailApi } from '@/api/course'
import Player from 'xgplayer'
import HlsJsPlayer from 'xgplayer-hls.js'
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'PlayDetails',
  data () {
    return {
      isLive: true,
      // 播放器实例
      destroy: false,
      player: null,
      // 无播放资源
      notSource: false,
      // 播放器配置项
      options: {
        id: 'xgPlayer', // 绑定Dom
        isLive: true,
        url: '', // 视频链接
        volume: 0.5, // 默认音量
        autoplay: true, // 自动播放
        fluid: true,
        poster: require('@/assets/head_blue.png'),
        playsinline: true,
        closeVideoTouch: true
      },
      // 视角选中
      active: -1,
      courseInfo: {},
      // 播放资源
      resource: [],
      // 学年学期
      acadYearTerm: '',
      teclId: '',
      subjectId: ''
    }
  },
  computed: {
    // app内嵌的web界面，在单页应用时，go（-1）无效
    backPath () {
      if (this.isLive) {
        return '/liveList'
      } else {
        return `/videoSelected?teclId=${this.teclId}&subjectId=${this.subjectId}`
      }
    },
    height () {
      const width = document.documentElement.clientWidth
      return (width / 16) * 9 + 'px'
    }
  },
  mounted () {
    const { id, model, endTime } = this.$route.query
    this.isLive = model === 'live'
    // 学年学期
    this.acadYearTerm = this.$route.query.acadYearTerm
    this.teclId = this.$route.query.teclId
    this.subjectId = this.$route.query.subjectId
    // 直播、点播模式
    if (model === 'live') {
      this.getLiveInfos(id, endTime)
    } else {
      this.getRecordInfo(id)
    }
    window.addEventListener('unload', function (e) {
      if (this.player) {
        this.player.destroy()
      }
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.destroy()
    }
    this.destroy = true
  },
  methods: {
    getViewsNum (num) {
      switch (num) {
        case 1:
          return '教师1'
        case 2:
          return '教师2'
        case 3:
          return '学生1'
        case 4:
          return '学生2'
        case 5:
          return 'PPT'
        case 6:
          return '电子白板'
        case 7:
          return '合成通道'
        default:
          return '教师1'
      }
    },
    // 切换视角
    switchView (item) {
      if (item.url) {
        this.active = item.view
        this.player.src = item.url
      }
    },
    getServiceTime (data) {
      axios
        .get('/jy-application-vod-he/app/restApi/getServerDateTime')
        .then((res) => {
          let endTime = moment(data).utcOffset(8).format('X') * 1000
          let curTime = moment(res.headers.date).utcOffset(8).format('X') * 1000
          if (endTime - curTime > 0) {
            setTimeout(() => {
              this.notSource = true
              if (this.player) {
                this.player.destroy()
              }
            }, endTime - curTime + 300000)
          } else {
            if (curTime - endTime - 300000 > 0) {
              this.notSource = true
              if (this.player) {
                this.player.destroy()
              }
            } else {
              setTimeout(() => {
                this.notSource = true
                if (this.player) {
                  this.player.destroy()
                }
              }, endTime + 300000 - curTime)
            }
          }
        })
    },
    // 获取直播信息
    getLiveInfos (id, endTime) {
      liveInfoApi({ id })
        .then((res) => {
          this.formatLiveResponse(res)
          this.creatPlayer()
          this.getServiceTime(endTime)
        })
        .catch(_ => {
          this.getServiceTime(endTime)
        })
    },
    // 获取录像回放信息
    getRecordInfo (id) {
      vodDetailApi({ id: id }).then((res) => {
        this.formatResponse(res)
        this.creatPlayer()
      })
    },
    // 格式化点播课程相关数据
    formatResponse (res) {
      // 课程基础信息
      this.courseInfo = {
        subjName: res.subjName,
        userName: res.userName,
        courTimes: res.courTimes,
        clroName: res.clroName,
        videBeginTime: res.videBeginTime || res.courBeginTime,
        videEndTime: res.videEndTime || res.courEndTime
      }
      // 课程播放资源链接
      if (
        Array.isArray(res.videoPlayResponseVoList) &&
        !res.videoPlayResponseVoList.length
      ) {
        this.notSource = true
        return
      }
      const resource = res.videoPlayResponseVoList
      resource.forEach((item, index) => {
        if (index === 0) {
          this.active = item.cdviViewNum
          this.options.url = item.rtmpUrlHdv || item.rtmpUrlFluency
          // this.options.url = 'https://kedu-ivs-dev.devdolphin.com' + item.rtmpUrlHdv
        }
        this.resource.push({
          view: item.cdviViewNum,
          url: item.rtmpUrlHdv || item.rtmpUrlFluency
        })
      })
    },
    // 格式化直播课程相关数据
    formatLiveResponse (res) {
      // 课程基础信息
      this.courseInfo = {
        subjName: res.subjName,
        userName: res.userName,
        courTimes: res.courTimes,
        clroName: res.clroName,
        videBeginTime: res.videBeginTime || res.courBeginTime,
        videEndTime: res.videEndTime || res.courEndTime
      }
      // 课程播放资源链接
      if (
        Array.isArray(res.videoDeviceViewResponseVoList) &&
        !res.videoDeviceViewResponseVoList.length
      ) {
        this.notSource = true
        return
      }
      const resource = res.videoDeviceViewResponseVoList
      resource.forEach((item, index) => {
        if (index === 0) {
          this.active = item.cdviViewNum
          this.options.url = item.chanNameMainPlayUrl || item.chanGbidSecPlayUrl
          // this.options.url = 'https://kedu-ivs-dev.devdolphin.com' + item.rtmpUrlHdv
        }
        this.resource.push({
          view: item.cdviViewNum,
          url: item.chanNameMainPlayUrl || item.chanGbidSecPlayUrl
        })
      })
    },
    // 创建播放器
    creatPlayer () {
      // 点播
      if (!this.isLive) {
        // 初始化播放器
        this.player = new Player(this.options)
      } else {
        // 直播
        // 重连次数
        let reconetCount = 1
        // 预先请求
        const xhr = new XMLHttpRequest()
        xhr.open('get', this.options.url)
        xhr.send()
        xhr.onreadystatechange = () => {
          // 请求完成
          if (xhr.readyState === 4) {
            // TARGETDURATION:0 缺少ts文件
            const notDuration = xhr.responseText.indexOf('TARGETDURATION:0') > -1
            // 请求成功 且获取到完整数据
            if (xhr.status === 200 && !notDuration) {
              // 重置重连次数
              reconetCount = 1
              // 初始化播放器
              this.player = new HlsJsPlayer(this.options)
            } else {
              // 重连三次
              if (reconetCount < 3) {
                setTimeout(() => {
                  reconetCount++
                  xhr.open('get', this.options.url)
                  xhr.send()
                }, 2000)
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.play-details {
  .player-wrap {
    position: relative;
    width: 100%;
    height: auto;
    padding-top: 56.25%;
    background: rgb(39, 38, 38);

    .not-resource {
      position: absolute;
      left: 0;
      right: 0;
      top: 45%;
      bottom: 0;
      text-align: center;
      font-size: 22px;
      color: #d25f38;
    }
  }
  // 视角切换
  .views-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    margin: 0 16px;
    font-size: 17px;
    border-bottom: 1px #e6e6e6 solid;
  }
  .views-switch {
    display: flex;
    border-radius: 4px;
    background-color: #c9cee6;

    .views-item {
      width: 48px;
      padding: 0 4px;
      border-radius: 4px;
      color: #1d2089;
      text-align: center;
      line-height: 22px;
    }

    .views-item.views-active {
      color: #fff;
      background-color: #1d2089;
    }
  }
  .infos-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 16px 4px;
  }
  .infos-title_text {
    font-size: 17px;
    font-weight: bold;
    line-height: 30px;
    color: #222222;
    vertical-align: middle;
  }
  // 评分样式
  .infos-title_score {
    display: block;
    margin-left: 16px;
    padding: 0 8px;
    background: rgba(233, 24, 39, 0.15);
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    line-height: 26px;
    color: #e91827;
  }

  table {
    table-layout: fixed;
    width: calc(100% - 32px);
    margin: 0 16px 12px;
    padding-bottom: 10px;
    font-size: 15px;
    border-bottom: 1px #e6e6e6 solid;
  }
  table.border-none {
    border: none;
  }

  td {
    height: 24px;
    line-height: 30px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .infos-item-th {
    width: 98px;
    color: #888888;

    &::before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-size: 13px;
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
  .th-addr::before {
    background-image: url(~@/assets/course_addr.png);
  }
  .th-times::before {
    background-image: url(~@/assets/course_time.png);
  }
  .th-semeste::before {
    background-image: url(~@/assets/semeste_vod.png);
  }
}
</style>
