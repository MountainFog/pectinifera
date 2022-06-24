import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/index.vue'
import store from '@/store'
Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'liveList',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: 'liveList',
        name: 'LiveList',
        component: () => import('@/views/liveList'),
        meta: {
          title: '课程直播列表',
          keepAlive: true
        }
      },
      {
        path: 'videoList',
        name: 'VideoList',
        component: () => import('@/views/videoList'),
        meta: {
          title: '课程点播列表',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/videoSelected',
    name: 'VideoSelected',
    component: () => import('@/views/videoList/videoSelected'),
    meta: {
      title: '课程搜索'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search'),
    meta: {
      title: '课程搜索'
    }
  },
  {
    path: '/playDetails',
    name: 'PlayDetails',
    component: () => import('@/views/playDetails'),
    meta: {
      title: '播放详情'
    }
  },
  {
    path: '/searchTeacher',
    name: 'SearchTeacher',
    component: () => import('@/views/search/searchTeacher'),
    meta: {
      title: '教师列表'
    }
  },
  {
    path: '/searchClassroom',
    name: 'SearchClassroom',
    component: () => import('@/views/search/searchClassroom'),
    meta: {
      title: '教室列表'
    }
  },
  {
    path: '/searchOrg',
    name: 'SearchOrg',
    component: () => import('@/views/search/searchOrgTree'),
    meta: {
      title: '院系选择'
    }
  },
  {
    path: '/searchSemester',
    name: 'SearchCSemester',
    component: () => import('@/views/search/searchSemester'),
    meta: {
      title: '学年学期选择'
    }
  },
  {
    path: '/liveResult',
    name: 'LiveResult',
    component: () => import('@/views/searchResult/liveResult'),
    meta: {
      title: '直播搜索结果'
    }
  },
  {
    path: '/vodResult',
    name: 'VodResult',
    component: () => import('@/views/searchResult/vodResult'),
    meta: {
      title: '点播搜索结果'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('views/404.vue'),
    meta: {
      title: '404',
      keepAlive: true
    }
  }
]

const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

routes = routes.concat({
  path: '*',
  redirect: '/404'
})

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

const myRouter = createRouter()

const history = window.sessionStorage

let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 路由切换动画
myRouter.beforeEach((to, from, next) => {
  if (to.params.direction) {
    store.commit('updateDirection', to.params.direction)
  } else {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      // 从播放详情页返回
      if (from.path === '/playDetails') {
        store.commit('updateDirection', 'back')
      } else {
        // 去往播放详情页 || 首次进入 || to大于from || 权重相同
        if (to.path === '/playDetails' || !fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
          store.commit('updateDirection', 'forward')
        } else {
          store.commit('updateDirection', 'back')
        }
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      store.commit('updateDirection', 'forward')
    }
  }
  next()
})

export const resetRouter = function () {
  myRouter.replace('/login')
}

export default myRouter
