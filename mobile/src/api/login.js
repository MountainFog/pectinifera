import axios from 'axios'
import request from '@/utils/request'
/**
 * 用户名密码登录
 * @param data
 */
export function getTenant () {
  return axios.get('/cloud-rbac/authentication/mfa?loginPolicy=weak')
}

/**
 * 用户名密码登录
 * @param data
 */
export function login (data) {
  return request({
    url: '/oauth2/password',
    method: 'post',
    data,
    headers: {
      'tenantid': data.tenantId
    }
  })
}

/**
 * app用户登录
 * @param data
 */
export function getUserInfos (token) {
  return request({
    url: 'app/restApi/loginForApp?token=' + token,
    method: 'get'
  })
}
