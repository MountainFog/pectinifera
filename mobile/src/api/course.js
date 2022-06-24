import request from '@/utils/request.js'

/**
 * 视频点播列表
 * @param data
 */
export function vodListApi (params) {
  return request({
    url: 'app/restApi/listSubjectVideo',
    method: 'get',
    params
  })
}

/**
 * 点播详情课程列表
 * @param params
 */
export function vodDetailListApi (params) {
  return request({
    url: '/app/restApi/getCourseListBySubject',
    method: 'get',
    params
  })
}

/**
 * 点播视频-点击播放
 * @param params
 */
export function vodDetailApi (params) {
  return request({
    url: 'app/restApi/app/restApi/getSubjectVideoInfos',
    method: 'get',
    params
  })
}

/**
 * 视频直播列表
 * @param data
 */
export function liveListApi (params) {
  return request({
    url: 'app/restApi/listLiveVideo',
    method: 'get',
    params
  })
}

/**
 * 视频直播详情信息
 * @param params
 */
export function liveDetailApi (params) {
  return request({
    url: 'restApi/getCourseById',
    method: 'get',
    params
  })
}

/**
 * 直播视频
 * @param params
 */
export function liveInfoApi (params) {
  return request({
    url: 'app/restApi/app/restApi/getLiveVideoInfos',
    method: 'get',
    params
  })
}

/**
 * 开启直播调用，然后以后每5分钟调用一次
 * @param data
 */
export function setTimeOutLive (data) {
  return request({
    url: 'restApi/UpdateCourseLearningTime',
    method: 'post',
    data
  })
}

/**
 * 获取下一个直播课程信息
 */
export function getNextVideoInfo (params) {
  return request({
    url: 'restApi/getNextVideoInfo',
    method: 'get',
    params
  })
}
/*
* 添加点播记录
*/
export function addVodPlayLog (params) {
  return request({
    url: '/system/resource/vodVideo/saveUserCourseVodLog',
    method: 'post',
    params
  })
}
/*
 * 更新点播数据保持记录
 */
export function updateLiveCount (params) {
  return request({
    url: '/system/resource/vodVideo/updateLiveCount',
    method: 'post',
    params
  })
}
/*
 * 更新点播观看记录
 */
export function updateUserCourseVodLog (params) {
  return request({
    url: '/system/resource/vodVideo/updateUserCourseVodLog',
    method: 'post',
    params
  })
}
/*
* 添加直播记录
*/
export function addLivePlayLog (params) {
  return request({
    url: '/system/resource/liveVideo/saveUserCourseLiveLog',
    method: 'post',
    params
  })
}
/*
 * 更新直播数据保持记录
 */
export function updateLiveVideoCount (params) {
  return request({
    url: '/system/resource/liveVideo/updateLiveCount',
    method: 'post',
    params
  })
}
/*
 * 更新直播观看记录
 */
export function updateUserCourseLiveLog (params) {
  return request({
    url: '/system/resource/liveVideo/updateUserCourseLiveLog',
    method: 'post',
    params
  })
}
/*
 * 是否检查直播状态
 */
export function isCheckVideoStatus (params) {
  return request({
    url: 'restApi/isCheckVideoStatus',
    method: 'get',
    params
  })
}
/*
 * 获取直播状态
 */
export function checkLiveVideoStatus (params) {
  return request({
    url: 'restApi/checkLiveVideoStatus',
    method: 'get',
    params
  })
}

/**
 * 获取首次观看直点播页面需要停留多少秒才会保存浏览日志记录（秒）
 */
export function getFirstPlayLogTime () {
  return request({
    url: 'restApi/getFirstPlayLogTime',
    method: 'get'
  })
}
/**
 * 获取更新观看直点播页面需要停留多少秒才会保存浏览日志记录（秒）
 */
export function getUpdatePlayLogTime (params) {
  return request({
    url: 'restApi/getUpdatePlayLogTime',
    method: 'get'
  })
}

/**
 * 暂无图片应该使用默认的随机图片
 * @param resultList
 * @param attribute
 * @returns {*}
 */
export function replaceImage (resultList, attribute) {
  var numMines = 0
  for (var i = 0, len = resultList.length; i < len; i++) {
    if (resultList[i][attribute].indexOf('default.gif') > -1) {
      if ((i + 1 - numMines) % 5 === 1) {
        resultList[i][attribute] = '/api/static/showImage/default1.gif'
      } else if ((i + 1 - numMines) % 5 === 2) {
        resultList[i][attribute] = '/api/static/showImage/default2.gif'
      } else if ((i + 1 - numMines) % 5 === 3) {
        resultList[i][attribute] = '/api/static/showImage/default3.gif'
      } else if ((i + 1 - numMines) % 5 === 4) {
        resultList[i][attribute] = '/api/static/showImage/default4.gif'
      } else if ((i + 1 - numMines) % 5 === 0) {
        resultList[i][attribute] = '/api/static/showImage/default5.gif'
      }
    } else {
      numMines++
    }
  }
  return resultList
}
