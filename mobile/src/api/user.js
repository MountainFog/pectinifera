import request from '@/utils/request'

export function getRemoteToken () {
  return request({
    url: '/oauth2/token',
    method: 'get'
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * app用户登录
 * @param data
 */
export function getUserInfo (token) {
  return request({
    url: 'restApi/loginForApp?token=' + token,
    method: 'get'
  })
}
