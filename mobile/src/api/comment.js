/**
 *Created by zhangbin on 2019/1/3
 */
import request from '@/libs/request'

/**
 * 获取直播/点播评论
 * @param data
 */
export function getUserCommentApi (params) {
  return request({
    url: 'restApi/getUserComment',
    method: 'get',
    params
  })
}
/**
 * 添加评论
 * @param data
 */
export function saveUserCommentApi (data) {
  return request({
    url: 'restApi/saveUserComment',
    method: 'post',
    data
  })
}
/**
 * 老师回复评论
 * @param data
 */
export function saveTeacherReplyApi (data) {
  return request({
    url: 'restApi/saveTeacherReply',
    method: 'post',
    data
  })
}

/**
 * 获取科目平均分
 * @param params
 */
export function getSubjScoreAvgApi (params) {
  return request({
    url: 'restApi/getSubjScoreAvg',
    method: 'get',
    params
  })
}

/**
 * 插入观看完毕的课程讲次
 * @param data
 */
export function insertCompletedCourseApi (data) {
  return request({
    url: 'restApi/insertCompletedCourse',
    method: 'post',
    data
  })
}

/**
 * 添加科目评论
 * @param data
 */
export function addSubjCommentApi (data) {
  return request({
    url: 'restApi/addSubjComment',
    method: 'post',
    data
  })
}

export function replySubjCommentApi (data) {
  return request({
    url: 'restApi/replySubjComment',
    method: 'post',
    data
  })
}

export function getSubjCommentListApi (params) {
  return request({
    url: 'restApi/getSubjCommentList',
    method: 'get',
    params
  })
}
