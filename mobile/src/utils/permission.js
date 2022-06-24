import router from '@/router'
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title' // 白名单列表
import store from '@/store'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确认用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      sessionStorage.clear()
      // 已经登录，跳转到首页
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    // /* has no token */
    // if(process.env.VUE_APP_CNS == 'false') {
    if (!window.configToken.tokenTks) {
      if (whiteList.indexOf(to.path) !== -1) {
        // 白名单中，无需验证
        next()
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        next(`/login?redirect=${to.path}`)
      }
    } else {
      try {
        // alert('user/getUserInfo')
        await store.dispatch('user/getUserInfo')
        console.log(store)
      } catch {
        // alert('获取accessToken失败')
      }
    }
  }
})
