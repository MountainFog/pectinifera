import request from '@/utils/request.js'

// 教师列表
export function getTeacherList (params) {
  return request({
    url: 'app/restApi/getTeacherList',
    method: 'get',
    params
  })
}

// 教室列表
export function getClassroomList (params) {
  return request({
    url: 'app/restApi/getClassroomList',
    method: 'get',
    params
  })
}

// 学年学期列表
export function getTermTimeList (params) {
  return request({
    url: 'app/restApi/getTermTimeList',
    method: 'get',
    params
  })
}

// 组织机构
export function getOrganizationList (params) {
  return request({
    url: 'app/restApi/getOrganizationList',
    method: 'get',
    params
  })
}

// 获取点播列表
export function listSubjectVideo (params) {
  return request({
    url: 'app/restApi/getCourseListBySubject',
    method: 'get',
    params
  })
}

// 获取直播列表
export function listLiveVideo (params) {
  return request({
    url: 'restApi/listSubjectVideo',
    method: 'get',
    params
  })
}
