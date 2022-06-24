import {
  login,
  getUserInfos
} from 'api/login'
// import { getRemoteToken } from 'api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router from '@/router'

const SetUserData = 'SetUserData' // 获取用户信息
const LOGOUT = 'LOGOUT' // 退出登录、清除用户数据
const USER_DATA = 'userDate' // 用户数据

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem(USER_DATA) || null)
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },

    [SetUserData] (state, userData = {}) {
      state.user = userData
      localStorage.setItem(USER_DATA, JSON.stringify(userData))
    },

    [LOGOUT] (state) {
      state.user = null
      state.token = null
      removeToken()
      localStorage.removeItem(USER_DATA)
    }

  },
  actions: {
    login (state, params) {
      login(params).then(res => {
        state.commit('SET_TOKEN', res.result.jwt_token)
        router.replace({
          path: '/'
        })
      })
    },
    getUserInfo (state) {
      try {
        window.getToken_app(async (v) => {
          // 获取token的回调函数可能会多次调用，前端页面自行去重调用次数
          if (getToken() === '') {
            let res = await getUserInfos(v.d.access_token)
            window.setShowTopView_app({
              'back': true,
              'close': false
            })
            state.commit('SET_TOKEN', res.data.jwt_token)
            router.replace({
              path: '/'
            })
          }
        })
      } catch (error) {

      }
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    user (state) {
      return state.user
    }
  }
}
