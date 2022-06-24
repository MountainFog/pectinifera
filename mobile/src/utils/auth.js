import Constants from './constants'
import { isEmpty } from './util'

export function setUserInfo (userInfo) {
  try {
    sessionStorage.setItem(Constants.STORAGE_KEY_USER_INFO, JSON.stringify(userInfo))
  } catch (e) {
    sessionStorage.setItem(Constants.STORAGE_KEY_USER_INFO, JSON.stringify({}))
  }
}

export function getUserInfo () {
  try {
    let userInfo = JSON.parse(sessionStorage.getItem(Constants.STORAGE_KEY_USER_INFO))
    if (userInfo) {
      return userInfo
    } else {
      return {}
    }
  } catch (e) {
    return {}
  }
}

export function setToken (token) {
  sessionStorage.setItem(Constants.STORAGE_KEY_TOKEN, token)
}

export function getToken () {
  let token = sessionStorage.getItem(Constants.STORAGE_KEY_TOKEN)
  if (isEmpty(token)) {
    token = ''
  }
  return token
}

export function setRefreshToken (token) {
  sessionStorage.setItem('REFRESH_TOKEN', token)
}

export function removeToken () {
  sessionStorage.removeItem(Constants.STORAGE_KEY_TOKEN)
}

export function getRefreshToken () {
  let token = sessionStorage.getItem('REFRESH_TOKEN')
  if (isEmpty(token)) {
    token = ''
  }
  return token
}
