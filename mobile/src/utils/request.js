import axios from 'axios'
import Contants from '@/utils/constants'
import { getToken } from '@/utils/auth'
import { Toast } from 'vant'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

service.interceptors.request.use(config => {
  const token = getToken(Contants.STORAGE_KEY_TOKEN)
  if (token) {
    config.headers['jwt-token'] = token
  }
  config.headers['Accept'] = 'application/json'
  return config
}, error => {
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  // 未登录错误
  if (response.data.error && response.data.error === '401') {
    sessionStorage.clear()
    router.replace({
      path: '/login'
    })
    return
  }
  // 请求状态错误处理
  if (response.data.status && response.data.status !== 200) {
    Toast.fail(response.data.message)
    return Promise.reject(response.data)
  }
  // 其它业务错误
  if (response.data.errorMsg || response.data.error) {
    Toast.fail(response.data.errorMsg)
    return Promise.reject(response.data)
  } else {
    // 成功返回数据
    return Promise.resolve(response.data)
  }
},
// http请求错误
error => {
  return Promise.reject(error)
})

export default service

export const downloadRequest = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  responseType: 'blob'
})

downloadRequest.interceptors.request.use(config => {
  const token = getToken(Contants.STORAGE_KEY_TOKEN)
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
